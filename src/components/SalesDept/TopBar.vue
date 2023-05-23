<template>
    <v-app-bar>
        <div class="appBar">
            
            <v-img  class="image" src="@/assets/neksom.png" height="50" width="50"></v-img>
        
            <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick" class="searchB">
            </v-text-field>
            <v-btn style="display:flex; justify-content: center; align-items: center; margin-top: 10px;">
                <v-icon
                size="large"
                color="white"
                icon="mdi-email"
                >
                </v-icon>
            </v-btn>
            <div>
                <p style="color:white; margin-top: 15px;">|</p>
            </div>
            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            location="end"
            >
                <template v-slot:activator="{ props }">
                    <v-btn style="color: white; margin-top: 10px; margin-right: 10px;"
                    v-bind="props"
                    prepend-icon="mdi-account-circle"
                    >
                        Rusyaidi
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item
                            prepend-avatar="https://ik.imagekit.io/kerja/default-image.jpg?updatedAt=1684125549797"
                            title="Ahmad Rusyaidi"
                            subtitle="System Administrator"
                        >
                            
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

<style>

    .appBar{
        background-color: #4C4D6C;
        display:flex;
        width: 100%;
        height: 100%;
    }

    .searchB{
        height: 20px;
        margin-top: 10px;
        margin-left: 400px;
        margin-right: 400px;
    }

    .image{
        margin-top: 5px;
        margin-bottom: 10px;
    }
    
</style>

<script>
  export default {
    data: () => ({
      menu: false,
    }),
    methods:{
        toggleSubMenu(){

        }
    }
  }
</script>