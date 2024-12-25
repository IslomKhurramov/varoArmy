<script>
  import { onMount } from "svelte";
  import { planList, reportPlanList } from "../services/store";
  import { getPlanLists } from "../services/callApi";

  async function getPlanListfunc() {
    try {
      console.log("updating planlist");
      const response = await getPlanLists();

      if (response) {
        planList.set(response.CODE);
      } else {
      }
      // console.log("traceByPlan", $traceByPlan);
    } catch (err) {
      throw err;
    }
  }
  onMount(() => {
    getPlanListfunc();
  });
</script>

<div class="contentArea">
  <div class="formContainer">
    <div class="inputRow">
      <label>점검계획 </label>
      <span
        ><select>
          {#each $planList as plan}
            <option value={plan.ccp_index}>{plan.ccp_title}</option>
          {/each}
        </select></span
      >
    </div>
    <div class="inputRow">
      <label>요약 보고서생성 </label>
      <span> </span>
      <div>
        <button style="margin-right: 10px;" class="btnUpload"
          >보고서생성
        </button><button class="btnUpload">보고서삭제 </button>
      </div>
    </div>

    <div class="inputRow">
      <label>상세 보고서생성 </label>
      <span>
        {$reportPlanList || "데이터 없음"}
      </span>
      <div>
        <button style="margin-right: 10px;" class="btnUpload"
          >보고서생성
        </button><button class="btnUpload">보고서삭제 </button>
      </div>
    </div>
  </div>
</div>

<style>
  .rowSection {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 60px;
  }
  .formContainer {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    overflow-y: auto;
    height: 65vh;
  }

  .inputRow {
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
    width: 100%;
    height: 60px;
  }

  .inputRow label {
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
  }

  .inputRow span {
    flex: 1;
    width: 100%;
    height: 34px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
    padding: 10px;
    /* text-align: right; */
    align-items: center;
    display: flex;
  }

  .inputRow div {
    width: fit-content;
    height: 34px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
    padding: 10px;
    /* text-align: right; */
    align-items: center;
    display: flex;
  }
  .inputRow select {
    width: 100%;
  }
</style>
