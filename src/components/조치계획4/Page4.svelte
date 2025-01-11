<script>
  import { onMount } from "svelte";
  import FirstMenu from "./모든구성요소/FirstMenu.svelte";
  import SecondMenu from "./모든구성요소/SecondMenu.svelte";
  import SwiperPage4 from "./SwiperPage4.svelte";
  import {
    allPlanList,
    fixways,
    userNames,
    vulnAssetList,
  } from "../../services/store";
  import {
    getUserName,
    getVulnsFixWay,
    getVulnsOfAsset,
    setDeletePlan,
  } from "../../services/callApi";
  import { confirmDelete, successAlert } from "../../shared/sweetAlert";
  import { faL } from "@fortawesome/free-solid-svg-icons";
  import SwiperPage4_2 from "./SwiperPage4-2.svelte";
  export let getPlanList;
  // Dinamik o'zgaruvchilar
  let resultVulnsOfPlans = [];
  let setView = "plan";
  let currentPage1 = FirstMenu; // Default sahifa
  let currentPage = null; // Hozirgi komponent
  /**********************************/
  let isSectionOpen = {}; // To manage the open/close state of the sections
  let targetName = "";
  let firstMenuData = [];
  // Function to toggle the section (asset category, like UNIX or NETWORK)
  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {}; // Ensure a nested object exists for each itemKey
    }
    targetName = sectionKey;
    // console.log("targetName", targetName);
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey]; // Toggle the section
  }
  let plan_index = "";
  const toggleAccordion = (index, item) => {
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true; // Open only the selected accordion
    plan_index = item.ccp_index;
    fetchPaginatedData();
  };

  let asset_target_uuid = "";
  let step_vuln = "1";
  let currentPagePagination = "1";
  let itemsPerPage = "99999";
  let search_opt = "";
  let resultVulnsOfAsset = [];
  let totalPages = 0; // Total pages from backend
  export let loading = true;

  async function fetchPaginatedData() {
    try {
      loading = true;
      const response = await getVulnsOfAsset(
        plan_index,
        asset_target_uuid,
        step_vuln,
        currentPagePagination,
        itemsPerPage,
        search_opt
      );

      if (response) {
        console.log("response from funct vulnsasset", response);

        // Filter `plans` to only include data for the selected `plan_index`
        resultVulnsOfPlans = response.CODE.vulns;
        loading = false;
        // Update other data
        resultVulnsOfAsset = response.CODE.asset_asc;
        totalPages = response.totalPages || 1;
        currentPagePagination = response.currentPage || 1;

        vulnAssetList.set(response.CODE.vulns); // Update the store if needed
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
    }
  }
  // $: console.log("resultVulnsOfPlans::", resultVulnsOfPlans);
  $: {
    if (
      (currentPage1 === SecondMenu && step_vuln !== "2") ||
      (currentPage1 === FirstMenu && step_vuln !== "1")
    ) {
      step_vuln = currentPage1 === SecondMenu ? "2" : "1";
      fetchPaginatedData();
    }
  }

  $: console.log("stepvulns:", resultVulnsOfPlans);
  /*************************************************************/
  let selected = [];
  let allSelected = false; // Indicates if all items are selected

  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }

  onMount(() => {
    if ($allPlanList && $allPlanList.length > 0) {
      toggleAccordion(0, $allPlanList[0]); // Open the first plan by default
    }
  });

  // Funksiyalar orqali komponentlarni tanlash
  const selectPage1 = (page, data) => {
    currentPage1 = page;
    firstMenuData = data;

    // console.log("data1111", firstMenuData);
  };

  // Accordion logikasi
  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false);
  export let activeMenu = "신규계획등록";

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
  function closeSwiper() {
    currentPage1 = FirstMenu;
  }
  function closeSwiper2() {
    currentPage1 = SecondMenu;
  }

  async function getuserName() {
    try {
      const response = await getUserName();

      if (response) {
        userNames.set(response.CODE);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }

  async function getfixWays() {
    try {
      const response = await getVulnsFixWay();

      if (response) {
        fixways.set(response.CODE);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  onMount(() => {
    getuserName();
    getfixWays();
  });
  let filterGroup = "";
  let filterOperatorName = "";
  let filterPlanDate = "";
  let filterTarget = "";

  $: results = Object.values(resultVulnsOfPlans)
    .filter((item) => Array.isArray(item) && item[0]?.result)
    .map((item) => item[0].result);

  // Filter results based on targetName and selectedHostname
  $: filteredResults = results.filter((entry) => {
    const matchesTargetName = targetName
      ? entry.cct_index__cct_target === targetName
      : true;
    const matchesHostname = selectedHostname
      ? entry.ast_uuid__ass_uuid__ast_hostname === selectedHostname
      : true;
    return matchesTargetName && matchesHostname;
  });

  // Generate unique operators
  $: uniqueOperators = Array.from(
    new Set(
      filteredResults.map(
        (vulns) => vulns.ast_uuid__ass_uuid__ast_operator_person
      )
    )
  );

  // Generate unique groups
  $: uniqueGroups = Array.from(
    new Set(filteredResults.map((vulns) => vulns.ccr_item_no__ccc_item_group))
  );
  $: uniqueTargets = Array.from(
    new Set(filteredResults.map((plan) => plan.cct_index__cct_target))
  );
  // Reset filters function
  function resetFilters() {
    filterGroup = "";
    filterOperatorName = "";
    filterPlanDate = "";
    filterTarget = "";
  }
</script>

{#if loading}
  <div class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
{:else}
  <main class="table-container">
    <section class="section1">
      <!-- LEFT SIDE -->
      <div class="body_menu">
        <div class="menuContainer">
          <!-- Header -->
          <div>
            <div class="menuHeader">
              {mainTitle}
              {#if currentPage1 === SwiperPage4}
                <img
                  src="assets/images/back.png"
                  alt="back"
                  on:click="{closeSwiper}"
                />
              {:else if currentPage1 === SwiperPage4_2}
                <img
                  src="assets/images/back.png"
                  alt="back"
                  on:click="{closeSwiper2}"
                />
              {/if}
            </div>

            <!-- Accordion -->
            <div class="accordion">
              {#each $allPlanList as item, index}
                <div class="accordion-item">
                  {#if item.ccp_index_parent === 0}
                    <button
                      on:click="{() => {
                        toggleAccordion(index, item);
                      }}"
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
                          class="accordion-content {isOpen[index]
                            ? 'open'
                            : ''}"
                          style="max-height: {isOpen[index] ? '100%' : '0px'}"
                        >
                          {#if item.asset && typeof item.asset === "object"}
                            {#each Object.entries(item.asset) as [targetName, targetData]}
                              <p
                                on:click="{() => {
                                  toggleSection(index, targetName);
                                }}"
                                class="{isSectionOpen[index]?.[targetName]
                                  ? 'active'
                                  : ''}"
                              >
                                {targetName}
                              </p>
                              <!-- This will display UNIX, NETWORK, etc. -->

                              {#if targetData && targetData.length > 0}
                                <ul
                                  class="sublist {isSectionOpen[index]?.[
                                    targetName
                                  ]
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
                                      on:click="{() => {
                                        activeMenu = subItem;
                                        handleClickHostname(subItem); // Set selected hostname
                                      }}"
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
                      {#each $allPlanList as subItem}
                        {#if subItem.ccp_index_parent === item.ccp_index}
                          <p
                            title="{subItem.ccp_title}"
                            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                            class="subplan"
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

    <!-- RIGHT SIDE -->
    <section class="section2">
      <!-- Dinamik sahifa -->
      {#if currentPage}
        <svelte:component this="{currentPage}" />
      {:else}
        <article class="contentArea">
          <section class="filterWrap" style="margin-bottom: 0px;">
            <div>
              <select bind:value="{filterTarget}">
                <option value="" selected>점검대상체계</option>
                <option value="UNIX">UNIX</option>
                <option value="WINDOWS">WINDOWS</option>
                <option value="NETWORK">NETWORK</option>
                <option value="SECURITY">SECURITY</option>
                <option value="WEB">WEB</option>
                <option value="DBMS">DBMS</option>
              </select>

              <input
                bind:value="{filterPlanDate}"
                style="    height: 28px;
              font-size: 12px;"
                type="date"
              />
              <select bind:value="{filterOperatorName}">
                <option value="점검관" selected>점검관</option>
                {#each uniqueOperators as operator}
                  <option value="{operator}">{operator}</option>
                {/each}
              </select>

              <!-- Group Filter Dropdown -->
              <select id="result" bind:value="{filterGroup}">
                <option value="" selected>점검구분</option>
                {#each uniqueGroups as group}
                  <option value="{group}">{group}</option>
                {/each}
              </select>

              <button
                on:click="{resetFilters}"
                class="btn btnSearch"
                style="width: 98px; font-size: 14px;"
                ><img
                  src="assets/images/reset.png"
                  alt="search"
                />초기화</button
              >
            </div>
          </section>

          <section class="subTabWrap">
            <a
              style="font-size: 14px;"
              class="{setView == 'plan' ? 'active' : ''}"
              on:click="{() => {
                setView = 'plan';
                selectPage1(FirstMenu);
              }}"
            >
              조치계획등록
            </a>
            <a
              style="font-size: 14px;"
              class="{setView == 'plan_accept' ? 'active' : ''}"
              on:click="{() => {
                setView = 'plan_accept';
                selectPage1(SecondMenu);
              }}"
            >
              조치계획승인
            </a>
          </section>
          {#if currentPage1}
            <svelte:component
              this="{currentPage1}"
              bind:resultVulnsOfPlans
              {targetName}
              bind:resultVulnsOfAsset
              {currentPage1}
              {selectedHostname}
              {selectPage1}
              {firstMenuData}
              {fetchPaginatedData}
              {filterGroup}
              {filterOperatorName}
              {filterPlanDate}
              {filterTarget}
            />
          {/if}
        </article>
      {/if}
    </section>
  </main>
{/if}

<style>
  /* Show the tooltip when hovering over the parent paragraph */
  .subplan:hover .tooltip {
    visibility: visible; /* Show tooltip */
    opacity: 1; /* Fade in the tooltip */
  }

  .subplan {
    margin-left: 2rem; /* Indent for subplans */
    font-size: 0.9rem;
    color: gray;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(167, 167, 167, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure it sits above other content */
  }

  .loading-spinner {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  /* Spinner animation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .menuHeader {
    position: relative;
  }
  .menuHeader img {
    position: absolute;
    right: 0;
    width: 16px;
    cursor: pointer;
  }
  .table-container {
    /* overflow-y: auto; */
    border-radius: 10px;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: row;
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

  .subTabWrap {
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
