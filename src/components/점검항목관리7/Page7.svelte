<script>
  import { onMount } from "svelte";
  import LeftContainer from "../LeftContainer.svelte";
  import Swiper7 from "./Swiper7.svelte";
  let resultData = [];

  for (let i = 0; i < 50; i++) {
    resultData.push({
      ast_uuid__ass_uuid__ast_hostname: "NETWORK",
      ccr_item_no__ccc_item_no: "NW-06",
      ccr_item_no__ccc_item_item: "Session Timeout 설정",
      ccr_item_no__ccc_item_title: "2023-02-01 12:00:00..",
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
  let currentPage = null;
  function selectPage() {
    currentPage = Swiper7;
  }
  let isAddingNewGroup = false;
  const cancelNewGroup = () => {
    isAddingNewGroup = false;
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
          <button on:click="{() => (isAddingNewGroup = true)}">복사</button>
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
        <div class="last_button">
          <select>
            <option
              value="10줄
        "
              selected
              >10줄
            </option>
            <option
              value="20줄
        "
              >20줄
            </option>
          </select>
        </div>
        <div class="tableListWrap">
          <table class="tableList hdBorder">
            <colgroup>
              <col style="width:90px;" />
              <col style="width:170px" />
              <col style="width:140px" />
              <col />
              <col style="width: 200px;" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">점검대상 </th>
                <th class="text-center">점검항목 </th>
                <th class="text-center">점검이름</th>
                <th class="text-center">등록일</th>
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
                    {data.ccr_item_no__ccc_item_item}
                  </td>
                  <td> {data.ccr_item_no__ccc_item_title}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="last_button">
          <button class="btn btnSave">변경이력확인 </button>
        </div>
      </article>
    {/if}
  </section>
</main>
{#if isAddingNewGroup}
  <div class="modal-open-wrap">
    <dialog open on:close="{() => (isAddingNewGroup = false)}">
      <div class="modal-content">
        <div class="modal">
          <input
            type="text"
            placeholder="그룹 이름을 입력하세요"
            class="editable_input"
          />
          <div class="modal-buttons">
            <button class="primary-button"> 저장하기 </button>
            <button class="secondary-button" on:click="{cancelNewGroup}"
              >취소</button
            >
          </div>
        </div>
      </div>
    </dialog>
  </div>
{/if}

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
  .tableListWrap {
    height: 66vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
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
  thead {
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick the header to the top */
    z-index: 10; /* Ensure the header is above the scrolling content */
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); /* Shadow effect for separation */
  }
  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }
  .last_button {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
  }
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
  .secondary-button {
    background-color: #f0f0f0;
    color: #666;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  dialog {
    position: fixed;
    top: 50%;
    left: 14%;
    transform: translate(-50%, -50%);
    width: 400px;
    border: none;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
    z-index: 100;
  }
  .primary-button {
    background-color: #54b3d6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .primary-button:hover {
    background-color: #48a2bf;
  }
  .secondary-button:hover {
    background-color: #e0e0e0;
  }
  .modal-open-wrap {
    display: block;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
  }
  .modal-open-wrap {
    display: block;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    animation: fadeInBackdrop 0.3s ease;
  }
  .modal-content {
    text-align: center;
  }
  .editable_input {
    height: 40px;
    width: 360px;
    margin-bottom: 27px;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
