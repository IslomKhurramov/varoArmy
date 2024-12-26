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
    getFixDoneLists,
    setDeleteChecklistGroup,
    setDeleteChecklistItem,
    setDeletePlan,
    setNewChecklistGroup,
  } from "../../services/callApi";
  import { allCheckList, allPlanList, fixDoneList } from "../../services/store";

  // Dinamik o'zgaruvchilar
  let resultData = [];
  let setView = "plan";
  let currentPage1 = FirstMenu; // Default sahifa
  let currentPage = null; // Hozirgi komponent
  let tableData;
  let totalRecords = 0;

  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 10; // Items per page

  // // Calculate the start and end index of items for the current page
  // $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  // $: endIndex = startIndex + itemsPerPage;

  // // Slice the data for the current page
  // $: paginatedData = selectedTargetData.slice(startIndex, endIndex);

  // // Calculate total pages
  // $: totalPages = Math.ceil(selectedTargetData.length / itemsPerPage);

  // // Dynamic range for pagination numbers
  // const maxButtons = 10; // Maximum number of visible page buttons
  // let paginationStart, paginationEnd; // Declare these variables once

  // $: {
  //   paginationStart = Math.max(
  //     1,
  //     currentPagePagination - Math.floor(maxButtons / 2)
  //   );
  //   paginationEnd = Math.min(totalPages, paginationStart + maxButtons - 1);
  //   paginationStart = Math.max(
  //     1,
  //     Math.min(paginationStart, totalPages - maxButtons + 1)
  //   );
  // }

  // // Function to handle page change
  // function goToPage(pageNumber) {
  //   if (pageNumber > 0 && pageNumber <= totalPages) {
  //     currentPagePagination = pageNumber;
  //   }
  // }
  // // Function to handle items per page change
  // function updateItemsPerPage(event) {
  //   itemsPerPage = parseInt(event.target.value, 10);
  //   // currentPagePagination = 1; // Reset to first page
  // }
  /*************************************************************/

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
  let plan_index = "";
  const toggleAccordion = (index, item) => {
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true;
    plan_index = item.ccg_index;
    FixDoneList();
    console.log("fixdoneList", $fixDoneList);
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

  async function FixDoneList() {
    try {
      const response = await getFixDoneLists(plan_index);

      if (response) {
        fixDoneList.set(response);
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

  async function deletePlan() {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;
    try {
      const response = await setDeletePlan(plan_index);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        loading = true;
        await getPlanList(); // Fetch updated data after deletion
        plan_index = "";
        loading = false;
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      throw err;
    }
  }

  /*********************************************/

  /**********************************************/

  // let selectedHostnameData = null;
  // function handleClickHostname(data) {
  //   // console.log("handle data", data);
  //   currentPage = Swiper;
  //   selectedHostname = data.hostname;
  //   selectedHostnameData = data;
  // }
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
            {#each $allPlanList as item, index}
              <div class="accordion-item">
                <button
                  on:click={() => {
                    toggleAccordion(index, item); // Direct function call in Svelte
                  }}
                  class="accordion-header {isOpen[index] ? 'active' : ''}"
                >
                  {item.ccp_title}
                  <!-- ccp_title will be displayed here -->
                </button>

                <div
                  class="accordion-content {isOpen[index] ? 'open' : ''}"
                  style="max-height: {isOpen[index] ? '100%' : '0px'}"
                >
                  <ul>
                    <div
                      class="accordion-content {isOpen[index] ? 'open' : ''}"
                      style="max-height: {isOpen[index] ? '100%' : '0px'}"
                    >
                      {#if item.asset && typeof item.asset === "object"}
                        {#each Object.entries(item.asset) as [targetName, targetData]}
                          <p
                            on:click={() => {
                              toggleSection(index, targetName);
                            }}
                            class={isSectionOpen[index]?.[targetName]
                              ? "active"
                              : ""}
                          >
                            {targetName}
                          </p>
                          <!-- This will display UNIX, NETWORK, etc. -->

                          {#if targetData && targetData.length > 0}
                            <ul
                              class="sublist {isSectionOpen[index]?.[targetName]
                                ? 'open'
                                : ''}"
                              style="max-height: {isSectionOpen[index]?.[
                                targetName
                              ]
                                ? '100%'
                                : '0px'}"
                            >
                              {#each targetData as subItem}
                                <li
                                  on:click={() => {
                                    activeMenu = subItem;
                                    handleClickHostname(subItem); // Set selected hostname
                                  }}
                                >
                                  <strong>{subItem.hostname}</strong>
                                  <!-- Display the hostname -->
                                </li>
                              {/each}
                            </ul>
                          {/if}
                        {/each}
                      {:else}
                        <li>No assets available</li>
                        <!-- In case there are no assets -->
                      {/if}
                    </div>
                  </ul>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button on:click={() => (isAddingNewGroup = true)}>복사</button>
          <button on:click={deletePlan}>삭제</button>
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
