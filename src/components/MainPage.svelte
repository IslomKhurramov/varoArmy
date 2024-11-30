<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Page1 from "./신규계획등록1/Page1.svelte";
  import Page2 from "./결과등록2/Page2.svelte";
  import Page3 from "./결과조회3/Page3.svelte";
  import Page4 from "./조치계획4/Page4.svelte";
  import Page5 from "./조치내역5/Page5.svelte";
  import Page6 from "./이력관리6/Page6.svelte";
  import Page7 from "./점검항목관리7/Page7.svelte";
  import Page8 from "./점검준비8/Page8.svelte";
  import Page9 from "./취약점현황9/Page9.svelte";
  import { Route } from "svelte-routing";

  export let activeMenu = "신규계획등록";

  onMount(() => {
    switch (window.location.pathname) {
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
  });
</script>

<section class="search_box"></section>
<main>
  <section class="section1">
    <!-- <div class="header_menu"><h2>kjkjkjkjkjk</h2></div> -->
    <div class="body_menu"></div>
  </section>
  <section class="section2">
    <div class="header_menu">
      <Header />
    </div>
    <div class="body_menu">
      <Route path="/page1" component="{Page1}" />
      <Route path="/page2" component="{Page2}" />
      <Route path="/page3" component="{Page3}" />
      <Route path="/page4" component="{Page4}" />
      <Route path="/page5" component="{Page5}" />
      <Route path="/page6" component="{Page6}" />
      <Route path="/page7" component="{Page7}" />
      <Route path="/page6" component="{Page8}" />
      <Route path="/page7" component="{Page9}" />
    </div>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }
  .search_box {
    position: relative;
    padding: 0 24px;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
    height: 80px;
  }
  .section1 {
    width: 15%;
    height: 75vh;
    margin-right: 5px;
    margin-top: 5px;
    border-radius: 10px;
    flex-direction: column;
    border: 1px solid rgba(242, 242, 242, 1);
  }
  .section2 {
    width: 85%;
    height: 75vh;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
  }
  .header_menu {
    background-color: #fff;
    height: 60px;
    width: 100%;
    /* margin-bottom: 10px; */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
  }
  .body_menu {
    background-color: #fff;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
  }
</style>
