<script>
  import SwiperPage4 from "../SwiperPage4.svelte";

  export let resultVulnsOfPlans;
  export let targetName;
  export let selectPage1;
  $: console.log("firstmenu", resultVulnsOfPlans);
</script>

<div class="first_nenu">
  <div class="last_button">
    <select>
      <option value="미등록" selected>미등록</option>
      <option value="조치예정">조치예정</option>
    </select>
  </div>

  <div class="tableListWrap">
    <table class="tableList hdBorder">
      <colgroup>
        <col style="width:90px;" />
        <col style="width:170px" />
        <col style="width:140px" />
        <col style="width: 200px;" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="text-center">점검분야 </th>
          <th class="text-center">자산명 </th>
          <th class="text-center">점검항목</th>
          <th class="text-center">점검명</th>
          <th class="text-center">점검결과 </th>
          <th class="text-center">처리유형 </th>
        </tr>
      </thead>
      <tbody>
        {#each resultVulnsOfPlans as plan}
          {#each plan.plan_target as targetGroup}
            {#each Object.entries(targetGroup) as [category, assets]}
              {#if category === targetName}
                {#each assets as asset, index}
                  <tr on:click={() => selectPage1(SwiperPage4, asset)}>
                    <td class="text-center">{assets.length - index}</td>
                    <td class="text-center">{category}</td>
                    <td class="text-center"
                      >{asset.ast_uuid__ass_uuid__ast_hostname}</td
                    >
                    <td class="text-center">NW-06</td>
                    <td class="text-center">{plan.plan_title}</td>
                    <td class="text-center">취약</td>
                    <td class="text-center">조치승인</td>
                  </tr>
                {/each}
              {/if}
            {/each}
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .first_nenu {
    margin-top: 10px;
  }

  thead {
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick the header to the top */
    z-index: 10; /* Ensure the header is above the scrolling content */
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); /* Shadow effect for separation */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table th {
    /* background-color: #aaaaaa;
        color: white; */
    font-weight: bold;
  }
  table th,
  table td {
    padding: 10px;
    /* text-align: center; */
    font-size: 12px;
    /* height: 40px; */
  }
  table td {
    font-weight: normal;
    height: 40px;
  }

  .tableListWrap {
    height: 60vh;
    /* margin-bottom: 20px; */
    overflow-y: auto;
  }

  tr:hover {
    cursor: pointer;
    background-color: #f4f4f4;
    transition-duration: 0.3s;
  }

  .last_button {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
  }
  .last_button button {
    padding: 10px;
    border-radius: 4px;
    width: auto;
    margin: 10px;
  }
</style>
