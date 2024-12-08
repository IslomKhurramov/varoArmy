<script>
    import moment from "moment";

    let error = null;
    let loading = true;
    let displayedPages = [];
    
    // Hardcoded data for logData
    let logData = [
    {
        plan_title: "‘24 교육사 국방정보체계 취약점",
        plan_period: "2024-01-01 ~ 2025-01-01",
        inspection_type: "정기점검",
        status: "진행중",
        registration_date: "2024-01-01",
        execution_department: "전군",
        registrant: "홍길동",
        result_registration: "85%",
        inspection_completion: "등록 진행중",
    },
    {
        plan_title: "‘24 교육사 국방정보체계 취약점",
        plan_period: "2024-01-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2024-08-30",
        execution_department: "XX부대",
        registrant: "김길동",
        result_registration: "100%",
        inspection_completion: "완료 보고서",
    },
    {
        plan_title: "‘24 교육사 국방정보체계 취약점",
        plan_period: "2024-01-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2024-01-01",
        execution_department: "XX부대",
        registrant: "김길동",
        result_registration: "100%",
        inspection_completion: "완료 보고서",
    },
    {
        plan_title: "‘25 교육사 국방정보체계 취약점",
        plan_period: "2025-01-01 ~ 2025-12-31",
        inspection_type: "정기점검",
        status: "진행중",
        registration_date: "2025-01-01",
        execution_department: "전군",
        registrant: "박길동",
        result_registration: "75%",
        inspection_completion: "등록 진행중",
    },
    {
        plan_title: "‘25 교육사 국방정보체계 취약점",
        plan_period: "2025-02-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2025-02-28",
        execution_department: "XX부대",
        registrant: "최길동",
        result_registration: "95%",
        inspection_completion: "완료 보고서",
    },
    {
        plan_title: "‘25 교육사 국방정보체계 취약점",
        plan_period: "2025-03-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2025-03-10",
        execution_department: "YY부대",
        registrant: "이길동",
        result_registration: "100%",
        inspection_completion: "완료 보고서",
    },
    {
        plan_title: "‘26 교육사 국방정보체계 취약점",
        plan_period: "2026-01-01 ~ 2026-12-31",
        inspection_type: "정기점검",
        status: "진행중",
        registration_date: "2026-01-01",
        execution_department: "전군",
        registrant: "송길동",
        result_registration: "60%",
        inspection_completion: "등록 진행중",
    },
    {
        plan_title: "‘26 교육사 국방정보체계 취약점",
        plan_period: "2026-04-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2026-04-15",
        execution_department: "ZZ부대",
        registrant: "정길동",
        result_registration: "98%",
        inspection_completion: "완료 보고서",
    },
    {
        plan_title: "‘26 교육사 국방정보체계 취약점",
        plan_period: "2026-05-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2026-05-10",
        execution_department: "AA부대",
        registrant: "한길동",
        result_registration: "100%",
        inspection_completion: "완료 보고서",
    },
    {
        plan_title: "‘27 교육사 국방정보체계 취약점",
        plan_period: "2027-01-01 ~ 2027-12-31",
        inspection_type: "정기점검",
        status: "진행중",
        registration_date: "2027-01-01",
        execution_department: "전군",
        registrant: "구길동",
        result_registration: "50%",
        inspection_completion: "등록 진행중",
    },
    {
        plan_title: "‘27 교육사 국방정보체계 취약점",
        plan_period: "2027-02-01",
        inspection_type: "긴급점검",
        status: "진행완료",
        registration_date: "2027-02-28",
        execution_department: "BB부대",
        registrant: "권길동",
        result_registration: "88%",
        inspection_completion: "완료 보고서",
    },
];


    let itemsPerPage = 15;
    let currentPage = 1;
    let totalItems = logData.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
</script>


<main class="table-container">
    <div class="tableListWrap">
        <table class="tableList hdBorder">
            <colgroup>
                <col style="width:3%;" />
                <col style="width:40%;" />
                <col style="width:15%;" />
                <col style="width:8%;" />
                <col style="width:8%;" />
                <col style="width:8%;" />
                <col style="width:8%;" />
                <col style="width:6%;" />
                <col style="width:10%;" />
                <col style="width:10%;" />
            </colgroup>
            <thead>
                <tr>
                    <th class="text-center">순번</th>
                    <th class="text-center">점검계획제목</th>
                    <th class="text-center">점검기간</th>
                    <th class="text-center">점검분류</th>
                    <th class="text-center">상태</th>
                    <th class="text-center">등록일</th>
                    <th class="text-center">수행부대</th>
                    <th class="text-center">등록인</th>
                    <th class="text-center">결과등록</th>
                    <th class="text-center">점검완료</th>
                </tr>
            </thead>
            <tbody>
                {#each logData as data, index}
                    <tr>
                        <td class="text-center">
                            {totalItems - ((currentPage - 1) * itemsPerPage + index)}
                        </td>
                        <td>
                            {data.plan_title || "N/A"}
                        </td>
                        <td class="text-center">
                            {moment(data.plan_period_start).format("YYYY.MM.DD")} - {moment(data.plan_period_end).format("YYYY.MM.DD")}
                        </td>
                        <td class="text-center">
                            {data.inspection_type || "N/A"}
                        </td>
                        <td class="text-center">
                            {data.status || "N/A"}
                        </td>
                        <td class="text-center">
                            {moment(data.registration_date).format("YYYY.MM.DD") || "N/A"}
                        </td>
                        <td class="text-center">
                            {data.execution_department || "N/A"}
                        </td>
                        <td class="text-center">
                            {data.registrant || "N/A"}
                        </td>
                        <td class="text-center">
                            <span>{data.result_registration || "N/A"}</span>
                        </td>
                        <td class="text-center">
                            <span>{data.inspection_completion || "N/A"}</span>
                        </td>
                    </tr>
                {/each}
            </tbody>
            

        </table>
    </div>
</main>

  
  <style>
    * {
      font-size: 14px;
    }
  
    .tableWrap_4 {
      background-color: #fff;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      height: 75vh;
      border-radius: 5px;
      margin-top: 5px;
    }
  
    .tableListWrap {
      overflow-y: auto;
      max-height: 65vh;
      padding: 0 20px 20px 20px;
    }
  
    thead {
      position: sticky;
      top: 0;
      z-index: 10;
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
    }

    table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }

  .tableListWrap .hdBorder th:not(:last-child)::after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  top: 15px;
  width: 1px;
  height: 17px;
  background-color: #e4e4e4;
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
  
  table tbody tr:hover td {
        background-color: #f5f5f5;
        cursor: pointer;
    }
  

  </style>
  