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
        <nav class="titleWrap">
          <h1>LOGO</h1>

          <section>
            <div class="alarmWrap">
              <button type="button" class="alarm on notification">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="./assets/images/alarm.svg" />
              </button>
              <!-- <div class="tooltip-modal">
                <h3 class="title">알림</h3>
                <section class="content" style="height: 290px;overflow: auto;">
                  <div>
                   
                    <a href="javascript:void(0);">
                      <div class="title"></div>
                      <div class="day"></div>
                    </a>
                  </div>
                </section>
              </div>
            </div> -->
              <article class="user-box-menu">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="./assets/images/person.svg" />
                <div class="user" style="min-width: 60px;font-size: 16px;">
                  <span style="font-size: 16px;"> </span>님
                </div>
                <div class="logout-menu">
                  <button class="logout-button"> 로그아웃 </button>
                </div>
              </article>
            </div>
          </section>
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
  .login_box {
    display: flex;
    flex-direction: row;
    width: 300px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
  }
  .alarmWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .titleWrap {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 0 24px;
    justify-content: space-between;
    background-color: #fff;
    height: 90px;
  }
  .body {
    padding: 10px;
  }
</style>
