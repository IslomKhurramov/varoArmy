<script>
  export let resultErrors;
  export let closeshowErrorModal;

  // $: {
  //   console.log("modalData:", modalErrorData);
  // }
</script>

<div class="tableListWrap" style="padding: 0;">
  <h4 style="text-align: center;">결과정보 등록실패 내역</h4>

  <div class="modal_page2">
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
          <th class="text-center">체계명</th>
          <th class="text-center">점검분야</th>
          <th class="text-center">운영체제</th>
          <th class="text-center">호스트명</th>
          <th class="text-center">아이피정보</th>
          <th class="text-center">등록실패사유</th>
          <th class="text-center">재실행요청</th>
        </tr>
      </thead>
      <tbody>
        {#each resultErrors as data, index}
          <tr>
            <!-- 체계명 (System Name) -->
            <td class="text-center">
              {data?.systemName || "N/A"}
              <!-- Default placeholder if no system name -->
            </td>

            <!-- 점검분야 (Inspection Field) -->
            <td class="text-center">
              {data?.clf_target || "N/A"}
            </td>

            <!-- 운영체제 (Operating System) -->
            <td class="text-center">
              {data?.os || "N/A"}
              <!-- Add OS info here if available -->
            </td>

            <!-- 호스트명 (Hostname) -->
            <td class="text-center">
              {data?.clf_hostname || "N/A"}
            </td>

            <!-- 아이피정보 (IP Address) -->
            <td class="text-center">
              {data?.clf_ipaddr || "N/A"}
            </td>

            <!-- 등록실패사유 (Registration Failure Reason) -->
            <td class="text-center">
              {data?.clf_etc || "이유가 제공되지 않았습니다"}
            </td>

            <!-- 재실행요청 (Retry Request) -->
            <td class="text-center">
              <div class="table_modal_btn">
                <button class="btn-box_12" on:click="{() => handleRetry(data)}"
                  >재실행</button
                >
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="lastButtons">
    <button class="btnUpload" style="width:120px">전체일괄재실행 </button>
    <button class="btnDone" on:click="{closeshowErrorModal}">닫기 </button>
  </div>
</div>

<style>
  .lastButtons {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    padding: 10px;
    gap: 10px;
  }
  .tableListWrap {
    position: relative;
  }

  .modal_page2 {
    overflow-y: auto;
    max-height: 380px;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }

  table th,
  table td {
    padding: 10px;
    font-size: 14px;
    text-align: center;
  }

  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }

  .table_modal_btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table_modal_btn .btn-box_12 {
    width: 74px;
    height: 28px;
    color: #999999;
    background-color: #ffffff;
    border: 1px solid #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .btn-box_12:hover {
    opacity: 0.9;
    color: #ffffff;
    background-color: #333333;
    border: none;
    font-weight: bold;
    font-size: 12px;
    border-radius: 4px;
  }
</style>
