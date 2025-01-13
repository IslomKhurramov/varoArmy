<script>
  import { onMount } from "svelte";
  import ModalDynamic from "../../shared/ModalDynamic.svelte";
  import ResultPopup from "./ResultPopup.svelte";
  import {
    getCCEResultUploadStatus,
    getResultUploadStatus,
    getUploadedResultErrors,
    setUploadPlanResult,
  } from "../../services/result/resultService";
  import { getPlanLists } from "../../services/page1/newInspection";
  import ResultErrorPopup from "./ResultErrorPopup.svelte";
  import { getAllPlanLists } from "../../services/page1/planInfoService";
  import {
    errorAlert,
    successAlert,
    warningAlert,
  } from "../../shared/sweetAlert";
  import ResultUploadStatusPopup from "./ResultUploadStatusPopup.svelte";
  import {
    getAllCheckList,
    getPlanDetailInformation,
    setDeleteChecklistGroup,
    setDeleteChecklistItem,
    setNewChecklistGroup,
  } from "../../services/callApi";
  import { allCheckList, allPlanList } from "../../services/store";
  import DetailOfPlanMain from "../DetailOfPlanMain.svelte";

  let jsonInput, txtInput, excelInput;
  let jsonFiles = [];
  let txtFiles = [];
  let excelFiles = [];
  let fileNames = "(멀티파일등록가능)";
  let fileNames2 = "(멀티파일등록가능)";
  let fileNames3 = "(.EXCEL 파일만 허용)";
  let allFiles = [];

  let error = null;
  let planList = [];
  let projectIndex = "";
  let selectedTargets = [];
  let projectData = {};
  let targetValue = "ALL";
  let selectedPlan = "";
  let resultStatus = null;
  let resultErrors = null;
  let uploadStatus = null;
  let showModal = false;
  let showErrorModal = false;
  let modalData = null;
  let planReports = null;
  let modalErrorData = null;
  let uploadStatusModalData = null;

  function updateAllFiles() {
    allFiles = [
      ...jsonFiles.map((file) => ({ type: "JSON", file })),
      ...txtFiles.map((file) => ({ type: "TXT", file })),
      ...excelFiles.map((file) => ({ type: "EXCEL", file })),
    ];
  }

  $: if (selectedPlan) {
    (async () => {
      try {
        // console.log('selectedPlan',selectedPlan);

        resultStatus = await getCCEResultUploadStatus(selectedPlan);
        resultErrors = await getUploadedResultErrors(selectedPlan);
        uploadStatus = await getResultUploadStatus(selectedPlan);
      } catch (error) {}
    })();
  }
  $: console.log("resultErrors", resultErrors);

  $: console.log("resultErrors", resultErrors);

  onMount(async () => {
    try {
      planList = await getPlanLists();
      allCheckListGet();
    } catch (err) {}
  });

  const getResultStatus = async () => {
    try {
      uploadStatusModalData = uploadStatus;
    } catch (err) {}
  };

  $: console.log("Project index", selectedPlan);
  /*************LEFT SIDE */

  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false);
  export let activeMenu = "신규계획등록";
  let resultData = [];

  let isAddingNewGroup = false;
  const cancelNewGroup = () => {
    isAddingNewGroup = false;
  };
  // Function to handle items per page change
  function updateItemsPerPage(event) {
    itemsPerPage = parseInt(event.target.value, 10);
    // currentPagePagination = 1; // Reset to first page
  }

  let groupIndex = "";
  let parentIndex = null;

  const toggleAccordion = (index, item) => {
    isOpen.fill(false);
    isOpen[index] = true;
    groupIndex = item.ccg_index;
    parentIndex = item.ccp_index;

    // console.log("gttgtg", groupIndex);
  };
  let isSectionOpen = {};

  /********************************/
  async function allCheckListGet() {
    try {
      const response = await getAllCheckList();

      if (response) {
        allCheckList.set(response);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  $: console.log("allchecklist", $allCheckList);
  let selectedTargetData = [];
  let selectedTarget = [];
  function handleClickTarget(targetData, item) {
    selectedTargetData = targetData;
    selectedTarget = item;
    // console.log("targetData", selectedTargetData);
  }

  async function deleteGroup() {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;
    try {
      const response = await setDeleteChecklistGroup(groupIndex);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        await allCheckListGet(); // Fetch updated data after deletion
        groupIndex = "";
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      throw err;
    }
  }

  // const toggleAccordion = (index) => {
  //   isOpen[index] = !isOpen[index];
  // };
  let currentPage = null;
  function handleFileSelect(event, fileType) {
    const files = Array.from(event.target.files);
    if (fileType === "json") {
      jsonFiles = files;
      fileNames =
        jsonFiles.length > 0
          ? jsonFiles.map((file) => file.name).join(", ")
          : "(멀티파일등록가능)";
    } else if (fileType === "txt") {
      txtFiles = files;
      fileNames2 =
        txtFiles.length > 0
          ? txtFiles.map((file) => file.name).join(", ")
          : "(멀티파일등록가능)";
    } else if (fileType === "excel") {
      excelFiles = files;
      fileNames3 =
        excelFiles.length > 0
          ? excelFiles.map((file) => file.name).join(", ")
          : "(멀티파일등록가능)";
    }
    updateAllFiles();
  }
  let total_percentage_non_agent = null;
  let total_percentage_agent = null;
  $: console.log("Uploaded status", uploadStatus);
  $: nonAgentTotalCount =
    uploadStatus?.non_agent_target?.reduce(
      (sum, target) => sum + target.count,
      0
    ) || 0;

  // Access the `ast_count` from the first element of `total_count`

  // Calculate `total_percentage`

  $: AgentTotalCount =
    uploadStatus?.agent_target?.reduce(
      (sum, target) => sum + target.count,
      0
    ) || 0;

  $: ast_count = uploadStatus?.total_count?.[0]?.ast_count || 0;

  // Calculate `total_percentage` for non-agent targets
  $: total_percentage_non_agent =
    ast_count > 0 ? Math.round((nonAgentTotalCount / ast_count) * 100) : 0;

  // Calculate `total_percentage` for agent targets
  $: total_percentage_agent =
    ast_count > 0 ? Math.round((AgentTotalCount / ast_count) * 100) : 0;

  $: unregisteredAssetsCount =
    uploadStatus?.total_count[0]?.ast_count -
      (nonAgentTotalCount + AgentTotalCount) || 0;

  /****************************************/
  let firstDetail = null;
  async function getPlanDetail() {
    try {
      const response = await getPlanDetailInformation(selectedPlan); // Fetch details based on selectedPlan
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

  $: if (selectedPlan) {
    // Trigger fetching detail when selectedPlan changes
    getPlanDetail();
  }

  function formatToKoreanTime(date) {
    if (!date) return "N/A";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",

      timeZone: "Asia/Seoul",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(new Date(date));
  }
  async function handleSubItem(data) {
    selectedPlan = data.ccp_index;
    currentPage = DetailOfPlanMain;
    await getPlanDetail();
  }
  function closeSwiper() {
    currentPage = null;
  }
  function closeshowErrorModal() {
    showErrorModal = false;
  }
  function closeShowModal() {
    showModal = false;
  }
  // Close modal when Esc key is pressed
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeShowModal();
      closeshowErrorModal();
    }
  }

  onMount(() => {
    // Listen for keydown event when the modal is open
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the event listener when the component is destroyed
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  import { tick } from "svelte";

  const submitNewSystemCommand = async () => {
    console.log("selectedPlan before submit:", selectedPlan);
    await tick(); // Wait for any pending reactivity updates to complete

    if (!jsonFiles.length && !txtFiles.length && !excelFiles.length) {
      errorAlert("파일을 업로드하고 계획을 선택하세요.");
      return;
    }

    if (!selectedPlan) {
      errorAlert("계획을 선택해 주세요.");
      return;
    }

    const filesToUpload = [
      ...jsonFiles.map((file) => ({ type: "JSON", file })),
      ...txtFiles.map((file) => ({ type: "TXT", file })),
      ...excelFiles.map((file) => ({ type: "EXCEL", file })),
    ];

    const uploadPromises = filesToUpload.map(async ({ type, file }) => {
      const formData = new FormData();
      formData.append("plan_index", selectedPlan);
      formData.append("target_system", type);
      formData.append("result_files", file);

      console.log("formData ", formData);
      console.log("type ", type);
      console.log("files to upload ", filesToUpload);

      try {
        const response = await setUploadPlanResult(formData);
        if (response) {
          await successAlert(response); // Assuming successAlert handles the success message
          jsonFiles = [];
          txtFiles = [];
          excelFiles = [];
          fileNames = "(멀티파일등록가능)";
          fileNames2 = "(멀티파일등록가능)";
          fileNames3 = "(.EXCEL 파일만 허용)";
          updateAllFiles();
        } else {
          errorAlert("No response returned from the upload API.");
        }
      } catch (error) {
        errorAlert(`Error uploading ${file.name}: ${error.message}`);
      }
    });

    // Wait for all uploads to finish (either fulfilled or rejected)
    await Promise.allSettled(uploadPromises);

    // Fetch the results and statuses after all uploads are done
    resultStatus = await getCCEResultUploadStatus(selectedPlan);
    resultErrors = await getUploadedResultErrors(selectedPlan);
    uploadStatus = await getResultUploadStatus(selectedPlan);

    // Clear the file arrays after upload
    jsonFiles = [];
    txtFiles = [];
    excelFiles = [];

    // Update UI after clearing the file arrays
    updateAllFiles();
  };
</script>

<main class="table-container">
  <section class="section1">
    <div class="body_menu">
      <div class="menuContainer">
        <!-- Header -->
        <div>
          <div class="menuHeader">
            {mainTitle}
            {#if currentPage === DetailOfPlanMain}
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
          <button on:click="{() => (isAddingNewGroup = true)}">복사</button>
          <button on:click="{deleteGroup}">삭제</button>
          <button>EXCEL</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section2">
    {#if currentPage}
      <svelte:component this="{currentPage}" bind:firstDetail />
    {:else}
      <div class="formContainer_main">
        <div class="inspection-container">
          <div class="formControlWrap">
            <div class="formControl">
              <label style="font-size: 14px;">점검계획</label>
              <select bind:value="{selectedPlan}">
                <option value="" selected disabled>선택</option>
                {#if planList}
                  {#each planList as plan}
                    <option value="{plan.ccp_index}">
                      {plan.ccp_title}
                    </option>
                  {/each}
                {/if}
              </select>
            </div>
          </div>

          <div class="formControlWrap">
            <div class="formControl">
              <label style="font-size: 14px;">점검분류</label>
              {#if firstDetail}
                <span>{firstDetail.ccp_ruleset__ccg_group}</span>
              {/if}
            </div>
          </div>

          <div class="formControlWrap">
            <div class="formControl">
              <label style="font-size: 14px;">점검분류</label>
              {#if firstDetail}
                <span>{formatToKoreanTime(firstDetail.plan_start_date)}</span
                >~<span>{formatToKoreanTime(firstDetail.plan_end_date)}</span>
              {/if}
            </div>

            <!-- Registration Status -->
            <div class="tableListWrap">
              <p>등록현황</p>
              <div class="table_scroll_bar">
                <table class="tableList hdBorder" style="width: 170px;">
                  <colgroup>
                    <col style="width:14%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>등록대상</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        {#if uploadStatus}
                          <div class="first_col">
                            <p>에이전트({AgentTotalCount})</p>
                            <p>비에이전트({nonAgentTotalCount})</p>
                            <p>미등록자산</p>
                          </div>
                        {/if}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <table class="tableList hdBorder">
                  <colgroup>
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>UNIX</th>
                      <th>WINDOWS</th>
                      <th>NETWORK</th>
                      <th>SECURITY</th>
                      <th>등록오류</th>
                      <th>합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Row 1: Agent -->
                    <tr>
                      {#if uploadStatus}
                        <td>
                          {uploadStatus.agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target === "UNIX"
                          )?.count || "-"}
                        </td>
                        <td>
                          {uploadStatus.agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target ===
                              "WINDOWS"
                          )?.count || "-"}
                        </td>
                        <td>
                          {uploadStatus.agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target ===
                              "NETWORK"
                          )?.count || "-"}
                        </td>

                        <td>
                          {uploadStatus.agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target ===
                              "SECURITY"
                          )?.count || "-"}
                        </td>
                        <td>-</td>
                        <td>{total_percentage_agent}%</td>
                      {/if}
                    </tr>

                    <!-- Row 2: Non-Agent -->
                    <tr>
                      {#if uploadStatus}
                        <td>
                          {uploadStatus.non_agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target === "UNIX"
                          )?.count || "-"}
                        </td>
                        <td>
                          {uploadStatus.non_agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target ===
                              "WINDOWS"
                          )?.count || "-"}
                        </td>
                        <td>
                          {uploadStatus.non_agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target ===
                              "NETWORK"
                          )?.count || "-"}
                        </td>

                        <td>
                          {uploadStatus.non_agent_target.find(
                            (target) =>
                              target.ast_uuid__ast_target__cct_target ===
                              "SECURITY"
                          )?.count || "-"}
                        </td>
                        <td>-</td>
                        <td>{total_percentage_non_agent}%</td>
                      {/if}
                    </tr>

                    <!-- Row 3: 미등록자산 -->
                    <tr>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>

                      <td>{unregisteredAssetsCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="buttons1">
                <button
                  on:click="{() => (showModal = true)}"
                  type="button"
                  class="{`btn ${resultStatus?.assets_info?.length > 0 ? 'btn-primary' : ''}`}"
                  disabled="{!resultStatus?.assets_info?.length > 0}"
                  >결과미등록자산 ({resultStatus?.assets_info?.length || ""})
                </button>
                <button
                  on:click="{() => (showErrorModal = true)}"
                  type="button"
                  class="{`btn ${resultErrors?.length > 0 ? 'btn-secondary' : ''}`}"
                  disabled="{!resultErrors?.length > 0}"
                  >등록실패내역 ({resultErrors?.length || ""})</button
                >
              </div>
            </div>

            <!-- File Upload Section -->
          </div>

          <div class="page2_headir_bottom">
            <p>이동식점검 결과 파일등록</p>

            <div class="upload-section">
              <div class="upload-box">
                <div class="upload-button">
                  <span>JSON 파일등록</span><br />
                  <input
                    type="text"
                    class="file-name-input"
                    placeholder="멀티파일등록가능"
                    value="{fileNames}"
                    readonly
                  />
                </div>

                <label class="plus-icon">
                  <span>+</span>
                  <input
                    type="file"
                    class="file-input"
                    multiple
                    accept=".json"
                    bind:this="{jsonInput}"
                    on:change="{(event) => handleFileSelect(event, 'json')}"
                  />
                </label>
              </div>

              <div class="upload-box">
                <div class="upload-button">
                  <span>네트워크 설정파일등록</span><br />
                  <input
                    type="text"
                    class="file-name-input"
                    placeholder="멀티파일등록가능"
                    value="{fileNames2}"
                    readonly
                  />
                </div>

                <label class="plus-icon">
                  <span>+</span>
                  <input
                    type="file"
                    class="file-input"
                    multiple
                    accept=".txt"
                    bind:this="{txtInput}"
                    on:change="{(event) => handleFileSelect(event, 'txt')}"
                  />
                </label>
              </div>

              <div class="upload-box">
                <div class="upload-button">
                  <span>수기등록</span><br />
                  <input
                    type="text"
                    class="file-name-input"
                    placeholder=".EXCEL 파일만 허용"
                    value="{fileNames3}"
                    readonly
                  />
                </div>

                <label class="plus-icon">
                  <span>+</span>
                  <input
                    type="file"
                    class="file-input"
                    multiple
                    accept=".xls,.xlsx"
                    bind:this="{excelInput}"
                    disabled="{!selectedPlan}"
                    on:change="{(event) => handleFileSelect(event, 'excel')}"
                  />
                </label>
              </div>
            </div>

            <div
              class="upload-submit"
              on:click="{submitNewSystemCommand}"
              disabled="{!selectedPlan || !allFiles.length}"
            >
              <button class="btn btn-upload">업로드</button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </section>
</main>

{#if showModal}
  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="modal-open-wrap"
    on:click="{() => (showModal = false)}"
    on:keydown="{handleKeyDown}"
    tabindex="0"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog
      open
      on:close="{() => (showModal = false)}"
      on:click|stopPropagation
    >
      <ResultUploadStatusPopup bind:resultStatus {closeShowModal} />
    </dialog>
  </div>{/if}

{#if showErrorModal}
  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="modal-open-wrap"
    on:click="{() => (showErrorModal = false)}"
    on:keydown="{handleKeyDown}"
    tabindex="0"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog
      open
      on:close="{() => (showErrorModal = false)}"
      on:click|stopPropagation
    >
      <ResultErrorPopup bind:resultErrors {closeshowErrorModal} />
    </dialog>
  </div>{/if}

<style>
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
  .menuHeader {
    position: relative;
  }
  .menuHeader img {
    position: absolute;
    right: 0;
    width: 16px;
    cursor: pointer;
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
  /* Tooltip container */
  .tooltip {
    visibility: hidden; /* Hidden by default */
    width: 200px; /* Adjust the width of the tooltip */
    background-color: rgba(0, 0, 0, 0.7); /* Background color of the tooltip */
    color: #fff; /* Text color */
    text-align: center; /* Center text */
    border-radius: 4px; /* Rounded corners */
    padding: 5px; /* Padding inside tooltip */
    position: absolute; /* Absolute positioning */
    z-index: 1; /* On top of other elements */
    bottom: 125%; /* Position above the paragraph */
    left: 50%; /* Center the tooltip horizontally */
    transform: translateX(-50%); /* Centering adjustment */
    opacity: 0; /* Initial opacity */
    transition: opacity 0.2s ease; /* Transition effect */
  }

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

  .first_col {
    display: flex;
    flex-direction: column;
  }
  .first_col p {
    padding: 0px;
    margin: 6px;
    text-align: justify;
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

  .table-container {
    /* overflow-y: auto; */
    border-radius: 10px;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: row;
  }
  .section2 {
    width: 85%;
    height: 80vh;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;
  }

  .formContainer_main {
    max-width: 100%;
    margin-top: 15px;
    overflow-y: auto;
    max-height: 80vh;
    overflow-x: hidden;
  }

  .table_scroll_bar {
    overflow-y: auto;
    max-height: 20vh;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
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

  .formControl select {
    min-width: 78px;
    height: 28px;
    padding: 0 8px;
    font-size: 14px;
    border-radius: 4px;
  }

  .formControl span {
    min-width: 48px;
    height: 28px;
    padding: 0 8px;
    font-size: 14px;
    border-radius: 4px;
  }

  .date_1 input {
    min-width: 78px;
    height: 28px;
    padding: 0 8px;
    font-size: 12px;
    border-radius: 4px;
  }

  .inspection-container {
    font-family: Arial, sans-serif;
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  .inputRow {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  .inputRow label {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
  }

  .box_1 {
    width: 50%;
  }

  .data_no_color {
    font-size: 14px;
    color: #ccc;
  }

  .inputRow input {
    flex: 1;
    width: 100%;
    height: 34px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
  }
  .inputRow span {
    flex: 1;
    width: 100%;
    height: 34px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table td {
    font-size: 14px;
  }
  table th,
  table td {
    padding: 10px;
    text-align: center;
  }

  .buttons1 {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: auto;
    height: 34px;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto;
    height: 34px;
  }

  .btn-primary {
    width: auto;
    height: 34px;
    font-size: 14px;
    color: #333333;
    border: 1px solid #333333;
    font-weight: bold;
  }

  .btn-primary:hover {
    color: #ffffff;
    background-color: #333333;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }

  .btn-secondary {
    width: auto;
    height: 34px;
    color: #333333;
    font-size: 14px;
    border: 1px solid #333333;
    font-weight: bold;
  }

  .btn-secondary:hover {
    width: auto;
    height: 34px;
    background-color: #c43840;
    color: #ffffff;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }

  .page2_headir_bottom {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  .page2_headir_bottom p {
    font-size: 14px;
    font-weight: bold;
    padding-left: 20px;
  }

  .upload-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 0px 20px;
  }

  .upload-box {
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .plus-icon {
    position: absolute;
    top: 15px;
    left: 20px;
    width: 35px;
    height: 35px;
    background-color: #999999;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .plus-icon span {
    position: absolute;
    top: 0px;
    font-size: 25px;
  }

  .file-name-input {
    margin-left: 50px;
    border: none;
    background: none;
    color: inherit;
    padding: 0;
    outline: none;
    font: inherit;
    cursor: default;
  }

  .file-input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }

  .upload-button {
    width: 100%;
    padding: 20px;
    background-color: #ddd;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
  }

  .upload-button:hover {
    background-color: #ccc;
  }

  .upload-submit {
    display: flex;
    padding: 20px;
    justify-content: flex-end;
    text-align: center;
  }

  .btn-upload {
    width: auto;
    height: 24px;
    color: #999999;
    background-color: #ffffff;
    border: 1px solid #999999;
    font-weight: bold;
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-upload:hover {
    opacity: 0.9;
    color: #ffffff;
    background-color: #5f7ab0;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 2px;
  }

  .tableListWrap {
    overflow-y: auto;
    max-height: 65vh;
  }

  .tableListWrap p {
    font-size: 14px;
    font-weight: bold;
  }

  .tableListWrap {
    overflow: visible;
    position: relative;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }

  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }
</style>
