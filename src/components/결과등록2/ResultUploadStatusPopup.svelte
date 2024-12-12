<script>
  export let uploadStatusModalData;

  let sortPoint = "ASC";
  let sortHost = "ASC";
  let sorted = false;

  function sortData(field, sort, setSort) {
    if (sort === "ASC") {
      uploadStatusModalData.uploaded_status =
        uploadStatusModalData?.uploaded_status.sort((a, b) => {
          if (typeof a[field] === "string") {
            return a[field].localeCompare(b[field]);
          }
          return a[field] - b[field];
        });
      setSort("DESC");
    } else {
      uploadStatusModalData.uploaded_status =
        uploadStatusModalData?.uploaded_status.sort((a, b) => {
          if (typeof a[field] === "string") {
            return b[field].localeCompare(a[field]);
          }
          return b[field] - a[field];
        });
      setSort("ASC");
    }
  }

  $: {
    if (
      !sorted &&
      uploadStatusModalData?.uploaded_status &&
      uploadStatusModalData?.uploaded_status?.length !== 0 &&
      uploadStatusModalData?.uploaded_status
    ) {
      // uploadStatusModalData.uploaded_status =
      //   uploadStatusModalData?.uploaded_status.sort((a, b) => {
      //     return a.ast_security_point - b.ast_security_point;
      //   });
      uploadStatusModalData.uploaded_status =
        uploadStatusModalData?.uploaded_status.sort((a, b) => {
          return b.hostname.localeCompare(a.hostname);
        });
      sorted = true;
    }
  }
</script>

<div class="tableListWrap">
  <h4 style="text-align: center;">결과 미등록 자산 내역</h4>

  <div class="modal_page2">
    
      <table class="tableList hdBorder" style="font-size: 14px;">
        <colgroup>
          <col style="width:5%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
          <col style="width:20%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
        </colgroup>
        <thead>
          <tr>
            <th class="text-center">순번</th>
            <th class="text-center">점검분야</th>
            <th class="text-center">운영체제</th>
            <th class="text-center">호스트명</th>
            <th class="text-center">아이피정보</th>
            <th class="text-center">에이전트</th>
            <th class="text-center">연결상태</th>
            <th class="text-center">에러내역</th>
            <th class="text-center">등록현황</th>
          </tr>
        </thead>
        <tbody>
          {#each uploadStatusModalData?.uploaded_status as data, index}
            <tr>
              <td class="text-center">{uploadStatusModalData?.uploaded_status.length - index}</td>
              <td class="text-center">{data?.hostname}</td>
              <td class="text-center">{data?.ipaddr}</td>
              <td class="text-center">{data?.target}</td>
              <td class="text-center">{data?.checklist_count}</td>
              <td class="text-center">{data?.uploaded_result_count}</td>
              <td class="text-center">{data?.uploaded_result_count}</td>
              <td class="text-center">{data?.uploaded_result_count}</td>
              <td class="text-center">{data?.uploaded_result_count}</td>
            </tr>
          {/each}
        </tbody>
      </table>

  </div>
</div>

<style>
  .tableListWrap {
    position: relative;
    max-height: 70vh;
    padding: 0%;
  }
  
  .modal_page2 {
    overflow-y: auto;
    max-height: 40vh;

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
</style>

