<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import { allPlanList } from "../../services/store";
  import {
    getPlanDetailInformation,
    getPlanLists,
    setDeletePlan,
  } from "../../services/callApi";
  import DetailOfSubPlan8 from "./DetailOfSubPlan8.svelte";
  import { confirmDelete, successAlert } from "../../shared/sweetAlert";
  let resultData = [];
  let currentPage = null;
  let planList = [];
  export let getPlanList;
  onMount(async () => {
    try {
      planList = await getPlanList();
    } catch (err) {}
  });

  for (let i = 0; i < 50; i++) {
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

  let isSectionOpen = {};
  let activeSubItem = null;
  let parentIndex = null;

  const toggleAccordion = async (index, item) => {
    // Reset all states when a new plan is selected
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true;
    isOpen = [...isOpen]; // Trigger reactivity by creating a new array

    isSectionOpen = {}; // Clear open sections

    plan_index = item.ccp_index;
    parentIndex = item.ccp_index;
    console.log("parent index,", parentIndex);
  };
  let plan_index_for_detail = null;
  async function handleSubItem(data) {
    activeSubItem = data;
    currentPage = DetailOfSubPlan8;
    plan_index_for_detail = data.ccp_index;

    await getPlanDetail();
  }
  function closeSwiper() {
    currentPage = null;
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
  let plan_index = "";
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
            {#if currentPage === DetailOfSubPlan8}
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
            <select style="width: 200px;">
              <option value="" selected disabled>프로젝트</option>
              {#each $allPlanList as plan}
                <option value="{plan.ccp_index}">{plan.ccp_title}</option>
              {/each}
            </select>

            <button class="btn btnSearch" style="width: 98px; font-size: 14px;"
              ><img src="assets/images/reset.png" alt="search" />초기화</button
            >
          </div>
        </section>
        <table style="width: 60%;">
          <colgroup>
            <col style="width: 60px;" />
            <col style="width:83%" />
          </colgroup>
          <tr style="position: sticky;top: -1px;">
            <th
              class="center-align"
              style="color: black;font-weight:bold;background: #F7FAFC; border-radius:4px;padding:10px; font-size:12px;"
              >구분</th
            >
            <th
              class="center-align"
              style="border-radius:4px; color: black; font-weight:bold; background: #F7FAFC; padding:10px; font-size:12px;"
              >다운로드 링크
            </th>
          </tr>
          <tbody>
            <tr>
              <th class="center-align">이동식 점검 모듈 </th>
              <td class="line-height">
                <ul>
                  <li>
                    <a href="#">유닉스/리눅스 점검 프로그램 </a>
                  </li>
                  <li>
                    <a href="#">윈도우 서버 점검 프로그램 </a>
                  </li>
                  <li>
                    <a href="#">윈도우 PC 점검 프로그램 </a>
                  </li>
                  <li>
                    <a href="#">수작업 점검을 위한 엑셀 파일 </a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th class="center-align">에이전트 명령 등록 </th>
              <td class="line-height">
                <ul>
                  <li><a href="">점검 명령 등록을 위한 엑셀 파일 </a></li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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
  .subplan {
    cursor: pointer;
  }
  .table-container {
    /* overflow-y: auto; */
    border-radius: 10px;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: row;
  }
  a {
    color: #333333;
    font-size: 12px;
  }
  th {
    font-size: 12px;
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
</style>
