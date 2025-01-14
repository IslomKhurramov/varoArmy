<script>
  export let closeShowModal;
  export let resultStatus;

  // let sortPoint = "ASC";
  // let sortHost = "ASC";
  // let sorted = false;

  // function sortData(field, sort, setSort) {
  //   if (sort === "ASC") {
  //     resultStatus.assets_info = resultStatus?.assets_info.sort(
  //       (a, b) => {
  //         if (typeof a[field] === "string") {
  //           return a[field].localeCompare(b[field]);
  //         }
  //         return a[field] - b[field];
  //       }
  //     );
  //     setSort("DESC");
  //   } else {
  //     resultStatus.assets_info = resultStatus?.assets_info.sort(
  //       (a, b) => {
  //         if (typeof a[field] === "string") {
  //           return b[field].localeCompare(a[field]);
  //         }
  //         return b[field] - a[field];
  //       }
  //     );
  //     setSort("ASC");
  //   }
  // }

  // $: {
  //   if (
  //     !sorted &&
  //     resultStatus?.assets_info &&
  //     resultStatus?.assets_info?.length !== 0 &&
  //     resultStatus?.assets_info
  //   ) {
  //     // uploadStatusModalData.uploaded_status =
  //     //   uploadStatusModalData?.uploaded_status.sort((a, b) => {
  //     //     return a.ast_security_point - b.ast_security_point;
  //     //   });
  //     resultStatus.assets_info = resultStatus?.assets_info.sort(
  //       (a, b) => {
  //         return b.hostname.localeCompare(a.hostname);
  //       }
  //     );
  //     sorted = true;
  //   }
  // }
</script>

<div class="tableListWrap">
  <h4 style="text-align: center;">결과 미등록 자산 내역</h4>

  <div class="modal_page2">
    <table class="tableList hdBorder" style="font-size: 14px;">
      <colgroup>
        <col style="width:10%;" />
        <col style="width:15%;" />
        <col style="width:15%;" />
        <col style="width:15%;" />
        <col style="width:20%;" />
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">순번</th>
          <th class="text-center">호스트명 </th>
          <th class="text-center">아이피주소</th>
          <th class="text-center">점검대상</th>
          <th class="text-center">보안점수</th>
        </tr>
      </thead>
      <tbody>
        {#each resultStatus?.assets_info as data, index}
          <tr>
            <td class="text-center"
              >{resultStatus?.assets_info.length - index}</td
            >
            <td>{data?.ast_uuid__ass_uuid__ast_hostname}</td>
            <td>{data?.ast_uuid__ass_uuid__ast_ipaddr}</td>
            <td>{data?.ast_uuid__ast_target__cct_target}</td>
            <td>
              {data?.ast_security_point > 0
                ? `${data?.ast_security_point}%`
                : "결과미등록"}
            </td></tr
          >
        {/each}
      </tbody>
    </table>
  </div>
  <div class="lastBtn">
    <button class="btnDone" on:click="{closeShowModal}">닫기</button>
  </div>
</div>

<style>
  .lastBtn {
    width: 100%;
    display: flex;
    justify-content: center;
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
</style>
