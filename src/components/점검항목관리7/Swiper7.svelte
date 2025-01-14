<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";
  import { allCheckList, swiperTargetData } from "../../services/store";
  import { setDeleteChecklistItem } from "../../services/callApi";
  import { successAlert, warningAlert } from "../../shared/sweetAlert";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;
  export let selectedTargetData;
  export let selectedTarget;
  export let allCheckListGet;

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
  // Function to scroll the menu to the active slide automatically

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
    $swiperTargetData &&
    selectedTargetData &&
    Array.isArray(selectedTargetData) &&
    selectedTargetData.length > 0
  ) {
    activeAsset = selectedTargetData.find(
      (slide) => slide.ccc_item_no === $swiperTargetData.ccc_item_no
    );
    $swiperTargetData = activeAsset;

    // Focus on the asset if it exists
    if (activeAsset) {
      setTimeout(() => {
        focusOnAsset(activeAsset.ccc_item_no);
      }, 0);
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

  // Generate fake data
  for (let i = 1; i <= 100; i++) {
    slides.push({
      ccc_item_no: `Item ${i}`, // Example fake item number
      name: `Name ${i}`, // Optional: Add other fields as needed
    });
  }

  let activeAsset = null;
  // Reactively update activeAsset when swiperTargetData changes
  $: if ($swiperTargetData) {
    activeAsset = $swiperTargetData; // Keep the current selection
  }

  // Handle click on a swiper item
  function handleSlideclick(slide) {
    activeAsset = slide; // Update activeAsset
    $swiperTargetData = slide;
    console.log("Selected Slide:", slide);
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
  let isAddingNewGroup = false;
  const cancelNewGroup = () => {
    newGroupName = "";
    isAddingNewGroup = false;
  };
  $: console.log("selectedTargetdataswiper", selectedTarget);

  async function deleteChecklist() {
    try {
      const response = await setDeleteChecklistItem(
        selectedTarget.ccg_index,
        selectedTargetData.ccc_index
      );
      console.log("delete checklist swiper", response);
      if (response.RESULT === "OK") {
        if (response.CODE === "기본 제공된 체크리스트는 삭제가 불가능합니다.") {
          warningAlert("기본 제공된 체크리스트는 삭제가 불가능합니다");
        } else {
          successAlert(`${response.CODE}`);
          await allCheckListGet(); // Fetch updated data after deletion
        }
      } else {
        console.log(response.CODE);
      }
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="contentArea">
  <section bind:this="{swiperContainer}" class="topCon swiper-container">
    <div class="menu-container">
      <button
        class="arrow-btn"
        id="prevBtn"
        on:click="{() => handleScroll('prev')}"
      >
        ◀
      </button>

      <div class="menu-wrapper-container">
        <div class="menu-wrapper" id="menuWrapper" bind:this="{menuWrapper}">
          {#each selectedTargetData as subItem}
            <div
              value="{subItem.ccc_item_no}"
              name="{subItem}"
              class="menu-item {activeAsset &&
              activeAsset.ccc_item_no === subItem.ccc_item_no
                ? 'active'
                : ''}"
              on:click="{() => handleSlideclick(subItem)}"
            >
              {subItem.ccc_item_no}
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
    <div class="form_part">
      <section class="rowSection">
        <div class="inputRow">
          <label>점검대상</label>
          <span>UNIX</span>
        </div>
        <div class="inputRow">
          <label>점검번호</label>
          <span>{$swiperTargetData.ccc_item_no}</span>
        </div>
      </section>

      <div class="inputRow">
        <label>취약점설명</label>
        <span
          >{@html $swiperTargetData.ccc_security_threat.replace(
            /\n/g,
            "<br/>"
          )}</span
        >
      </div>

      <div class="inputRow">
        <label>취약점 점검방법 </label>
        <span
          >{@html $swiperTargetData.ccc_item_criteria.replace(
            /\n/g,
            "<br/>"
          )}</span
        >
      </div>

      <section class="rowSection">
        <div class="inputRow">
          <label>점검기준(Key) </label>
          <input type="text" />
        </div>
        <div class="inputRow">
          <label>점검기준(Value) </label>

          <input type="text" />
        </div>
      </section>

      <div class="inputRow">
        <label>보호대책 </label>
        <span
          >{@html $swiperTargetData.ccc_mitigation_method.replace(
            /\n/g,
            "<br/>"
          )}</span
        >
      </div>
      <div class="lastButtons">
        <button on:click="{deleteChecklist}">삭제하기</button>
        <button>업데이트</button>
      </div>
    </div>
  </div>
</div>
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
            <button class="secondary-button">취소</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
{/if}

<style>
  .form_part {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    border: 1px solid rgb(204, 204, 204);
    padding: 20px;
  }
  .menu-container,
  .menu-wrapper-container {
    overflow-x: hidden;
  }

  .lastButtons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
  }
  .lastButtons button {
    width: auto;
    height: auto;
    background-color: #ffffff;
    color: #555555;
    border-radius: 2px;
    border: 1px solid #999999;
    font-size: 12px;
    cursor: pointer;
    padding: 10px;
  }
  .lastButtons button:hover {
    background-color: #5f7ab0;
    color: #ffffff;
    border: none;
  }
  .rowSection {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 60px;
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
    /* height: 60px; */
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
    height: auto;
    padding: 0 8px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
  }

  .inputRow span {
    flex: 1;
    width: 100%;
    height: auto;
    padding: 17px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
  }
</style>
