<script>
  import { onMount } from "svelte";
  import {
    getDownloadReport,
    getPlanLists,
    getPlanReportLists,
    setDeleteReport,
    setMakeExcelWordFullReport,
  } from "../services/callApi";
  import { errorAlert, successAlert } from "../shared/sweetAlert";

  export let plan_index_for_detail;
  let projectIndex = plan_index_for_detail;
  let loading = false;
  let targetValue = "ALL";
  let selectedTargets = [];

  let selectedPlan = "";
  let planList = [];
  let planReports = null;

  onMount(async () => {
    try {
      planList = await getPlanLists();
    } catch (err) {
      errorAlert(err?.message);
    }
  });
  $: console.log("PLANLIST", planList);

  const getReportData = async () => {
    if (!selectedPlan) return;
    try {
      planReports = await getPlanReportLists(selectedPlan);
    } catch (err) {
      errorAlert(err?.message);
    }
  };

  const setMakeFullReport = async (data) => {
    try {
      loading = true;
      const response = await setMakeExcelWordFullReport(data);

      await getReportData();

      loading = false;
      await successAlert("보고서가 생성되었습니다!");
    } catch (error) {
      loading = false;
      errorAlert(error?.message);
    }
  };

  const deleteReport = async (data) => {
    try {
      const response = await setDeleteReport(data);

      await getReportData();

      await successAlert(response);
    } catch (error) {
      errorAlert(error?.message);
    }
  };

  const downloadReport = async (data) => {
    try {
      await getDownloadReport(data);
    } catch (err) {
      0;
      errorAlert(err?.message);
    }
  };

  $: {
    if (selectedPlan) {
      getReportData();
    }
  }

  $: {
    if (projectIndex) {
      selectedPlan = projectIndex;
    }
  }
</script>

<article class="contentArea">
  {#if loading}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  {/if}
  <article class="flex contentArea projectTitle">
    <div class="flex">
      <div class="formControlWrap">
        <div class="formControl">
          <label>프로젝트명</label>
          <select
            bind:value="{selectedPlan}"
            on:change="{() => (targetValue = 'ALL')}"
          >
            <option value="" selected disabled>선택</option>
            {#if planList.CODE}
              {#each planList.CODE as plan}
                <option value="{plan.ccp_index}">{plan.ccp_title}</option>
              {/each}
            {/if}
          </select>
        </div>
      </div>
    </div>
  </article>

  <article class="contentArea mt-40">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 class="title border">요약 보고서생성</h4>
    <div class="tableListWrap">
      <table class="tableList hdBorder">
        <colgroup>
          <col style="width:240px;" />
          <col />
          <col style="width:210px;" />
          <col style="width:210px;" />
        </colgroup>
        <thead>
          <tr>
            <th class="text-center">보고서유형</th>
            <th class="pl-20 text-center">보고서목록</th>
            <th class="text-center">생성하기</th>
            <th class="text-center">보고서삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">취약점분석평가보고서(엑셀)</td>
            <td class="pl-20">
              <div class="flex excel">
                {#if planReports?.summary && planReports?.summary?.length !== 0}
                  {#each planReports?.summary as report}
                    <a
                      href="javascript:void(0);"
                      on:click="{() =>
                        downloadReport({
                          plan_index: selectedPlan,
                          report_type: 'summary',
                          filename: report,
                        })}"
                    >
                      {report}
                    </a>
                  {/each}
                {/if}
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center">
                <button
                  type="button"
                  class="btn btnPrimary"
                  disabled="{!selectedPlan}"
                  on:click="{() =>
                    setMakeFullReport({
                      plan_index: selectedPlan,
                      report_type: 'summary',
                      report_target: targetValue,
                    })}"
                >
                  보고서생성
                </button>
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center">
                <button
                  type="button"
                  class="btn btnGray"
                  disabled="{!selectedPlan ||
                    !planReports?.summary ||
                    planReports?.summary?.length == 0}"
                  on:click="{() =>
                    deleteReport({
                      plan_index: selectedPlan,
                      report_type: 'summary',
                    })}"
                >
                  보고서삭제
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>

  <article class="contentArea mt-40">
    <h4 class="title border">상세 보고서생성</h4>
    <div class="tableListWrap">
      <table class="tableList hdBorder">
        <colgroup>
          <col style="width:240px;" />
          <col />
          <col style="width:210px;" />
          <col style="width:210px;" />
        </colgroup>
        <thead>
          <tr>
            <th class="text-center">보고서유형</th>
            <th class="pl-20 text-center">보고서목록</th>
            <th class="text-center">생성하기</th>
            <th class="text-center">보고서삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">취약점분석평가보고서(엑셀)</td>
            <td class="pl-20">
              <div class="flex excel">
                {#if planReports?.v_excel && planReports?.v_excel?.length !== 0}
                  {#each planReports?.v_excel as report}
                    <a
                      href="javascript:void(0);"
                      on:click="{() =>
                        downloadReport({
                          plan_index: selectedPlan,
                          report_type: 'v_excel',
                          filename: report,
                        })}"
                    >
                      {report}
                    </a>
                  {/each}
                {/if}
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center">
                <button
                  type="button"
                  class="btn btnPrimary"
                  disabled="{!selectedPlan}"
                  on:click="{() =>
                    setMakeFullReport({
                      plan_index: selectedPlan,
                      report_type: 'v_excel',
                      report_target: targetValue,
                    })}"
                >
                  보고서생성
                </button>
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center">
                <button
                  type="button"
                  class="btn btnGray w140"
                  disabled="{!selectedPlan ||
                    !planReports?.v_excel ||
                    planReports?.v_excel?.length == 0}"
                  on:click="{() =>
                    deleteReport({
                      plan_index: selectedPlan,
                      report_type: 'v_excel',
                    })}"
                >
                  보고서삭제
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="text-center">취약점분석평가보고서(워드)</td>
            <td class="pl-20">
              <div class="flex excel">
                {#if planReports?.v_word && planReports?.v_word?.length !== 0}
                  {#each planReports?.v_word as report}
                    <a
                      href="javascript:void(0);"
                      on:click="{() =>
                        downloadReport({
                          plan_index: selectedPlan,
                          report_type: 'v_word',
                          filename: report,
                        })}">{report}</a
                    >
                  {/each}
                {/if}
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center">
                <button
                  type="button"
                  class="btn btnPrimary"
                  disabled="{!selectedPlan}"
                  on:click="{() =>
                    setMakeFullReport({
                      plan_index: selectedPlan,
                      report_type: 'v_word',
                      report_target: targetValue,
                    })}"
                >
                  보고서생성
                </button>
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center">
                <button
                  type="button"
                  class="btn btnGray"
                  disabled="{!selectedPlan ||
                    !planReports?.v_word ||
                    planReports?.v_word?.length == 0}"
                  on:click="{() =>
                    deleteReport({
                      plan_index: selectedPlan,
                      report_type: 'v_word',
                    })}"
                >
                  보고서삭제
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</article>

<style>
  * {
    font-size: 14px;
  }
  .btn {
    width: 120px;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(167, 167, 167, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure it sits above other content */
  }

  .loading-spinner {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  /* Spinner animation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
