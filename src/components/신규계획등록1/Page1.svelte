<script>
  import ModalDynamic from "../../shared/ModalDynamic.svelte";
  import InspectionTargetAssignment from "./InspectionTargetAssignment.svelte";
  import TargetAssignment from "./TargetAssignment.svelte";
  import moment from "moment";
  import { onMount } from "svelte";
  import {
    setNewPlanSave,
    getOptionsForNewPlan,
    getAssetGroup,
    getPlanLists,
  } from "../../services/page1/newInspection";
  import { navigate, useLocation } from "svelte-routing";
  import { errorAlert, successAlert } from "../../shared/sweetAlert";
  import SwiperPage1 from "./SwiperPage1.svelte";

  let formData = {
    planTitle: "",
    inspectionPeriod: "",
    category: "",
    system: "",
    domain: "전체",
    item: "",
    description: "",
    attachment: null,
    inspectorInfo: "",
    executionCondition: "즉시/예약",
    repeatPeriod: "",
    repeatCount: 1,
    startDate: "2024-09-01 12:00:00",
    endDate: "2024-09-01 12:00:00",
  };

  let error = null;
  let showTable = false;
  // Data for the form
  let projectName = "";
  let selectedType = "0";
  let selectedCheckList = "";
  let selectedAssetList = "";
  let selectedPersons = "";
  let startDate = "";
  let endDate = "";
  let schedule = "0";
  let repeatCycle = "";
  let inspectionInformation = "";
  let inputFile;

  let assetGroup = [];

  // Action schedule data
  let actionSchedule = "0";
  let actionStartDate = "";
  let actionEndDate = "";
  let conductorInfo = "";
  let recheckplanIndex = "0";
  let plan_execute_interval_value = 0;

  // SECOND DATA
  let assetInsertData = {
    target_group: "",
    command_type: "1",
    target: "basic,process,network,dll,program,patch",
    command_str: "",
    search_path: "",
    search_extension: "",
    search_target: "",
    reserved: "0",
    start_date: "",
    end_date: "",
    repeat_interval: 0,
    repeat_term: "",
  };

  let units = [ 
    {name: 'Unit 1'}, 
    {name: 'Unit 2'}, 
    {name: 'Unit 3'}, 
    {name: 'Unit 4'} ]; 

  let systems = [ 
    {name: 'System 1'}, 
    {name: 'System 2'}, 
    {name: 'System 3'}, 
    {name: 'System 4'} ]; 

  let ipRanges = [ '192.168.0.1/24', '192.168.1.1/24', '10.0.0.1/24', '172.16.0.1/24' ];

  let showModal = false;
  let modalData = null;
  let resultStatus = null;
  let resultErrors = null;
  let showErrorModal = false;

  let selectedFiles = {};
  let fileNames = {};
  let planOptions = [];
  let planList = [];

  const submitNewPlan = async () => {
    try {
      // if (!projectName) throw new Error("플랜명을 확인해 주세요!");
      // if (selectedType == "0") {
      //   if (!selectedCheckList) throw new Error("점검대상을 확인해 주세요!");
      // }

      // if (!selectedAssetList) throw new Error("점검항목을 확인해 주세요!");
      // if (!selectedPersons) throw new Error("점검자를 확인해 주세요!");
      // if (!conductorInfo) throw new Error("조치승인담당자를 확인해 주세요!");
      // if (!startDate || !endDate) throw new Error("점검일정을 확인해 주세요!");

      // if (schedule == "1") {
      //   if (plan_execute_interval_value == 0)
      //     throw new Error("주기를 0 보다 큰 숫자를 입력해 주세요!");
      // }

      const sendData = {
        plan_name: projectName,
        plan_recheck: parseInt(selectedType),
        plan_recheck_plan_index: parseInt(recheckplanIndex ?? 0),
        // asset_group_index: parseInt(selectedCheckList),
        checklist_index: parseInt(selectedAssetList),
        plan_planer_info: parseInt(selectedPersons),
        plan_start_date: moment(startDate).format("YYYY-MM-DD h:mm:ss"),
        plan_end_date: moment(endDate).format("YYYY-MM-DD h:mm:ss"),
        plan_execution_type: parseInt(schedule),
        plan_execute_interval_value:
          plan_execute_interval_value == 0 ? 0 : plan_execute_interval_value,
        plan_execute_interval_term: schedule == 0 ? "hours" : repeatCycle,
        fix_date_setup: parseInt(actionSchedule),
        fix_start_date: actionStartDate,
        fix_end_date: actionEndDate,
        fix_conductor_info: parseInt(conductorInfo),
        assessment_command: inspectionInformation,
      };

      if (parseInt(selectedType) === 0)
        sendData.asset_group_index = parseInt(selectedCheckList);

      const formData = new FormData();

      for (const key in sendData) {
        formData.append(key, sendData[key]);
      }

      const response = await setNewPlanSave(formData);

      
      
      if (response.RESULT === "OK") {
        await successAlert(response.CODE);
        getPlanLists()

      } else if (response.RESULT === "ERROR") {
        await errorAlert(response.CODE);
        getPlanLists()
      }

      navigate(window.location?.pathname == "/" ? "/page1" : "/");
    } catch (error) {
      errorAlert(error?.message);
    }
  };

  onMount(async () => {
    try {
      planOptions = await getOptionsForNewPlan();
      
      planList = await getPlanLists();

      assetGroup = await getAssetGroup();
    } catch (err) {
      error = err.message;
    }
  });

  function handleFileSelect(event, hostname) {
    const file = event.target.files[0];
    if (file) {
      selectedFiles[hostname] = file;
      fileNames[hostname] = file.name;
    } else {
      fileNames[hostname] = "선택된 파일 없음";
    }
  }

  const handleFileUpload = (event) => {
    formData.attachment = event.target.files[0];
  };

  const handleSubmit = () => {
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };
  let currentPage = null;

  /*******LEFT SIDE */

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

  function selectPage() {
    currentPage = SwiperPage1;
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
  
    <div class="formContainer_main">
      <div class="formContainer">

        <div class="inputRow">
          <label>점검계획제목</label>
          <input
          style="font-size: 14px;"
          type="text"
          placeholder="점검플랜명"
          bind:value={projectName}
        />
        </div>
  
        <div class="inputRow">
          <label>점검기간</label>
          <div class="riskLevels">
            <div class="riskLevelItem">
              <input 
               type="datetime-local"
               placeholder="시작일시"
               bind:value={startDate} />
            </div>
            <img src="./assets/images/dash.svg" />
            <div class="riskLevelItem">
              <input type="datetime-local"
                placeholder="종료일시"
                on:change={(e) => {
                  if (new Date(e.target.value) < new Date(startDate)) {
                    errorAlert("종료 일자가 시작 일자보다 빠릅니다");
                    endDate = "";
                  }
                }}
              bind:value={endDate}
              />
            </div>
            <div class="riskLevelItem">
              <span>점검분류</span>
              <select class="inputRow" id="asset_group">
                <option value="전체" selected>정기점검 </option>
  
                <option value="UNIX">수시점검</option>
                <option value="WINDOWS">긴시점검</option>
                <option value="PC">기타</option>
              </select>
            </div>
          </div>
        </div>
  
        <div class="inputRow">
          <label>점검체계</label>
          <input type="text" />
          <button class="buttons1"
            on:click="{() => {
              showModal = true;
              modalData = resultStatus;
            }}"
          >검색</button>
        </div>
  
        <div class="inputRow1">
          <p>점검분야</p>
          <div class="box_2">
            <div class="box2_radio">
              <label
                ><input
                  type="radio"
                  bind:group="{formData.domain}"
                  value="전체"
                /> 전체</label
              >
            </div>
            <div class="box2_radio">
              <label
                ><input
                  type="radio"
                  bind:group="{formData.domain}"
                  value="선택"
                /> 선택</label
              >
              (<label><input type="checkbox" /> Unix</label>
              <label><input type="checkbox" /> Linux</label>
              <label><input type="checkbox" /> Windows Server</label>
              <label><input type="checkbox" /> Network</label>)
            </div>
          </div>
        </div>
  
        <div class="inputRow box_1">
          <label>점검항목</label>
          <select bind:value={selectedAssetList} style="font-size: 14px;">
            <option value="" selected disabled>점검항목 목록</option>
            {#if planOptions.checklist_group}
              {#each planOptions.checklist_group as item}
                <option value={item.ccg_index}>{item.ccg_group}</option>
              {/each}
            {/if}
          </select>
        </div>
  
        <div class="inputRow">
          <label>점검계획내용</label>
          <textarea type="text" />
        </div>
  
        <div class="inputRow">
          <label>첨부파일</label>
          <input type="text" />
        </div>
  
        <div class="inputRow">
          <label>점검관정보</label>
          <input type="text" />
          <button class="buttons1"
          on:click="{() => {
            showErrorModal = true;
            resultErrors = resultStatus;
          }}"
          >검색</button>
        </div>
  
        <div class="inputRow">
          <label>점검스케줄</label>
          <div class="riskLevels">
            <div class="riskLevelItem page1_slect3">
              <p>수행조건</p>
              <select 
                bind:value="{assetInsertData.reserved}" >
                <option value="0">즉시</option>
                <option value="1">예약</option>
              </select>
            </div>
  
            <div class="riskLevelItem">
            </div>
  
          </div>
        </div>
  
        {#if assetInsertData.reserved == "1"}
        <div class="inputRow">
          <label></label>
          <div class="riskLevels">
            <div class="riskLevelItem">
              <p>반복주기</p>
              <input 
                style="font-size: 14px;"
                type="number"
                placeholder="반복주기지정(반복설정"
                class="w90"
                bind:value={plan_execute_interval_value}
              />
              <select 
                bind:value={repeatCycle}
              >
                <option value="hours">시</option>
                <option value="days">일</option>
                <option value="weeks">주</option>
                <option value="months">월</option>
                <option value="years">년</option>
              </select>
            </div>
  
            <div class="riskLevelItem">
              <span>반복횟수</span>
              <select bind:value="{formData.repeatPeriod}">
                <option>분</option>
                <option>시간</option>
                <option>일</option>
                <option>주</option>
                <option>월</option>
              </select>
            </div>
          </div>
        </div>
    
        <div class="inputRow">
          <label></label>
          <div class="riskLevels">
            <div class="riskLevelItem">
              <p>시작일</p>
              <input type="datetime-local" style="margin-left: 12px;" bind:value="{formData.startDate}" />
            </div>
  
            <div class="riskLevelItem">
              <span>종료일</span>
              <input type="datetime-local" style="margin-left: 12px;" bind:value="{formData.endDate}" />
            </div>
          </div>
        </div>
        {/if}
  
        <div class="inputRow">
          <label>점검명령</label>
  
          <div style="width: 100%; display:flex; gap:10px; justify-content:center">
          <label class="btn btnDownlod"
                style="display: flex; gap:5px; width:130px; font-size:12px; margin-left: 10px">
            <input
              type="file"
              class="file-input"
              on:change={(event) =>
                handleFileSelect(event)}
            />
          <img src="./assets/images/download.svg" class="excel-img" />
          <span>파일업로드</span>
          </label>
            <input
              type="text"
              placeholder="선택된 파일 없음"
              value={fileNames|| "선택된 파일 없음"}
              readonly
              class="file-name-input"
            />
          </div>
        </div>
      
        <div class="inputRow_btn">
          <label></label>
          <div class="buttons2">
            <button class="btn-primary" 
              on:click={submitNewPlan}
            >임시저장</button>
            <button class="btn-secondary">등록</button>
          </div>
        </div>
        
      </div>
    </div>

    {/if}
  </section>

</main>


{#if showModal}
  <ModalDynamic bind:showModal modalWidth="{60}" modalHeight="{700}">
    <InspectionTargetAssignment {units} {systems} {ipRanges} bind:modalData />
  </ModalDynamic>
{/if}

{#if showErrorModal}
  <ModalDynamic
    bind:showModal="{showErrorModal}"
    modalWidth="{40}"
    modalHeight="{600}"
  >
    <TargetAssignment {units} {systems} {ipRanges} bind:resultErrors />
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

  .formContainer_main {
    max-width: 100%;
    margin-top: 15px;
    overflow-y: auto;
    max-height: 70vh;
    overflow-x: hidden;
  }

  .formContainer {
    max-width: 85%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .inputRow {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
  }

  .inputRow1 {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
  }

  .inputRow_btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
  }

  .inputRow1 p {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
  }

  .box_2 {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 14px;
  }

  .box2_radio {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .box2_radio label {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  input[type="radio"],
  input[type="checkbox"] {
    margin: 0;
    accent-color: #0072fd;
  }

  .inputRow label {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
  }

  .inputRow input {
    flex: 1;
    width: 100%;
    height: 34px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
  }

  .inputRow textarea {
    flex: 1;
    width: 100%;
    height: 60px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
  }

  .box_1 {
    width: 50%;
  }

  .inputRow select {
    flex: 1;
    width: 100%;
    height: 34px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
  }

  .inputRow .page1_slect3 select {
    flex: 0.48;
  }

  .riskLevels {
    display: flex;
    column-gap: 10px;
    flex: 1;
  }

  .riskLevelItem {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 20;
    column-gap: 10px;
  }

  .riskLevelItem input {
    flex: 1;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
    box-sizing: border-box;
  }

  .riskLevelItem span {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap; /* Prevent text wrapping */
    margin: 0 10px;
  }

  .riskLevelItem p {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap; /* Prevent text wrapping */
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    .riskLevels {
      flex-direction: column;
      gap: 15px;
    }

    .riskLevelItem {
      flex-direction: row;
      align-items: center;
      min-width: unset;
    }
  }

  .inputRow .buttons1 {
    width: 72px;
    height: 34px;
    font-family: "Franklin Gothic Medium";
    color: #ffffff;
    background-color: #117ce9;
    font-weight: bold;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    border: none;
  }

  .inputRow .buttons1:hover {
    color: #ffffff;
    background-color: #354d7d;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }

  .inputRow_btn .buttons2 {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 500px;
    height: 34px;
  }

  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto;
    height: 34px;
  }

  .inputRow .btnDownlod {
    background-color: #ffffff;
    color: #555555;
    border: 1px solid #999999;
    height: 34px;
    width: 72px;
    font-family: "Malgun Gothic", sans-serif;
    border-radius: 4px;
  }

  .inputRow .btnDownlod:hover {
    background-color: #39825A;
    color: #ffffff;
    border: none;
    height: 34px;
    width: 72px;
    font-family: "Malgun Gothic", sans-serif;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-primary {
    width: 100px;
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFFFFF;
    background-color: #117CE9;
    font-weight: bold;
    }
  
  .btn-primary:hover {
    color: #FFFFFF;
    background-color: #354D7D;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-secondary {
    width: 100px;
    height: 34px;
    border-radius: 4px;
    color: #FFFFFF;
    font-size: 14px;
    background-color: #117CE9;
    font-weight: bold;
  }
  
  .btn-secondary:hover {
    background-color: #354D7D;
    color: #FFFFFF;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }

  .excel-img {
    filter: invert(45%) sepia(100%) saturate(550%) hue-rotate(195deg)
      brightness(100%) contrast(98%);
  }
</style>
