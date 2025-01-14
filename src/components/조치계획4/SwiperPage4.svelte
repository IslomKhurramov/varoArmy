<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";
  import { fixways, userNames, vulnAssetList } from "../../services/store";
  import { setFixPlanRegister } from "../../services/callApi";
  import { successAlert } from "../../shared/sweetAlert";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;
  export let firstMenuData;
  export let resultVulnsOfPlans;
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
  $: console.log("firstmenu data", firstMenuData);
  let asset_uuid = firstMenuData.ast_uuid;
  let ccr_index = firstMenuData.ccr_index;
  let fix_method = "";
  let fix_level = "";
  let fix_start_date = "";
  let fix_end_date = "";
  let fix_comment = "";
  let user_index = "";
  let fix_step_status = "2";

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
    fix_method = "";
    fix_level = "";
    fix_start_date = "";
    fix_end_date = "";
    fix_comment = "";
    user_index = "";
    fix_step_status = "2";
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

  async function fixPlanRegister() {
    try {
      // Log the value of fix_user_index to check if it is correct
      console.log(
        "fix_user_index before calling setFixPlanRegister:",
        user_index
      );

      // Ensure fix_user_index has a valid value
      if (!user_index) {
        console.error("fix_user_index is missing or invalid");
        return; // Exit early if fix_user_index is not valid
      }

      // Call setFixPlanRegister with proper parameters
      const response = await setFixPlanRegister(
        asset_uuid,
        ccr_index,
        fix_method,
        fix_level,
        fix_start_date,
        fix_end_date,
        fix_comment,
        user_index,
        fix_step_status
      );

      console.log("response page4 ", response);

      // Handle the response
      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);
        fix_method = "";
        fix_level = "";
        fix_start_date = "";
        fix_end_date = "";
        fix_comment = "";
        user_index = ""; // Clear or reset the value after the request
        fix_step_status = "2";
      } else {
        console.error("Error in response:", response);
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
    }
  }

  $: console.log("dasset_uuid ", asset_uuid);
  $: console.log("ccr_index ", ccr_index);
  $: console.log("fix_method ", fix_method);
  $: console.log("fix_level ", fix_level);
  $: console.log("fix_start_date ", fix_start_date);
  $: console.log("fix_comment ", fix_comment);
  $: console.log("fix_user_index ", user_index);
  $: console.log("fix_step_status", fix_step_status);

  let results = Object.values($vulnAssetList)
    .filter((item) => Array.isArray(item) && item[0]?.result)
    .map((item) => item[0].result);
</script>

<div class="contentArea">
  <section
    bind:this="{swiperContainer}"
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
        on:click="{() => handleScroll('prev')}"
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
          bind:this="{menuWrapper}"
        >
          {#each results as slide}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              value="{slide.ccr_index}"
              name="{slide}"
              class="menu-item {activeAsset &&
              activeAsset.ccr_index === slide.ccr_index
                ? 'active'
                : ''}"
              on:click="{() => handleSlideclick(slide)}"
            >
              {slide.ccr_item_no__ccc_item_no}
            </div>
          {/each}
        </div>
      </div>

      <button
        id="nextBtn"
        class="arrow-btn"
        on:click="{() => handleScroll('next')}"
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
            <label>점검기간</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <span class="span-input"
                  >{formatKoreanDate(
                    firstMenuData.ast_uuid__ass_uuid__ast_lastconnect
                  )}</span
                >
              </div>
              <div class="riskLevelItem">
                <label>점검분류</label>
                <span class="span-input"
                  >{firstMenuData.ccr_item_no__ccc_item_group}</span
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
                  >{firstMenuData.ccr_item_no__ccc_item_group}</span
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
                <input type="text" />
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
                <span class="span-input">
                  {@html firstMenuData.ccr_item_no__ccc_item_criteria.replace(
                    /\n/g,
                    "<br/>"
                  )}
                </span>
              </div>
              <div class="riskLevelItem">
                <label>점검기준(Value)</label>
                <span
                  class="span-input"
                  style="word-break:break-all;     white-space: break-spaces;"
                >
                  {@html firstMenuData.ccr_item_no__ccc_check_purpose.replace(
                    /\n/g,
                    "<br/>"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div class="inputRow">
            <label>조치방법</label>
            <span class="span-input" style="max-height: 180px; overflow-y:auto;"
              >{@html firstMenuData.ccr_item_no__ccc_mitigation_example.replace(
                /\n/g,
                "<br/>"
              )}</span
            >
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
            <label>체계명</label>
            <input type="text" />
          </div>
          <div class="inputRow">
            <label>운영관리담당자</label>
            <span class="span-input"
              >{firstMenuData.ast_uuid__ass_uuid__ast_operator_person}</span
            >
          </div>
          <div class="inputRow">
            <label>IP/호스팅</label>
            <span class="span-input"
              >{firstMenuData.ast_uuid__ass_uuid__ast_ipaddr}</span
            >
          </div>
          <div class="inputRow">
            <label>자산분류</label>
            <input type="text" />
          </div>
          <div class="inputRow">
            <label>제조사/제품명/버전</label>
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
            <label>조치계획수립</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <select bind:value="{fix_method}" style="width: 100%;">
                  {#each $fixways as fixway}
                    <option value="{fixway.cvf_index}">{fixway.cvf_desc}</option
                    >
                  {/each}
                </select>
              </div>
              <div class="riskLevelItem">
                <label style="margin: 0 0 0 0;">조치담당관</label>
                <select bind:value="{user_index}" style="width: 100%;">
                  {#each $userNames as names}
                    <option value="{names.user_index}">{names.user_name}</option
                    >
                  {/each}
                </select>
              </div>
              <div class="riskLevelItem">
                <label style="margin: 0 0 0 0;">수행조건</label>
                <select bind:value="{fix_level}" style="width: 100%;">
                  <option value="즉시">즉시</option>
                  <option value="예약">예약</option>
                </select>
              </div>
            </div>
          </div>
          <div class="inputRow">
            <label>조치예정일 </label>
            <input type="date" bind:value="{fix_start_date}" />~<input
              type="date"
              bind:value="{fix_end_date}"
            />
          </div>
          <div class="inputRow">
            <label>추가 의견</label>
            <textarea
              style="width: 100%; font-size:14px"
              bind:value="{fix_comment}"
              placeholder="추가 의견 입력"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 저장 버튼 -->
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: column; row-gap: 10px">
          <div class="inputRow">
            <button class="btn-primary" on:click="{fixPlanRegister}"
              >저장</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
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

  .excel-img {
    filter: invert(45%) sepia(100%) saturate(550%) hue-rotate(195deg)
      brightness(100%) contrast(98%);
  }
</style>
