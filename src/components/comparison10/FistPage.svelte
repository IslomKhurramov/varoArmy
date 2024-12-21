<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { allPlanList } from "../../services/store";

  let chart;

  onMount(() => {
    const ctx = document.getElementById("chart1").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "August",
          "September",
        ],
        datasets: [
          {
            label: "Points",
            data: [15, 9, 25, 18, 31, 25, 25, 18, 31, 25],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ensure it doesn't auto-resize uncontrollably
      },
    });
  });

  let data = [
    { month: "Jan", points: 15 },
    { month: "Feb", points: 9 },
    { month: "Mar", points: 25 },
    { month: "Apr", points: 18 },
    { month: "May", points: 31 },
    { month: "Jun", points: 25 },
  ];
</script>

<main>
  <article class="contentArea" style="padding-top: 0px; margin-top:0px">
    <p style="margin-bottom: 0px;">잔존 취약점 현황</p>
    <div class="chart-container">
      <canvas id="chart1"></canvas>
    </div>
  </article>
  <div
    class="tableListWrap"
    style="border: 1px solid #e8e8e8; border-radius:10px;"
  >
    <table class="tableList hdBorder">
      <colgroup>
        <col style="width:120px;" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td class="text-center">조치완료</td>
          {#each data as row (row.month)}
            <td class="text-center">{row.points}</td>
          {/each}
        </tr>
        <tr>
          <td class="text-center">예외처리</td>
          {#each data as row (row.month)}
            <td class="text-center">{row.points}</td>
          {/each}
        </tr>
        <tr>
          <td class="text-center">합계</td>
          {#each data as row (row.month)}
            <td class="text-center">{row.points}</td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <p style="margin-top: 50px; margin-bottom:0px; padding-bottom:0px">
    미조치현황
  </p>
  <div
    class="tableListWrap"
    style="border: 1px solid #e8e8e8; border-radius:10px;"
  >
    <table class="tableList hdBorder">
      <colgroup>
        <col style="width:120px;" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td class="text-center">점검대상</td>
          {#each data as row (row.month)}
            <td class="text-center">{row.points}</td>
          {/each}
        </tr>
        <tr>
          <td class="text-center">조치완료</td>
          {#each data as row (row.month)}
            <td class="text-center">{row.points}</td>
          {/each}
        </tr>
        <tr>
          <td class="text-center">미조치</td>
          {#each data as row (row.month)}
            <td class="text-center">{row.points}</td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    height: 80vh;
    overflow-y: auto;
  }
  #chart1 {
    width: 84%;
    height: 300px;
  }
  .chart-container {
    height: 300px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .formContainer {
    max-width: 85%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
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

  .table-container {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .data-table th,
  .data-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  .data-table th {
    background-color: #f4f4f4;
  }

  .data-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .data-table tr:hover {
    background-color: #eaeaea;
  }
</style>
