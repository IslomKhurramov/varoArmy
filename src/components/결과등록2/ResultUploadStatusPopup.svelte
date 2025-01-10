<script>
  export let closeShowModal;
  // export let resultStatus;

  // let sortPoint = "ASC";
  // let sortHost = "ASC";
  // let sorted = false;

  // function sortData(field, sort, setSort) {
  //   if (sort === "ASC") {
  //     resultStatus.uploaded_status = resultStatus?.uploaded_status.sort(
  //       (a, b) => {
  //         if (typeof a[field] === "string") {
  //           return a[field].localeCompare(b[field]);
  //         }
  //         return a[field] - b[field];
  //       }
  //     );
  //     setSort("DESC");
  //   } else {
  //     resultStatus.uploaded_status = resultStatus?.uploaded_status.sort(
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
  //     resultStatus?.uploaded_status &&
  //     resultStatus?.uploaded_status?.length !== 0 &&
  //     resultStatus?.uploaded_status
  //   ) {
  //     // uploadStatusModalData.uploaded_status =
  //     //   uploadStatusModalData?.uploaded_status.sort((a, b) => {
  //     //     return a.ast_security_point - b.ast_security_point;
  //     //   });
  //     resultStatus.uploaded_status = resultStatus?.uploaded_status.sort(
  //       (a, b) => {
  //         return b.hostname.localeCompare(a.hostname);
  //       }
  //     );
  //     sorted = true;
  //   }
  // }

  const resultStatus = {
    uploaded_status: [
      {
        hostname: "Server01",
        ipaddr: "192.168.1.1",
        target: "SECURITY",
        checklist_count: 5,
        uploaded_result_count: 4,
        error_details: "No Errors",
        agent_status: "Active",
        connection_status: "Connected",
        registration_status: "Registered",
      },
      {
        hostname: "Server02",
        ipaddr: "192.168.1.2",
        target: "UNIX",
        checklist_count: 7,
        uploaded_result_count: 6,
        error_details: "Timeout Error",
        agent_status: "Inactive",
        connection_status: "Disconnected",
        registration_status: "Not Registered",
      },
      {
        hostname: "Server03",
        ipaddr: "192.168.1.3",
        target: "WINDOWS",
        checklist_count: 10,
        uploaded_result_count: 10,
        error_details: "No Errors",
        agent_status: "Active",
        connection_status: "Connected",
        registration_status: "Registered",
      },
      {
        hostname: "Server04",
        ipaddr: "192.168.1.4",
        target: "NETWORK",
        checklist_count: 8,
        uploaded_result_count: 5,
        error_details: "Packet Loss Detected",
        agent_status: "Active",
        connection_status: "Connected",
        registration_status: "Partially Registered",
      },
      {
        hostname: "Server05",
        ipaddr: "192.168.1.5",
        target: "DATABASE",
        checklist_count: 3,
        uploaded_result_count: 0,
        error_details: "Database Not Found",
        agent_status: "Inactive",
        connection_status: "Disconnected",
        registration_status: "Not Registered",
      },
    ],
  };
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
        {#each resultStatus?.uploaded_status as data, index}
          <tr>
            <td class="text-center"
              >{resultStatus?.uploaded_status.length - index}</td
            >
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
