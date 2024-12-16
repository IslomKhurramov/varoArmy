<script>
    import moment from "moment";
    
    // Hardcoded data for logData
    let resultData = [];


for (let i = 0; i < 20; i++) {
  resultData.push({
    ast_uuid__ass_uuid__ast_hostname: "NETWORK",
    ccr_item_no__ccc_item_no: "AAAA",
    ccr_item_no__ccc_item_item: "NW-06",
    ccr_item_no__ccc_item_title: "SETUID..",
    ccr_item_no__ccc_item_criteria: "취약",
    ccr_item_no__ccc_item_result: "조치승인",
  });
}


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
            {#each resultData as data, index}
              <tr>
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
                  {data.ccr_item_no__ccc_item_item}
                </td>
                <td> {data.ccr_item_no__ccc_item_title}</td>
                <td class="text-center"
                  >{data.ccr_item_no__ccc_item_criteria}
                </td>
                <td class="text-center"
                  >{data.ccr_item_no__ccc_item_result}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
    </div>

    <div class="pagination-wrapper">
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
    </div>
</div>


<style>
    .first_nenu{
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
      height: 60vh;
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
    margin-top: 20px;
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
  