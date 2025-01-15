<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import {
    allPlanList,
    detailInfoPlan,
    viewPlanResult,
  } from "../../services/store";
  import {
    getPlanDetailInformation,
    getViewPlanResults,
    setDeletePlan,
    setResultChanged,
  } from "../../services/callApi";
  import { confirmDelete, successAlert } from "../../shared/sweetAlert";
  import FistPage from "./FistPage.svelte";
  import SecondPage from "./SecondPage.svelte";
  import DetailOfPlanSub from "./DetailOfPlanSub.svelte";
  let resultData = [];
  let isSectionOpen = {}; // To manage the open/close state of the sections
  export let getPlanList;
  let setView = "plan";
  let currentPage1 = FistPage; // Default sahifa

  // Function to toggle the section (asset category, like UNIX or NETWORK)
  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {}; // Ensure a nested object exists for each itemKey
    }
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey]; // Toggle the section
  }

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

  let activeSubItem = null;
  let plan_index_for_detail = "";
  let currentPage = null;
  let firstDetail = null;
  let plan_index = "";
  let parentIndex = null;

  const toggleAccordion = (index, item) => {
    isOpen[index] = !isOpen[index];
    plan_index = item.ccp_index;
    parentIndex = item.ccp_index;
  };

  /***********************************/

  /*********************************************/

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

  // Funksiyalar orqali komponentlarni tanlash
  const selectPage1 = (page, data) => {
    currentPage1 = page;
    firstMenuData = data;
    // console.log("data1111", firstMenuData);
  };
  async function handleSubItem(data) {
    plan_index_for_detail = data.ccp_index;
    currentPage = DetailOfPlanSub;
    await getPlanDetail();
    console.log("subitem data", data);
    activeSubItem = data;
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
            {#if currentPage === DetailOfPlanSub}
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
        <section class="subTabWrap">
          <a
            style="font-size: 14px; cursor:pointer;"
            class="{setView == 'plan' ? 'active' : ''}"
            on:click="{() => {
              setView = 'plan';
              selectPage1(FistPage);
            }}"
          >
            조치현황 (전체)
          </a>
          <a
            style="font-size: 14px; cursor:pointer;"
            class="{setView == 'plan_accept' ? 'active' : ''}"
            on:click="{() => {
              setView = 'plan_accept';
              selectPage1(SecondPage);
            }}"
          >
            자산취약점비교
          </a>
        </section>
        {#if currentPage1}
          <svelte:component this="{currentPage1}" />
        {/if}
      </article>
    {/if}
  </section>
  <article></article>
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
