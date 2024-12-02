<script>
    let mainTitle = "점검 계획 현황";
    let isOpen = Array(8).fill(false); // Har bir accordion uchun ochiq/yopiq holat
  
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
  
  <div class="menuContainer">
    <!-- Header -->
    <div>
      <div class="menuHeader">{mainTitle}</div>
  
      <!-- Accordion -->
      <div class="accordion">
        {#each mainItems as item, index}
          <div class="accordion-item">
            <button
              on:click={() => toggleAccordion(index)}
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
                  <li>{subItem.title}</li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
    </div>
  
    <!-- Buttons -->
    <div class="buttons">
      <button style="background-color: #148D7F;">복사</button>
      <button style="background-color: #E24D54;">삭제</button>
      <button style="background-color: #117CE9;">EXCEL</button>
    </div>
  </div>
  
  <style>
  
    /* Menu Container */
    .menuContainer {
        max-width: 900px;
      height: 80vh;
      padding: 15px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  
    /* Header */
    .menuHeader {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #223449;
    }
  
    /* Accordion */
    .accordion {
      max-height: 70vh;
      overflow-y: auto;
    }
  
    .accordion-item {
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
    }
  
    .accordion-header {
      width: 100%;
      padding: 15px;
      font-size: 16px;
      font-weight: bold;
      background: #f7f7f7;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .accordion-header.active {
      background-color: #223449;
      color: white;
    }
  
    .accordion-header:hover {
      background-color: #0056b3;
      color: white;
    }
  
    .accordion-content {
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 15px;
    }
  
    .accordion-content.open {
      padding: 0px 0px 15px 15px;
    }
  
    .accordion-content ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    .accordion-content li {
      padding: 5px 0;
      color: #333;
      font-size: 14px;
      border-bottom: 1px dashed #ddd;
    }
  
    .accordion-content li:last-child {
      border-bottom: none;
    }
  
    .accordion-content li:hover {
      color: #0072fd;
      cursor: pointer;
    }
  
    /* Buttons */
    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  
    .buttons button {
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .buttons button:hover {
      opacity: 0.9;
    }
  </style>
  