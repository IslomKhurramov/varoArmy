<script>
  import moment from "moment";

  // Hardcoded data for logData
  let resultData = [];
  let allSelected = false;

  for (let i = 0; i < 10; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "AAAA",
      ccr_item_no__ccc_item_item: "NW-06",
      ccr_item_no__ccc_item_title: "SETUID..",
      ccr_item_no__ccc_item_criteria: "취약",
      ccr_item_no__ccc_item_result: "조치승인",
    });
  }
  function selectAll(event) {
    allSelected = event.target.checked;
    selected = allSelected ? [...paginatedData] : [];
  }

  // Clear the checkboxes and reset selection states
  function clearSelection() {
    selected = [];
    allSelected = false;
    ccg_index_id = "";
    ccc_index = [];
  }
</script>

<div class="first_nenu">
  <div class="last_button">
    <select>
      <option value="미등록" selected>미등록</option>
      <option value="조치예정">조치예정</option>
    </select>
    <select>
      <option
        value="승인
        "
        selected
        >승인
      </option>
      <option
        value="반려
        "
        >반려
      </option>
      <option
        value="미결정
      "
        >미결정
      </option>
    </select>
  </div>

  <div class="tableListWrap">
    <table class="tableList hdBorder">
      <colgroup>
        <col style="width:90px;" />
        <col style="width:170px" />
        <col style="width:140px" />
        <col style="width: 200px;" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="text-center">점검분야 </th>
          <th class="text-center">자산명 </th>
          <th class="text-center">점검항목</th>
          <th class="text-center">점검명</th>
          <th class="text-center">점검결과 </th>
          <th class="text-center">처리유형 </th>
        </tr>
      </thead>
      <tbody>
        {#each resultData as data, index}
          <tr> </tr><tr>
            <td class="text-center">{resultData.length - index}</td>

            <td class="text-center">
              {data?.ast_uuid__ass_uuid__ast_hostname}
            </td>
            <td class="text-center">
              <div>
                {data?.ccr_item_no__ccc_item_no}
              </div>
            </td>
            <td class="text-center">
              {data.ccr_item_no__ccc_item_item}
            </td>
            <td> {data.ccr_item_no__ccc_item_title}</td>
            <td class="text-center">{data.ccr_item_no__ccc_item_criteria} </td>
            <td class="text-center">{data.ccr_item_no__ccc_item_result} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .first_nenu {
    margin-top: 10px;
  }

  thead {
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick the header to the top */
    z-index: 10; /* Ensure the header is above the scrolling content */
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); /* Shadow effect for separation */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table th {
    /* background-color: #aaaaaa;
        color: white; */
    font-weight: bold;
  }
  table th,
  table td {
    padding: 10px;
    /* text-align: center; */
    font-size: 12px;
    /* height: 40px; */
  }
  table td {
    font-weight: normal;
    height: 40px;
  }

  .tableListWrap {
    height: 60vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
  }

  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }

  .last_button {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
  }
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
</style>
