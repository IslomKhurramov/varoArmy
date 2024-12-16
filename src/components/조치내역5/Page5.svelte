<script>
  import { onMount } from "svelte";
  import SwiperPage5 from "./SwiperPage5.svelte";
  import FirstMenu from "./모든구성요소/FirstMenu.svelte";
  import SeconMenu from "./모든구성요소/SeconMenu.svelte";

  // Dinamik o'zgaruvchilar
  let resultData = [];
  let setView = "plan";
  let currentPage1 = FirstMenu; // Default sahifa
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
  let ccg_index_id = "";
  let ccc_index = [];

  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }


  // Funksiyalar orqali komponentlarni tanlash
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
  ];

  // Accordion ochish/qayta yopish
  const toggleAccordion = (index) => {
    isOpen[index] = !isOpen[index];
  };

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

  <!-- RIGHT SIDE -->
  <section class="section2">
    <!-- Dinamik sahifa -->
    {#if currentPage}
      <svelte:component this="{currentPage}" />
    {:else}

    <article class="contentArea">
        <section class="filterWrap" style="margin-bottom: 0px;">
          <div>
            <select>
              <option value="" selected>점검대상체계</option>
  
              <option value="{'점검대상체계'}">점검대상체계</option>
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
          class={setView == "plan" ? "active" : ""}
          on:click={() => {
            setView = "plan";
            selectPage1(FirstMenu);
          }}
          >
          조치계획등록
          </a>
          <a
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

  .contentArea {
    position: relative;
  }

  .subTabWrap{
    position: absolute;
    top: 60px;
    left: 20px;
  }

  .subTabWrap a {
    cursor: pointer;
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
