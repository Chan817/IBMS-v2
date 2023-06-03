<template>
    <v-app-bar>
        <div class="appBar">

            <v-img class="image" src="@/assets/neksom.png" height="50" width="50"></v-img>

            <v-text-field :loading="loading" density="compact" variant="solo" label="Search" append-inner-icon="mdi-magnify"
                single-line hide-details @click:append-inner="onClick" class="searchB">
            </v-text-field>
            
            <v-menu
            v-model="emailmenu"
            :close-on-content-click="false"
            
            >
                <template v-slot:activator="{ props }">
                    <v-btn variant="text" v-bind="props" style="display:flex; justify-content: center; align-items: center; margin-top: 10px;">
                        <v-icon size="large" color="white" icon="mdi-email"></v-icon>
                        <div v-if="notification" class="notification-dot"></div>
                    </v-btn>
                </template>

                <v-card min-width="300">
                    <v-list>
                        <v-list-item
                            title="Notification"
                        >
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <div class="container">
                        <div class="text-left">
                            Low in Stock
                        </div>
                        <div class="text-left">
                            {{number}}
                            <!-- {{ count_low }} -->
                        </div>
                          <v-btn icon="mdi-arrow-right" variant="text" to="/low_neksom"></v-btn>
                    </div>
                </v-card>
                
            </v-menu>
            

            <div>
                <p style="color:white; margin-top: 15px;">|</p>
            </div>

            <v-menu v-model="accmenu" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn style="color: white; margin-top: 10px; margin-right: 10px;" v-bind="props"
                        prepend-icon="mdi-account-circle">
                        Rusyaidi
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item prepend-avatar="https://ik.imagekit.io/kerja/default-image.jpg?updatedAt=1684125549797"
                            title="Ahmad Rusyaidi" subtitle="System Administrator">

                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-btn>
                                Profile
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn>
                                Logout
                            </v-btn>
                        </v-list-item>
                    </v-list>


                </v-card>
            </v-menu>
        </div>
    </v-app-bar>
</template>
<script>
import axios from 'axios';

export default {
    data: () => ({
        emailmenu: false,
        accmenu: false,
        number: 0,
        notification: false, // Add this property
    
    }),
    async created() {
        await this.fetchEmailNotification();
    },
    methods: {
        async fetchEmailNotification() {
            try {
      // Perform the logic to fetch email notifications
      const response = await axios.get('/api/notification');
      const notifications = response.data;
console.log(notifications);
      // Update the notification property based on the number of notifications
      this.number = notifications.length; // Set the number property to the length of notifications array
      this.notification = notifications.length > 0;
    } catch (error) {
      console.error('Error fetching email notifications:', error);
    }
        },
        checkInventory() {
           
        },
        
        toggleSubMenu() {

        }
    }
}
</script>
<style scoped>
.appBar {
    background-color: #4C4D6C;
    display: flex;
    width: 100%;
    height: 100%;
}
.container {
    
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .text-left {
    margin-top: 10px;
  font-size: 15px;
  justify-content: left;
  align-items: left;
  
}

.searchB {
    height: 20px;
    margin-top: 10px;
    margin-left: 400px;
    margin-right: 400px;
}

.image {
    margin-top: 5px;
    margin-bottom: 10px;
}

.notification-dot {
  position: absolute;
  top: 2px;
  right: 3px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
</style>

