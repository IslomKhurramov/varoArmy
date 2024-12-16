<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import {
    faHome,
    faCalendarAlt,
    faClipboardList,
    faTasks,
    faHistory,
    faCog,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  export let activeMenu = "/";
  const menuItems = [
    { label: "신규계획등록", icon: faCalendarAlt, link: "/page1" },
    { label: "결과등록", icon: faClipboardList, link: "/page2" },
    { label: "결과조회", icon: faTasks, link: "/page3" },
    { label: "조치계획", icon: faTasks, link: "/page4" },
    { label: "조치내역", icon: faClipboardList, link: "/page5" },
    { label: "이력관리", icon: faHistory, link: "/page6" },
    { label: "점검항목관리", icon: faCog, link: "/page7" },
    { label: "점검준비", icon: faCog, link: "/page8" },
    { label: "취약점현황", icon: faClipboardList, link: "/page9" },
  ];
  onMount(() => {
    const currentPath = window.location.pathname;
    const currentItem = menuItems.find((item) => item.link === currentPath);
    activeMenu = currentItem ? currentItem.label : "/";
  });
</script>

<header class="main-header">
  <nav class="menu-container">
    {#each menuItems as item}
      <Link
        to="{item.link}"
        class="menu-item2 {activeMenu === item.label ? 'blue' : ''}"
        on:click="{() => (activeMenu = item.label)}"
      >
        <FontAwesomeIcon icon="{item.icon}" />
        <span>{item.label}</span>
      </Link>
    {/each}
  </nav>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    /* gap: 20px; */
    margin-left: 20px;
    align-items: center;
    width: 100%;
  }
  /* 

  .main-header {
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

  /* Menu Container */
  .menu-container {
    display: flex;
    /* gap: 20px; */
    justify-content: center;
    align-items: center;
  }

  /* Menu Items */
  .menu-container .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #555555;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 6px;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  /* Active State */
  .menu-item.active {
    background-color: #007bff;
    color: #ffffff;
  }

  /* Hover Effects */
  .menu-item:hover {
    background-color: #f5f5f5;
    color: #333333;
  }

  /* Icon Styling */
  .menu-item :global(svg) {
    font-size: 16px;
    color: inherit;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .menu-container {
      flex-wrap: wrap;
      gap: 10px;
    }

    .menu-item {
      font-size: 12px;
      padding: 8px 12px;
    }
  }
</style>
