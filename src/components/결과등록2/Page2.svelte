
<script>
    let inspectionTitle = "23 교육사 국방정보체계 취약점 점검";
    let inspectionPeriod = "2024-01-01 ~ 2024-03-01";
    let inspectionCategory = "긴급점검";
  
    let tableData = [
      { category: "에이전트 (100)", unix: 10, windows: 70, network: 0, dbms: "-", pc: "-", errors: 3, total: "80%" },
      { category: "비에이전트 (10)", unix: 1, windows: 0, network: 7, dbms: "-", pc: "-", errors: "-", total: "90%" },
      { category: "미등록자산", unix: "-", windows: "-", network: "-", dbms: "-", pc: "-", errors: "-", total: "-" },
    ];

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
    ];
  </script>
  
  <div class="inspection-container">
    <!-- Header -->
    <div class="inputRow box_1">
        <label>점검항목</label>
        <select class="inputRow"
        id="asset_group"
        >
        {#each mainItems as item, index}
            <option value="UNIX">{item.title}</option>
        {/each}
          </select>
      </div>
  
    <!-- Registration Status -->
    <div class="tableListWrap">
      <h4>등록현황</h4>
      <table class="tableList hdBorder">
               <colgroup>
            <col style="width:14%;" />
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
            <th>등록대상</th>
            <th>UNIX</th>
            <th>WINDOWS</th>
            <th>NETWORK</th>
            <th>DBMS</th>
            <th>PC</th>
            <th>등록오류</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          {#each tableData as row}
            <tr>
              <td>{row.category}</td>
              <td>{row.unix}</td>
              <td>{row.windows}</td>
              <td>{row.network}</td>
              <td>{row.dbms}</td>
              <td>{row.pc}</td>
              <td>{row.errors}</td>
              <td>{row.total}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="buttons">
        <button class="btn btn-primary">결과미등록자산</button>
        <button class="btn btn-secondary">등록실패내역</button>
      </div>
    </div>
  
    <!-- File Upload Section -->
    <div class="upload-section">
      <div class="upload-box">
        <button class="upload-button">JSON 파일등록<br>(멀티파일등록가능)</button>
      </div>
      <div class="upload-box">
        <button class="upload-button">네트워크 설정파일등록<br>(멀티파일등록가능)</button>
      </div>
      <div class="upload-box">
        <button class="upload-button">수기등록<br>.EXCEL 파일만 허용</button>
      </div>
      <div class="upload-submit">
        <button class="btn btn-upload">업로드</button>
      </div>
    </div>
  </div>
  
  <style>
    .inspection-container {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .inputRow {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }

    .inputRow label {
      width: 120px;
      font-weight: 600;
      font-size: 14px;
    }

    .box_1 {
      width: 70%;
    }

    .inputRow select {
      flex: 1;
      width: 100%;
      height: 34px;
      padding: 17px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      font-size: 12px;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
  
    table th,
    table td {
      padding: 10px;
      text-align: center;
    }
  
    table th {
      background-color: #AAAAAA;
      color: white;
    }
  
    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      width: auto;
      height: 34px;
    }
  
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: auto;
      height: 34px;
    }
  
    .btn-primary {
        width: auto;
        height: 34px;
        font-size: 14px;
      color: #333333;
      border: 1px solid #333333;
      font-weight: bold;
    }
  
    .btn-primary:hover {
      color: #FFFFFF;
      background-color: #333333;
      border: none;
      font-weight: bold;
      font-size: 14px;
      border-radius: 4px;
    }
  
    .btn-secondary {
        width: auto;
        height: 34px;
        color: #333333;
        font-size: 14px;
      border: 1px solid #333333;
      font-weight: bold;
    }
  
    .btn-secondary:hover {
        width: auto;
        height: 34px;
      background-color: #c43840;
      color: #FFFFFF;
      border: none;
      font-weight: bold;
      font-size: 14px;
      border-radius: 4px;
    }
  
    .upload-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 20px;
    }
  
    .upload-box {
      text-align: center;
    }
  
    .upload-button {
      width: 100%;
      padding: 20px;
      background-color: #ddd;
      border: 1px solid #ccc;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  
    .upload-button:hover {
      background-color: #ccc;
    }
  
    .upload-submit {
      grid-column: 1 / -1;
      text-align: center;
    }
  
    .btn-upload {
      width: auto;
      height: 24px;
      color: #999999;
      background-color: #FFFFFF;
      border: 1px solid #999999;
      font-weight: bold;
      border-radius: 2px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .btn-upload:hover {
      opacity: 0.9;
      color: #FFFFFF;
      background-color: #5F7AB0;
      border: none;
      font-weight: bold;
      font-size: 12px;
      border-radius: 2px;
      
    }

    .tableListWrap {
    overflow-y: auto;
    max-height: 65vh;
  }

  .tableListWrap {
    overflow: visible;
    position: relative;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }

  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }
  </style>
  