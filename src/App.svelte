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
              <img src="assets/images/cbms.png" alt="logo" />
              <p>CBMS</p>
            </div>
            <p>Cyber Battlefield Management System</p>
          </div>
          <div class="titleWrap2">
            <div class="part1">
              <button class="btnHeader">사이버 정보·감시·정찰</button>
              <p>사이버 지휘통제</p>
              <p>사이버작전(능동대응)</p>
            </div>
            <div class="part2">
              <p>체계관리</p>
              <div style="display: flex; flex-direction:row; gap:5px;">
                <button class="selectModel">실제모드</button>
                <button
                  class="selectModel"
                  style="background-color:#E99808; color:#fff">상황도</button
                >
              </div>
              <img src="assets/images/mail.png" alt="email" />
              <img src="assets/images/user.png" alt="user" />
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
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .logoBox {
    width: 15%;
    display: flex;
    color: #fff;
    flex-direction: column;
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
  .part2 {
    display: flex;
    flex-direction: row;
    width: 590px;
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
    position: relative;
    padding: 0 24px;
    justify-content: space-between;
    background-color: #3b4360;
    height: 50px;
    width: 100%;
    color: #fff;
    font-family: "Malgun Gothic", sans-serif;
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
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
  }
</style>
