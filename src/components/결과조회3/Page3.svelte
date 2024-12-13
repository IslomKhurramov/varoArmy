<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import Swiper from "./Swiper.svelte";
  import { allPlanList, viewPlanResult } from "../../services/store";
  import { getViewPlanResults, setResultChanged } from "../../services/callApi";
  import ModalPopDetail from "./ModalPopDetail.svelte";
  import { successAlert } from "../../shared/sweetAlert";
  let resultData = [];

  for (let i = 0; i < 50; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "NW-06",
      ccr_item_no__ccc_item_title: "Session Timeout 설정",
      ccr_item_no__ccc_item_criteria: "홍길동 드라이브가 ..",
    });
  }
  /**********************************LEFT SIDE******/
  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false); // Har bir accordion uchun ochiq/yopiq holat
  export let activeMenu = "신규계획등록";

  let mainItems = [
    {
      title: "24 교육사 국방정보체계 취약점",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "23 교육사 국방정보체계 취약점",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "22 교육사 국방체계 정기점검",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "24 교육사 국방정보체계 취약점",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "24 교육사 국방정보체계 취약점",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "23 교육사 국방정보체계 취약점",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "22 교육사 국방체계 정기점검",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
    {
      title: "24 교육사 국방정보체계 취약점",
      subItems: [
        { title: "--'21 교육사 정기점검1차" },
        { title: "--'21 교육사 정기점검2차" },
        { title: "--'21 교육사 정기점검3차" },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    isOpen[index] = !isOpen[index];
  };
  let currentPage = null;
  function selectPage() {
    currentPage = Swiper;
  }
  /***********************************/
  let closeShowModalDetail = false;
  const validOptions = ["양호", "취약", "인터뷰", "수동점검"];

  let planIndex = "";
  let target = "";
  let hostName = "";
  let checkList_item_no = "";
  let check_result = "";
  let show_option = "";
  async function viewPlanResultFunction() {
    try {
      const response = await getViewPlanResults(
        planIndex,
        target,
        hostName,
        checkList_item_no,
        check_result,
        show_option
      );

      if (response) {
        viewPlanResult.set(response.CODE);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }

  /*********************************************/
  let result_index = null;
  let checklist_index = "";

  function handleUpdateClick(data) {
    result_index = data.ccr_index;
  }

  async function resultUpdate() {
    try {
      const response = await setResultChanged(
        planIndex,
        result_index,
        checklist_index,
        check_result,
        show_option
      );

      if (response.RESULT === "OK") {
        console.log("response", response);
        successAlert(response.CODE);
        viewPlanResultFunction();
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  $: console.log("viewPlanResult", $viewPlanResult);
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
    closeShowModalDetail = true; // Open the modal
  }
  $: console.log("selectedData", selectedData);
  /**************PAGINATION*/
  let currentPagePagination = 1; // Current page number
  let itemsPerPage = 100; // Items per page

  // Calculate the start and end index of items for the current page
  $: startIndex = (currentPagePagination - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

  // Slice the data for the current page
  $: paginatedData = $viewPlanResult.slice(startIndex, endIndex);

  // Calculate total pages
  $: totalPages = Math.ceil($viewPlanResult.length / itemsPerPage);

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
            {#each mainItems as item, index}
              <div class="accordion-item">
                <button
                  on:click="{() => toggleAccordion(index)}"
                  class="accordion-header {isOpen[index] ? 'active' : ''}"
                >
                  {item.title}
                </button>
                <div
                  class="accordion-content {isOpen[index] ? 'open' : ''}"
                  style="max-height: {isOpen[index] ? '150px' : '0px'}"
                >
                  <ul>
                    {#each item.subItems as subItem}
                      <li
                        on:click="{() => {
                          (activeMenu = subItem.title), selectPage();
                        }}"
                      >
                        {subItem.title}
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button>복사</button>
          <button>삭제</button>
          <button>EXCEL</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section2">
    {#if currentPage}
      <svelte:component this="{currentPage}" />
    {:else}
      <article class="contentArea">
        <section class="filterWrap">
          <div>
            <select
              bind:value="{planIndex}"
              on:change="{viewPlanResultFunction}"
            >
              <option value="" selected disabled>프로젝트</option>
              {#each $allPlanList as plan}
                <option value="{plan.ccp_index}">{plan.ccp_title}</option>
              {/each}
            </select>
            <select bind:value="{target}" on:change="{viewPlanResultFunction}">
              <option value="" selected>점검대상</option>
              <option value="UNIX">UNIX</option>
              <option value="WINDOWS">WINDOWS</option>
              <option value="PC">PC</option>
              <option value="NETWORK">NETWORK</option>
              <option value="DBMS">DBMS</option>
              <option value="WEB">WEB</option>
              <option value="WAS">WAS</option>
              <option value="CLOUD">CLOUD</option>
              <option value="SECURITY">SECURITY</option>
            </select>

            <select
              bind:value="{hostName}"
              on:change="{viewPlanResultFunction}"
            >
              <option value="" selected>호스트</option>
              <option value="호스트">호스트</option>
            </select>
            <select
              bind:value="{check_result}"
              on:change="{viewPlanResultFunction}"
            >
              <option value="" selected>점검항목</option>
              <option value="양호">양호</option>
              <option value="취약">취약</option>
              <option value="인터뷰">인터뷰</option>
              <option value="인터뷰">수동점검</option>
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
              <col style="width: 30%;" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">점검대상 </th>
                <th class="text-center">점검항목 </th>
                <th class="text-center">점검이름</th>
                <th class="text-center">점검결과</th>
                <th class="text-center">점검결과 </th>
              </tr>
            </thead>
            <tbody>
              {#each paginatedData as data, index}
                <tr on:click="{() => handleRowClick(data)}">
                  <!-- 번호: Reverse index to display latest first -->
                  <td class="text-center"
                    >{$viewPlanResult.length - (startIndex + index)}</td
                  >
                  <!-- 점검대상: ast_uuid__ass_uuid__ast_hostname -->
                  <td class="text-center">
                    {data?.ast_uuid__ass_uuid__ast_hostname || "N/A"}
                  </td>

                  <!-- 점검항목: ccr_item_no__ccc_item_no -->
                  <td class="text-center">
                    <div>
                      {data?.ccr_item_no__ccc_item_no || "N/A"}
                    </div>
                  </td>

                  <!-- 점검이름: ccr_item_no__ccc_item_title -->
                  <td>
                    {data?.ccr_item_no__ccc_item_title || "N/A"}
                  </td>

                  <!-- 점검결과: ccr_item_no__ccc_item_criteria -->
                  <td>
                    {@html data?.ccr_item_no__ccc_item_criteria.replace(
                      /\n/g,
                      "<br/>"
                    ) || "N/A"}
                  </td>

                  <!-- 점검결과 (Actions): -->
                  <td class="text-center">
                    <div class="lastBox">
                      <select
                        style="width: 100px;"
                        class="xs"
                        on:click|stopPropagation="{() =>
                          handleUpdateClick(data)}"
                      >
                        {#each validOptions as option}
                          <option
                            value="{option}"
                            selected="{data.ccr_item_result === option}"
                          >
                            {option}
                          </option>
                        {/each}
                      </select>
                      <input
                        type="text"
                        class="inputDefault"
                        placeholder="사유"
                      />

                      <button
                        class="btnSave"
                        on:click|stopPropagation="{resultUpdate}">저장</button
                      >
                      <button class="btnUpload">관련시스템보기</button>
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
        <div class="last_button">
          <button class="btn btnSave">변경내역이력조회 </button>
        </div>
      </article>
    {/if}
  </section>
</main>
{#if closeShowModalDetail}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="modal-open-wrap"
    on:click="{() => (closeShowModalDetail = false)}"
    on:keydown="{handleKeyDown}"
    tabindex="0"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog
      open
      on:close="{() => (closeShowModalDetail = false)}"
      on:click|stopPropagation
    >
      <ModalPopDetail {closeShowModal} {selectedData} />
    </dialog>
  </div>
{/if}

<style>
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
    height: 66vh;
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
