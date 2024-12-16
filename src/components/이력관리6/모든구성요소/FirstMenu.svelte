<script>
    import moment from "moment";

    let error = null;
    let loading = true;
    let displayedPages = [];
    
    // Hardcoded data for logData
    let logData = [
    {
        plan_title: "P240724001",
        plan_period: "조치 U-02 승인",
        inspection_type: "정기점검",
        start_data: "2024-01-01",
        registration_date: "2024-01-01 12:12:10",
        execution_department: "홍길동",
        registrant: "홍길동",
    },
    {
        plan_title: "P240724001",
        plan_period: "조치 U-01 승인",
        inspection_type: "긴급점검",
        start_data: "2024-01-01",
        registration_date: "2024-08-30",
        execution_department: "홍길동",
        registrant: "김길동",
    },
    {
        plan_title: "P240724001",
        plan_period: "조치 U-02 승인",
        inspection_type: "긴급점검",
        start_data: "2024-01-01",
        registration_date: "2024-01-01",
        execution_department: "홍길동",
        registrant: "김길동",
    },
    {
        plan_title: "P240724001",
        plan_period: "조치 U-02 승인",
        inspection_type: "정기점검",
        start_data: "2024-01-01",
        registration_date: "2025-01-01",
        execution_department: "홍길동",
        registrant: "박길동",
    },
    {
        plan_title: "P240724001",
        plan_period: "조치 U-02 승인",
        inspection_type: "긴급점검",
        start_data: "2024-01-01",
        registration_date: "2025-02-28",
        execution_department: "홍길동",
        registrant: "최길동",
    },
    {
        plan_title: "P240724001",
        plan_period: "조치 U-02 승인",
        inspection_type: "긴급점검",
        start_data: "2024-01-01",
        registration_date: "2025-03-10",
        execution_department: "홍길동",
        registrant: "이길동",
    },
];


  // Dinamik o'zgaruvchilar
  let resultData = [];
  let setView = "plan";
  let currentPage = null; // Hozirgi komponent


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
  let totalItems1 = logData.length;
  let totalPages = Math.ceil(totalItems1 / itemsPerPage);

  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }
</script>

<main class="table-container">
    <div class="tableListWrap">
      <table class="tableList hdBorder">
        <colgroup>
          <col style="width:5%;" />
          <col style="width:10%;" />
          <col style="width:15%;" />
          <col style="width:8%;" />
          <col style="width:8%;" />
          <col style="width:8%;" />
          <col style="width:15%;" />
        </colgroup>
        <thead>
          <tr>
            <th class="text-center">순번</th>
            <th class="text-center">점검식별자</th>
            <th class="text-center">명령구분</th>
            <th class="text-center">변경전</th>
            <th class="text-center">변경후</th>
            <th class="text-center">수행자</th>
            <th class="text-center">갱신일자</th>
          </tr>
        </thead>
        <tbody>
          {#each logData as data, index}
            <tr>
              <td class="text-center">
                {totalItems1 - ((currentPage - 1) * itemsPerPage + index)}
              </td>
              <td class="text-center">{data.plan_title || "N/A"}</td>
              <td class="text-center">{data.plan_period}</td>
              <td class="text-center">{data.start_data || "N/A"}</td>
              <td class="text-center">
                {moment(data.registration_date).format("YYYY.MM.DD") || "N/A"}
              </td>
              <td class="text-center">{data.execution_department || "N/A"}</td>
              <td class="text-center">
                {moment(data.registration_date).format("YYYY.MM.DD HH:mm:ss") || "N/A"}
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
</main>
  
  <style>
    * {
      font-size: 14px;
    }
  
    .table-container {
      display: flex;
      flex-direction: column;
      height: 70vh;
    }
  
    .tableListWrap {
      overflow-y: auto;
      max-height: 70vh;
      padding: 0 20px 20px 20px;
    }
  
    thead {
      position: sticky;
      top: 0;
      z-index: 10;
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
  
    table th {
      font-weight: bold;
    }
  
    table th,
    table td {
      padding: 10px;
      font-size: 12px;
    }
  
    table tbody tr:hover td {
      background-color: #f5f5f5;
      cursor: pointer;
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
  