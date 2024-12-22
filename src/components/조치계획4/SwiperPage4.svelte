<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;

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

  let selectedFiles = {};
  let fileNames = {};

  function handleFileSelect(event, hostname) {
    const file = event.target.files[0];
    if (file) {
      selectedFiles[hostname] = file;
      fileNames[hostname] = file.name;
    } else {
      fileNames[hostname] = "선택된 파일 없음";
    }
  }

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
    // console.log("Selected Slide:", slide);
  }

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

  const handleFileUpload = (event) => {
    formData.attachment = event.target.files[0];
  };

  const handleSubmit = () => {
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };
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
          {#if slides.length > 0}
            {#each slides as slide}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                value={slide.ccc_item_no}
                name={slide}
                class="menu-item {activeAsset &&
                activeAsset.ccc_item_no === slide.ccc_item_no
                  ? 'active'
                  : ''}"
                on:click={() => handleSlideclick(slide)}
              >
                {slide.ccc_item_no}
              </div>
            {/each}
          {:else}
            <div>데이터가 없습니다</div>
          {/if}
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
      <div style="display: flex; flex-direction: column;">
        <span class="main_header">평가수행부대</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px; border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>점검기간</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <input type="text" />
              </div>
              <div class="riskLevelItem">
                <span>점검분류</span>
                <input type="text" />
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>소속기관</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span class="main_header">취약점정보</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px;border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>취약점구분</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <input type="text" />
              </div>
              <div class="riskLevelItem">
                <span>점검번호</span>
                <input type="text" />
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>점검결과</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <input type="text" />
              </div>
              <div class="riskLevelItem">
                <span>수집방법</span>
                <input type="text" />
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>점검현황</label>
            <input type="text" />
          </div>

          <div class="inputRow">
            <label>점검기준(Key)</label>
            <div class="riskLevels">
              <div class="riskLevelItem">
                <input type="text" />
              </div>
              <div class="riskLevelItem">
                <span>점검기준</span>
                <input type="text" />
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>조치방법</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span class="main_header">체계정보</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px;border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>조치이력</label>
            <input type="text" />
          </div>

          <div class="inputRow">
            <label>조치계획</label>
            <input type="text" />
          </div>

          <div class="inputRow">
            <label>조치결과</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span class="main_header">조치결과</span>
        <div
          style="display: flex; flex-direction: column; row-gap: 10px;border:1px solid #cccccc; padding:20px"
        >
          <div class="inputRow">
            <label>최종조치완료처리자</label>

            <div class="riskLevels">
              <div class="riskLevelItem">
                <input type="text" />
              </div>
              <div class="riskLevelItem">
                <span style="margin: 0 0 0 0;">최종조치완료일</span>
                <input
                  type="datetime-local"
                  style="margin-left: 5px;"
                  bind:value={formData.endDate}
                />
              </div>
            </div>
          </div>

          <div class="inputRow">
            <label>조치내역</label>
            <input type="text" />
          </div>

          <div class="inputRow">
            <label>조치증적</label>
            <div
              style="width: 100%; display:flex; gap:10px; justify-content:center"
            >
              <label
                class="btn btnPrimary"
                style="display: flex; gap:5px; width:130px; font-size:12px; margin-left: 10px"
              >
                <input
                  type="file"
                  class="file-input"
                  on:change={(event) => handleFileSelect(event)}
                />
                <img src="./assets/images/download.svg" class="excel-img" />
                <span>파일업로드</span>
              </label>
              <input
                type="text"
                placeholder="선택된 파일 없음"
                value={fileNames || "선택된 파일 없음"}
                readonly
                class="file-name-input"
              />
            </div>
          </div>
        </div>
      </div>

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
    margin: 0 20px;
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
