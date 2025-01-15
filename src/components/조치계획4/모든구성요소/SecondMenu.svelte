<script>
  import { setFixApprove } from "../../../services/callApi";
  import { successAlert } from "../../../shared/sweetAlert";
  import SwiperPage4_2 from "../SwiperPage4-2.svelte";
  import SwiperPage4 from "../SwiperPage4.svelte";

  export let resultVulnsOfPlans;
  export let targetName;
  export let selectedHostname;
  export let selectPage1;
  export let filterGroup;
  export let filterOperatorName;
  export let filterPlanDate;
  export let filterTarget;
  let registerfilter = "2";
  let filterInspectionResult = "";

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
    const matchesRegister =
      registerfilter !== null
        ? entry.cfi_fix_status__cvs_index === Number(registerfilter)
        : true;
    const matchesPlanDate = filterPlanDate
      ? new Date(entry.ast_uuid__ass_uuid__ast_lastconnect)
          .toISOString()
          .startsWith(filterPlanDate)
      : true;
    const matchesTarget = filterTarget
      ? entry.cct_index__cct_target === filterTarget
      : true;

    // // Add a new filter for ccr_item_result based on selected filter
    // const matchesInspectionResult =
    //   filterInspectionResult && filterInspectionResult !== "미결정"
    //     ? (filterInspectionResult === "승인" &&
    //         entry.ccr_item_result === "양호") ||
    //       (filterInspectionResult === "반려" &&
    //         entry.ccr_item_result === "취약")
    //     : true;

    // Combine all filter conditions
    return (
      matchesTargetName &&
      matchesHostname &&
      matchesGroup &&
      matchesOperatorName &&
      matchesPlanDate &&
      matchesTarget &&
      matchesRegister
      // matchesInspectionResult
    );
  });

  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 20; // Items per page

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

  let approved = "1";
  let unApprove = "0";
  let approved_comment = "";
  async function fixApprovePlan(entry) {
    try {
      // Wrap entry.ccr_index in an array
      const ccrIndexArray = Array.isArray(entry.ccr_index)
        ? entry.ccr_index
        : [entry.ccr_index];

      const response = await setFixApprove(
        entry.ast_uuid,
        entry.ccp_index,
        approved,
        ccrIndexArray, // Pass the array here
        approved_comment
      );

      console.log("response page4 ", response.CODE);

      if (response.RESULT === "OK") {
        successAlert(`${response}`);
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
    }
  }

  async function fixUnApprovePlan() {
    try {
      const ccrIndexArray = Array.isArray(entry.ccr_index)
        ? entry.ccr_index
        : [entry.ccr_index];
      const response = await setFixApprove(
        entry.ast_uuid,
        entry.ccp_index,
        unApprove,
        ccrIndexArray,
        approved_comment
      );
      console.log("response page4 ", response);
      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
    }
  }
  let allSelected = false; // Indicates if all items are selected
  let selected = [];
  let ccg_index_id = "";
  let ccc_index = [];
  let ast_uuidd = "";
  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }
  $: if (selected.length > 0) {
    ccg_index_id = selected[0].ccp_index; // Assuming all rows share the same ccg_index_id
    ccc_index = selected.map((item) => item.ccr_index); // Extract ccc_index values
    ast_uuidd = selected[0].ast_uuid;
  } else {
    ccg_index_id = "";
    ccc_index = [];
  }
  $: console.log("selected", selected);
  $: console.log("ccg_index_id:", ccg_index_id, "ccc_index:", ccc_index);

  async function fixApprovePlanAll() {
    try {
      // Wrap entry.ccr_index in an array

      const response = await setFixApprove(
        ast_uuidd,
        ccg_index_id,
        approved,
        ccc_index, // Pass the array here
        approved_comment
      );

      console.log("response page4 ", response.CODE);

      if (response.RESULT === "OK") {
        successAlert(`${response}`);
        selected = [];
        ccg_index_id = "";
        ccc_index = [];
        allSelected = false;
        let ast_uuidd = "";
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
    }
  }

  async function fixUnApprovePlanAll() {
    try {
      const response = await setFixApprove(
        ast_uuidd,
        ccg_index_id,
        approved,
        ccc_index, // Pass the array here
        approved_comment
      );
      console.log("response page4 ", response);
      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        selected = [];
        ccg_index_id = "";
        ccc_index = [];
        allSelected = false;
        let ast_uuidd = "";
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
    }
  }
</script>

<div class="first_nenu">
  <div class="last_button">
    <select bind:value="{registerfilter}">
      <option value="0">미등록</option>
      <option value="2" selected>조치예정</option>
    </select>
    <select bind:value="{filterInspectionResult}">
      <option value="승인">승인</option>
      <option value="반려">반려</option>
      <option value="미결정">미결정</option>
    </select>
  </div>

  <div class="tableListWrap">
    <table class="tableList hdBorder">
      <colgroup>
        <col style="width: 50px;" />

        <col style="width:90px;" />
        <col style="width:170px" />
        <col style="width:140px" />
        <col style="width: 200px;" />
        <col />
        <col style="width: 160px;" />
        <col style="width: 270px;" />
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
          <th class="text-center">점검분야</th>
          <th class="text-center">자산명</th>
          <th class="text-center">점검항목</th>
          <th class="text-center">점검명</th>
          <th class="text-center">처리유형</th>
          <th class="text-center">비고</th>
        </tr>
      </thead>
      <tbody>
        {#each paginatedData as entry, index}
          <tr on:click="{() => selectPage1(SwiperPage4_2, entry)}">
            <td on:click|stopPropagation class="text-center">
              <input
                type="checkbox"
                bind:group="{selected}"
                value="{entry}"
                name="{entry}"
              /></td
            >
            <td class="text-center">{startIndex + index + 1}</td>
            <!-- Adjust numbering -->
            <td class="text-center">{entry.cct_index__cct_target || "N/A"}</td>
            <td class="text-center"
              >{entry.ast_uuid__ass_uuid__ast_hostname || "N/A"}</td
            >
            <td class="text-center"
              >{entry.ccr_item_no__ccc_item_no || "N/A"}</td
            >
            <td>{entry.ccr_item_no__ccc_item_title || "N/A"}</td>
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
            <td class="text-center">
              <div>
                <button
                  class="btnSave"
                  on:click="{(event) => {
                    event.stopPropagation();
                    fixApprovePlan(entry);
                  }}"
                >
                  승인
                </button>
                <button
                  class="btnSave"
                  on:click="{(event) => {
                    event.stopPropagation();
                    fixUnApprovePlan(entry);
                  }}"
                >
                  반려
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div style="width: 100%; display:flex; justify-content:flex-end;">
    <div class="lastButtons">
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
        {#each Array(paginationEnd - paginationStart + 1).fill(0) as _, pageIndex}
          <button
            class:selected="{currentPagePagination ===
              paginationStart + pageIndex}"
            on:click="{() => goToPage(paginationStart + pageIndex)}"
          >
            {paginationStart + pageIndex}
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
      <div style="display: flex; gap:10px;">
        <button class="btn btnSave" on:click="{fixApprovePlanAll}"
          >선택항목승인</button
        >
        <button class="btn btnSave" on:click="{fixUnApprovePlanAll}"
          >선택항목반려</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .btn {
    width: 120px;
    font-size: 14px;
  }
  .lastButtons button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
  .lastButtons {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .first_nenu {
    margin-top: 10px;
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
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
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
