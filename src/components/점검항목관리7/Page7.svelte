<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import Swiper7 from "./Swiper7.svelte";
  import {
    getAllCheckList,
    setDeleteChecklistGroup,
    setDeleteChecklistItem,
    setNewChecklistGroup,
  } from "../../services/callApi";
  import { allCheckList, swiperTargetData } from "../../services/store";
  import {
    confirmDelete,
    successAlert,
    warningAlert,
  } from "../../shared/sweetAlert";
  import { writable } from "svelte/store";
  import Swiper from "../결과조회3/Swiper.svelte";
  import { groupSort } from "d3";
  let resultData = [];
  let categoryToggles = {};
  let isOpen = Array(8).fill(false); // Initializing states for 8 accordion items
  let subIsOpen = {}; // For tracking open states of submenus (like UNIX)
  let loading = true;

  // Toggle top-level accordion
  let groupIndex = "";
  const toggleAccordion = (index, item) => {
    isOpen[index] = !isOpen[index];
    groupIndex = item.ccg_index;
    // console.log("gttgtg", groupIndex);
  };
  let isSectionOpen = {};

  // Function to toggle specific sections
  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {};
    }
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey];
  }

  for (let i = 0; i < 50; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "NW-06",
      ccr_item_no__ccc_item_item: "Session Timeout 설정",
      ccr_item_no__ccc_item_title: "2023-02-01 12:00:00..",
      ccr_item_no__ccc_item_criteria: "취약",
      ccr_item_no__ccc_item_result: "조치예정",
    });
  }
  /**********LEFT SIDE*/
  let mainTitle = "점검 계획 현황";
  export let activeMenu = "신규계획등록";
  let activeSubItem = null;

  let currentPage = null;
  function selectPage(data) {
    currentPage = Swiper7;
    $swiperTargetData = data;
    activeSubItem = data;
  }
  // $: console.log("swiper", $swiperTargetData);
  let isAddingNewGroup = false;
  const cancelNewGroup = () => {
    isAddingNewGroup = false;
  };
  /********************************/
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
  onMount(async () => {
    loading = true;
    await allCheckListGet();
    loading = false;
  });
  let selectedTargetData = [];
  let selectedTarget = [];
  function handleClickTarget(targetData, item) {
    selectedTargetData = targetData;
    selectedTarget = item;
    // console.log("targetData", selectedTargetData);
  }
  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 20; // Items per page

  $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

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
    itemsPerPage = parseInt(event.target.value, 10); // Use base 10
    currentPagePagination = 1; // Reset to first page
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

  // Reactive: Update ccg_index_id and ccc_index whenever selected changes
  $: if (selected.length > 0) {
    ccg_index_id = selected[0].ccg_index; // Assuming all rows share the same ccg_index_id
    ccc_index = selected.map((item) => item.ccc_index); // Extract ccc_index values
  } else {
    ccg_index_id = "";
    ccc_index = [];
  }
  $: console.log("selected", selected);
  // Debugging: Log whenever ccg_index_id or ccc_index changes
  // $: console.log("ccg_index_id:", ccg_index_id, "ccc_index:", ccc_index);

  /**************DELETE CHECKLIST ITEM************/
  async function deleteChecklist() {
    try {
      console.log("ccg_index ccc_index", ccg_index_id, ccc_index);
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

  async function createChecklist() {
    try {
      loading = true;
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
        loading = false;
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
      loading = true;
      const response = await setDeleteChecklistGroup(groupIndex);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        await allCheckListGet(); // Fetch updated data after deletion
        groupIndex = "";
        loading = false;
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      throw err;
    }
  }
  function closeSwiper() {
    currentPage = null;
  }
</script>

{#if loading}
  <div class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
{:else}
  <main class="table-container">
    <section class="section1">
      <!-- LEFT SIDE -->
      <div class="body_menu">
        <div class="menuContainer">
          <!-- Header -->
          <div>
            <div class="menuHeader">
              {mainTitle}
              {#if currentPage === Swiper7}
                <img
                  src="assets/images/back.png"
                  alt="back"
                  on:click="{closeSwiper}"
                />
              {/if}
            </div>

            <!-- Accordion -->
            <div class="accordion">
              {#if $allCheckList && Object.keys($allCheckList).length > 0}
                {#each Object.entries($allCheckList) as [key, item], index}
                  <div class="accordion-item">
                    <button
                      on:click="{() => toggleAccordion(index, item)}"
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
                          class="accordion-content {isOpen[index]
                            ? 'open'
                            : ''}"
                          style="max-height: {isOpen[index] ? '100%' : '0px'}"
                        >
                          <!-- Render UNIX section if it exists -->
                          {#if item.UNIX && item.UNIX.length > 0}
                            <p
                              on:click="{() => {
                                toggleSection(key, 'UNIX');
                                handleClickTarget(item.UNIX, item, 'UNIX');
                              }}"
                              class="{isSectionOpen[key]?.UNIX ? 'active' : ''}"
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
                                  class="subplan {activeSubItem &&
                                  activeSubItem.ccc_index === subItem.ccc_index
                                    ? 'selected'
                                    : ''}"
                                  on:click="{() => {
                                    (activeMenu = subItem.ccc_item_no),
                                      selectPage(subItem);
                                  }}"
                                >
                                  {subItem.ccc_item_no}
                                </li>
                              {/each}
                            </ul>
                          {/if}

                          <!-- WINDOWS Section -->
                          {#if item.WINDOWS && item.WINDOWS.length > 0}
                            <p
                              on:click="{() => {
                                toggleSection(key, 'WINDOWS');
                                handleClickTarget(
                                  item.WINDOWS,
                                  item,
                                  'WINDOWS'
                                );
                              }}"
                              class="{isSectionOpen[key]?.WINDOWS
                                ? 'active'
                                : ''}"
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
                                  class="subplan {activeSubItem &&
                                  activeSubItem.ccc_index === subItem.ccc_index
                                    ? 'selected'
                                    : ''}"
                                  on:click="{() => {
                                    (activeMenu = subItem.ccc_item_no),
                                      selectPage(subItem);
                                  }}"
                                >
                                  {subItem.ccc_item_no}
                                </li>
                              {/each}
                            </ul>
                          {/if}

                          <!-- NETWORK Section -->
                          {#if item.NETWORK && item.NETWORK.length > 0}
                            <p
                              on:click="{() => {
                                toggleSection(key, 'NETWORK');
                                handleClickTarget(
                                  item.NETWORK,
                                  item,
                                  'NETWORK'
                                );
                              }}"
                              class="{isSectionOpen[key]?.NETWORK
                                ? 'active'
                                : ''}"
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
                                  class="subplan {activeSubItem &&
                                  activeSubItem.ccc_index === subItem.ccc_index
                                    ? 'selected'
                                    : ''}"
                                  on:click="{() => {
                                    (activeMenu = subItem.ccc_item_no),
                                      selectPage(subItem);
                                  }}"
                                >
                                  {subItem.ccc_item_no}
                                </li>
                              {/each}
                            </ul>
                          {/if}

                          <!-- DBMS Section -->
                          {#if item.DBMS && item.DBMS.length > 0}
                            <p
                              on:click="{() => {
                                toggleSection(key, 'DBMS');
                                handleClickTarget(item.DBMS, item, 'DBMS');
                              }}"
                              class="{isSectionOpen[key]?.DBMS ? 'active' : ''}"
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
                                  class="subplan {activeSubItem &&
                                  activeSubItem.ccc_index === subItem.ccc_index
                                    ? 'selected'
                                    : ''}"
                                  on:click="{() => {
                                    (activeMenu = subItem.ccc_item_no),
                                      selectPage(subItem);
                                  }}"
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
                              on:click="{() => {
                                toggleSection(key, 'WAS');
                                handleClickTarget(item.WAS, item, 'WAS');
                              }}"
                              class="{isSectionOpen[key]?.WAS ? 'active' : ''}"
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
                                  class="subplan {activeSubItem &&
                                  activeSubItem.ccc_index === subItem.ccc_index
                                    ? 'selected'
                                    : ''}"
                                  on:click="{() => {
                                    (activeMenu = subItem.ccc_item_no),
                                      selectPage(subItem);
                                  }}"
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
            <button on:click="{() => (isAddingNewGroup = true)}">복사</button>
            <button on:click="{deleteGroup}">삭제</button>
            <button>EXCEL</button>
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      {#if currentPage}
        <svelte:component
          this="{currentPage}"
          bind:selectedTargetData
          bind:selectedTarget
          {allCheckListGet}
        />
      {:else}
        <article class="contentArea">
          <div class="last_button2">
            <select on:change="{updateItemsPerPage}">
              <option value="10">10줄</option>
              <option value="20" selected>20줄</option>
            </select>
          </div>
          <div class="tableListWrap">
            <table class="tableList hdBorder">
              <colgroup>
                <col style="width: 50px;" />
                <col style="width:90px;" />
                <col />
                <col style="width:140px" />
                <col />
                <col style="width: 300px;" />
              </colgroup>
              <thead>
                <tr>
                  <th class="text-center">
                    <input
                      type="checkbox"
                      on:click="{selectAll}"
                      bind:checked="{allSelected}"
                    /></th
                  >
                  <th class="text-center">번호</th>
                  <th class="text-center">점검대상 </th>
                  <th class="text-center">점검항목 </th>
                  <th class="text-center">점검이름</th>
                  <th class="text-center">등록일</th>
                </tr>
              </thead>
              <tbody>
                {#if paginatedData && paginatedData.length > 0}
                  {#each paginatedData as data, index}
                    <tr on:click="{() => selectPage(data)}">
                      <td class="text-center">
                        <input
                          on:click|stopPropagation
                          type="checkbox"
                          bind:group="{selected}"
                          value="{data}"
                          name="{data}"
                        /></td
                      >
                      <td class="text-center"
                        >{selectedTargetData.length - (startIndex + index)}</td
                      >
                      <td class="text-center">{data?.cct_index__cct_target}</td>
                      <td class="text-center">{data.ccc_item_no}</td>
                      <td>{data.ccc_item_title}</td>
                      <td class="text-center"
                        >{selectedTarget?.ccg_createdate}</td
                      >
                    </tr>
                  {/each}
                {:else}
                  <tr>
                    <td class="text-center" colspan="6">No Data Selected</td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>

          <div style="width: 100%; display:flex; justify-content:flex-end;">
            <div class="last_button">
              <!-- Pagination -->
              <div class="pagination">
                <button
                  on:click="{() => goToPage(1)}"
                  disabled="{currentPagePagination === 1}"
                >
                  {"<<"}
                </button>
                <button
                  on:click="{() => goToPage(currentPagePagination - 1)}"
                  disabled="{currentPagePagination === 1}"
                >
                  {"<"}
                </button>
                {#each Array(totalPages).fill(0) as _, pageIndex}
                  <button
                    class:selected="{currentPagePagination === pageIndex + 1}"
                    on:click="{() => goToPage(pageIndex + 1)}"
                  >
                    {pageIndex + 1}
                  </button>
                {/each}
                <button
                  on:click="{() => goToPage(currentPagePagination + 1)}"
                  disabled="{currentPagePagination === totalPages}"
                >
                  {">"}
                </button>
                <button
                  on:click="{() => goToPage(totalPages)}"
                  disabled="{currentPagePagination === totalPages}"
                >
                  {">>"}
                </button>
              </div>
              <div style="display: flex;">
                <button class="btn btnSave" on:click="{deleteChecklist}"
                  >선택항목삭제
                </button>
                <button class="btn btnSave">변경이력확인 </button>
              </div>
            </div>
          </div>
        </article>
      {/if}
    </section>
  </main>
{/if}
{#if isAddingNewGroup}
  <div class="modal-open-wrap">
    <dialog open on:close="{() => (isAddingNewGroup = false)}">
      <div class="modal-content">
        <div class="modal">
          <select class="editable_input" bind:value="{selected_checklist_id}">
            {#each Object.entries($allCheckList) as [key, item], index}
              <option value="{item.ccg_index}">{item.ccg_group}</option>
            {/each}
          </select>
          <input
            bind:value="{new_checlist_name}"
            type="text"
            placeholder="그룹 이름을 입력하세요"
            class="editable_input"
          />
          <div class="modal-buttons">
            <button class="primary-button" on:click="{createChecklist}">
              저장하기
            </button>
            <button class="secondary-button" on:click="{cancelNewGroup}"
              >취소</button
            >
          </div>
        </div>
      </div>
    </dialog>
  </div>
{/if}

<style>
  .subplan.selected {
    color: #121efe; /* Change this to your desired color */
    font-weight: bold;
  }
  .selected {
    color: #121efe; /* Change this to your desired color */
    font-weight: bold;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(167, 167, 167, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure it sits above other content */
  }

  .loading-spinner {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  /* Spinner animation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .menuHeader {
    position: relative;
  }
  .menuHeader img {
    position: absolute;
    right: 0;
    width: 16px;
    cursor: pointer;
  }
  .sublist {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
  .sublist.open {
    max-height: 100%;
  }
  .pagination {
    display: flex;
    justify-content: center;
    /* margin-top: 20px; */
    gap: 5px;
  }
  .pagination button {
    border: none !important;
    padding: 8px 12px;
    margin: 0 4px;
    cursor: pointer;
    border-radius: 5px;
  }

  .pagination button.selected {
    background-color: #007bff; /* Change to your desired color */
    color: white;
    font-weight: bold;
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

  .tableListWrap {
    height: 66vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table th {
    /* background-color: #aaaaaa;
      color: white; */
    font-weight: bold;
  }
  table th,
  table td {
    padding: 10px;
    /* text-align: center; */
    font-size: 12px;
    /* height: 40px; */
  }
  table td {
    font-weight: normal;
    height: 40px;
  }
  .btn {
    font-size: 14px;
  }
  thead {
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick the header to the top */
    z-index: 10; /* Ensure the header is above the scrolling content */
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); /* Shadow effect for separation */
  }
  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }
  .last_button {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .last_button2 {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
  .secondary-button {
    background-color: #f0f0f0;
    color: #666;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  dialog {
    position: fixed;
    top: 50%;
    left: 14%;
    transform: translate(-50%, -50%);
    width: 400px;
    border: none;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
    z-index: 100;
  }
  .primary-button {
    background-color: #54b3d6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .primary-button:hover {
    background-color: #48a2bf;
  }
  .secondary-button:hover {
    background-color: #e0e0e0;
  }
  .modal-open-wrap {
    display: block;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
  }
  .modal-open-wrap {
    display: block;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    animation: fadeInBackdrop 0.3s ease;
  }
  .modal-content {
    text-align: center;
  }
  .editable_input {
    height: 40px;
    width: 360px;
    margin-bottom: 27px;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
