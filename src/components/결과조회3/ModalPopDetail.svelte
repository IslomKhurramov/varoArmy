<script>
  import { viewPlanResult } from "../../services/store";

    export let closeShowModal;
    export let selectedData;
    let selectedCategory = "Network Security Check";
    let selectedItem = {
      ccc_item_no: "NSC-001",
      ccc_item_group: "Firewall",
      ccc_check_purpose:
        "Ensure the firewall is configured correctly to block unauthorized access.",
      ccc_security_threat:
        "Unsecured network traffic could lead to unauthorized access and data breaches.",
    };
  </script>
  
  <div class="modal">
    <div
      style="height: 298pxpx; 
      padding-bottom: 10px;
    "
    >
      <table>
        <colgroup>
          <col style="width: 60px;" />
          <col style="width:80%" />
        </colgroup>
        <tr style="height: 50px; position: sticky;top: -1px;">
          <th
            class="center-align"
            style="color: black;font-weight:bold;background: #F2F2F2; border-radius:4px"
            >구분</th
          >
          <th
            class="center-align"
            style="border-radius:4px; color: black; font-weight:bold; background: #F2F2F2;"
            >설명
          </th>
        </tr>
        <tbody>
            <tr>
              <td class="text-center">CCP 인덱스</td>
              <td>{selectedData.ccr_index}</td>
            </tr>
            <tr>
              <td class="text-center">점검 항목 번호</td>
              <td>{selectedData.ccr_item_no__ccc_item_no}</td>
            </tr>
            <tr>
              <td class="text-center">점검 항목 제목</td>
              <td>{selectedData.ccr_item_no__ccc_item_title}</td>
            </tr>
            <tr>
              <td class="text-center">점검 내용</td>
              <td>{selectedData.ccr_item_no__ccc_check_content}</td>
            </tr>
            <tr>
              <td class="text-center">점검 목적</td>
              <td>{selectedData.ccr_item_no__ccc_check_purpose}</td>
            </tr>
            <tr>
              <td class="text-center">점검 영향</td>
              <td>{selectedData.ccr_item_no__ccc_impact}</td>
            </tr>
            <tr>
              <td class="text-center">점검 항목 기준</td>
              <td>{@html selectedData.ccr_item_no__ccc_item_criteria.replace(/\n/g, "<br/>")}</td>
            </tr>
            <tr>
              <td class="text-center">점검 항목 수준</td>
              <td>{selectedData.ccr_item_no__ccc_item_level}</td>
            </tr>
            <tr>
              <td class="text-center">점검 항목 그룹</td>
              <td>{selectedData.ccr_item_no__ccc_item_group}</td>
            </tr>
            <tr>
              <td class="text-center">취약성 결과</td>
              <td>{selectedData.ccr_item_result}</td>
            </tr>
            <tr>
              <td class="text-center">점검 상태</td>
              <td>{selectedData.ccr_item_status}</td>
            </tr>
            <tr>
              <td class="text-center">보안 위협</td>
              <td>{selectedData.ccr_item_no__ccc_security_threat}</td>
            </tr>
            <tr>
              <td class="text-center">대상 시스템</td>
              <td>{selectedData.ccr_item_no__ccc_target_system}</td>
            </tr>
            <tr>
              <td class="text-center">자산 UUID</td>
              <td>{selectedData.ast_uuid__ass_uuid}</td>
            </tr>
            <tr>
              <td class="text-center">자산 호스트명</td>
              <td>{selectedData.ast_uuid__ass_uuid__ast_hostname}</td>
            </tr>
            <tr>
              <td class="text-center">자산 대상</td>
              <td>{selectedData.ast_uuid__ast_target__cct_target}</td>
            </tr>
            <tr>
              <td class="text-center">완화 예시</td>
              <div class="longData">

                  <td style="width: 100%;">{@html selectedData.ccr_item_no__ccc_mitigation_example.replace(/\n/g, "<br/>")}</td>
              </div>
            </tr>
            <tr>
              <td class="text-center">완화 방법</td>
              <td>{selectedData.ccr_item_no__ccc_mitigation_method}</td>
            </tr>
          </tbody>
      </table>
      <div style="display: flex; justify-content: space-between">
        {#if closeShowModal}
          <div
            style="display:flex; flex-direction:row; width:100%; justify-content:center; gap:10px;align-items:center;"
          >
            <button class="btnDone" on:click="{closeShowModal}">닫기</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    * {
      font-size: 14px;
    }
    .longData{
        max-height: 180px;
        width: 100%;
        overflow-y: auto;
    }
    .center-align {
      text-align: center;
    }
  
    .line-height {
      line-height: 23px;
    }
    .modal {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      height: 93%;
      overflow: auto;
      /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
      /* max-width: 800px;
          margin: 20px auto; */
      font-family: Arial, sans-serif;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-bottom: 20px;
    }
  
    th,
    td {
      border: 1px solid #ddd;
      padding: 12px 15px;
      text-align: left;
      vertical-align: middle;
    }
  
    th {
      background-color: #f7fafc;
      font-weight: bold;
      color: #000000;
      width: 15px;
    }
  
    .mitigation-table tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
    .btn {
      padding: 10px 20px; /* Padding for buttons */
      border: none; /* Remove default border */
      border-radius: 5px; /* Rounded corners */
      font-size: 16px; /* Font size */
      cursor: pointer; /* Pointer cursor on hover */
      transition:
        background-color 0.3s,
        transform 0.2s; /* Transition effects */
      outline: none; /* Remove outline on focus */
    }
  
    .modify-btn {
      background-color: #4caf50; /* Green background for modify button */
      color: white; /* White text */
    }
  
    .modify-btn:hover {
      background-color: #45a049; /* Darker green on hover */
      transform: translateY(-2px); /* Lift effect on hover */
    }
  
    td {
      width: 230px;
    }
  
    .btn {
      padding: 8px 15px; /* Button padding */
      border: 1px solid #007bff; /* Button border */
      background-color: #007bff; /* Button background */
      color: white; /* Button text color */
      cursor: pointer;
    }
  
    .btn:hover {
      background-color: #0056b3; /* Darker background on hover */
    }
  
    /* Button styles */
    .btn {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition:
        background-color 0.3s,
        transform 0.2s;
    }
  
    .modify-btn {
      background-color: #4caf50;
      color: white;
    }
  
    .modify-btn:hover {
      background-color: #45a049;
      transform: translateY(-2px);
    }
  
    .delete-btn {
      background-color: #f44336;
      color: white;
    }
  
    td {
      font-size: 16px;
    }
  </style>
  