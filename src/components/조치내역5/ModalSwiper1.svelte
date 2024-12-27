<script>
  import { setSpecificItemResultsChange } from "../../services/callApi";
  import { successAlert } from "../../shared/sweetAlert";

  export let closeShowModal;
  export let activeAsset;
  export let fetchPaginatedData;

  let asset_target_uuid = activeAsset.ast_uuid;
  let plan_index = activeAsset.ccp_index;
  let approved = activeAsset?.cfi_fix_status__cvs_index?.toString() || "";
  let approved_targets = "ONE";
  let approved_comment = "";
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
        {#if activeAsset}
          <tr>
            <th class="center-align">평가항목</th>
            <td class="line-height"
              >[{activeAsset.ccr_item_no__ccc_item_no}]{activeAsset.ccr_item_no__ccc_item_title}</td
            >
          </tr>
          <tr>
            <th class="center-align">평가기준</th>
            <td class="line-height"
              >{@html activeAsset.ccr_item_no__ccc_item_criteria.replace(
                /\n/g,
                "<br/>"
              )}</td
            >
          </tr>
          <tr>
            <th class="center-align">조치일</th>
            <td class="line-height"
              >{activeAsset.ast_uuid__ass_uuid__ast_lastconnect}</td
            >
          </tr>
          <tr>
            <th class="center-align">수행담당관</th>
            <td class="line-height"
              >{activeAsset.ast_uuid__ass_uuid__ast_operator_person}</td
            >
          </tr>
          <tr>
            <th class="center-align">점검결과</th>
            <td>
              <div style="display: flex; flex-direction:raw; gap:10px">
                <div class="box2_radio">
                  <label>
                    <input
                      type="radio"
                      name="approvalStatus"
                      value="1"
                      bind:group={approved}
                      checked={approved === "1"}
                    />
                    승인
                  </label>
                </div>
                <div class="box2_radio">
                  <label>
                    <input
                      type="radio"
                      name="approvalStatus"
                      value="0"
                      bind:group={approved}
                      checked={approved === "0"}
                    />
                    반려
                  </label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <th class="center-align">변경사유</th>
            <td class="line-height"
              ><textarea style="width: 100%;" bind:value={approved_comment}
              ></textarea></td
            >
          </tr>
        {:else}
          <tr>
            <td class="line-height" colspan="2">데이터 없음</td>
          </tr>
        {/if}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between">
      {#if closeShowModal}
        <div
          style="display:flex; flex-direction:row; width:100%; justify-content:center; gap:10px;align-items:center;"
        >
          <button class="btnSave">변경하기</button>
          <button class="btnDone" on:click={closeShowModal}>닫기</button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  * {
    font-size: 14px;
  }
  .box2_radio {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 75px;
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
