<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import { confirmDelete, successAlert } from "../../shared/sweetAlert";
  import { setDeletePlan } from "../../services/callApi";
  import { allPlanList } from "../../services/store";
  let resultData = [];

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

  let plan_index = "";
  const toggleAccordion = (index, item) => {
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true; // Open only the selected accordion
    plan_index = item.ccp_index;
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
            {#each $allPlanList as item, index}
              <div class="accordion-item">
                <button
                  on:click={() => {
                    toggleAccordion(index, item); // Direct function call in Svelte
                  }}
                  class="accordion-header {isOpen[index] ? 'active' : ''}"
                >
                  {item.ccp_title}
                  <!-- ccp_title will be displayed here -->
                </button>

                <div
                  class="accordion-content {isOpen[index] ? 'open' : ''}"
                  style="max-height: {isOpen[index] ? '100%' : '0px'}"
                >
                  <ul>
                    <div
                      class="accordion-content {isOpen[index] ? 'open' : ''}"
                      style="max-height: {isOpen[index] ? '100%' : '0px'}"
                    >
                      {#if item.asset && typeof item.asset === "object"}
                        {#each Object.entries(item.asset) as [targetName, targetData]}
                          <p
                            on:click={() => {
                              toggleSection(index, targetName);
                            }}
                            class={isSectionOpen[index]?.[targetName]
                              ? "active"
                              : ""}
                          >
                            {targetName}
                          </p>
                          <!-- This will display UNIX, NETWORK, etc. -->

                          {#if targetData && targetData.length > 0}
                            <ul
                              class="sublist {isSectionOpen[index]?.[targetName]
                                ? 'open'
                                : ''}"
                              style="max-height: {isSectionOpen[index]?.[
                                targetName
                              ]
                                ? '100%'
                                : '0px'}"
                            >
                              {#each targetData as subItem}
                                <li
                                  on:click={() => {
                                    activeMenu = subItem;
                                    handleClickHostname(subItem); // Set selected hostname
                                  }}
                                >
                                  <strong>{subItem.hostname}</strong>
                                  <!-- Display the hostname -->
                                </li>
                              {/each}
                            </ul>
                          {/if}
                        {/each}
                      {:else}
                        <li>No assets available</li>
                        <!-- In case there are no assets -->
                      {/if}
                    </div>
                  </ul>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button>복사</button>
          <button on:click={deletePlan}>삭제</button>
          <button>EXCEL</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section2">
    <article class="contentArea">
      <section class="filterWrap">
        <div>
          <select>
            <option value="" selected disabled>점검계획명</option>

            <option value={"점검계획명"}>점검계획명</option>
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
            {#each resultData as data, index}
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
    </article>
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
</style>
