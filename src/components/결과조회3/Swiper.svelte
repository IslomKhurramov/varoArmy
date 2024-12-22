<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";
  import ModalPopEdit from "./ModalPopEdit.svelte";
  import { viewPlanResult } from "../../services/store";
  import { active } from "d3";
  import { setSpecificItemResultsChange } from "../../services/callApi";
  import { successAlert } from "../../shared/sweetAlert";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;
  export let selectedData;
  export let selectedHostnameData;
  export let plan_index;
  export let viewPlanResultFunction;
  let change_option = "ONE";
  let insertData = {};

  if (selectedData) {
    insertData.change_status_text = selectedData.ccr_item_status || "";
  }

  async function updateSelectedData(data) {
    try {
      console.log("plan_index", data.plan_index);
      console.log("result_index", data?.result_index);
      console.log("checklist_index", data?.checklist_index);
      console.log("change_result", data?.change_result);
      console.log("change_option", data?.change_option);
      console.log("change_status_text", data?.change_status_text);
      console.log("change_evidence_file", data?.change_evidence_file);
      const formData = new FormData();

      formData.append("plan_index", data?.plan_index);
      formData.append("result_index", data?.result_index);
      formData.append("checklist_index", data?.checklist_index);
      if (data?.change_result)
        formData.append("change_result", data?.change_result);
      formData.append("change_option", data?.change_option);
      if (data?.change_status_text)
        formData.append("change_status_text", data?.change_status_text);
      if (data?.change_evidence_file)
        formData.append("change_evidence_file", data?.change_evidence_file);

      // Check the content of FormData before sending it
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      console.log("formData", formData);
      // Call the API with the FormData
      const response = await setSpecificItemResultsChange(formData);

      if (response.RESULT === "OK") {
        successAlert(`${response.CODE}`);

        // Refresh the view after successful update
        await viewPlanResultFunction();
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      console.error("Error during data update:", err);
      throw err; // You can customize error handling as needed
    }
  }

  $: console.log("swiper selected data", selectedData);

  $: {
    if (selectedHostnameData) {
      selectedData = { ...selectedHostnameData }; // Shallow copy to trigger reactivity
    }
  }

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
    selectedData = slide;
    // console.log("Selected Slide:", slide);
  }
  $: if (selectedData) {
    activeAsset = selectedData;
  }

  $: {
    if (activeAsset) {
      scrollToActiveSlide(activeAsset); // Trigger scroll when activeAsset changes
    }
  }
  function scrollToActiveSlide(activeSlide) {
    const activeItem = document.querySelector(
      `.menu-item[data-item-no="${activeSlide.ccr_item_no__ccc_item_no}"]`
    );

    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "nearest", // Align to the nearest position
      });
    }
  }

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

  // Function to handle selection from filtered data
  function selectData(item) {
    selectedData = item;
  }

  export const changeDataHandler = async (data) => {
    try {
      const formData = new FormData();
      const result = await setSpecificItemResultsChange(formData);
      successAlert(result);
    } catch (err) {
      alert(err?.message);
    }
  };
</script>

