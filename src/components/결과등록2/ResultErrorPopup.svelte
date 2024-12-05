<script>
    export let modalErrorData;
  
  
    $: {
      console.log("modalData:", modalErrorData);
    }
  
    let tableData = [
    {
      systemName: 'xxxxxxxx',
      inspectionField: 'WINDOWS',
      operatingSystem: 'Windows2012',
      hostName: 'aaaaaa',
      ipInfo: '192.168.0.x',
      agent: 'O',
      connectionStatus: '연결안됨',
      errorDetails: '-',
      registrationStatus: '미등록' 
    },
    {
      systemName: 'xxxxxxxx',
      inspectionField: 'LINUX',
      operatingSystem: 'Ubuntu 22.02',
      hostName: 'aaaaaa',
      ipInfo: '192.168.0.x',
      agent: 'X',
      connectionStatus: '미연결', 
      errorDetails: '-',
      registrationStatus: '미등록'
    },
    {
      systemName: 'xxxxxxxx',
      inspectionField: 'LINUX',
      operatingSystem: 'Ubuntu 22.02',
      hostName: 'aaaaaa',
      ipInfo: '192.168.0.x',
      agent: 'X',
      connectionStatus: '미연결', 
      errorDetails: '-',
      registrationStatus: '미등록'
    }
  ];
  </script>
  
  <div class="tableListWrap" style="padding: 0;">
  <h4 style="text-align: center;">결과정보 등록실패 내역</h4>
  
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
          <th class="text-center">점검분야 </th>
          <th class="text-center">운영체제 </th>
          <th class="text-center">호스트명</th>
          <th class="text-center">아이피정보</th>
          <th class="text-center">등록실패사유 </th>
          <th class="text-center">재실행요청</th>
        </tr>
      </thead>
      <tbody>
        {#each tableData as data, index}
          <tr>
            <td class="text-center">
              {data?.systemName}
            </td>
            <td class="text-center">
              <div>
                {data?.inspectionField}
              </div>
            </td>
            <td class="text-center">
              {data.operatingSystem}
            </td>
            <td class="text-center">
              {data.hostName}</td>
            <td class="text-center">
              {data.ipInfo}
            </td>
            <td class="text-center">
              {data.agent}
            </td>
            <td class="text-center">
                <button class=" btn-box_12">재실행 </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <style>
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
    table th {
      font-weight: bold;
    }
    table th,
    table td {
      padding: 10px;
      font-size: 12px;
    }
    table td {
      font-weight: normal;
      height: 40px;
    }
  
    .tableListWrap {
      height: 50vh;
      overflow-y: auto;
    }
  
    tr:hover {
      cursor: pointer;
      background-color: #f4f4f4;
      transition-duration: 0.3s;
    }

    .btn-box_12 {
    width: 74px;
    height: 34px;
    display: flex;
    float: right;
    margin-top: 20px;
    margin-left: 10px;
    color: #999999;
    background-color: #FFFFFF;
    border: 1px solid #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .btn-box_12:hover {
    opacity: 0.9;
    color: #FFFFFF;
    background-color: #333333;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }
  </style>
  