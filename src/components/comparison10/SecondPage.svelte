<script>
  import { writable } from "svelte/store";

  function getStrokeColor(score) {
    if (score > 60)
      return "#0067ff"; // Blue
    else if (score > 30)
      return "#00ff00"; // Green
    else return "#ff0000"; // Red
  }

  // Fake comparison plan data
  const fakeComparisonPlan = {
    first_plan: {
      ccp_security_point: 85,
      ccp_title: "First Plan - Project A",
      ccp_cdate: new Date().toISOString(),
      system_count: 5,
      vulnerability_summary: {
        vulnerability_count: 15,
        most_vulnerable_asset: "Server-1",
        most_common_item: {
          item_code: "Item-101",
          target_type: "Type A",
        },
        fixed_count: 10,
      },
      vulns: [
        {
          ast_uuid__ass_uuid__ast_hostname: "Server-1",
          ccr_item_no__ccc_item_title: "Firewall Config",
          ccr_item_no__ccc_item_level: "High",
          ccr_item_result: "Fail",
          ccr_item_status: "Pending\nConfiguration update needed.",
        },
        {
          ast_uuid__ass_uuid__ast_hostname: "Server-2",
          ccr_item_no__ccc_item_title: "Password Policy",
          ccr_item_no__ccc_item_level: "Medium",
          ccr_item_result: "Pass",
          ccr_item_status: "Completed",
        },
        {
          ast_uuid__ass_uuid__ast_hostname: "Server-3",
          ccr_item_no__ccc_item_title: "TLS Version",
          ccr_item_no__ccc_item_level: "Critical",
          ccr_item_result: "Fail",
          ccr_item_status: "Pending\nUpgrade TLS to 1.2+.",
        },
      ],
    },
    second_plan: {
      ccp_security_point: 73,
      ccp_title: "Second Plan - Project B",
      ccp_cdate: new Date().toISOString(),
      system_count: 8,
      vulnerability_summary: {
        vulnerability_count: 25,
        most_vulnerable_asset: "Database-1",
        most_common_item: {
          item_code: "Item-202",
          target_type: "Type B",
        },
        fixed_count: 15,
      },
      vulns: [
        {
          ast_uuid__ass_uuid__ast_hostname: "Database-1",
          ccr_item_no__ccc_item_title: "Backup Policy",
          ccr_item_no__ccc_item_level: "Critical",
          ccr_item_result: "Fail",
          ccr_item_status: "Pending\nNo backup schedule found.",
        },
        {
          ast_uuid__ass_uuid__ast_hostname: "Server-4",
          ccr_item_no__ccc_item_title: "Antivirus Software",
          ccr_item_no__ccc_item_level: "Low",
          ccr_item_result: "Pass",
          ccr_item_status: "Completed",
        },
        {
          ast_uuid__ass_uuid__ast_hostname: "Web Server",
          ccr_item_no__ccc_item_title: "HTTP Headers",
          ccr_item_no__ccc_item_level: "Medium",
          ccr_item_result: "Fail",
          ccr_item_status: "Pending\nAdd CSP headers.",
        },
      ],
    },
  };
  // Writable store for testing
  export const comparisonPlan = writable(fakeComparisonPlan);

  // Handlers
  function handleTableClick(index, vuln) {
    // console.log("First Plan - Clicked Row:", index, vuln);
  }

  function handleTableClick2(index, vuln) {
    // console.log("Second Plan - Clicked Row:", index, vuln);
  }
</script>

