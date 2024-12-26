<script>
  import { onMount } from "svelte";

  // $: console.log("selectedData", selectedData);
  // Generate fake data for testing
  export let closeShowModal;
  let paginatedData = [];
  const generateFakeData = () => {
    for (let i = 1; i <= 10; i++) {
      paginatedData.push({
        ast_uuid__ass_uuid__ast_hostname: `Host-${i}`,
        ccr_item_no__ccc_item_no: `Item-${i}`,
        ccr_item_no__ccc_item_title: `Title of Item ${i}`,
      });
    }
  };

  // Generate data on component mount
  onMount(() => {
    generateFakeData();
  });
</script>

<div class="modal">
  <div
    style="height: 298pxpx; 
      padding-bottom: 10px;
    "
  >
    <table class="tableList hdBorder">
      <colgroup>
        <col style="width:90px;" />
        <col style="width:170px" />
        <col style="width:140px" />
        <col style="width: 200px;" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="text-center">수정일 </th>
          <th class="text-center">변경자 </th>
          <th class="text-center">변경전</th>
          <th class="text-center">변경후</th>
        </tr>
      </thead>
      <tbody>
        {#each paginatedData as data, index}
          <tr>
            <!-- 번호: Reverse index to display latest first -->
            <td class="text-center">{paginatedData.length + index}</td>
            <!-- 점검대상: ast_uuid__ass_uuid__ast_hostname -->
            <td class="text-center">
              {data?.ast_uuid__ass_uuid__ast_hostname || "N/A"}
            </td>

            <!-- 점검항목: ccr_item_no__ccc_item_no -->
            <td class="text-center">
              <div>
                {data?.ccr_item_no__ccc_item_no || "N/A"}
              </div>
            </td>

            <!-- 점검이름: ccr_item_no__ccc_item_title -->
            <td>
              {data?.ccr_item_no__ccc_item_title || "N/A"}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between">
      {#if closeShowModal}
        <div
          style="display:flex; flex-direction:row; width:100%; justify-content:center; gap:10px;align-items:center;"
        >
          <button class="btnDone" on:click={closeShowModal}>닫기</button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  * {
    font-size: 14px;
  }

  .modal {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    height: 93%;
    overflow: auto;
    /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
    /* max-width: 800px;
          margin: 20px auto; */
    font-family: Arial, sans-serif;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    margin-bottom: 20px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
    vertical-align: middle;
  }

  th {
    background-color: #f7fafc;
    font-weight: bold;
    color: #000000;
    width: 15px;
  }

  .mitigation-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  td {
    width: 230px;
  }

  td {
    font-size: 16px;
  }
</style>
