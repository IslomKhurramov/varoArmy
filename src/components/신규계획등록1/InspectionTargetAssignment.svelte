<script>
    let departments = [
      { id: "1군", children: [{ id: "11군", children: [{ id: "111군", children: ["1111군"] }] }, { id: "12군" }] },
    ];
  
    let systems = [
      { id: "체계1", children: [{ id: "체계11", children: [{ id: "체계111", children: ["체계1111"] }] }, { id: "체계12" }] },
    ];
  
    let ipRanges = ["192.168.0.1/24", "192.168.1.1/24"];
    let availableTargets = ["제1xxxxx 부대", "제2xxxxx 부대", "제3xxxxx 부대"];
    let selectedTargets = ["제1xxxxx 부대", "제3xxxxx 부대"];
  
    function addTarget() {
      availableTargets.forEach((target) => {
        if (!selectedTargets.includes(target)) {
          selectedTargets.push(target);
        }
      });
    }
  
    function removeTarget() {
      selectedTargets = [];
    }
  </script>

  <div  style="padding: 0%;">
    <div style="text-align: center;">
        <h3>점검대상 지정</h3>
        <div class="main_box"></div>
    </div>   

      <div class="content">
        <div class="left-section">
            <div class="header">
              <label>점검대상부대</label>
              <button class="search-btn">조회</button>
            </div>
          <div class="box">
            <div class="content scrollable">
              <ul class="tree">
                {#each departments as department}
                  <li>
                    <label><input type="checkbox" /> {department.id}</label>
                    {#if department.children}
                      <ul>
                        {#each department.children as child}
                          <li>
                            <label><input type="checkbox" /> {child.id}</label>
                            {#if child.children}
                              <ul>
                                {#each child.children as subChild}
                                  <li>
                                    <label><input type="checkbox" /> {subChild}</label>
                                    {#if child.children}
                                    <ul>
                                        {#each child.children as subChild}
                                       <li>
                                         <label><input type="checkbox" /> {subChild}</label>
                                       </li>
                                        {/each}
                                    </ul>
                                    {/if}
                                  </li>
                                {/each}
                              </ul>
                            {/if}
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          </div>
    
          <div class="header">
            <label>점검대상체계</label>
            <button class="search-btn">조회</button>
          </div>
          <div class="box">
            <div class="content scrollable">
              <ul class="tree">
                {#each systems as system}
                  <li>
                    <label><input type="checkbox" /> {system.id}</label>
                    {#if system.children}
                      <ul>
                        {#each system.children as child}
                          <li>
                            <label><input type="checkbox" /> {child.id}</label>
                            {#if child.children}
                            <ul>
                              {#each child.children as subChild}
                                <li>
                                  <label><input type="checkbox" /> {subChild}</label>
                                  {#if child.children}
                                  <ul>
                                      {#each child.children as subChild}
                                     <li>
                                       <label><input type="checkbox" /> {subChild}</label>
                                     </li>
                                      {/each}
                                  </ul>
                                  {/if}
                                </li>
                              {/each}
                            </ul>
                          {/if}
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          </div>
    
          <div class="header">
            <label>IP대역</label>
            <button class="search-btn">조회</button>
          </div>
          <div class="box">
            <div class="content1 scrollable">
              {#each ipRanges as ip}
                <label><input type="checkbox" /> {ip}</label>
              {/each}
            </div>
          </div>
        </div>
    
        <div class="right-section">
          <div class="box_11">
            <div class="content2 scrollable">
              {#each selectedTargets as target}
                <label><input type="checkbox" checked /> {target}</label>
              {/each}
            </div>
          </div>
        </div>
    
        <div class="middle-section">
          <button class="arrow-button" on:click={addTarget}>→ 추가</button>
          <button class="arrow-button" on:click={removeTarget}>← 삭제</button>
        </div>
    
        <div class="right-section">
          <div class="box_11">
            <div class="content3 scrollable">
              {#each selectedTargets as target}
              <label><input type="checkbox" checked /> {target}</label>
              {/each}
            </div>
          </div>
        </div>
      </div>
  </div>

  
  
  <style>

     .main_box {
        border-bottom: 1px solid #cccccc;
    }
  
    .content {
      display: flex;
      gap: 20px;
    }
  
    .left-section {
      flex: 2;
      display: flex;
      flex-direction: column;
    }

    .right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .middle-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
    }
  
    .box {
      border: 1px solid #cccccc;
      padding: 10px;
      border-radius: 4px;
      background: white;
      display: flex;
      flex-direction: column;
    }

    .box_11 {
      height: 520px;
      border: 1px solid #cccccc;
      margin-top: 45px;
      padding: 10px;
      border-radius: 4px;
      background: white;
      display: flex;
      flex-direction: column;
    }
  
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
  
    .search-btn {
        font-size: 12px;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .scrollable {
      overflow-y: auto;
      flex-grow: 1;
    }
  
    .tree ul {
      list-style: none;
    }
  
    .tree li {
      margin-bottom: 5px;
      list-style: none;
    }
  
    .arrow-button {
      padding: 5px 15px;
      border: 1px solid #cccccc;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      transition-duration: 0.3s;
    }
  
    .arrow-button:hover {
      background-color: #0056b3;
    }
  </style>
  