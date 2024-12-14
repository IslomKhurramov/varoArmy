<script>
  import { onMount } from "svelte";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.min.css";
  import { allCheckList, swiperTargetData } from "../../services/store";

  let swiperContainer;
  let scrollAmount = 0;
  let itemWidth = 146;
  let menuWidth = 1260;
  let menuWrapper;
  let swiperInstance;
  let showModal = false;
  export let selectedTargetData;
  export let selectedTarget;

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
  // Update activeAsset reactively whenever swiperTargetData changes
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
          {#each selectedTargetData as subItem}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              value="{subItem.ccg_index_id}"
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

    <div class="inputRow">
      <label>점검기준(Key) </label>
      <span
        >{@html $swiperTargetData.ccc_item_criteria.replace(
          /\n/g,
          "<br/>"
        )}</span
      >
    </div>

    <div class="inputRow">
      <label>점검기준(Value) </label>

      <span style="max-height: 250px; overflow-y:auto; width:100%"
        >{@html $swiperTargetData.ccc_mitigation_example.replace(
          /\n/g,
          "<br/>"
        )}</span
      >
    </div>

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
      <button>업데이트</button>
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
