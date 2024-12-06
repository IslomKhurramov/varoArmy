<script>
  import LeftContainer from "../LeftContainer.svelte";

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
  let currentPage = null;
  function selectPage() {
    currentPage = LeftContainer;
  }
  /*******LEFT SIDE */

  let mainTitle = "점검 계획 현황";
  let isOpen = Array(8).fill(false); // Har bir accordion uchun ochiq/yopiq holat
  export let activeMenu = "신규계획등록";

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

  const toggleAccordion = (index) => {
    isOpen[index] = !isOpen[index];
  };
</script>

<main class="table-container">
  <section class="section1">
    <!-- LEFT SIDE -->
    <div class="body_menu">
      <div class="menuContainer">
        <!-- Header -->
        <div>
          <div class="menuHeader">{mainTitle}</div>

          <!-- Accordion -->
          <div class="accordion">
            {#each mainItems as item, index}
              <div class="accordion-item">
                <button
                  on:click="{() => toggleAccordion(index)}"
                  class="accordion-header {isOpen[index] ? 'active' : ''}"
                >
                  {item.title}
                </button>
                <div
                  class="accordion-content {isOpen[index] ? 'open' : ''}"
                  style="max-height: {isOpen[index] ? '150px' : '0px'}"
                >
                  <ul>
                    {#each item.subItems as subItem}
                      <li on:click="{() => (activeMenu = subItem.title)}">
                        {subItem.title}
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons">
          <button>복사</button>
          <button>삭제</button>
          <button>EXCEL</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section2">
  
      <div class="formContainer">
        <div class="inputRow">
          <label>점검계획제목</label>
          <input type="text" />
        </div>
        <div class="inputRow">
          <label>점검기간</label>
          <div class="riskLevels">
            <div class="riskLevelItem">
              <input type="text" />
            </div>
            <div class="riskLevelItem">
              <input type="text" />
            </div>
            <div class="riskLevelItem">
              <input type="text" />
            </div>
            <div class="riskLevelItem">
              <select class="inputRow" id="asset_group">
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
              <label
                ><input
                  type="radio"
                  bind:group="{formData.domain}"
                  value="전체"
                /> 전체</label
              >
            </div>
            <div class="box2_radio">
              <label
                ><input
                  type="radio"
                  bind:group="{formData.domain}"
                  value="선택"
                /> 선택</label
              >
              (<label><input type="checkbox" /> Unix</label>
              <label><input type="checkbox" /> Linux</label>
              <label><input type="checkbox" /> Windows Server</label>
              <label><input type="checkbox" /> Network</label>)
            </div>
          </div>
        </div>

        <div class="inputRow box_1">
          <label>점검항목</label>
          <select class="inputRow" id="asset_group">
            <option value="전체" selected>전체 </option>

            <option value="UNIX">2022년도</option>
            <option value="WINDOWS">2023년도</option>
            <option value="PC">2024년도</option>
          </select>
        </div>

        <div class="inputRow">
          <label>점검계획내용</label>
          <input type="text" />
        </div>

        <div class="inputRow">
          <label>첨부파일</label>
          <input type="text" />
        </div>

        <div class="inputRow">
          <label>점검관정보</label>
          <input type="password" />
          <button class="buttons">검색</button>
        </div>
        <div class="inputRow">
          <label>점검스케줄</label>
          <select bind:value="{formData.executionCondition}">
            <option>즉시/예약</option>
          </select>
        </div>

        <div class="inputRow">
          <label></label>
          <div class="riskLevels">
            <div class="riskLevelItem">
              <p>반복주기</p>
              <input type="number" />
              <select bind:value="{formData.repeatPeriod}">
                <option>분</option>
                <option>시간</option>
                <option>일</option>
                <option>주</option>
                <option>월</option>
              </select>
            </div>

            <div class="riskLevelItem">
              <span>반복횟수</span>
              <select bind:value="{formData.repeatPeriod}">
                <option>분</option>
                <option>시간</option>
                <option>일</option>
                <option>주</option>
                <option>월</option>
              </select>
            </div>
          </div>
        </div>
        <div class="inputRow">
          <label></label>
          <div class="riskLevels">
            <div class="riskLevelItem">
              <p>시작일</p>
              <input type="datetime-local" bind:value="{formData.startDate}" />
            </div>

            <div class="riskLevelItem">
              <span>종료일</span>
              <input type="datetime-local" bind:value="{formData.endDate}" />
            </div>
          </div>
        </div>
      </div>
  </section>
</main>

<style>
  .table-container {
    /* overflow-y: auto; */
    border-radius: 10px;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: row;
  }
  .section2 {
    width: 85%;
    height: 90vh;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;
  }
  .section1 {
    width: 15%;
    height: 90vh;
    margin-right: 5px;
    margin-top: 5px;
    border-radius: 10px;
    flex-direction: column;
    border: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;
  }
  .formContainer {
    max-width: 85%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .inputRow {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
  }

  .inputRow1 {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
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
    font-size: 12px;
  }

  .riskLevels {
    display: flex;
    column-gap: 10px;
    flex: 1;
  }

  .riskLevelItem {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 20;
    column-gap: 10px;
  }

  .riskLevelItem input {
    flex: 1;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    box-sizing: border-box;
  }

  .riskLevelItem span {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap; /* Prevent text wrapping */
    margin: 0 10px;
  }

  .riskLevelItem p {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap; /* Prevent text wrapping */
    margin-right: 10px;
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
    font-family: "Franklin Gothic Medium";
    color: #ffffff;
    background-color: #117ce9;
    font-weight: bold;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    border: none;
  }

  .inputRow .buttons:hover {
    color: #ffffff;
    background-color: #354d7d;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
