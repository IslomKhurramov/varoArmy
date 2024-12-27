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
  import { Link, Route } from "svelte-routing";
  import { getAllPlanLists } from "../services/callApi";
  import { allPlanList } from "../services/store";
  import LeftMenu from "./LeftMenu.svelte";
  import Page10 from "./comparison10/page10.svelte";

  export let activeMenu = "/";
  let currentPage = null;
  onMount(() => {
    switch (window.location.pathname) {
      case "/leftMenu":
        activeMenu = "";
        break;
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
      case "/page10":
        activeMenu = "취약점추적";
        break;
      default:
        activeMenu = "";
    }
  });
  /**********GETALLPLANLIST******************/
  let page_cnt = "1";
  let list_cnt = "100";
  async function getPlanList() {
    try {
      console.log("updating planlist");
      const response = await getAllPlanLists(page_cnt, list_cnt);

      if (response) {
        allPlanList.set(response.data);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  let loading = true;
  onMount(async () => {
    loading = true;
    await getPlanList();
    loading = false;
  });
  // $: console.log("allPlanList", $allPlanList);
</script>

<section class="search_box">
  <div style="width: 15%; margin-right:10px;">
    <p style="text-align:center">{activeMenu}</p>
  </div>
  {#if activeMenu === "신규계획등록"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="운영관리부대" selected>운영관리부대</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option value="점검관" selected>점검관</option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "결과등록"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="관리부대
"
          selected
          >관리부대
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="담당자" selected>담당자</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "결과조회"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="관리부대
"
          selected
          >관리부대
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="담당자" selected>담당자</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "조치계획"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="관리부대
"
          selected
          >관리부대
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="담당자" selected>담당자</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "조치내역"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="운영관리부대" selected>운영관리부대</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option value="점검관" selected>점검관</option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "이력관리"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="운영관리부대" selected>운영관리부대</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option value="점검관" selected>점검관</option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "점검항목관리"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="항목그룹">항목그룹</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option value="점검대상" selected>점검대상 </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="검색이름검색" selected>검색이름검색</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option value="점검관" selected>점검관</option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "점검준비"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="운영관리부대" selected>운영관리부대</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option value="점검관" selected>점검관</option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {:else if activeMenu === "취약점현황"}
    <section class="filterWrap">
      <!-- Group Filter -->
      <select name="approval_status" id="approval_status">
        <option value="점검계획명">점검계획명</option>
        <option></option>
      </select>

      <!-- OS Type Filter -->
      <select name="asset_group" id="asset_group">
        <option
          value="망 구분
"
          selected
          >망 구분
        </option>

        <option value="UNIX">UNIX</option>
        <option value="WINDOWS">WINDOWS</option>
        <option value="PC">PC</option>
        <option value="NETWORK">NETWORK</option>
        <option value="DBMS">DBMS</option>
        <option value="WEB">WEB</option>
        <option value="WAS">WAS</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SECURITY">SECURITY</option>
      </select>

      <!-- Agent Installation Status Filter -->
      <select name="operating_system" id="operating_system">
        <option value="운영관리부대" selected>운영관리부대</option>
        <option value="YES">등록승인</option>
        <option value="NO">등록 해제</option>
      </select>

      <!-- Activation Status Filter -->
      <select name="agent_status" id="agent_status">
        <option value="점검관" selected>점검관</option>
        <option value="1">활동적인</option>
        <option value="0">비활성</option>
      </select>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button class="btn btnSearch"
        ><img src="assets/images/search.png" alt="search" />조회</button
      >
    </section>
  {/if}
</section>
<main>
  <section class="section2">
    <div class="header_menu">
      <div style="width: 10%; display:flex; justify-content:center">
        <Link to={"/"}>MainPage</Link>
      </div>
      <div style="width: 80%; display:flex; justify-content:flex-start">
        <Header />
      </div>
    </div>
    <div class="body_menu">
      <Route path="/page1">
        <Page1 {getPlanList} /></Route
      >
      <Route path="/page2" component={Page2} />
      <Route path="/page3">
        <Page3 {getPlanList} {loading} />
      </Route>
      <Route path="/page4">
        <Page4 {getPlanList} {loading} />
      </Route>
      <Route path="/page5">
        <Page5 {getPlanList} />
      </Route>
      <Route path="/page6">
        <Page6 {getPlanList} />
      </Route>
      <Route path="/page7" component={Page7} />
      <Route path="/page8" component={Page8} />
      <Route path="/page9" component={Page9} />
      <Route path="/page10" component={Page10} />

      <Route path="/">
        <LeftMenu {getPlanList} />
      </Route>
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
    /* padding: 0 24px; */
    justify-content: space-between;
    justify-content: center;
    width: 100%;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
    height: 60px;
    display: flex;
  }
  .section1 {
    width: 15%;
    height: 90vh;
    margin-right: 5px;
    margin-top: 5px;
    border-radius: 10px;
    flex-direction: column;
    border: 1px solid rgba(242, 242, 242, 1);
  }
  .section2 {
    width: 100%;
    height: 90vh;
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
    justify-content: space-around;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
  }
  .body_menu {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(242, 242, 242, 1);
  }
  .filterWrap {
    display: flex;
    width: 85%;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    gap: 20px;
  }
</style>
