<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";
  import { fixways, userNames, vulnAssetList } from "../../services/store";
  import { setFixPlanRegister } from "../../services/callApi";
  import { successAlert } from "../../shared/sweetAlert";
  import ModalSwiper2 from "./ModalSwiper2.svelte";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;
  export let firstMenuData;
  export let resultVulnsOfPlans;
  export let fetchPaginatedData;
  let approvalStatus = ""; // It will be either "approved" or "rejected"

  $: console.log("firstmenu data", firstMenuData);
  function formatKoreanDate(date) {
    const d = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(d);
  }

  let fix_end_date = "";

  $: console.log("firstMenuData", firstMenuData);
  onMount(() => {
    if (swiperContainer) {
      swiperInstance = new Swiper(swiperContainer, {
        modules: [Navigation, Pagination],
        loop: false,
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    menuWrapper = document.getElementById("menuWrapper");

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
    };
  });

  const handleScroll = (direction) => {
    if (direction === "prev") {
      scrollAmount -= itemWidth;
      if (scrollAmount < 0) scrollAmount = 0;
    } else if (direction === "next") {
      scrollAmount += itemWidth;
      const maxScroll = menuWrapper.scrollWidth - menuWidth;
      if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    }
    if (menuWrapper) {
      menuWrapper.style.transform = `translateX(-${scrollAmount}px)`;
    }
  };
  let slides = [];

  for (let i = 1; i <= 100; i++) {
    slides.push({
      ccc_item_no: `Item ${i}`,
      name: `Name ${i}`,
    });
  }

  let activeAsset = null;

  function handleSlideclick(slide) {
    activeAsset = slide;
    firstMenuData = slide;
    // console.log("Selected Slide:", slide);
  }
  $: if (firstMenuData) {
    activeAsset = firstMenuData;
  }

  // Function to scroll and focus on the asset
  function focusOnAsset(assetId) {
    const menuItem = document.querySelector(`.menu-item[value="${assetId}"]`);
    if (menuItem) {
      menuItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      setTimeout(() => {
        menuItem.focus();
      }, 300);
    }
  }
  $: if (
    firstMenuData &&
    results &&
    Array.isArray(results) &&
    results.length > 0
  ) {
    activeAsset = results.find(
      (slide) => slide.ccr_index === firstMenuData.ccr_index
    );
    firstMenuData = activeAsset;

    // Focus on the asset if it exists
    if (activeAsset) {
      setTimeout(() => {
        focusOnAsset(activeAsset.ccr_index);
      }, 0);
    }
  }
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeShowModal();
    }
  }
  function closeShowModal() {
    showModal = false;
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  let results = Object.values($vulnAssetList)
    .filter((item) => Array.isArray(item) && item[0]?.result)
    .map((item) => item[0].result);
</script>

<div class="contentArea">
  <section
    bind:this={swiperContainer}
    style="position: sticky;  z-index:99; background-color:white; margin-top:10px"
    class="topCon swiper-container"
  >
    <div
      class="menu-container"
      style="position: sticky; z-index:99; background-color:white;"
    >
      <button
        class="arrow-btn"
        id="prevBtn"
        on:click={() => handleScroll("prev")}
      >
        ◀
      </button>

      <div
        class="menu-wrapper-container"
        style="background-color: white; z-index:99;"
      >
        <div
          class="menu-wrapper"
          id="menuWrapper"
          style="background-color: white; z-index:99;"
          bind:this={menuWrapper}
        >
          {#each results as slide}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              value={slide.ccr_index}
              name={slide}
              class="menu-item {activeAsset &&
              activeAsset.ccr_index === slide.ccr_index
                ? 'active'
                : ''}"
              on:click={() => handleSlideclick(slide)}
            >
              {slide.ccr_item_no__ccc_item_no}
            </div>
          {/each}
        </div>
      </div>

      <button
        id="nextBtn"
        class="arrow-btn"
        on:click={() => handleScroll("next")}
      >
        ▶
      </button>
    </div>
  </section>

  <div class="formContainer">
    <div class="main_box_page5">
      <!-- 평가수행부대 -->
      <div style="display: flex; flex-direction: column;">
        <span class="main_header">평가수행부대</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>평가수행부대 </label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input"
                  >{firstMenuData.cct_index__cct_target}</span
                >
              </div>
              <div class="riskLevelItem">
                <label>점검관 </label>
                <span class="span-input"
                  >{firstMenuData.ccr_item_no__ccc_item_no}</span
                >
              </div>
            </div>
          </div>
          <div class="inputRow">
            <label>소속기관</label>
            <span class="span-input"
              >{firstMenuData.ast_uuid__ass_uuid__ast_operator_person}</span
            >
          </div>
        </div>
      </div>

      <!-- 취약점정보 -->
      <div style="display: flex; flex-direction: column;">
        <span class="main_header">취약점정보</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>취약점구분</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input"
                  >{firstMenuData.ccr_item_no__ccc_item_no}</span
                >
              </div>
              <div class="riskLevelItem">
                <label>점검번호</label>
                <span class="span-input"
                  >{firstMenuData.ccr_item_no__ccc_item_no}</span
                >
              </div>
            </div>
          </div>
          <div class="inputRow">
            <label>점검결과</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input">{firstMenuData.ccr_item_result}</span>
              </div>
              <div class="riskLevelItem">
                <label>수집방법</label>
                <span class="span-input"
                  >{firstMenuData.ccr_item_no__ccc_item_no}</span
                >
              </div>
            </div>
          </div>
          <div class="inputRow">
            <label>점검현황</label>
            <span class="span-input">{firstMenuData.ccr_item_status}</span>
          </div>
          <div class="inputRow">
            <label>점검기준(Key)</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input"
                  >{@html firstMenuData.ccr_item_no__ccc_item_criteria.replace(
                    /\n/g,
                    "<br/>"
                  )}</span
                >
              </div>
              <div class="riskLevelItem">
                <label>점검기준</label>
                <span class="span-input"
                  >{@html firstMenuData.ccr_item_no__ccc_item_criteria.replace(
                    /\n/g,
                    "<br/>"
                  )}</span
                >
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>보호대책</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <!-- 체계정보 -->
      <div style="display: flex; flex-direction: column;">
        <span class="main_header">체계정보</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>변경일시</label>
            <span
              >{formatKoreanDate(
                firstMenuData.ast_uuid__ass_uuid__ast_lastconnect
              )}</span
            >
          </div>
          <div class="inputRow">
            <label>조치상태</label>
            <span class="span-input"
              >{firstMenuData.ast_uuid__ass_uuid__ast_operator_person}</span
            >
          </div>
          <div class="inputRow">
            <label>조치예정일</label>
            <span class="span-input"
              >{firstMenuData.ast_uuid__ass_uuid__ast_ipaddr}</span
            >
          </div>
          <div class="inputRow">
            <label>조치예정요청자 </label>
            <input type="text" />
          </div>
          <div class="inputRow">
            <label>조치예정내용 </label>
            <input type="text" />
          </div>
        </div>
      </div>

      <!-- 조치결과 -->
      <div style="display: flex; flex-direction: column;">
        <span class="main_header">조치결과</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>처리방안</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <div class="box2_radio">
                  <label>
                    <input
                      type="radio"
                      name="approvalStatus"
                      bind:group={approvalStatus}
                      value="approved"
                    />
                    승인
                  </label>
                </div>
                <div class="box2_radio">
                  <label>
                    <input
                      type="radio"
                      name="approvalStatus"
                      bind:group={approvalStatus}
                      value="rejected"
                    />
                    반려
                  </label>
                </div>
              </div>
              <button class="btnUpload" on:click={() => (showModal = true)}
                >상세보기</button
              >
            </div>
          </div>
          <div class="inputRow">
            <label>승인내용 </label>
            <input type="text" />
          </div>
        </div>
      </div>

      <!-- 저장 버튼 -->
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: column; row-gap: 10px">
          <div class="inputRow">
            <button class="btn-primary">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{#if showModal}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="modal-open-wrap"
    on:click={() => (showModal = false)}
    on:keydown={handleKeyDown}
    tabindex="0"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog open on:close={() => (showModal = false)} on:click|stopPropagation>
      <ModalSwiper2 {closeShowModal} {activeAsset} {fetchPaginatedData} />
    </dialog>
  </div>
{/if}

<style>
  .box2_radio {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 75px;
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

  .formContainer {
    max-width: 100%;
    margin-top: 15px;
    overflow-y: auto;
    max-height: 65vh;
    overflow-x: hidden;
  }

  .main_box_page5 {
    max-width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .main_header {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .inputRow {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
  }

  .inputRow label {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
  }

  .inputRow span {
    flex: 1;
    width: 100%;
    /* height: 34px; */
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
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
  .inputRow .box2_radio input {
    flex: 1;
    width: 100%;
    height: 16px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
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
    box-sizing: border-box;
  }

  .riskLevelItem span {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap; /* Prevent text wrapping */
    /* margin: 0 20px; */
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

  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto;
    height: 34px;
  }

  .btn-primary {
    width: 100px;
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
    color: #333333;
    border: 1px solid #333333;
    font-weight: bold;
  }

  .btn-primary:hover {
    color: #ffffff;
    background-color: #333333;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }

  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-primary {
    width: 74px;
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
    color: #ffffff;
    background-color: #117ce9;
    border: none;
    font-weight: bold;
  }

  .btn-primary:hover {
    color: #ffffff;
    background-color: #354d7d;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  .modal-open-wrap {
    display: block;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(167, 167, 167, 0.6);
  }

  /****Modal Container*/
  dialog {
    position: fixed;
    /* height: 600px; */
    /* overflow-y: auto;
    overflow-x: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1103px;
    border: none;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: svelte-s7onsa-fadeIn 0.3s ease;
    z-index: 100;
  }

  /* Modal backdrop */
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    animation: fadeInBackdrop 0.3s ease;
  }
</style>
