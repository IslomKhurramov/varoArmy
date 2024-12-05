<script>
  export let showModal;
  export let modalWidth;
  export let modalHeight;
  export let showModalSecond = null;
  export let showModalRegisteredAdmin = null;
  export let modalData;
  export let showExecuteAllButton = false;

  let dialog;
  let dialogSecond;
  let dialogThird;

  function scrollToTop(dialogElement) {
    if (dialogElement) {
      dialogElement.scrollTop = 0; // Reset scroll position
    }
  }

  $: if (dialog && showModal) {
    dialog.showModal();
    scrollToTop(dialog);
  }
  $: if (dialogSecond && showModalSecond) dialogSecond.showModal();
  $: if (dialogThird && showModalRegisteredAdmin) dialogThird.showModal();

    // 전체일괄재실행 tugmasi bosilganda ishlaydigan funksiya
    const handleExecuteAll = () => {
    console.log("전체일괄재실행 button clicked");
    // Sizning logikangizni shu yerda qo'shing
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  style="width: {modalWidth}%; height: {modalHeight}px; overflow: hidden;"
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => {
    dialog.close();
    modalData = [];
  }}
>
  <div class="btn_main" style="height: 100vh; overflow: auto;" on:click|stopPropagation>
    <slot name="header" />
    <slot />
    <div>
      <button
      class="btn-box_12"
        on:click={() => {
          dialog.close();
          modalData = [];
        }}>닫기</button
      >
    </div>

    <div>
        {#if showExecuteAllButton}
        <button
          class="btn-secondary"
          on:click={handleExecuteAll}
        >
          전체일괄재실행
        </button>
        {/if}
    </div>

  </div>
</dialog>

<style>
  dialog {
    border-radius: 0.2em;
    border: none;
    padding: 20px;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .btn-box_12 {
    width: 74px;
    height: 34px;
    display: flex;
    float: right;
    margin-top: 20px;
    margin-left: 10px;
    color: #999999;
    background-color: #FFFFFF;
    border: 1px solid #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .btn-box_12:hover {
    opacity: 0.9;
    color: #FFFFFF;
    background-color: #333333;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }

  .btn-secondary {
    width: 120px;
    height: 34px;
    display: flex;
    float: right;
    margin-top: 20px;
    color: #999999;
    background-color: #FFFFFF;
    border: 1px solid #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-secondary:hover {
    opacity: 0.9;
    color: #FFFFFF;
    background-color: #333333;
    border: none;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