<div class="contentArea">
  <section
    bind:this={swiperContainer}
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
          {#if $viewPlanResult.length > 0}
            {#each $viewPlanResult as slide}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                data-item-no={slide.ccr_item_no__ccc_item_no}
                value={slide.ccr_index}
                name={slide}
                class="menu-item {activeAsset &&
                activeAsset.ccr_item_no__ccc_item_no ===
                  slide.ccr_item_no__ccc_item_no
                  ? 'active'
                  : ''}"
                on:click={() => handleSlideclick(slide)}
              >
                {slide.ccr_item_no__ccc_item_no}
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
    <section class="rowSection">
      <div class="inputRow">
        <label>점검항목</label>
        <span
          >[{selectedData?.ccr_item_no__ccc_item_no}] {selectedData?.ccr_item_no__ccc_item_title}</span
        >
      </div>
      <div class="inputRow">
        <label>항목그룹</label>
        <span>{selectedData?.ccr_item_no__ccc_item_group}</span>
      </div>
    </section>

    <section class="rowSection">
      <section class="rowSection">
        <div class="inputRow">
          <label>체계담당자명</label>
          <span>{selectedData.ccr_item_no__ccc_target_system}</span>
        </div>
        <div class="inputRow">
          <label>위험도</label>
          <span>{selectedData?.ccr_item_no__ccc_item_level}</span>
        </div>
      </section>
      <!-- <section class="rowSection">
        <div class="inputRow">
          <label>아이디</label>
          <span>{selectedData.ccr_item_no__ccc_target_system}</span>
        </div>
        <div class="inputRow">
          <label>연락처</label>
          <span>{selectedData.ccr_item_no__ccc_target_system}</span>
        </div>
      </section> -->
    </section>
    <!-- 
    <section class="rowSection">
      <div class="inputRow">
        <label>점검일시</label>
        <span>{selectedData.ccr_item_no__ccc_target_system}</span>
      </div>
      <div class="inputRow">
        <label>점검구분</label>
        <span>{selectedData.ccr_item_no__ccc_target_system}</span>
      </div>
    </section> -->
    <div class="inputRow">
      <label>점검기준</label>
      <span> {@html selectedData?.ccr_item_no__ccc_item_criteria}</span>
    </div>

    <div class="inputRow">
      <label>점검내용</label>
      <span> {selectedData?.ccr_item_no__ccc_check_content}</span>
    </div>

    <div class="inputRow">
      <label>점검목적</label>

      <span> {selectedData?.ccr_item_no__ccc_check_purpose}</span>
    </div>

    <div class="inputRow">
      <label>점검결과</label>
      <div style="display: flex; gap:10px; flex-direction:row; width:91%">
        <select
          style="font-size: 16px;"
          value={selectedData?.ccr_item_result}
          on:change={(e) => (insertData.change_result = e.target.value)}
        >
          <option value="" disabled style="font-size: 16px;"> </option>
          <option
            style="font-size: 16px;"
            value="양호"
            selected={selectedData?.ccr_item_result === "양호"}
          >
            양호
          </option>
          <option
            style="font-size: 16px;"
            value="취약"
            selected={selectedData?.ccr_item_result === "취약"}
          >
            취약
          </option>
          <option
            style="font-size: 16px;"
            value="수동점검"
            selected={selectedData?.ccr_item_result === "수동점검"}
          >
            수동점검
          </option>
          <option
            style="font-size: 16px;"
            value="예외처리"
            selected={selectedData?.ccr_item_result === "예외처리"}
          >
            예외처리
          </option>

          <option
            style="font-size: 16px;"
            value="해당없음"
            selected={selectedData?.ccr_item_result === "해당없음"}
          >
            해당없음
          </option>
        </select>

        <!-- Button to open modal (if necessary for editing additional details) -->
        <button class="btnSave" on:click={() => (showModal = true)}>edit</button
        >
        <input type="text" placeholder="Optional input" />
      </div>
    </div>
    <div class="inputRow">
      <label>보안위협</label>
      <span> {selectedData?.ccr_item_no__ccc_security_threat}</span>
    </div>

    <div class="inputRow">
      <label>영향도</label>
      <span> {selectedData?.ccr_item_no__ccc_impact}</span>
    </div>

    <div class="inputRow" style="height: 170px;">
      <label style="width: 133px;">점검현황</label>

      <textarea
        class="line-height"
        name=""
        id=""
        rows="5"
        cols="50"
        style="width: 100%; font-size:14px;"
        bind:value={insertData["change_status_text"]}
      ></textarea>
    </div>

    <div class="inputRow">
      <label>증적파일 </label>
      <input
        type="file"
        on:change={(e) => (insertData.change_evidence_file = e.target.files[0])}
      />
    </div>
    <div class="inputRow">
      <label>개선방법</label>
      <span>{selectedData.ccr_item_no__ccc_mitigation_method}</span>
    </div>

    <div class="inputRow">
      <label>개선예시</label>
      <span style="overflow-y: auto;"
        >{@html selectedData?.ccr_item_no__ccc_mitigation_example.replace(
          /\n/g,
          "<br/>"
        )}</span
      >
    </div>

    <div class="lastButtons">
      <button
        class="btnSave"
        disabled={Object.keys(insertData).length === 0}
        on:click={() => {
          updateSelectedData({
            plan_index: plan_index,
            result_index: selectedData?.ccr_index,
            checklist_index: selectedData?.ccr_item_no__ccc_index,
            change_result:
              insertData?.change_result ?? selectedData?.ccr_item_result,
            change_option: change_option,
            change_status_text: insertData?.change_status_text,
            change_evidence_file: insertData?.change_evidence_file,
          });
          change_option = "ONE";
        }}>저장</button
      >
      <button class="btnUpload">취약점이력추적</button>
      <button class="btnUpload">변경내역이력조회</button>
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
      <ModalPopEdit
        {plan_index}
        {insertData}
        {change_option}
        {closeShowModal}
        {selectedData}
        {updateSelectedData}
      />
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
    height: 60px;
  }
  .formContainer {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    overflow-y: auto;
    height: 65vh;
  }

  .inputRow {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
    width: 100%;
    height: 60px;
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

  .inputRow span {
    flex: 1;
    width: 100%;
    height: 34px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
    padding: 10px;
    /* text-align: right; */
    align-items: center;
    display: flex;
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
