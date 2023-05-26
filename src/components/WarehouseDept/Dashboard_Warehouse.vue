<template>
    <div class="dashboard">
  
      <!-- Top part -->
      <section class="section">
        <div class="widget">
          <div class="widget-header">Unpaid</div>
          <div class="widget-content">
            <div class="data">{{ Unpaid }}</div>
            <div class="more-info" >
                <router-link to="/unpaid">More Info -></router-link>
            </div>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">To Ship</div>
          <div class="widget-content">
            <div class="data">{{ ToShip }}</div>
            <div class="more-info" >
                <router-link to="/toship">More Info -></router-link>
            </div>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">Shipping</div>
          <div class="widget-content">
            <div class="data">{{ Shipping }}</div>
            <div class="more-info" >
                <router-link to="/shipping">More Info -></router-link>
            </div>
          </div>
        </div>
        

        <div class="widget">
          <div class="widget-header">Completed</div>
          <div class="widget-content">
            <div class="data">{{ Completed }}</div>
            <div class="more-info" >
                <router-link to="/completed">More Info -></router-link>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-header">Cancellation</div>
          <div class="widget-content">
            <div class="data">{{ Cancellation }}</div>
            <div class="more-info" >
                <router-link to="/cancel">More Info -></router-link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <router-view></router-view>
      </section>
    </div>
    
  </template>

  <script>

  export default {
    data() {
        return {
          
        };
        
    },
    
};
  </script>
  
  <style scoped>
  .dashboard {
    margin: 50px;
  }

  .section {
    margin-top: 20px;
  }
  
  .widget {
    display: inline-block;
    width: calc(25% - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .widget-header {
    font-weight: bold;
  }
  
  .widget-content {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  
  .data {
    font-size: 32px;
    font-weight: bold;
    flex-grow: 1;
  }
  
  .more-info {
    opacity: 0.6;
    cursor: pointer;
  }
  
  </style>