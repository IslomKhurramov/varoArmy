<script>
  import { onMount } from "svelte";
  import SwiperPage5 from "./SwiperPage5.svelte";
  import FirstMenu from "./모든구성요소/FirstMenu.svelte";
  import SeconMenu from "./모든구성요소/SeconMenu.svelte";
  import { getVulnsOfAsset } from "../../services/vulns/vulnsService";
  import {
    confirmDelete,
    errorAlert,
    successAlert,
    warningAlert,
  } from "../../shared/sweetAlert";
  import {
    getAllCheckList,
    setDeleteChecklistGroup,
    setDeleteChecklistItem,
    setNewChecklistGroup,
  } from "../../services/callApi";
  import { allCheckList } from "../../services/store";

  // Dinamik o'zgaruvchilar
  let resultData = [];
  let setView = "plan";
  let currentPage1 = FirstMenu; // Default sahifa
  let currentPage = null; // Hozirgi komponent
  let tableData;
  let totalRecords = 0;

  // DATA
  let plans = [];
  let targetData = null;
  let assets = [];
  let search = {
    plan_index: "19",
    asset_target_uuid: "",
    step_vuln: "1",
    page_cnt: "1",
    list_cnt: "15",
    search_opt: "취약",
  };

  onMount(async () => {
    try {
      plans = await getVulnsOfAsset(search);
      // console.log('plans', plans);

      tableData = plans?.vulns;
      totalRecords = plans?.total_rec_cnt;

      assets = await getVulnsOfAsset(search);
      tableData = assets?.vulns;
      totalRecords = assets?.total_rec_cnt;
    } catch (err) {
      await errorAlert(err?.message);
    }
  });

  // ///////////////////////////////////////////////////////////////////////
  let selectedTargetData = [];
  let selectedTarget = [];
  function handleClickTarget(targetData, item) {
    selectedTargetData = targetData;
    selectedTarget = item;
    console.log("targetData", selectedTargetData);
  }
  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 10; // Items per page

  // Calculate the start and end index of items for the current page
  $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

  // Slice the data for the current page
  $: paginatedData = selectedTargetData.slice(startIndex, endIndex);

  // Calculate total pages
  $: totalPages = Math.ceil(selectedTargetData.length / itemsPerPage);

  // Dynamic range for pagination numbers
  const maxButtons = 10; // Maximum number of visible page buttons
  let paginationStart, paginationEnd; // Declare these variables once

  $: {
    paginationStart = Math.max(
      1,
      currentPagePagination - Math.floor(maxButtons / 2)
    );
    paginationEnd = Math.min(totalPages, paginationStart + maxButtons - 1);
    paginationStart = Math.max(
      1,
      Math.min(paginationStart, totalPages - maxButtons + 1)
    );
  }

  // Function to handle page change
  function goToPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      currentPagePagination = pageNumber;
    }
  }
  // Function to handle items per page change
  function updateItemsPerPage(event) {
    itemsPerPage = parseInt(event.target.value, 10);
    // currentPagePagination = 1; // Reset to first page
  }
  /*************************************************************/
  let selected = [];
  let allSelected = false; // Indicates if all items are selected
  let ccg_index_id = "";
  let ccc_index = [];

  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }
  // //////////////////////////////////////////////////////////////////////////////////////

  const selectPage1 = (page) => {
    currentPage1 = page;
  };

  const selectPage = () => {
    currentPage = SwiperPage5;
  };

  // Fake ma'lumotlarni yaratish
  for (let i = 0; i < 50; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "AAAA",
      ccr_item_no__ccc_item_item: "NW-06",
      ccr_item_no__ccc_item_title: "SETUID..",
      ccr_item_no__ccc_item_criteria: "취약",
      ccr_item_no__ccc_item_result: "조치승인",
    });
  }

  // Accordion logikasi
  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false);
  export let activeMenu = "신규계획등록";
  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {};
    }
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey];
  }

  let isAddingNewGroup = false;
  const cancelNewGroup = () => {
    isAddingNewGroup = false;
  };

  // Accordion ochish/qayta yopish
  let groupIndex = "";
  const toggleAccordion = (index, item) => {
    isOpen[index] = !isOpen[index];
    groupIndex = item.ccg_index;
  };
  let isSectionOpen = {};

  async function allCheckListGet() {
    try {
      const response = await getAllCheckList();

      if (response) {
        allCheckList.set(response);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  // $: console.log("allchecklist", $allCheckList);
  onMount(() => {
    allCheckListGet();
  });

  /**************DELETE CHECKLIST ITEM************/
  async function deleteChecklist() {
    try {
      const response = await setDeleteChecklistItem(ccg_index_id, ccc_index);

      if (response.RESULT === "OK") {
        if (response.CODE === "기본 제공된 체크리스트는 삭제가 불가능합니다.") {
          warningAlert("기본 제공된 체크리스트는 삭제가 불가능합니다");
          selected = [];
          allSelected = false;
        } else {
          successAlert(`${response.CODE}`);
          await allCheckListGet(); // Fetch updated data after deletion
          selected = [];
          allSelected = false;
          clearSelection(); // Reset selection
        }
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Clear the checkboxes and reset selection states
  function clearSelection() {
    selected = [];
    allSelected = false;
    ccg_index_id = "";
    ccc_index = [];
  }
  /*********************************************/
  let new_checlist_name = "";
  let selected_checklist_id = "";

  $: if (selected.length > 0) {
    ccg_index_id = selected[0].ccg_index_id; // Assuming all rows share the same ccg_index_id
    ccc_index = selected.map((item) => item.ccc_index); // Extract ccc_index values
  } else {
    ccg_index_id = "";
    ccc_index = [];
  }

  async function createChecklist() {
    try {
      const response = await setNewChecklistGroup(
        selected_checklist_id,
        new_checlist_name
      );

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        await allCheckListGet(); // Fetch updated data after deletion
        new_checlist_name = "";
        selected_checklist_id = "";
        isAddingNewGroup = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
  /**********************************************/
  async function deleteGroup() {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;
    try {
      const response = await setDeleteChecklistGroup(groupIndex);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        await allCheckListGet(); // Fetch updated data after deletion
        groupIndex = "";
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      throw err;
    }
  }
</script>

<main class="table-container">
  <section class="section1">
    <!-- LEFT SIDE -->
    <div class="body_menu">
      <div class="menuContainer">
        <!-- Header -->
        <div>
          <div class="menuHeader">{mainTitle}</div>

          <!-- Accordion -->
          <div class="accordion">
            {#if $allCheckList && Object.keys($allCheckList).length > 0}
              {#each Object.entries($allCheckList) as [key, item], index}
                <div class="accordion-item">
                  <button
                    on:click={() => toggleAccordion(index, item)}
                    class="accordion-header {isOpen[index] ? 'active' : ''}"
                  >
                    {item.ccg_group}
                  </button>

                  <!-- Accordion content -->
                  <div
                    class="accordion-content {isOpen[index] ? 'open' : ''}"
                    style="max-height: {isOpen[index] ? '100%' : '0px'}"
                  >
                    <ul>
                      <div
                        class="accordion-content {isOpen[index] ? 'open' : ''}"
                        style="max-height: {isOpen[index] ? '100%' : '0px'}"
                      >
                        <!-- Render UNIX section if it exists -->
                        {#if item.UNIX && item.UNIX.length > 0}
                          <p
                            on:click={() => {
                              toggleSection(key, "UNIX");
                              handleClickTarget(item.UNIX, item, "UNIX");
                            }}
                            class={isSectionOpen[key]?.UNIX ? "active" : ""}
                          >
                            UNIX
                          </p>
                          <ul
                            class="sublist {isSectionOpen[key]?.UNIX
                              ? 'open'
                              : ''}"
                            style="max-height: {isSectionOpen[key]?.UNIX
                              ? '100%'
                              : '0px'}"
                          >
                            {#each item.UNIX as subItem}
                              <li
                                on:click={() => {
                                  (activeMenu = subItem.ccc_item_no),
                                    selectPage(subItem);
                                }}
                              >
                                {subItem.ccc_item_no}
                              </li>
                            {/each}
                          </ul>
                        {/if}

                        <!-- WINDOWS Section -->
                        {#if item.WINDOWS && item.WINDOWS.length > 0}
                          <p
                            on:click={() => {
                              toggleSection(key, "WINDOWS");
                              handleClickTarget(item.WINDOWS, item, "WINDOWS");
                            }}
                            class={isSectionOpen[key]?.WINDOWS ? "active" : ""}
                          >
                            WINDOWS
                          </p>
                          <ul
                            class="sublist {isSectionOpen[key]?.WINDOWS
                              ? 'open'
                              : ''}"
                            style="max-height: {isSectionOpen[key]?.WINDOWS
                              ? '100%'
                              : '0px'}"
                          >
                            {#each item.WINDOWS as subItem}
                              <li
                                on:click={() => {
                                  (activeMenu = subItem.ccc_item_no),
                                    selectPage(subItem);
                                }}
                              >
                                {subItem.ccc_item_no}
                              </li>
                            {/each}
                          </ul>
                        {/if}

                        <!-- NETWORK Section -->
                        {#if item.NETWORK && item.NETWORK.length > 0}
                          <p
                            on:click={() => {
                              toggleSection(key, "NETWORK");
                              handleClickTarget(item.NETWORK, item, "NETWORK");
                            }}
                            class={isSectionOpen[key]?.NETWORK ? "active" : ""}
                          >
                            NETWORK
                          </p>
                          <ul
                            class="sublist {isSectionOpen[key]?.NETWORK
                              ? 'open'
                              : ''}"
                            style="max-height: {isSectionOpen[key]?.NETWORK
                              ? '100%'
                              : '0px'}"
                          >
                            {#each item.NETWORK as subItem}
                              <li
                                on:click={() => {
                                  (activeMenu = subItem.ccc_item_no),
                                    selectPage(subItem);
                                }}
                              >
                                {subItem.ccc_item_no}
                              </li>
                            {/each}
                          </ul>
                        {/if}

                        <!-- DBMS Section -->
                        {#if item.DBMS && item.DBMS.length > 0}
                          <p
                            on:click={() => {
                              toggleSection(key, "DBMS");
                              handleClickTarget(item.DBMS, item, "DBMS");
                            }}
                            class={isSectionOpen[key]?.DBMS ? "active" : ""}
                          >
                            DBMS
                          </p>
                          <ul
                            class="sublist {isSectionOpen[key]?.DBMS
                              ? 'open'
                              : ''}"
                            style="max-height: {isSectionOpen[key]?.DBMS
                              ? '100%'
                              : '0px'}"
                          >
                            {#each item.DBMS as subItem}
                              <li
                                on:click={() => {
                                  (activeMenu = subItem.ccc_item_no),
                                    selectPage(subItem);
                                }}
                              >
                                {subItem.ccc_item_no}
                              </li>
                            {/each}
                          </ul>
                        {/if}

                        <!-- Repeat the same pattern for other sections -->
                        <!-- WAS Section -->
                        {#if item.WAS && item.WAS.length > 0}
                          <p
                            on:click={() => {
                              toggleSection(key, "WAS");
                              handleClickTarget(item.WAS, item, "WAS");
                            }}
                            class={isSectionOpen[key]?.WAS ? "active" : ""}
                          >
                            WAS
                          </p>
                          <ul
                            class="sublist {isSectionOpen[key]?.WAS
                              ? 'open'
                              : ''}"
                            style="max-height: {isSectionOpen[key]?.WAS
                              ? '100%'
                              : '0px'}"
                          >
                            {#each item.WAS as subItem}
                              <li
                                on:click={() => {
                                  (activeMenu = subItem.ccc_item_no),
                                    selectPage(subItem);
                                }}
                              >
                                {subItem.ccc_item_no}
                              </li>
                            {/each}
                          </ul>
                        {/if}
                      </div>
                    </ul>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button on:click={() => (isAddingNewGroup = true)}>복사</button>
          <button on:click={deleteGroup}>삭제</button>
          <button>EXCEL</button>
        </div>
      </div>
    </div>
  </section>

  <!-- RIGHT SIDE -->
  <section class="section2">
    <!-- Dinamik sahifa -->
    {#if currentPage}
      <svelte:component this={currentPage} />
    {:else}
      <article class="contentArea">
        <section class="filterWrap" style="margin-bottom: 0px;">
          <div>
            <select>
              <option value="" selected>점검대상체계</option>

              <option value={"점검대상체계"}>점검대상체계</option>
            </select>
            <input
              style="    height: 28px;
              font-size: 12px;"
              type="datetime-local"
            />

            <select>
              <option value="" selected>미등록</option>

              <option value="점검관">점검관</option>
            </select>
            <select id="result">
              <option value="" selected>점검구분 </option>
              <option value="점검구분">점검구분 </option>
            </select>

            <button class="btn btnSearch" style="width: 98px; font-size: 14px;"
              ><img src="assets/images/reset.png" alt="search" />초기화</button
            >
          </div>
        </section>

        <section class="subTabWrap">
          <a
            style="font-size: 14px;"
            class={setView == "plan" ? "active" : ""}
            on:click={() => {
              setView = "plan";
              selectPage1(FirstMenu);
            }}
          >
            조치계획등록
          </a>
          <a
            style="font-size: 14px;"
            class={setView == "plan_accept" ? "active" : ""}
            on:click={() => {
              setView = "plan_accept";
              selectPage1(SeconMenu);
            }}
          >
            조치계획승인
          </a>
        </section>
        {#if currentPage1}
          <svelte:component this={currentPage1} />
        {/if}
      </article>
    {/if}
  </section>
</main>

<style>
  .sublist {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
  .sublist.open {
    max-height: 100%;
  }

  .table-container {
    /* overflow-y: auto; */
    border-radius: 10px;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: row;
  }

  .section2 {
    width: 85%;
    height: 90vh;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;
  }

  .accordion-content ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid black;
  }

  .accordion-content.open {
    padding: 0px 10px 0px 10px;
  }
  .accordion-content p {
    cursor: pointer;
  }
  .accordion-content p:hover {
    background-color: #3d5878;
    cursor: pointer;
    border-radius: 5px;
    /* padding: 15px; */

    color: white;
  }

  .section1 {
    width: 15%;
    height: 90vh;
    margin-right: 5px;
    margin-top: 5px;
    border-radius: 10px;
    flex-direction: column;
    border: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;
  }

  .contentArea {
    position: relative;
  }

  .subTabWrap {
    position: absolute;
    top: 60px;
    left: 20px;
  }

  .subTabWrap a {
    cursor: pointer;
  }
</style>
