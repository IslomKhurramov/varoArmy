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
  import { errorAlert, successAlert } from "../../shared/sweetAlert";
  import ResultUploadStatusPopup from "./ResultUploadStatusPopup.svelte";
  import {
    getAllCheckList,
    setDeleteChecklistGroup,
    setDeleteChecklistItem,
    setNewChecklistGroup,
  } from "../../services/callApi";
  import { allCheckList, allPlanList } from "../../services/store";

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

  const submitNewSystemCommand = async () => {
    try {
      if (!selectedPlan) {
        errorAlert("프로젝트명을 먼저 선택해주세요.");
        return;
      }

      if (!jsonFiles.length && !txtFiles.length && !excelFiles.length) {
        errorAlert("파일을 업로드하고 계획을 선택하세요.");
        return;
      }

      const filesToUpload = [
        ...jsonFiles.map((file) => ({ type: "JSON", file })),
        ...txtFiles.map((file) => ({ type: "TXT", file })),
        ...excelFiles.map((file) => ({ type: "EXCEL", file })),
      ];

      for (const { type, file } of filesToUpload) {
        const formData = new FormData();
        formData.append("plan_index", selectedPlan);
        formData.append("target_system", type);
        formData.append("result_files", file);

        const response = await setUploadPlanResult(formData);
        await successAlert(response);
      }

      resultStatus = await getCCEResultUploadStatus(selectedPlan);
      resultErrors = await getUploadedResultErrors(selectedPlan);
      uploadStatus = await getResultUploadStatus(selectedPlan);

      jsonFiles = [];
      txtFiles = [];
      excelFiles = [];
      updateAllFiles();
    } catch (error) {
      errorAlert(error?.message);
    }
  };

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

  $: {
    if (projectIndex) selectedPlan = projectIndex;
  }

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
  const toggleAccordion = (index, item) => {
    isOpen.fill(false);
    isOpen[index] = true;
    groupIndex = item.ccg_index;
    // console.log("gttgtg", groupIndex);
  };
  let isSectionOpen = {};

  // Function to toggle specific sections
  function toggleSection(itemKey, sectionKey) {
    if (!isSectionOpen[itemKey]) {
      isSectionOpen[itemKey] = {};
    }
    isSectionOpen[itemKey][sectionKey] = !isSectionOpen[itemKey][sectionKey];
  }

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

  async function deleteChecklist() {
    try {
      const response = await setDeleteChecklistItem(ccg_index_id, ccc_index);

      if (response.RESULT === "OK") {
        if (response.CODE === "기본 제공된 체크리스트는 삭제가 불가능합니다.") {
          warningAlert("기본 제공된 체크리스트는 삭제가 불가능합니다");
          selected = [];
          allSelected = false;
        } else {
          successAlert(`${response.CODE}`);
          await allCheckListGet(); // Fetch updated data after deletion
          selected = [];
          allSelected = false;
          clearSelection(); // Reset selection
        }
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      console.error(err);
    }
  }

  let new_checlist_name = "";
  let selected_checklist_id = "";

  async function createChecklist() {
    try {
      const response = await setNewChecklistGroup(
        selected_checklist_id,
        new_checlist_name
      );

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        await allCheckListGet(); // Fetch updated data after deletion
        new_checlist_name = "";
        selected_checklist_id = "";
        isAddingNewGroup = false;
      }
    } catch (err) {
      console.error(err);
    }
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
  let selectedHostnameData = null;
  function handleClickHostname(data) {
    // console.log("handle data", data);
    selectedHostname = data.hostname;
    selectedHostnameData = data;
    currentPage = null;
  }
  $: console.log("Uploaded status", uploadStatus);
</script>

<main class="table-container">
  <section class="section1">
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
                  on:click="{() => {
                    toggleAccordion(index, item);
                    // Direct function call in Svelte
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
                      class="accordion-content {isOpen[index] ? 'open' : ''}"
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
                </div>
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
    <div class="formContainer_main">
      <div class="inspection-container">
        <div class="formControlWrap">
          <div class="formControl">
            <label style="font-size: 14px;">점검항목</label>
            <select bind:value="{selectedPlan}">
              <option value="" selected disabled>선택</option>
              {#if planList}
                {#each planList as plan}
                  <option value="{plan.ccp_index}">{plan.ccp_title}</option>
                {/each}
              {/if}
            </select>
          </div>
        </div>

        <div class="formControlWrap">
          <div class="formControl">
            <label style="font-size: 14px;">점검분류</label>
            <input type="text" />
          </div>
        </div>

        <div class="formControlWrap">
          <div class="inputRow box_1">
            <label>점검기간</label>
            <div class="dateWrap">
              <div class="date_1">
                <input type="date" class="" placeholder="시작일시" />
              </div>
              <img src="./assets/images/dash.svg" />
              <div class="date_1">
                <input type="date" class="" placeholder="종료일시" />
              </div>
            </div>
          </div>
        </div>

        <!-- Registration Status -->
        <div class="tableListWrap">
          <p>등록현황</p>
          <div class="table_scroll_bar">
            <table class="tableList hdBorder">
              <colgroup>
                <col style="width:14%;" />
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
                  <th>DBMS</th>
                  <th>PC</th>
                  <th>등록오류</th>
                  <th>합계</th>
                </tr>
              </thead>
              <tbody>
                {#if Array.isArray(uploadStatus?.uploaded_status) && uploadStatus?.uploaded_status.length > 0}
                  <tr>
                    <!-- UNIX -->
                    <td>
                      {uploadStatus.uploaded_status
                        .filter((row) => row.target === "UNIX")
                        .reduce(
                          (sum, row) => sum + (row.uploaded_result_count || 0),
                          0
                        )}
                    </td>

                    <!-- WINDOWS -->
                    <td>
                      {uploadStatus.uploaded_status
                        .filter((row) => row.target === "WINDOWS")
                        .reduce(
                          (sum, row) => sum + (row.uploaded_result_count || 0),
                          0
                        )}
                    </td>

                    <!-- NETWORK -->
                    <td>
                      {uploadStatus.uploaded_status
                        .filter((row) => row.target === "NETWORK")
                        .reduce(
                          (sum, row) => sum + (row.uploaded_result_count || 0),
                          0
                        )}
                    </td>

                    <!-- DBMS -->
                    <td>
                      {uploadStatus.uploaded_status
                        .filter((row) => row.target === "DBMS")
                        .reduce(
                          (sum, row) => sum + (row.uploaded_result_count || 0),
                          0
                        )}
                    </td>

                    <!-- PC -->
                    <td>
                      {uploadStatus.uploaded_status
                        .filter((row) => row.target === "PC")
                        .reduce(
                          (sum, row) => sum + (row.uploaded_result_count || 0),
                          0
                        )}
                    </td>

                    <!-- 등록오류 -->
                    <td>
                      {uploadStatus.uploaded_status.reduce(
                        (sum, row) =>
                          sum +
                          (row.checklist_count - row.uploaded_result_count ||
                            0),
                        0
                      )}
                    </td>

                    <!-- 합계 -->
                    <td>
                      {uploadStatus.uploaded_status.reduce(
                        (sum, row) => sum + (row.uploaded_result_count || 0),
                        0
                      )}
                    </td>
                  </tr>
                {:else}
                  <tr>
                    <td class="data_no_color" colspan="7">
                      데이터가 없음! 프로젝트명을 먼저 선택함
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
          <div class="buttons1">
            <button
              type="button"
              class="{`btn ${resultStatus?.assets_info?.length > 0 ? 'btn-primary' : ''}`}"
              disabled="{!resultStatus?.assets_info?.length > 0}"
              on:click="{() => {
                showModal = true;
                modalData = resultStatus?.assets_info;
                getResultStatus();
              }}"
              >결과미등록자산 ({resultStatus?.assets_info?.length || ""})
            </button>
            <button
              type="button"
              class="{`btn ${resultErrors?.length > 0 ? 'btn-secondary' : ''}`}"
              disabled="{!resultErrors?.length > 0}"
              on:click="{() => {
                showErrorModal = true;
                modalErrorData = resultErrors;
              }}">등록실패내역 ({resultErrors?.length || ""})</button
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
                disabled="{!selectedPlan}"
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
                disabled="{!selectedPlan}"
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
  </section>
</main>

{#if uploadStatusModalData && uploadStatusModalData?.length !== 0}
  <ModalDynamic
    bind:showModal="{uploadStatusModalData}"
    modalWidth="{80}"
    modalHeight="{500}"
    bind:modalData="{uploadStatusModalData}"
  >
    <ResultUploadStatusPopup bind:uploadStatusModalData />
  </ModalDynamic>
{/if}

{#if modalErrorData && modalErrorData?.length !== 0}
  <ModalDynamic
    bind:showModal="{showErrorModal}"
    modalWidth="{80}"
    modalHeight="{500}"
    bind:modalData="{modalErrorData}"
    showExecuteAllButton="{true}"
  >
    <ResultErrorPopup bind:modalErrorData />
  </ModalDynamic>
{/if}

<style>
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
    font-size: 12px;
    border-radius: 4px;
  }

  .formControl input {
    min-width: 48px;
    height: 28px;
    padding: 0 8px;
    font-size: 12px;
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

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table td {
    font-size: 12px;
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
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-upload:hover {
    opacity: 0.9;
    color: #ffffff;
    background-color: #5f7ab0;
    border: none;
    font-weight: bold;
    font-size: 12px;
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
