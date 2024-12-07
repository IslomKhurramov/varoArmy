<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";
  import ModalPopEdit from "./ModalPopEdit.svelte";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;
  onMount(() => {
    // Ensure swiperContainer is bound
    if (swiperContainer) {
      swiperInstance = new Swiper(swiperContainer, {
        modules: [Navigation, Pagination],
        loop: false, // Avoid layout issues caused by looping
        slidesPerView: 4, // Adjust this value to suit your design
        spaceBetween: 10, // Fine-tune spacing to avoid layout shifts
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

    // Initialize menu wrapper for scrolling
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

  // Generate fake data
  for (let i = 1; i <= 100; i++) {
    slides.push({
      ccc_item_no: `Item ${i}`, // Example fake item number
      name: `Name ${i}`, // Optional: Add other fields as needed
    });
  }

  let activeAsset = null;

  function handleSlideclick(slide) {
    activeAsset = slide; // Set the clicked slide as active
    console.log("Selected Slide:", slide);
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
  // Close modal when Esc key is pressed
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeShowModal();
    }
  }
  function closeShowModal() {
    showModal = false;
  }

  onMount(() => {
    // Listen for keydown event when the modal is open
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the event listener when the component is destroyed
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

<div class="contentArea">
  <section
    bind:this="{swiperContainer}"
    style="position: sticky;  z-index:99; background-color:white;"
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
          {#if slides.length > 0}
            {#each slides as slide}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                value="{slide.ccc_item_no}"
                name="{slide}"
                class="menu-item {activeAsset &&
                activeAsset.ccc_item_no === slide.ccc_item_no
                  ? 'active'
                  : ''}"
                on:click="{() => handleSlideclick(slide)}"
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
        on:click="{() => handleScroll('next')}"
      >
        ▶
      </button>
    </div>
  </section>

  <div class="formContainer">
    <section class="rowSection">
      <div class="inputRow">
        <label>점검대상체계</label>
        <input type="text" />
      </div>
      <div class="inputRow">
        <label>점검관</label>
        <input type="text" />
      </div>
    </section>

    <section class="rowSection">
      <section class="rowSection">
        <div class="inputRow">
          <label>체계담당자명</label>
          <input type="text" />
        </div>
        <div class="inputRow">
          <label>부대</label>
          <input type="text" />
        </div>
      </section>
      <section class="rowSection">
        <div class="inputRow">
          <label>아이디</label>
          <input type="text" />
        </div>
        <div class="inputRow">
          <label>연락처</label>
          <input type="text" />
        </div>
      </section>
    </section>

    <section class="rowSection">
      <div class="inputRow">
        <label>점검일시</label>
        <input type="date" />
      </div>
      <div class="inputRow">
        <label>점검구분</label>
        <input type="text" />
      </div>
    </section>
    <div class="inputRow">
      <label>점검대상</label>
      <input type="text" />
    </div>

    <div class="inputRow">
      <label>점검항목</label>
      <input type="text" />
    </div>

    <div class="inputRow">
      <label>점검기준</label>
      <div style="display: flex; flex-direction:column; width:91%">
        <input type="text" />
        <input type="text" />
      </div>
    </div>

    <div class="inputRow">
      <label>점검결과</label>
      <div style="display: flex; gap:10px; flex-direction:row; width:91%">
        <select name="operating_system" id="operating_system">
          <option value="양호" selected>양호</option>
          <option value="취약">취약</option>
          <option value="예외처리">예외처리</option>
          <option value="기타">기타</option>
        </select>
        <button class="btnSave" on:click="{() => (showModal = true)}"
          >edit</button
        >
        <input type="text" />
      </div>
    </div>

    <div class="inputRow">
      <label>점검현황</label>
      <input type="text" />
    </div>

    <div class="inputRo">
      <label>증적파일 첨부 </label>
      <input class="fileupload" type="file" />
    </div>
    <div class="inputRow">
      <label>조치방법</label>
      <input type="text" />
    </div>
    <div class="lastButtons">
      <button class="btnSave">저장</button>
      <button class="btnUpload">취약점이력추적</button>
      <button class="btnUpload">변경내역이력조회</button>
    </div>
  </div>
</div>
{#if showModal}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="modal-open-wrap"
    on:click="{() => (showModal = false)}"
    on:keydown="{handleKeyDown}"
    tabindex="0"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog
      open
      on:close="{() => (showModal = false)}"
      on:click|stopPropagation
    >
      <ModalPopEdit {closeShowModal} />
    </dialog>
  </div>
{/if}

<style>
  .btnSave {
    height: 34px;
  }
  .lastButtons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
  }
  .rowSection {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
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
    width: 100%;
  }
  .inputRo {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
    width: 100%;
  }

  .inputRow label {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
  }
  .inputRo label {
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

  .inputRow select {
    flex: 1;
    width: 100%;
    height: 34px;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 12px;
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
