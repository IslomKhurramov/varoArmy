<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  let resultData = [];

  for (let i = 0; i < 50; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "AAAA",
      ccr_item_no__ccc_item_item: "NW-06",
      ccr_item_no__ccc_item_title: "SETUID..",
      ccr_item_no__ccc_item_criteria: "취약",
      ccr_item_no__ccc_item_result: "조치예정",
    });
  }
  /**********LEFT SIDE*/
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
    <article class="contentArea">
      <section class="filterWrap">
        <div>
          <select style="width: 200px;">
            <option value="" selected disabled>프로젝트</option>
            <option value="{'프로젝트'}">프로젝트</option>
          </select>

          <button class="btn btnSearch" style="width: 98px; font-size: 14px;"
            ><img src="assets/images/reset.png" alt="search" />초기화</button
          >
        </div>
      </section>
      <table style="width: 60%;">
        <colgroup>
          <col style="width: 60px;" />
          <col style="width:83%" />
        </colgroup>
        <tr style="position: sticky;top: -1px;">
          <th
            class="center-align"
            style="color: black;font-weight:bold;background: #F7FAFC; border-radius:4px;padding:10px; font-size:12px;"
            >구분</th
          >
          <th
            class="center-align"
            style="border-radius:4px; color: black; font-weight:bold; background: #F7FAFC; padding:10px; font-size:12px;"
            >다운로드 링크
          </th>
        </tr>
        <tbody>
          <tr>
            <th class="center-align">이동식 점검 모듈 </th>
            <td class="line-height">
              <ul>
                <li>
                  <a href="#">유닉스/리눅스 점검 프로그램 </a>
                </li>
                <li>
                  <a href="#">윈도우 서버 점검 프로그램 </a>
                </li>
                <li>
                  <a href="#">윈도우 PC 점검 프로그램 </a>
                </li>
                <li>
                  <a href="#">수작업 점검을 위한 엑셀 파일 </a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th class="center-align">에이전트 명령 등록 </th>
            <td class="line-height">
              <ul>
                <li><a href="">점검 명령 등록을 위한 엑셀 파일 </a></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
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
  a {
    color: #333333;
    font-size: 12px;
  }
  th {
    font-size: 12px;
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
</style>
