
<script>
export let closeShowModal
let selectedCategory = "Network Security Check";
  let selectedItem = {
    ccc_item_no: "NSC-001",
    ccc_item_group: "Firewall",
    ccc_check_purpose: "Ensure the firewall is configured correctly to block unauthorized access.",
    ccc_security_threat: "Unsecured network traffic could lead to unauthorized access and data breaches.",
  };


 
  </script>
  
  <div class="modal">
    <div
      style="height: 298pxpx; 
    padding-bottom: 10px;
  "
    >
      <table>
        <colgroup>
          <col style="width: 60px;" />
          <col style="width:80%" />
        </colgroup>
        <tr style="height: 50px; position: sticky;top: -1px;">
          <th class="center-align" style="color: white;background: #0072fd;"
            >구분</th
          >
          <td class="center-align" style="color: white;background: #0072fd;"
            >설명</td
          >
        </tr>
        <tbody>
          {#if selectedItem}
            <tr>
              <th class="center-align">점검항목</th>
              <td class="line-height">{selectedCategory}</td>
            </tr>
            <tr>
              <th class="center-align">항목그룹</th>
              <td class="line-height">{selectedItem.ccc_item_group}</td>
            </tr>
            <tr>
              <th class="center-align">정검목적</th>
              <td class="line-height">{selectedItem.ccc_check_purpose}</td>
            </tr>
            <tr>
              <th class="center-align">보안위협</th>
              <td class="line-height">{selectedItem.ccc_security_threat}</td>
            </tr>
            <tr>
                <th class="center-align">보안위협</th>
                <td class="line-height">{selectedItem.ccc_security_threat}</td>
              </tr>
          {:else}
            <tr>
              <td class="line-height" colspan="2">데이터 없음</td>
            </tr>
          {/if}
        </tbody>
      </table>
      <div style="display: flex; justify-content: space-between">
        {#if closeShowModal}
        <div style="display:flex; flex-direction:row; width:100%; justify-content:center; gap:10px;align-items:center;">
            <button class="btnSave">변경하기</button>
            <button class="btnSave" on:click={closeShowModal}>Close</button>

        </div>
        {/if}
       
      </div>
    </div>
  </div>
  
  <style>
    * {
      font-size: 16px;
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
      font-size: 16px;
    }
  </style>
  