<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import Swiper from "./Swiper.svelte";
  let resultData = [];

  for (let i = 0; i < 50; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "NW-06",
      ccr_item_no__ccc_item_title: "Session Timeout 설정",
      ccr_item_no__ccc_item_criteria: "홍길동 드라이브가 ..",
    });
  }
  /**********************************LEFT SIDE******/
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
  let currentPage = null;
  function selectPage() {
    currentPage = Swiper;
  }
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
                      <li
                        on:click="{() => {
                          (activeMenu = subItem.title), selectPage();
                        }}"
                      >
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
    {#if currentPage}
      <svelte:component this="{currentPage}" />
    {:else}
      <article class="contentArea">
        <section class="filterWrap">
          <div>
            <select>
              <option value="" selected disabled>프로젝트</option>

              <option value="{'프로젝트'}">프로젝트</option>
            </select>
            <select>
              <option value="" selected>점검대상</option>

              <option value="점검대상">점검대상</option>
            </select>

            <select>
              <option value="" selected>호스트</option>

              <option value="호스트">호스트</option>
            </select>
            <select id="result">
              <option value="" selected>점검항목</option>

              <option value="점검항목">점검항목</option>
            </select>

            <button class="btn btnSearch" style="width: 98px; font-size: 14px;"
              ><img src="assets/images/reset.png" alt="search" />초기화</button
            >
          </div>
        </section>
        <div class="tableListWrap">
          <table class="tableList hdBorder">
            <colgroup>
              <col style="width:90px;" />
              <col style="width:170px" />
              <col style="width:140px" />
              <col style="width: 200px;" />
              <col />
              <col style="width: 30%;" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">점검대상 </th>
                <th class="text-center">점검항목 </th>
                <th class="text-center">점검이름</th>
                <th class="text-center">점검결과</th>
                <th class="text-center">점검결과 </th>
              </tr>
            </thead>
            <tbody>
              {#each resultData as data, index}
                <tr>
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
                    {data.ccr_item_no__ccc_item_title}
                  </td>
                  <td> {data.ccr_item_no__ccc_item_criteria}</td>
                  <td class="text-center">
                    <div class="lastBox">
                      <select style=" width: 100px;" class="xs">
                        <option value="" disabled> </option>
                        <option value="양호"> 양호 </option>
                        <option value="취약"> 취약 </option>
                        <option value="수동점검"> 수동점검 </option>
                        <option value="예외처리"> 예외처리 </option>
                        <option value="해당없음"> 해당없음 </option>
                      </select>

                      <input
                        type="text"
                        class="inputDefault"
                        placeholder="사유"
                      />

                      <button class=" btnSave">저장 </button><button
                        class=" btnUpload"
                        >관련시스템보기
                      </button>
                      <!-- <button type="button" class="btn btnBlue xs">변경</button> -->
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="last_button">
          <button class="btn btnSave">변경내역이력조회 </button>
        </div>
      </article>
    {/if}
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
  .btn {
    font-size: 14px;
  }
  .tableListWrap {
    height: 66vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
  }
  .lastBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
  }
  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }
  .btnUpload {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .last_button {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
</style>
