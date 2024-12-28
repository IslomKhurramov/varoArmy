<script>
  import moment from "moment";
  import SwiperPage5 from "../SwiperPage5.svelte";

  // Hardcoded data for logData
  export let targetName;
  export let resultVulnsOfPlans;
  export let selectedHostname;
  export let selectPage1;

  export let filterGroup;
  export let filterOperatorName;
  export let filterPlanDate;
  export let filterTarget;

  let results = Object.values(resultVulnsOfPlans)
    .filter((item) => Array.isArray(item) && item[0]?.result)
    .map((item) => item[0].result);

  // Filter results based on targetName, selectedHostname, and other filters
  $: filteredResults = results.filter((entry) => {
    const matchesTargetName = targetName
      ? entry.cct_index__cct_target === targetName
      : true;
    const matchesHostname = selectedHostname
      ? entry.ast_uuid__ass_uuid__ast_hostname === selectedHostname
      : true;
    const matchesGroup = filterGroup
      ? entry.ccr_item_no__ccc_item_group === filterGroup
      : true;
    const matchesOperatorName = filterOperatorName
      ? entry.ast_uuid__ass_uuid__ast_operator_person === filterOperatorName
      : true;
    const matchesPlanDate = filterPlanDate
      ? new Date(entry.ast_uuid__ass_uuid__ast_lastconnect)
          .toISOString()
          .startsWith(filterPlanDate)
      : true;
    const matchesTarget = filterTarget
      ? entry.cct_index__cct_target === filterTarget
      : true;

    // Combine all filter conditions
    return (
      matchesTargetName &&
      matchesHostname &&
      matchesGroup &&
      matchesOperatorName &&
      matchesPlanDate &&
      matchesTarget
    );
  });

  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 20; // Items per page

  let selectedTargetData = [];
  let selectedTarget = [];
  function handleClickTarget(targetData, item) {
    selectedTargetData = targetData;
    selectedTarget = item;
    // console.log("targetData", selectedTargetData);
  }
  // Calculate the start and end index of items for the current page
  $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

  // Calculate total pages
  $: totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  // Dynamic range for pagination numbers
  const maxButtons = 10; // Maximum number of visible page buttons
  let paginationStart, paginationEnd;

  // Calculate visible page range
  $: {
    // Calculate the start and end of pagination buttons to show
    paginationStart = Math.max(
      1,
      currentPagePagination - Math.floor(maxButtons / 2)
    );
    paginationEnd = Math.min(totalPages, paginationStart + maxButtons - 1);

    // Adjust paginationStart to ensure we don't go beyond the total number of pages
    if (
      paginationEnd - paginationStart + 1 < maxButtons &&
      totalPages > maxButtons
    ) {
      paginationStart = paginationEnd - maxButtons + 1;
    }
  }

  // Function to handle page change
  function goToPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      currentPagePagination = pageNumber;
    }
  }

  // Slice the data for the current page
  $: paginatedData = filteredResults.slice(startIndex, endIndex);

  /*************************************************************/
  let selected = [];
  let allSelected = false;

  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }
</script>

<div class="first_nenu">
  <div class="last_button">
    <select>
      <option value="미등록" selected>조치승인</option>
      <option value="조치예정">조치반려</option>
    </select>
    <select>
      <option
        value="10줄
        "
        selected
        >10줄
      </option>
      <option
        value="20줄
        "
        >20줄
      </option>
      <option
        value="30줄
      "
        >30줄
      </option>
      <option
        value="40줄
    "
        >40줄
      </option>
      <option
        value="50줄
  "
        >50줄
      </option>
      <option
        value="60줄
"
        >60줄
      </option>
    </select>
  </div>

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
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="text-center">점검분야 </th>
          <th class="text-center">자산명 </th>
          <th class="text-center">점검항목</th>
          <th class="text-center">점검명</th>
          <th class="text-center">점검결과 </th>
          <th class="text-center">처리유형 </th>
        </tr>
      </thead>
      <tbody>
        {#if paginatedData.length > 0}
          {#each paginatedData as entry, index}
            <tr on:click={() => selectPage1(SwiperPage5, entry)}>
              <td class="text-center">{startIndex + index + 1}</td>
              <!-- Adjust numbering -->
              <td class="text-center">{entry.cct_index__cct_target || "N/A"}</td
              >
              <td class="text-center"
                >{entry.ast_uuid__ass_uuid__ast_hostname || "N/A"}</td
              >
              <td class="text-center"
                >{entry.ccr_item_no__ccc_item_no || "N/A"}</td
              >
              <td class="text-center"
                >{entry.ccr_item_no__ccc_item_title || "N/A"}</td
              >
              <td class="text-center">{entry.ccr_item_result || "N/A"}</td>
              <td class="text-center">
                {#if entry.ccr_item_result === "취약"}
                  조치예정
                {:else if entry.ccr_item_result === "양호"}
                  조치완료
                {:else if entry.ccr_item_result === "예외"}
                  예외처리
                {:else}
                  관리적조치
                {/if}
              </td>
            </tr>
          {/each}
        {:else}
          <td class="text-center" colspan="7">데이터 없음 </td>
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="pagination">
    <!-- First Page Button -->
    <button on:click={() => goToPage(1)} disabled={currentPagePagination === 1}>
      {"<<"}
    </button>

    <!-- Previous Page Button -->
    <button
      on:click={() => goToPage(currentPagePagination - 1)}
      disabled={currentPagePagination === 1}
    >
      {"<"}
    </button>

    <!-- Visible Page Buttons -->
    {#each Array(paginationEnd - paginationStart + 1).fill(0) as _, pageIndex}
      <button
        class:selected={currentPagePagination === paginationStart + pageIndex}
        on:click={() => goToPage(paginationStart + pageIndex)}
      >
        {paginationStart + pageIndex}
      </button>
    {/each}

    <!-- Next Page Button -->
    <button
      on:click={() => goToPage(currentPagePagination + 1)}
      disabled={currentPagePagination === totalPages}
    >
      {">"}
    </button>

    <!-- Last Page Button -->
    <button
      on:click={() => goToPage(totalPages)}
      disabled={currentPagePagination === totalPages}
    >
      {">>"}
    </button>
  </div>
</div>

<style>
  .first_nenu {
    margin-top: 10px;
    /* display: flex;
      flex-direction: column;
      height: 70vh; */
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

  .last_button {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
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
