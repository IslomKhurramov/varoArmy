<script>
  import { onMount } from "svelte";
  //   import { allPlanList, viewPlanResult } from "../../services/store";
  import {
    getPlanDetailInformation,
    getPlanReportLists,
    getViewPlanResults,
    setDeletePlan,
  } from "../services/callApi";
  import {
    allPlanList,
    detailInfoPlan,
    reportPlanList,
    viewPlanResult,
  } from "../services/store";
  import SwiperMain from "./SwiperMain.svelte";
  import { confirmDelete, successAlert } from "../shared/sweetAlert";
  import GroupDetail from "./GroupDetail.svelte";
  import DetailOfPlanMain from "./DetailOfPlanMain.svelte";
  import MainReportDownload from "./MainReportDownload.svelte";

  /**********************************LEFT SIDE******/
  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false); // Har bir accordion uchun ochiq/yopiq holat
  export let activeMenu = "신규계획등록";
  export let getPlanList;
  let currentPage = null;

  /***********************************/
  let closeShowModalDetail = false;
  const validOptions = ["양호", "취약", "인터뷰", "수동점검"];

  let planIndex = "";
  let target = "";
  let hostName = "";
  let checkList_item_no = "";
  let check_result = "";
  let show_option = "";
  let plan_index = "";
  let parentIndex = null;
  const toggleAccordion = async (index, item) => {
    // Reset all states when a new plan is selected
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true;
    isOpen = [...isOpen]; // Trigger reactivity by creating a new array

    plan_index = item.ccp_index; // Update the plan index
    planIndex = plan_index;
    targetNamePlan = ""; // Reset the target name
    selectedHostname = ""; // Reset the hostname
    isSectionOpen = {}; // Clear open sections

    await reportOfPlanList(plan_index);

    parentIndex = item.ccp_index;
    console.log("parent index,", parentIndex);

    selectedData = item; // Update the selected data
  };

  async function reportOfPlanList(plan_index) {
    try {
      const response = await getPlanReportLists(plan_index);

      if (response) {
        reportPlanList.set(response.data);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  // Close modal when Esc key is pressed
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeShowModal();
    }
  }
  function closeShowModal() {
    closeShowModalDetail = false;
  }

  onMount(() => {
    // Listen for keydown event when the modal is open
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the event listener when the component is destroyed
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  let selectedData = null;
  function handleRowClick(data) {
    selectedData = data;
    currentPage = SwiperMain;
  }
  let plan_index_for_detail = null;
  let detailOfPlan = [];
  async function handlePogosoBtn(data) {
    plan_index_for_detail = data.ccp_index;
    currentPage = DetailOfPlanMain;
    await getPlanDetail();
  }
  async function handlewanryoBtn(data) {
    plan_index_for_detail = data.ccp_index;
    currentPage = MainReportDownload;
    await getPlanDetail();
  }
  async function handleSubItem(data) {
    plan_index_for_detail = data.ccp_index;
    currentPage = DetailOfPlanMain;
    await getPlanDetail();
  }
  let firstDetail = null;

  async function getPlanDetail() {
    try {
      const response = await getPlanDetailInformation(plan_index_for_detail);
      console.log("Response detail:", response);

      if (response && typeof response === "object") {
        // Find the first numbered key
        const firstKey = Object.keys(response).find(
          (key) => !isNaN(Number(key))
        );

        if (firstKey) {
          // Extract the first object using the key
          firstDetail = response[firstKey];
          detailInfoPlan.set(firstDetail);
          console.log("First detail extracted:", firstDetail);
        } else {
          console.error("No numbered keys found in response object:", response);
        }
      } else {
        console.error("Unexpected response structure or empty data:", response);
      }
    } catch (err) {
      console.error("Error fetching plan detail:", err);
    }
  }

  $: console.log("detailInfoPlan", $detailInfoPlan);
  /**************PAGINATION*/
  let isSectionOpen = {};
  let targetNamePlan = "";

  let selectedHostnameData = null;
  function handleClickHostname(data) {
    // console.log("handle data", data);
    selectedHostname = data.hostname;
    selectedHostnameData = data;
    currentPage = null;
  }
  // $: console.log("selectedHostname", selectedHostname);
  // Function to filter data based on selected target and hostname
  let selectedTarget = "";
  let selectedHostname = "";

  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {}; // Ensure a nested object exists for each itemKey
    }
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey]; // Toggle the section
    targetNamePlan = sectionKey;
  }
  function formatToKoreanTime(date) {
    if (!date) return "N/A";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",

      timeZone: "Asia/Seoul",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(new Date(date));
  }
  /**********************/
  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 15; // Items per page

  // Calculate the start and end index of items for the current page
  $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

  // Slice the data for the current page
  $: paginatedData = $allPlanList.slice(startIndex, endIndex).filter((item) => {
    return (
      (!selectedHostname ||
        item.ast_uuid__ass_uuid__ast_hostname === selectedHostname) &&
      (!targetNamePlan ||
        item.ast_uuid__ast_target__cct_target === targetNamePlan)
    );
  });

  // Calculate total pages
  $: totalPages = Math.ceil($allPlanList.length / itemsPerPage);

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
  function closeSwiper() {
    currentPage = null;
  }
  async function deletePlan() {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;
    try {
      const response = await setDeletePlan(plan_index);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        await getPlanList(); // Fetch updated data after deletion
        plan_index = "";
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
          <div class="menuHeader">
            {mainTitle}
            {#if currentPage === SwiperMain}
              <img
                src="assets/images/back.png"
                alt="back"
                on:click="{closeSwiper}"
              />
            {:else if currentPage === GroupDetail}
              <img
                src="assets/images/back.png"
                alt="back"
                on:click="{closeSwiper}"
              />
            {:else if currentPage === DetailOfPlanMain}
              <img
                src="assets/images/back.png"
                alt="back"
                on:click="{closeSwiper}"
              />
            {:else if currentPage === MainReportDownload}
              <img
                src="assets/images/back.png"
                alt="back"
                on:click="{closeSwiper}"
              />
            {/if}
          </div>

          <!-- Accordion -->
          <div class="accordion">
            {#each $allPlanList as item, index}
              <div class="accordion-item">
                {#if item.ccp_index_parent === 0}
                  <!-- Display parent plans -->
                  <button
                    on:click="{() => toggleAccordion(index, item)}"
                    class="accordion-header {isOpen[index] ? 'active' : ''}"
                  >
                    {item.ccp_title}
                  </button>
                  <div
                    class="accordion-content {isOpen[index] ? 'open' : ''}"
                    style="max-height: {isOpen[index] ? '100%' : '0px'}"
                  >
                    <!-- Subplans of this parent -->
                    {#each $allPlanList as subItem}
                      {#if subItem.ccp_index_parent === item.ccp_index}
                        <p
                          title="{subItem.ccp_title}"
                          style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                          class="subplan"
                          on:click="{() => handleSubItem(subItem)}"
                        >
                          ➔ {subItem.ccp_title}
                          <span class="tooltip">{subItem.ccp_title}</span>
                          <!-- Tooltip here -->
                        </p>
                      {/if}
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button>복사</button>
          <button on:click="{deletePlan}">삭제</button>
          <button>EXCEL</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section2">
    {#if currentPage}
      <svelte:component
        this="{currentPage}"
        bind:selectedData
        bind:firstDetail
        bind:getPlanList
        bind:plan_index_for_detail
      />
    {:else}
      <article class="contentArea">
        <div class="tableListWrap">
          <table class="tableList hdBorder">
            <colgroup>
              <col style="width:90px;" />
              <col style="width:230px" />
              <col style="width:322px" />
              <col style="width: 200px;" />
              <col style="width: 120px;" />
              <col style="width:156px" />
              <col style="width: 255px;" />
              <col style="width: 120px;" />
              <col style="width:120px" />
              <col style="width:120px" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">점검계획제목 </th>
                <th class="text-center">점검기간 </th>
                <th class="text-center">점검분류 </th>
                <th class="text-center">상태 </th>
                <th class="text-center">등록일 </th>

                <th class="text-center">수행부대 </th>
                <th class="text-center">등록인 </th>
                <th class="text-center">결과등록 </th>
                <th class="text-center">점검완료 </th>
              </tr>
            </thead>
            <tbody>
              {#each paginatedData as data, index}
                <tr on:click="{() => handleRowClick(data)}">
                  <!-- 번호: Reverse index to display latest first -->
                  <td class="text-center"
                    >{$allPlanList.length - (startIndex + index)}</td
                  >
                  <!-- 점검대상: ast_uuid__ass_uuid__ast_hostname -->
                  <td>
                    {data?.ccp_title || "N/A"}
                  </td>

                  <!-- 점검항목: ccr_item_no__ccc_item_no -->
                  <td class="text-center">
                    <div>
                      {formatToKoreanTime(data?.plan_start_date)} ~ {formatToKoreanTime(
                        data?.plan_end_date
                      )}
                    </div>
                  </td>

                  <!-- 점검이름: ccr_item_no__ccc_item_title -->
                  <td class="text-center">
                    {data?.ccp_ruleset__ccg_group || "N/A"}
                  </td>

                  {#if data.ccp_b_finalized}
                    <td class="text-center"> 진행중 </td>
                  {:else}
                    <td class="text-center"> 진행완료 </td>
                  {/if}
                  <!-- 점검이름: ccr_item_no__ccc_item_title -->
                  <td class="text-center">
                    {formatToKoreanTime(data?.ccp_cdate) || "N/A"}
                  </td>
                  <td class="text-center">
                    {data?.asg_index__asg_title || "N/A"}
                  </td>
                  <td class="text-center">
                    {data?.plan_creator_user_index__user_name || "N/A"}
                  </td>
                  <td class="text-center">
                    {#if data?.ccp_security_point < 0}
                      0%
                    {:else if data?.ccp_security_point > 0}
                      {data?.ccp_security_point}%
                    {:else}
                      N/A
                    {/if}
                  </td>

                  <td class="text-center">
                    <div
                      style="display:flex; flex-direction:row; gap:5px; width:100%; justify-content:center"
                    >
                      <button
                        class="btnSave"
                        on:click="{(event) => {
                          event.stopPropagation();
                          handlewanryoBtn(data);
                        }}"
                        >완료
                      </button>
                      <button
                        on:click="{(event) => {
                          event.stopPropagation();
                          handlePogosoBtn(data);
                        }}"
                        class="btnSave">보고서</button
                      >
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="pagination">
          <!-- First Page Button -->
          <button
            on:click="{() => goToPage(1)}"
            disabled="{currentPagePagination === 1}"
          >
            {"<<"}
          </button>

          <!-- Previous Page Button -->
          <button
            on:click="{() => goToPage(currentPagePagination - 1)}"
            disabled="{currentPagePagination === 1}"
          >
            {"<"}
          </button>

          <!-- Visible Page Buttons -->
          {#each Array(paginationEnd - paginationStart + 1).fill(0) as _, index}
            <button
              class:selected="{currentPagePagination ===
                paginationStart + index}"
              on:click="{() => goToPage(paginationStart + index)}"
            >
              {paginationStart + index}
            </button>
          {/each}

          <!-- Next Page Button -->
          <button
            on:click="{() => goToPage(currentPagePagination + 1)}"
            disabled="{currentPagePagination === totalPages}"
          >
            {">"}
          </button>

          <!-- Last Page Button -->
          <button
            on:click="{() => goToPage(totalPages)}"
            disabled="{currentPagePagination === totalPages}"
          >
            {">>"}
          </button>
        </div>
      </article>
    {/if}
  </section>
</main>

<style>
  .accordion-header {
    font-weight: bold;
    cursor: pointer;
  }

  .accordion-content {
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding-left: 1rem;
  }

  .subplan {
    margin-left: 2rem; /* Indent for subplans */
    font-size: 0.9rem;
    color: gray;
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

  /* Tooltip container */
  .tooltip {
    visibility: hidden; /* Hidden by default */
    width: 200px; /* Adjust the width of the tooltip */
    background-color: rgba(0, 0, 0, 0.7); /* Background color of the tooltip */
    color: #fff; /* Text color */
    text-align: center; /* Center text */
    border-radius: 4px; /* Rounded corners */
    padding: 5px; /* Padding inside tooltip */
    position: absolute; /* Absolute positioning */
    z-index: 1; /* On top of other elements */
    bottom: 125%; /* Position above the paragraph */
    left: 50%; /* Center the tooltip horizontally */
    transform: translateX(-50%); /* Centering adjustment */
    opacity: 0; /* Initial opacity */
    transition: opacity 0.2s ease; /* Transition effect */
  }

  /* Show the tooltip when hovering over the parent paragraph */
  .subplan:hover .tooltip {
    visibility: visible; /* Show tooltip */
    opacity: 1; /* Fade in the tooltip */
  }
  .accordion2 {
    height: 41vh;
  }
  .modal-open-wrap {
    display: block;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
  }
  .menuHeader {
    position: relative;
  }
  .pagination {
    display: flex;
    justify-content: center;
    /* margin-top: 20px; */
    gap: 5px;
    /* margin-top: 10px; */
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
  .modal-open-wrap {
    display: block;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
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
  /****Modal Container*/
  dialog {
    position: fixed;
    /* height: 600px; */
    /* overflow-y: auto;
      overflow-x: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1103px;
    border: none;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: svelte-s7onsa-fadeIn 0.3s ease;
    z-index: 100;
  }

  /* Modal backdrop */
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    animation: fadeInBackdrop 0.3s ease;
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
  thead {
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick the header to the top */
    z-index: 10; /* Ensure the header is above the scrolling content */
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); /* Shadow effect for separation */
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
  .tableListWrap {
    height: 70vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
  }
  .lastBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
  }
  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }
  .btnUpload {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .last_button {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
</style>
