<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import FirstMenu from "./모든구성요소/FirstMenu.svelte";
  import SeconMenu from "./모든구성요소/SeconMenu.svelte";
  import ThirdMenu from "./모든구성요소/ThirdMenu.svelte";
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

  let setView = "plan";
  let currentPage = FirstMenu;
  let isSectionOpen = {};
  const selectPage = (page) => {
    currentPage = page;
  };
  /**********LEFT SIDE*/
  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false); // Har bir accordion uchun ochiq/yopiq holat
  export let activeMenu = "신규계획등록";
  let selectedHostname = "";

  let selectedHostnameData = null;
  function handleClickHostname(data) {
    // console.log("handle data", data);
    currentPage = Swiper;
    selectedHostname = data.hostname;
    selectedHostnameData = data;
  }
  let plan_index = "";

  const toggleAccordion = (index, item) => {
    isOpen.fill(false); // Close all accordions
    isOpen[index] = true;
    plan_index = item.ccp_index;
  };
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

  <section class="section2 tableWrap" style="height: calc(-100px + 100vh);">
    <div class="tableListWrap">
      <section
        class="subTabWrap"
        style="height: 50px; background-color: #fff; margin-top: 8px; padding-left: 20px; border-radius: 10px"
      >
        <a
          style="font-size: 14px;"
          href="javascript:void(0);"
          class={setView == "plan" ? "active" : ""}
          on:click={() => {
            setView = "plan";
            selectPage(FirstMenu);
          }}
        >
          시스템로그
        </a>
        <a
          style="font-size: 14px; margin-left: 10px;"
          href="javascript:void(0);"
          class={setView == "plan_accept" ? "active" : ""}
          on:click={() => {
            setView = "plan_accept";
            selectPage(SeconMenu);
          }}
        >
          감사로그
        </a>
        <a
          style="font-size: 14px; margin-left: 10px;"
          href="javascript:void(0);"
          class={setView == "plan_siroj" ? "active" : ""}
          on:click={() => {
            setView = "plan_siroj";
            selectPage(ThirdMenu);
          }}
        >
          수행명령조회
        </a>
      </section>

      {#if currentPage}
        <svelte:component this={currentPage} />
      {/if}
    </div>
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
