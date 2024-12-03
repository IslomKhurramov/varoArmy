<script>
      let formData = {
    planTitle: "",
    inspectionPeriod: "",
    category: "",
    system: "",
    domain: "전체",
    item: "",
    description: "",
    attachment: null,
    inspectorInfo: "",
    executionCondition: "즉시/예약",
    repeatPeriod: "",
    repeatCount: 1,
    startDate: "2024-09-01 12:00:00",
    endDate: "2024-09-01 12:00:00",
  };

  const handleFileUpload = (event) => {
    formData.attachment = event.target.files[0];
  };

  const handleSubmit = () => {
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };
</script>


<main class="table-container">
    <div class="formContainer">
      <div class="inputRow">
        <label>점검계획제목</label>
        <input type="text" />
      </div>
      <div class="inputRow">
        <label>점검기간</label>
        <div class="riskLevels">
            <div class="riskLevelItem">
              <input
                type="text"
              />
            </div>
            <div class="riskLevelItem">
              <input
                type="text"
              />
            </div>
            <div class="riskLevelItem">
              <input type="text" />
            </div>
            <div class="riskLevelItem">
                <select class="inputRow"
                id="asset_group"
              >
                <option value="전체" selected>정기점검 </option>
    
                <option value="UNIX">수시점검</option>
                <option value="WINDOWS">긴시점검</option>
                <option value="PC">기타</option>
              </select>
              </div>
          </div>

      </div>

      <div class="inputRow">
        <label>점검분야</label>
        <input type="text" />
        <button class="buttons">검색</button>
      </div>

      <div class="inputRow1">
        <p>점검체계</p>
        <div class="box_2">
            <div class="box2_radio">
                <label><input type="radio" bind:group={formData.domain} value="전체" /> 전체</label>
            </div>
            <div class="box2_radio">
                <label><input type="radio" bind:group={formData.domain} value="선택" /> 선택</label>
                (<label><input type="checkbox" /> Unix</label>
                <label><input type="checkbox" /> Linux</label>
                <label><input type="checkbox" /> Windows Server</label>
                <label><input type="checkbox" /> Network</label>)
            </div>
        </div>
      </div>
  

  
      <div class="inputRow box_1">
        <label>점검항목</label>
         <select class="inputRow"
            id="asset_group"
          >
            <option value="전체" selected>전체 </option>

            <option value="UNIX">2022년도</option>
            <option value="WINDOWS">2023년도</option>
            <option value="PC">2024년도</option>
          </select>
      </div>

      <div class="inputRow">
        <label>첨부파일</label>
        <input
          type="text"

        />
      </div>

      <div class="inputRow">
        <label>점검계획내용</label>
        <input
          type="text"
        />
      </div>

      <div class="inputRow">
        <label>점검관정보</label>
        <input type="password" />
      </div>
    </div>
  </main>
  
  <style>
    * {
      font-size: 16px;
    }
    .table-container {
      overflow-y: auto;
      border-radius: 10px;
      height: calc(100vh - 200px);
    }
  
    .formContainer {
      max-width: 70%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }
  
    .inputRow {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .inputRow1 {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .inputRow1 p {
      width: 120px;
      font-weight: 600;
      font-size: 14px;
      margin-left: 20px;
    }

    .box_2 {
    display: flex;
    flex-direction: row;
    gap: 10px; 
  }

  .box2_radio {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; 
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
  
    .inputRow label {
      width: 120px;
      font-weight: 600;
      font-size: 14px;
      margin-left: 20px;
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

    .box_1 {
      width: 50%;
    }

    .inputRow select {
      flex: 1;
      width: 100%;
      height: 34px;
      padding: 17px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      font-size: 16px;
    }
  
 
    .riskLevels {
      display: flex;
      column-gap: 20px;
      flex: 1; 
    }
  
    .riskLevelItem {
      display: flex; 
      align-items: center;
      flex: 1; 
      gap: 20;
    }
  
    .riskLevelItem input {
      flex: 1;
      padding: 10px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
      box-sizing: border-box;
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

    .inputRow .buttons {
        width: 72px;
        height: 34px;
      font-family: 'Franklin Gothic Medium',;
      color: #FFFFFF;
      background-color: #117CE9;
      font-weight: bold;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      border: none;
    }
  
   .inputRow .buttons:hover {
      color: #FFFFFF;
      background-color: #354D7D;
      border: none;
      font-weight: bold;
      font-size: 14px;
      border-radius: 4px;
    }
  
  </style>