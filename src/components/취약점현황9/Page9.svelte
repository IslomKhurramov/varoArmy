<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import { confirmDelete, successAlert } from "../../shared/sweetAlert";
  import {
    getPlanDetailInformation,
    setDeletePlan,
  } from "../../services/callApi";
  import { allPlanList } from "../../services/store";
  import DetailOfPlan from "./DetailOfPlan.svelte";
  let resultData = [];

  for (let i = 0; i < 10; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "AAAA",
      ccr_item_no__ccc_item_item: "NW-06",
      ccr_item_no__ccc_item_title: "SETUID..",
      ccr_item_no__ccc_item_criteria: "취약",
      ccr_item_no__ccc_item_result: "조치예정",
    });
  }
  /**********LEFT SIDE*/
  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false); // Har bir accordion uchun ochiq/yopiq holat
  export let activeMenu = "신규계획등록";
  let parentIndex = null;

  let plan_index = "";
  const toggleAccordion = (index, item) => {
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true; // Open only the selected accordion
    plan_index = item.ccp_index;
    parentIndex = item.ccp_index;
  };

  let isSectionOpen = {}; // To manage the open/close state of the sections
  let targetName = "";
  // Function to toggle the section (asset category, like UNIX or NETWORK)
  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {}; // Ensure a nested object exists for each itemKey
    }
    targetName = sectionKey;
    // console.log("targetName", targetName);
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey]; // Toggle the section
  }

  let selectedHostnameData = null;
  function handleClickHostname(data) {
    // console.log("handle data", data);
    currentPage = Swiper;
    selectedHostname = data.hostname;
    selectedHostnameData = data;
  }
  // Function to filter data based on selected target and hostname
  let selectedHostname = "";

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
  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 10; // Items per page

  // Calculate the start and end index of items for the current page
  $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

  // Slice the data for the current page
  $: paginatedData = resultData.slice(startIndex, endIndex);

  // Calculate total pages
  $: totalPages = Math.ceil(resultData.length / itemsPerPage);

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
  let activeSubItem = null;
  let plan_index_for_detail = "";
  let currentPage = null;
  let firstDetail = null;

  async function handleSubItem(data) {
    plan_index_for_detail = data.ccp_index;
    currentPage = DetailOfPlan;
    await getPlanDetail();
    console.log("subitem data", data);
    activeSubItem = data;
  }
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
  function closeSwiper() {
    currentPage = null;
    activeSubItem = null;
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
            {#if currentPage === DetailOfPlan}
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
                          class="subplan {activeSubItem &&
                          activeSubItem.ccp_title === subItem.ccp_title
                            ? 'selected'
                            : ''}"
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
      <svelte:component this="{currentPage}" bind:firstDetail />
    {:else}
      <article class="contentArea">
        <section class="filterWrap">
          <div>
            <select>
              <option value="" selected disabled>점검계획명</option>

              <option value="{'점검계획명'}">점검계획명</option>
            </select>
            <select>
              <option value="" selected>관리부대</option>

              <option value="관리부대">관리부대</option>
            </select>

            <select>
              <option value="" selected>담당자</option>

              <option value="담당자">담당자</option>
            </select>
            <select id="result">
              <option value="" selected>취약점항목U-20 </option>

              <option
                value="취약점항목U-20
"
                >취약점항목U-20
              </option>
            </select>

            <button class="btn btnSearch" style="width: 98px; font-size: 14px;"
              ><img src="assets/images/reset.png" alt="search" />초기화</button
            >
          </div>
        </section>
        <div class="tableListWrap">
          <table class="tableList hdBorder">
            <colgroup>
              <col style="width:90px;" />
              <col style="width:170px" />
              <col style="width:140px" />
              <col style="width: 200px;" />
              <col />
              <col />
              <col />
              <col style="width:170px" />
              <col style="width:140px" />
              <col style="width: 200px;" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">점검항목 </th>
                <th class="text-center">점검결과 </th>
                <th class="text-center">호스트명 </th>
                <th class="text-center">아이피주소 </th>
                <th class="text-center">소속부대 </th>
                <th class="text-center">자산분류</th>
                <th class="text-center">제조사 </th>
                <th class="text-center">제품명 </th>
                <th class="text-center">버전 </th>
                <th class="text-center">관리부대 </th>
                <th class="text-center">운영담당자 </th>
              </tr>
            </thead>
            <tbody>
              {#each paginatedData as data, index}
                <tr>
                  <td class="text-center">{resultData.length - index}</td>

                  <td class="text-center">
                    {data?.ast_uuid__ass_uuid__ast_hostname}
                  </td>
                  <td class="text-center">
                    <div>
                      {data?.ccr_item_no__ccc_item_no}
                    </div>
                  </td>
                  <td class="text-center">
                    {data.ccr_item_no__ccc_item_title}
                  </td>
                  <td class="text-center">
                    {data.ccr_item_no__ccc_item_criteria}</td
                  >
                  <td class="text-center">
                    {data?.ast_uuid__ass_uuid__ast_hostname}
                  </td>
                  <td class="text-center">
                    <div>
                      {data?.ccr_item_no__ccc_item_no}
                    </div>
                  </td>
                  <td class="text-center">
                    {data.ccr_item_no__ccc_item_title}
                  </td>
                  <td class="text-center">
                    {data.ccr_item_no__ccc_item_criteria}</td
                  >
                  <td class="text-center">
                    <div>
                      {data?.ccr_item_no__ccc_item_no}
                    </div>
                  </td>
                  <td class="text-center">
                    {data.ccr_item_no__ccc_item_title}
                  </td>
                  <td class="text-center">
                    {data.ccr_item_no__ccc_item_criteria}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <!-- Paginatsiya -->
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
      </article>
    {/if}
  </section>
</main>

<style>
  .menuHeader {
    position: relative;
  }
  .menuHeader img {
    position: absolute;
    right: 0;
    width: 16px;
    cursor: pointer;
  }
  .subplan.selected {
    color: #121efe; /* Change this to your desired color */
    font-weight: bold;
  }
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
  .tableListWrap {
    height: 66vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
  }
  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
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
  .pagination-wrapper {
    margin-top: auto;
    display: flex;
    justify-content: center;
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
</style>