<section>
  <div class="firstContainer">
    <select name="operating_system" id="operating_system" class="select_input">
      <option value="" selected>플랜명</option>
    </select>
    {#if $comparisonPlan.first_plan}
      <div class="diagram_container">
        <div class="right_diag">
          <div
            class="circle"
            style="width: 150px;"
            data-percent={$comparisonPlan.first_plan.ccp_security_point || 0}
            data-offset="440"
          >
            <svg viewBox="0 0 150 150">
              <!-- Background Circle -->
              <circle
                cx="75"
                cy="75"
                r="70"
                stroke="#fff"
                stroke-width="10"
                fill="none"
              />
              <!-- Progress Circle -->
              <circle
                class="progress"
                cx="75"
                cy="75"
                r="70"
                stroke={getStrokeColor(
                  $comparisonPlan.first_plan.ccp_security_point || 0
                )}
                stroke-width="10"
                fill="none"
                stroke-dasharray="440"
                stroke-dashoffset={440 -
                  (440 * ($comparisonPlan.first_plan.ccp_security_point || 0)) /
                    100}
                stroke-linecap="round"
                transform="rotate(-90 75 75)"
              />
            </svg>
            <!-- Percentage Label -->
            <div class="percent">
              <span
                class="number"
                style="font-size: 32px; color: {getStrokeColor(
                  $comparisonPlan.first_plan.ccp_security_point || 0
                )};"
              >
                {$comparisonPlan.first_plan.ccp_security_point > 0
                  ? $comparisonPlan.first_plan.ccp_security_point
                  : 0}%
              </span>
            </div>
          </div>
          <p>전체보안수준</p>
        </div>

        <div class="iconCard">
          <article class="graphCard hoverCard">
            <div class="contents">
              <!-- Asset Details -->
              <div class="text flex col justify-between">
                <ul>
                  <li>
                    <span>조치대상 : </span>{$comparisonPlan.first_plan
                      .vulnerability_summary.vulnerability_count ||
                      "데이터 없음"}건
                  </li>
                  <li>
                    <span>조치완료 : </span>{$comparisonPlan.first_plan
                      .ccp_title || "데이터 없음"}
                  </li>
                  <li>
                    <span>예외처리 : </span>
                    {$comparisonPlan.first_plan.ccp_cdate
                      ? new Date(
                          $comparisonPlan.first_plan.ccp_cdate
                        ).toLocaleString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Unknown"}
                  </li>
                  <li>
                    <span>합계 : </span>{$comparisonPlan.first_plan
                      .system_count || "데이터 없음"}대
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    {:else}
      <div class="no-data-message">
        <p>비교할 첫 번째 프로젝트를 선택하세요</p>
      </div>
    {/if}
  </div>
  <div class="firstContainer">
    <select name="operating_system" id="operating_system" class="select_input">
      <option value="" selected>플랜명</option>
    </select>
    {#if $comparisonPlan.second_plan}
      <div class="diagram_container">
        <div class="right_diag">
          <div
            class="circle"
            style="width: 150px;"
            data-percent={$comparisonPlan.second_plan.ccp_security_point || 0}
            data-offset="440"
          >
            <svg viewBox="0 0 150 150">
              <!-- Background Circle -->
              <circle
                cx="75"
                cy="75"
                r="70"
                stroke="#fff"
                stroke-width="10"
                fill="none"
              />
              <!-- Progress Circle -->
              <circle
                class="progress"
                cx="75"
                cy="75"
                r="70"
                stroke={getStrokeColor(
                  $comparisonPlan.second_plan.ccp_security_point || 0
                )}
                stroke-width="10"
                fill="none"
                stroke-dasharray="440"
                stroke-dashoffset={440 -
                  (440 *
                    ($comparisonPlan.second_plan.ccp_security_point || 0)) /
                    100}
                stroke-linecap="round"
                transform="rotate(-90 75 75)"
              />
            </svg>
            <!-- Percentage Label -->
            <div class="percent">
              <span
                class="number"
                style="font-size: 32px; color: {getStrokeColor(
                  $comparisonPlan.second_plan.ccp_security_point || 0
                )};"
              >
                {$comparisonPlan.second_plan.ccp_security_point > 0
                  ? $comparisonPlan.second_plan.ccp_security_point
                  : 0}%
              </span>
            </div>
          </div>
          <p>전체보안수준</p>
        </div>

        <div class="iconCard">
          <article class="graphCard hoverCard">
            <div class="contents">
              <!-- Asset Details -->
              <div class="text flex col justify-between">
                <ul>
                  <li>
                    <span>조치대상 : </span>{$comparisonPlan.second_plan
                      .vulnerability_summary.vulnerability_count ||
                      "데이터 없음"}건
                  </li>
                  <li>
                    <span>조치완료 : </span>{$comparisonPlan.second_plan
                      .ccp_title || "데이터 없음"}
                  </li>
                  <li>
                    <span>예외처리 : </span>
                    {$comparisonPlan.second_plan.ccp_cdate
                      ? new Date(
                          $comparisonPlan.second_plan.ccp_cdate
                        ).toLocaleString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Unknown"}
                  </li>
                  <li>
                    <span>합계 : </span>{$comparisonPlan.second_plan
                      .system_count || "데이터 없음"}건
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    {:else}
      <div class="no-data-message">
        <p>비교할 두 번째 프로젝트를 선택하세요</p>
      </div>
    {/if}
  </div>
</section>

<button class="btn modify-btn">비교</button>

<section class="table_section">
  <div
    class="tableListWrap table2"
    style="margin-bottom: 20px; margin-top:20px; margin; height:45vh; overflow-y:auto;"
  >
    <table class="tableList hdBorder">
      <colgroup>
        <col />
        <col style="width:100px;" />
        <col style="width:160px;" />
        <col />
      </colgroup>

      <thead>
        <tr>
          <th class="text-center">점검항목</th>
          <th class="text-center">점검결과</th>
          <th class="text-center">조치대응 </th>
          <th class="text-center">사유</th>
        </tr>
      </thead>

      {#if $comparisonPlan.first_plan}
        {#each $comparisonPlan.first_plan.vulns as vuln, index}
          <tbody>
            <tr
              on:click={() => {
                handleTableClick(index, vuln);
              }}
              class="clickLine"
            >
              <td class="text-center line-height"
                >{vuln.ast_uuid__ass_uuid__ast_hostname}</td
              >
              <td class="text-center line-height"
                >{vuln.ccr_item_no__ccc_item_title}</td
              >
              <td class="text-center line-height"
                >{vuln.ccr_item_no__ccc_item_level}</td
              >
              <td class="text-center line-height">{vuln.ccr_item_result}</td>
            </tr>
          </tbody>
        {/each}
      {/if}
    </table>
  </div>
  <div
    class="tableListWrap table2"
    style="margin-bottom: 20px; margin-top:20px; margin; height:43vh; overflow-y:auto;"
  >
    <table class="tableList hdBorder font-size: 16px;">
      <colgroup>
        <col />
        <col style="width:100px;" />
        <col style="width:160px;" />
        <col />
      </colgroup>

      <thead>
        <tr>
          <th class="text-center">점검항목</th>
          <th class="text-center">점검결과</th>
          <th class="text-center">조치대응 </th>
          <th class="text-center">사유</th>
        </tr>
      </thead>

      {#if $comparisonPlan.second_plan}
        {#each $comparisonPlan.second_plan.vulns as vuln, index}
          <tbody>
            <tr
              on:click={() => {
                handleTableClick2(index, vuln);
              }}
              class="clickLine"
            >
              <td class="text-center line-height"
                >{vuln.ast_uuid__ass_uuid__ast_hostname}</td
              >
              <td class="text-center line-height"
                >{vuln.ccr_item_no__ccc_item_title}</td
              >
              <td class="text-center line-height"
                >{vuln.ccr_item_no__ccc_item_level}</td
              >
              <td class="text-center line-height">{vuln.ccr_item_result}</td>
            </tr>
          </tbody>
        {/each}
      {/if}
    </table>
  </div>
</section>

<style>
  .status-container {
    max-height: 120px; /* Set the maximum height for the content */
    overflow-y: auto;
    overflow-x: hidden; /* Allow scrolling only if content exceeds the height */
    padding: 0;
    margin: 0;
  }
  .line-height {
    line-height: 23px;
  }

  .modify-btn {
    margin-top: 10px;
    background-color: #4caf50; /* Green background for modify button */
    color: white; /* White text */
  }

  .modify-btn:hover {
    background-color: #45a049; /* Darker green on hover */
    transform: translateY(-2px); /* Lift effect on hover */
  }
  .no-data-message {
    text-align: center; /* Center the text */
    font-style: italic; /* Italicize the text for emphasis */
    color: #777; /* Light gray color for the message */
    padding: 20px; /* Add some padding around the text */
    background-color: #f9f9f9; /* Light background color for contrast */
    border: 1px solid #ddd; /* Optional: Add a border for definition */
    border-radius: 5px; /* Slightly round the corners */
  }
  /******************MODAL*********************/
  .modify-btn {
    background-color: #4caf50; /* Green background for modify button */
    color: white; /* White text */
  }
  /*****************************************/
  .clickLine:hover {
    background-color: rgba(242, 242, 242, 1);
    cursor: pointer;
  }
  .right_diag {
    width: 290px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  .right_diag p {
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    display: block;

    color: #626677;
    font-weight: 500;
  }
  .circle {
    padding: 10px;
  }
  .diagram_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  section {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .table_section {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .firstContainer {
    display: flex;
    flex-direction: column;

    width: 49%;
    /* background: rgba(242, 242, 242, 1); */
  }

  /* Card and Hover Styles */
  .hoverCard {
    display: flex;
    flex-direction: column;
    /* background: linear-gradient(145deg, #ffffff, #f1f3f4); */

    /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
    overflow: hidden;
    transition:
      transform 0.2s ease,
      box-shadow 0.3s ease;
    width: 320px;
  }
  .diagram_container .graphCard {
    display: flex;
    flex-flow: column;
    gap: 12px;
    background-color: #fff;
    justify-content: center;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /* Text and Title Styles */
  .text {
    font-size: 12px;
    color: #555;
    line-height: 1.6;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .table_section .text ul {
    width: 50%;
  }

  /* Icon Styles */
  .iconCard {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 90%;
    padding: 0px;
  }
  .select_input {
    margin-bottom: 10px;
  }
  /******************************************TABLE*/
  .table_section .table2 {
    width: 49%;
    font-size: 12px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .table_section .tableListWrap .tableList {
    width: 100%;
    table-layout: fixed;
    max-height: 980px;
    overflow-y: auto;
  }
  .table_section td {
    font-size: 12px;
  }
  th {
    font-weight: bold;
    font-size: 14px;
  }
  table td {
    font-weight: normal;
    height: 40px;
  }
  .table_section thead {
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick the header to the top */
    z-index: 10; /* Ensure the header is above the scrolling content */
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); /* Shadow effect for separation */
  }
</style>
