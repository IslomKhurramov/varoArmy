<script>
  import "../public/assets/css/common.css";

  import { Router, Route, navigate } from "svelte-routing";
  import MainPage from "./components/MainPage.svelte";
  import Page1 from "./components/신규계획등록1/Page1.svelte";
  import Page2 from "./components/결과등록2/Page2.svelte";
  import Page3 from "./components/결과조회3/Page3.svelte";
  import Page4 from "./components/조치계획4/Page4.svelte";
  import Page5 from "./components/조치내역5/Page5.svelte";
  import Page6 from "./components/이력관리6/Page6.svelte";
  import Page7 from "./components/점검항목관리7/Page7.svelte";
  import Page8 from "./components/점검준비8/Page8.svelte";
  import Page9 from "./components/취약점현황9/Page9.svelte";
  import { beforeUpdate, onMount } from "svelte";
  let activeMenu = "MainPage";
  let currentPath = "";
  let currentSearch = "";
  let isDarkMode = false; // Tracks dark mode state
  let isToggleVisible = false;
  beforeUpdate(() => {
    if (
      currentPath !== window.location.pathname ||
      currentSearch !== window.location.search
    ) {
      currentPath = window.location.pathname;
      currentSearch = window.location.search;
      updateActiveMenu();
    }
  });

  // URL 변경 감지를 위한 interval 설정
  onMount(() => {
    const interval = setInterval(() => {
      if (
        currentPath !== window.location.pathname ||
        currentSearch !== window.location.search
      ) {
        currentPath = window.location.pathname;
        currentSearch = window.location.search;
        updateActiveMenu();
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const updateActiveMenu = () => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");

    if (path === "/MainPage" || tab) {
      activeMenu = "MainPage";
    } else {
      switch (path) {
        case "/page1":
          activeMenu = "신규계획등록";
          break;
        case "/page2":
          activeMenu = "결과등록";
          break;
        case "/page3":
          activeMenu = "결과조회";
          break;
        case "/page4":
          activeMenu = "조치계획";
          break;
        case "/page5":
          activeMenu = "조치내역";
          break;
        case "/page6":
          activeMenu = "이력관리";
          break;
        case "/page7":
          activeMenu = "점검항목관리";
          break;
        case "/page8":
          activeMenu = "점검준비";
          break;
        case "/page9":
          activeMenu = "취약점현황";
          break;
        default:
          activeMenu = "MainPage";
      }
    }
  };

  $: {
    updateActiveMenu();
  }
</script>

<Router>
  <body>
    <div id="wrap">
      <div class="container">
        <nav class="titleWrap1">
          <div class="logoBox">
            <div style="display: flex; flex-direction:row; gap:5px;">
              <!-- <img src="assets/images/logo2.png" alt="logo" /> -->
              <p style="font-size: 21px;font-weight:bold;">CBMS</p>
            </div>
            <p style="font-size:11px;">Cyber Battlefield Management System</p>
          </div>
          <div class="titleWrap2">
            <div class="part1">
              <button class="btnHeader">사이버 정보·감시·정찰</button>
              <p>사이버 지휘통제</p>
              <p>사이버작전(능동대응)</p>
            </div>
            <div class="part2">
              <p style="font-weight: bold; font-size:14px">체계관리</p>
              <div style="display: flex; flex-direction:row; gap:5px;">
                <button
                  class="selectModel"
                  on:click="{() => (isToggleVisible = !isToggleVisible)}"
                >
                  실제모드
                </button>

                <!-- Dropdown menu -->
                {#if isToggleVisible}
                  <div class="toggleButton">
                    <p>실제모드</p>
                    <p>훈련모드1</p>
                    <p>훈련모드2</p>
                    <p>훈련모드3</p>
                  </div>
                {/if}
                <button
                  class="selectModel"
                  style="background-color:#E99808; color:#fff">상황도</button
                >
              </div>
              <div>
                <img src="assets/images/mail.png" alt="email" class="email" />
                <div class="messageNumber"><p>785</p></div>
              </div>
              <img src="assets/images/user.png" alt="user" />
              <div>
                <input
                  type="checkbox"
                  class="checkbox"
                  id="checkbox"
                  bind:checked="{isDarkMode}"
                />
                <label for="checkbox" class="checkbox-label">
                  <i class="fas fa-moon"></i>
                  <i class="fas fa-sun"></i>

                  <span class="ball"></span>
                </label>
              </div>
            </div>
          </div>
        </nav>

        <div class="body">
          <MainPage bind:activeMenu />
        </div>
        <!-- <Route path="/page1" component="{Page1}" />
        <Route path="/page2" component="{Page2}" />
        <Route path="/page3" component="{Page3}" />
        <Route path="/page4" component="{Page4}" />
        <Route path="/page5" component="{Page5}" />
        <Route path="/page6" component="{Page6}" />
        <Route path="/page7" component="{Page7}" />
        <Route path="/page6" component="{Page8}" />
        <Route path="/page7" component="{Page9}" /> -->
      </div>
    </div>
  </body>
</Router>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  p {
    display: block;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
  }
  .logoBox img {
    width: 85px;
    height: 42px;
  }
  .part1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 490px;
  }
  .part1 p {
    font-size: 14px;
    font-weight: bold;
  }
  .part2 {
    display: flex;
    flex-direction: row;
    width: 425px;
    justify-content: center;
    gap: 20px;
    align-items: center;
    margin-right: 50px;
  }
  .part2 img {
    width: 28px;
    height: 28px;
  }
  .titleWrap1 {
    display: flex;
    flex-direction: row;
    align-items: center; /* Align items vertically centered */
    justify-content: space-between;
    position: relative;
    padding: 0 24px;
    background-color: #3b4360;
    height: 50px;
    width: 100%;
    color: #fff;
    font-family: "Malgun Gothic", sans-serif;
  }

  .logoBox {
    width: 15%;
    display: flex;
    color: #fff;
    flex-direction: column;
    height: 50px;
    align-items: flex-start; /* Align to the left */
  }

  .titleWrap2 {
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: "Malgun Gothic", sans-serif;
  }
  .body {
    padding: 10px;
  }
  .btnHeader {
    width: 190px;
    height: 30px;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    background-color: #eeeeee;
  }
  button {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0em;
    margin: 0 0 0em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 14px;
    font-family: "Malgun Gothic", sans-serif;
  }
  .selectModel {
    width: 88px;
    height: 28px;
    background-color: #eeeeee;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    position: relative;
  }
  .toggleButton {
    position: absolute;
    width: 120px;
    height: 120px;
    background-color: #eeeeee;
    border: #cccccc;
    border-radius: 4px;
    font-weight: bold;
    margin-top: 32px;
    margin-left: -16px;
    /* margin-right: 43px; */
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .toggleButton p {
    padding-top: 5px;
    text-align: center;
    width: 90px;
    color: #3b4360;
    font-size: 14px;
    padding-bottom: 5px;
  }
  .toggleButton p:hover {
    padding-top: 5px;
    text-align: center;
    background-color: #3b4360;
    color: #fff;
    width: 90px;
    border-radius: 4px;
    cursor: pointer;
  }
  .messageNumber {
    position: absolute;
    background-color: #fdb812;
    color: #3b4360;
    border: 1px solid #223449;
    border-radius: 10px;
    /* margin-right: -185px; */
    margin-top: -36px;
    min-width: 15px;
    text-align: center;
    margin-left: 15px;
  }
  .messageNumber p {
    font-size: 12px;
    font-weight: bold;
    color: #223449;
    font-family: " Malgun Gothic ";
    padding: 2px;
  }
  .email {
    position: relative;
  }
  /************************************/
  .checkbox {
    opacity: 0;
    position: absolute;
  }

  .checkbox-label {
    background-color: #111;
    width: 40px;
    height: 16px;
    border-radius: 50px;
    position: relative;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fa-moon {
    color: #f1c40f;
  }

  .fa-sun {
    color: #f39c12;
  }

  .checkbox-label .ball {
    background-color: #fff;
    width: 22px;
    height: 22px;
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    transition: transform 0.2s linear;
  }

  .checkbox:checked + .checkbox-label .ball {
    transform: translateX(24px);
  }
</style>
