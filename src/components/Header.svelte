<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";

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

<header class="tabMenu">
  <div class="{`menu ${activeMenu === '신규계획등록' ? 'active' : ''}`}">
    <Link to="/page1" on:click="{() => (activeMenu = '신규계획등록')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>신규계획등록</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '결과등록' ? 'active' : ''}`}">
    <Link to="/page2" on:click="{() => (activeMenu = '결과등록')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>결과등록</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '결과조회' ? 'active' : ''}`}">
    <Link to="/page3" on:click="{() => (activeMenu = '결과조회')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>결과조회</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '조치계획' ? 'active' : ''}`}">
    <Link to="/page4" on:click="{() => (activeMenu = '조치계획')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>조치계획</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '조치내역' ? 'active' : ''}`}">
    <Link to="/page5" on:click="{() => (activeMenu = '조치내역')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>조치내역</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '이력관리' ? 'active' : ''}`}">
    <Link to="/page6" on:click="{() => (activeMenu = '이력관리')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>이력관리</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '점검항목관리' ? 'active' : ''}`}">
    <Link to="/page7" on:click="{() => (activeMenu = '점검항목관리')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>점검항목관리</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '점검준비' ? 'active' : ''}`}">
    <Link to="/page8" on:click="{() => (activeMenu = '점검준비')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>점검준비</span>
      </a>
    </Link>
  </div>
  <div class="{`menu ${activeMenu === '취약점현황' ? 'active' : ''}`}">
    <Link to="/page9" on:click="{() => (activeMenu = '취약점현황')}">
      <a href="javascript:void(0);" class="menuItme">
        <span>취약점현황</span>
      </a>
    </Link>
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
</style>
