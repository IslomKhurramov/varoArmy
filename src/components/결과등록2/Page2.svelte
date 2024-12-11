<script>
  import { onMount } from "svelte";
  import ModalDynamic from "../../shared/ModalDynamic.svelte";
  import ResultPopup from "./ResultPopup.svelte";
  import {
    getCCEResultUploadStatus,
    getResultUploadStatus,
    getUploadedResultErrors,
  } from "../../services/result/resultService";
  import { getPlanLists } from "../../services/page1/newInspection";
  import ResultErrorPopup from "./ResultErrorPopup.svelte";
  import { getAllPlanLists } from "../../services/page1/planInfoService";
  import {errorAlert} from "../../shared/sweetAlert"

  let jsonInput, txtInput, excelInput;
  let jsonFiles = [];
  let txtFiles = [];
  let excelFiles = [];

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
  let fileNames = "(멀티파일등록가능)";
  let fileNames2 = "(멀티파일등록가능)";
  let fileNames3 = "(.EXCEL 파일만 허용)";
  let tableData = [
    {
      category: "에이전트 (100)",
      unix: 10,
      windows: 70,
      network: 0,
      dbms: "-",
      pc: "-",
      errors: 3,
      total: "80%",
    },
    {
      category: "비에이전트 (10)",
      unix: 1,
      windows: 0,
      network: 7,
      dbms: "-",
      pc: "-",
      errors: "-",
      total: "90%",
    },
    {
      category: "미등록자산",
      unix: "-",
      windows: "-",
      network: "-",
      dbms: "-",
      pc: "-",
      errors: "-",
      total: "-",
    },
  ];

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

  $: if (selectedPlan) {
    (async () => {
      try {
        console.log('selectedPlan',selectedPlan);
        
        resultStatus = await getCCEResultUploadStatus(selectedPlan);
        resultErrors = await getUploadedResultErrors(selectedPlan);
        uploadStatus = await getResultUploadStatus(selectedPlan);
        // console.log("uploadStatus",uploadStatus);
        
      } catch (error) {}
    })();
  }


  const fetchResultErrors = () => {
    resultErrors = [
      { id: 1, error: "Error 1" },
      { id: 2, error: "Error 2" },
    ];
    showErrorModal = true;
  };


// function handleFileSelect(event) {
//   const files = event.target.files;
//   fileNames = files.length > 0 ? files[0].name : "(멀티파일등록가능)";
// }

const submitNewSystemCommand = async (target, files) => {
    try {
      const formData = new FormData();

      formData.append("plan_index", selectedPlan);
      formData.append("target_system", target);

      files.forEach((file) => {
        formData.append("result_files", file);
      });

      const response = await setUploadPlanResult(formData);

      await successAlert(response);

      resultStatus = await getCCEResultUploadStatus(selectedPlan);
      resultErrors = await getUploadedResultErrors(selectedPlan);
      uploadStatus = await getResultUploadStatus(selectedPlan);

      jsonFiles = [];
      txtFiles = [];
      excelFiles = [];

      // navigate(window.location?.pathname == "/" ? "/page1" : "/");
    } catch (error) {
      errorAlert(error?.message);
    }
  };

$: console.log("uploadStatus:", uploadStatus);
$: console.log("uploaded_status:", uploadStatus?.uploaded_status);



