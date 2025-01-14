<script>
  export let firstDetail;
  $: console.log("firstDetail", firstDetail);
  function formatKoreanDate(date) {
    const d = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(d);
  }
</script>

{#if firstDetail}
  <article class="contentArea">
    <div style="overflow-y: auto; height:75vh">
      <table class="tableList hdBorder">
        <colgroup>
          <col style="width: 60px;" />
          <col style="width:89%" />
        </colgroup>
        <thead>
          <tr style="height: 50px; position: sticky;top: -1px;">
            <th
              class="center-align"
              style="color: black;font-weight:bold;background: #F2F2F2; border-radius:4px"
              >구분</th
            >
            <th
              class="center-align"
              style="border-radius:4px; color: black; font-weight:bold; background: #F2F2F2;"
              >설명</th
            >
          </tr>
        </thead>
        <tbody>
          <!-- CCP Details -->
          <tr>
            <td class="text-center">CCP 인덱스</td>
            <td>{firstDetail.ccp_index}</td>
          </tr>
          <tr>
            <td class="text-center">부모 인덱스</td>
            <td>{firstDetail.ccp_index_parent}</td>
          </tr>
          <tr>
            <td class="text-center">자식 단계</td>
            <td>{firstDetail.ccp_index_child_step}</td>
          </tr>
          <tr>
            <td class="text-center">제목</td>
            <td>{firstDetail.ccp_title}</td>
          </tr>
          <tr>
            <td class="text-center">재검토</td>
            <td>{firstDetail.recheck}</td>
          </tr>
          <tr>
            <td class="text-center">재검토 PNO</td>
            <td>{firstDetail.recheck_pno}</td>
          </tr>
          <tr>
            <td class="text-center">룰셋</td>
            <td>{firstDetail.ccp_ruleset}</td>
          </tr>
          <tr>
            <td class="text-center">룰셋 그룹</td>
            <td>{firstDetail.ccp_ruleset__ccg_group}</td>
          </tr>

          <!-- Asset Details -->
          <tr>
            <td class="text-center">자산 그룹 인덱스</td>
            <td>{firstDetail.asg_index}</td>
          </tr>
          <tr>
            <td class="text-center">자산 그룹 제목</td>
            <td>{firstDetail.asg_index__asg_title}</td>
          </tr>
          <tr>
            <td class="text-center">자산</td>
            <td>
              {#if firstDetail.asset.UNIX}
                UNIX
              {/if}
              <br />
              {#if firstDetail.asset.NETWORK}
                NETWORK
              {/if}
              <br />
              {#if firstDetail.asset.WEB}
                WEB
              {/if}
              <br />
              {#if firstDetail.asset.DBMS}
                DBMS
              {/if}
              <br />
              {#if firstDetail.asset.WINDOWS}
                WINDOWS
              {/if}
            </td>
          </tr>

          <!-- Planner and Creator Details -->
          <tr>
            <td class="text-center">계획자 이름</td>
            <td>{firstDetail.plan_planer_info__user_name}</td>
          </tr>
          <tr>
            <td class="text-center">계획자 ID</td>
            <td>{firstDetail.plan_planer_info_id}</td>
          </tr>
          <tr>
            <td class="text-center">생성자 이름</td>
            <td>{firstDetail.plan_creator_user_index__user_name}</td>
          </tr>
          <tr>
            <td class="text-center">생성자 ID</td>
            <td>{firstDetail.plan_creator_user_index_id}</td>
          </tr>

          <!-- Plan Execution Details -->
          <tr>
            <td class="text-center">시작 날짜</td>
            <td>{formatKoreanDate(firstDetail.plan_start_date)}</td>
          </tr>
          <tr>
            <td class="text-center">종료 날짜</td>
            <td>{formatKoreanDate(firstDetail.plan_end_date)}</td>
          </tr>
          <tr>
            <td class="text-center">실행 유형</td>
            <td>{firstDetail.plan_execution_type ? "예" : "아니요"}</td>
          </tr>
          <tr>
            <td class="text-center">실행 간격 값</td>
            <td>{firstDetail.plan_execute_interval_value}</td>
          </tr>
          <tr>
            <td class="text-center">실행 간격 단위</td>
            <td>{firstDetail.plan_execute_interval_term}</td>
          </tr>
          <tr>
            <td class="text-center">반복 규칙 유형</td>
            <td>{firstDetail.plan_name_repeat_rule_type}</td>
          </tr>
          <tr>
            <td class="text-center">반복 규칙</td>
            <td>{firstDetail.plan_name_repeat_rule}</td>
          </tr>

          <!-- Fixed Dates -->
          <tr>
            <td class="text-center">고정 날짜 설정</td>
            <td
              >{formatKoreanDate(firstDetail.fix_date_setup)
                ? "설정됨"
                : "설정되지 않음"}</td
            >
          </tr>
          <tr>
            <td class="text-center">고정 시작 날짜</td>
            <td>{formatKoreanDate(firstDetail.fix_start_date)}</td>
          </tr>
          <tr>
            <td class="text-center">고정 종료 날짜</td>
            <td>{formatKoreanDate(firstDetail.fix_end_date)}</td>
          </tr>
          <tr>
            <td class="text-center">담당자 이름</td>
            <td>{firstDetail.fix_conductor_info__user_name}</td>
          </tr>
          <tr>
            <td class="text-center">담당자 ID</td>
            <td>{firstDetail.fix_conductor_info_id}</td>
          </tr>

          <!-- Uploaded Status -->
          <tr>
            <td class="text-center">총 자산 수</td>
            <td>{firstDetail.uploaded_status.total_asset_count}</td>
          </tr>
          <tr>
            <td class="text-center">업로드된 자산 수</td>
            <td>{firstDetail.uploaded_status.uploaded_asset_count}</td>
          </tr>

          <!-- Other Details -->
          <tr>
            <td class="text-center">생성 날짜</td>
            <td>{formatKoreanDate(firstDetail.ccp_cdate)}</td>
          </tr>
          <tr>
            <td class="text-center">엑셀 보고서</td>
            <td>{firstDetail.b_v_excel_report ? "가능" : "불가능"}</td>
          </tr>
          <tr>
            <td class="text-center">워드 보고서</td>
            <td>{firstDetail.b_v_word_report ? "가능" : "불가능"}</td>
          </tr>
          <tr>
            <td class="text-center">보안 점수</td>
            <td>{firstDetail.ccp_security_point}</td>
          </tr>
          <tr>
            <td class="text-center">최종 완료 여부</td>
            <td>{firstDetail.ccp_b_finalized ? "예" : "아니요"}</td>
          </tr>
          <tr>
            <td class="text-center">업로드 결과</td>
            <td>{firstDetail.uploaded_result}</td>
          </tr>

          <!-- Target Security Points -->
          <tr>
            <td class="text-center">대상 보안 점수</td>
            <td>
              {#if firstDetail.target_securitypoint.length > 0}
                {firstDetail.target_securitypoint.join(", ")}
              {:else}
                없음
              {/if}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
{/if}

<style>
  .text-center {
    font-weight: bold;
  }
  * {
    font-size: 14px;
  }
  .center-align {
    text-align: center;
  }

  .line-height {
    line-height: 23px;
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
    background-color: #f7fafc;
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

  .btn {
    padding: 10px 20px; /* Padding for buttons */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Font size */
    cursor: pointer; /* Pointer cursor on hover */
    transition:
      background-color 0.3s,
      transform 0.2s; /* Transition effects */
    outline: none; /* Remove outline on focus */
  }

  .modify-btn {
    background-color: #4caf50; /* Green background for modify button */
    color: white; /* White text */
  }

  .modify-btn:hover {
    background-color: #45a049; /* Darker green on hover */
    transform: translateY(-2px); /* Lift effect on hover */
  }

  td {
    width: 230px;
  }

  .btn {
    padding: 8px 15px; /* Button padding */
    border: 1px solid #007bff; /* Button border */
    background-color: #007bff; /* Button background */
    color: white; /* Button text color */
    cursor: pointer;
  }

  .btn:hover {
    background-color: #0056b3; /* Darker background on hover */
  }

  /* Button styles */
  .btn {
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .modify-btn {
    background-color: #4caf50;
    color: white;
  }

  .modify-btn:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  .delete-btn {
    background-color: #f44336;
    color: white;
  }

  td {
    font-size: 14px;
  }
</style>
