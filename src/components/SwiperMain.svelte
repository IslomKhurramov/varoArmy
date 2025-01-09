<script>
  import { onMount } from "svelte";
  import { confirmDelete, successAlert } from "../shared/sweetAlert";
  import { setDeletePlan, setPlanChange } from "../services/callApi";
  import ModalMain from "./ModalMain.svelte";
  export let selectedData;
  export let getPlanList;
  $: console.log("selected data ", selectedData);

  // Function to format date from ISO 8601 to YYYY-MM-DD
  function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // returns YYYY-MM-DD
  }
  let showModal = false;

  function closeShowModal() {
    showModal = false;
  }
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeShowModal();
    }
  }

  function formatDateTime(date) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } // Create FormData and append values

  async function updatePlan() {
    try {
      // Reinitialize FormData within updatePlan
      let formData = new FormData();
      formData.append("ccp_index", selectedData?.ccp_index || "");
      formData.append("ccp_title", selectedData.ccp_title || "");
      formData.append(
        "plan_planer_info",
        selectedData?.plan_planer_info_id || ""
      );
      formData.append(
        "plan_start_date",
        formatDateTime(selectedData.plan_start_date) || ""
      );
      formData.append(
        "plan_end_date",
        formatDateTime(selectedData.plan_end_date) || ""
      );

      // Convert plan_execution_type to 1 or 0
      formData.append(
        "plan_execution_type",
        selectedData.plan_execution_type ? 1 : 0
      );

      // Handle interval and term
      formData.append(
        "plan_execute_interval_value",
        parseInt(selectedData.plan_execute_interval_value) || 0
      );
      formData.append(
        "plan_execute_interval_term",
        selectedData.plan_execute_interval_unit || ""
      );

      formData.append(
        "plan_name_repeat_rule_type",
        parseInt(selectedData.plan_name_repeat_rule_type) || 1
      );
      formData.append(
        "plan_name_repeat_rule",
        selectedData.plan_name_repeat_rule || ""
      );
      formData.append("fix_date_setup", 1); // Default to 1
      formData.append("fix_start_date", selectedData.fix_start_date || "");
      formData.append("fix_end_date", selectedData.fix_end_date || "");
      formData.append(
        "fix_conductor_info",
        selectedData?.fix_conductor_info_id || ""
      );

      console.log("Sending FormData for update:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await setPlanChange(formData);

      if (response.RESULT === "OK") {
        console.log("Update Successful:", response.CODE);
        successAlert(response.CODE);

        // Fetch the updated data
        await getPlanList();
      } else {
        console.error("Update Failed:", response.CODE);
      }
    } catch (err) {
      console.error("Error during update:", err.message);
    }
  }

  function formatKoreanDate(date) {
    const d = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(d);
  }

  async function deletePlan() {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;
    try {
      const response = await setDeletePlan(selectedData.ccp_index);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        loading = true;
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

<div class="contentArea">
  <div class="formContainer">
    <div class="main_box_page5">
      <!-- 평가수행부대 -->
      <div style="display: flex; flex-direction: column;">
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>점검계획제목</label>
            <input bind:value="{selectedData.ccp_title}" type="text" />
          </div>
          <div class="inputRow">
            <label>점검기간</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <input
                  bind:value="{selectedData.plan_start_date}"
                  type="datetime-local"
                />
                ~
                <input
                  bind:value="{selectedData.plan_end_date}"
                  type="datetime-local"
                />
              </div>

              <div class="riskLevelItem">
                <label>점검분류</label>
                <span class="span-input"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 취약점정보 -->
      <div style="display: flex; flex-direction: column;">
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>상태</label>
            <span class="span-input"></span>
          </div>
          <div class="inputRow">
            <label>등록일</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input">
                  {selectedData?.ccp_cdate
                    ? formatKoreanDate(selectedData.ccp_cdate)
                    : ""}
                </span>
              </div>
              <div class="riskLevelItem">
                <label>기안자</label>
                <span class="span-input"
                  >{selectedData?.plan_planer_info__user_name || ""}</span
                >
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>점검체계</label>
            <span class="span-input"></span>
          </div>

          <div class="inputRow">
            <label>점검체계</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input"></span>
              </div>
              <div class="riskLevelItem">
                <button class="btnUpload">변경</button>
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>점검계획내용</label>
            <span class="span-input"
              >{selectedData?.plan_name_repeat_rule || ""}</span
            >
          </div>

          <div class="inputRow">
            <label>첨부파일</label>
            <span class="span-input"></span>
          </div>

          <div class="inputRow">
            <label>점검관정보</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input"></span>
              </div>
              <div class="riskLevelItem">
                <button class="btnUpload">변경</button>
                <button class="btnUpload" on:click="{() => (showModal = true)}"
                  >변경이력</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 자동점검 스케쥴 -->
      <div
        style="display: flex; flex-direction: column; row-gap: 10px; border: 1px solid rgb(204, 204, 204); padding: 20px;"
      >
        <div class="inputRow">
          <label>자동점검 스케쥴</label>
          <div
            style="display: flex; flex-direction:column; width:100%; gap:10px"
          >
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span
                  class="span-input"
                  style="display: flex; align-items:center;"
                >
                  <label>수행조건</label>
                  <select
                    style="width: 45%;"
                    bind:value="{selectedData.plan_execution_type}"
                  >
                    <option value="{true}">즉시</option>
                    <option value="{false}">예약</option>
                  </select>

                  <!-- 반복주기 (Repeat Frequency) -->
                  <select
                    style="width: 45%;"
                    bind:value="{selectedData.plan_execute_interval_value}"
                  >
                    <option value="1회">1회</option>
                    <option value="반복">반복</option>
                  </select>
                </span>
              </div>
              <div class="riskLevelItem">
                <label style="display: flex; align-items:center;"
                  >반복주기</label
                >
                <input
                  style="width: 45%;"
                  type="text"
                  bind:value="{selectedData.plan_execute_interval_value}"
                  placeholder="값을 입력하세요"
                />
                <select
                  style="width: 45%;"
                  bind:value="{selectedData.plan_execute_interval_unit}"
                >
                  <option value="시">시</option>
                  <option value="일">일</option>
                  <option value="주">주</option>
                  <option value="월">월</option>
                  <option value="년">년</option>
                </select>
              </div>
            </div>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span
                  class="span-input"
                  style="display: flex; align-items:center;"
                >
                  <label>시작일</label>
                  <input
                    bind:value="{selectedData.fix_start_date}"
                    style="width: 93%;"
                    type="date"
                    placeholder="{selectedData?.fix_start_date || ''}"
                  />
                </span>
              </div>
              <div class="riskLevelItem">
                <span
                  style="display: flex; align-items:center;"
                  class="span-input"
                >
                  <label>종료일</label>
                  <input
                    bind:value="{selectedData.fix_end_date}"
                    style="width: 93%;"
                    type="date"
                    placeholder="{selectedData?.fix_end_date || ''}"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 저장 버튼 -->
    </div>
  </div>
  <div
    style="display: flex; flex-direction: column; row-gap: 10px; margin-top:10px"
  >
    <div class="inputRow">
      <button class="btn-primary">보고서 </button>
      <button class="btn-primary" on:click="{updatePlan}">업데이트</button>
      <button class="btn-primary" on:click="{deletePlan}">삭제</button>
    </div>
  </div>
</div>
{#if showModal}
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
      <ModalMain {closeShowModal} {selectedData} />
    </dialog>
  </div>
{/if}

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
  .formContainer {
    max-width: 100%;
    margin-top: 15px;
    overflow-y: auto;
    height: 72vh;
    overflow-x: hidden;
  }

  .main_box_page5 {
    max-width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .main_header {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .inputRow {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
  }

  .inputRow label {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
  }

  .inputRow span {
    flex: 1;
    width: 100%;
    /* height: 34px; */
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
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
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap; /* Prevent text wrapping */
    /* margin: 0 20px; */
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

  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto;
    height: 34px;
  }

  .btn-primary {
    width: 100px;
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
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

  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-primary {
    width: 74px;
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
    color: #ffffff;
    background-color: #117ce9;
    border: none;
    font-weight: bold;
  }

  .btn-primary:hover {
    color: #ffffff;
    background-color: #354d7d;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  .excel-img {
    filter: invert(45%) sepia(100%) saturate(550%) hue-rotate(195deg)
      brightness(100%) contrast(98%);
  }
</style>