onMount(async () => {
    try {
      planList = await getPlanLists();
      console.log('planList',planList);
      console.log('uploadStatus',uploadStatus);
      
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

  let mainItems2 = [
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

  function handleFileSelect(event, fileType) {
    const files = Array.from(event.target.files);
    if (fileType === "json") {
      jsonFiles = files;
      fileNames = jsonFiles.length > 0 ? jsonFiles.map((file) => file.name).join(", ") : "(멀티파일등록가능)";
    } else if (fileType === "txt") {
      txtFiles = files;
      fileNames2 = txtFiles.length > 0 ? txtFiles.map((file) => file.name).join(", ") : "(멀티파일등록가능)";
    } else if (fileType === "excel") {
      excelFiles = files;
      fileNames3 = excelFiles.length > 0 ? excelFiles.map((file) => file.name).join(", ") : "(멀티파일등록가능)";
    }
    console.log(`${fileType} fayllar tanlandi:`, files);
  }


</script>

<main class="table-container">

  <section class="section1">
    <div class="body_menu">
      <div class="menuContainer">
        <!-- Header -->
        <div>
          <!-- LEFT SIDE -->
          <div class="menuHeader">{mainTitle}</div>

          <!-- Accordion -->
          <div class="accordion">
            {#each mainItems2 as item, index}
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
                      <li on:click="{() => (activeMenu = subItem.title)}">
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
    <div class="inspection-container">

      <div class="formControlWrap">
        <div class="formControl">
          <label style="font-size: 14px;">점검항목</label>
          <select bind:value={selectedPlan}>
            <option value="" selected disabled>선택</option>
            {#if planList}
              {#each planList as plan}
                <option value={plan.ccp_index}>{plan.ccp_title}</option>
              {/each}
            {/if}
          </select>
        </div>
      </div>

      <div class="formControlWrap">
        <div class="formControl">
          <label style="font-size: 14px;">점검분류</label>
          <select bind:value={selectedPlan}>
            <option value="" selected disabled>선택</option>
            {#if planList}
              {#each planList as plan}
                <option value={plan.ccp_index}>{plan.ccp_title}</option>
              {/each}
            {/if}
          </select>
        </div>
      </div>

      <div class="formControlWrap">
      <div class="inputRow box_1">
        <label>점검기간</label>
        <div class="dateWrap">
          <div class="date">
            <input type="date" class="datepicker" placeholder="시작일시" />
          </div>
          <img src="./assets/images/dash.svg" />
          <div class="date">
            <input type="date" class="datepicker" placeholder="종료일시" />
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
              <col style="width:14%;" />
            </colgroup>
            <thead>
              <tr>
                <th>등록대상</th>
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
                {#each uploadStatus.uploaded_status as row, index}
                  <tr>
                    <td>{row.hostname || "N/A"}</td>
                    <td>{row.ipaddr || "N/A"}</td>
                    <td>{row.target || "N/A"}</td>
                    <td>{row.checklist_count || 0}</td>
                    <td>{row.checklist_count || 0}</td>
                    <td>{row.checklist_count || 0}</td>
                    <td>{row.checklist_count || 0}</td>
                    <td>{row.uploaded_result_count || 0}</td>
                  </tr>
                {/each}
              {:else}
                <tr>
                  <td colspan="8">데이터가 없습니다</td>
                </tr>
              {/if}
            </tbody>
            
          </table>
        </div>
        <div class="buttons1">
          <button
            class="btn btn-primary"
            on:click="{() => {
              showModal = true;
              modalData = resultStatus;
            }}">결과미등록자산</button
          >
          <button class="btn btn-secondary" on:click="{fetchResultErrors}"
            >등록실패내역</button
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
              value={fileNames}
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
              bind:this={jsonInput}
              disabled={!selectedPlan}
              on:change={(event) => handleFileSelect(event, "json")}
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
              value={fileNames2}
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
              bind:this={txtInput}
              disabled={!selectedPlan}
              on:change={(event) => handleFileSelect(event, "txt")}
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
              value={fileNames3}
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
              bind:this={excelInput}
              disabled={!selectedPlan}
              on:change={(event) => handleFileSelect(event, "excel")}
            />
          </label>
        </div>
        
  
        <div class="upload-submit">
          <button class="btn btn-upload">업로드</button>
        </div>
  
      </div>

    </div>

  </section>

</main>

{#if showModal}
  <ModalDynamic bind:showModal modalWidth="{60}" modalHeight="{600}">
    <ResultPopup bind:modalData />
  </ModalDynamic>
{/if}

{#if showErrorModal}
  <ModalDynamic
    bind:showModal="{showErrorModal}"
    modalWidth="{60}"
    modalHeight="{600}"
    showExecuteAllButton="{true}"
  >
    <ResultErrorPopup bind:modalData="{resultErrors}" />
  </ModalDynamic>
{/if}

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
    height: 80vh;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;
  }

  .table_scroll_bar{
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

  .inputRow select {
    flex: 1;
    width: 100%;
    height: 34px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
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
    grid-column: 1 / -1;
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
