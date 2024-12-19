<script>
  import SwiperPage4 from "../SwiperPage4.svelte";

  export let resultVulnsOfAsset;
  export let selectPage1;
</script>

<div class="first_nenu">
  <div class="last_button">
    <select>
      <option value="미등록" selected>미등록</option>
      <option value="조치예정">조치예정</option>
    </select>
    <select>
      <option
        value="승인
        "
        selected
        >승인
      </option>
      <option
        value="반려
        "
        >반려
      </option>
      <option
        value="미결정
      "
        >미결정
      </option>
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
        {#each resultVulnsOfAsset as asset, index}
          <tr on:click={() => selectPage1(SwiperPage4, asset)}>
            <!-- 번호 in descending order -->
            <td class="text-center">{resultVulnsOfAsset.length - index}</td>

            <!-- 점검분야 -->
            <td class="text-center">{asset.ast_uuid__ast_target__cct_target}</td
            >

            <!-- 자산명 -->
            <td class="text-center">{asset.ast_uuid__ass_uuid__ast_hostname}</td
            >

            <!-- 점검항목 -->
            <td class="text-center">NW-06</td>
            <!-- Static value -->

            <!-- 점검명 -->
            <td class="text-center">Inspection Name Here</td>
            <!-- Replace or map dynamically -->

            <!-- 점검결과 -->
            <td class="text-center">취약</td>
            <!-- Static value -->

            <!-- 처리유형 -->
            <td class="text-center">조치승인</td>
            <!-- Static value -->
          </tr>
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
