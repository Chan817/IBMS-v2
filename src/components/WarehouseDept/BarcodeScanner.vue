<template>
  <div class="container">
    <div v-show="!isLoading">
      <div>
        <video poster="data:image/gif,AAAA" ref="scanner"></video>
      </div>
      <div class="overlay-element"></div>
      <div class="laser"></div>
      <div class="container-button">
        <VBtn class="stop-button" prepend-icon="mdi-close" @click="stopScanner">Stop</VBtn>
        <VBtn class="view-barcode-details" prepend-icon="mdi-eye" @click="viewDetails">View</VBtn>
        <label>Input Value: {{ text || "Nothing" }}</label>
      </div>
      
      
      <div v-if="itemData">
        <h2>{{ itemData.Inv_Name }}</h2>
        <p>{{ itemData.Inv_Desc }}</p>
        <p>{{ itemData.Inv_BarcodeNum }}</p>
      </div> 

    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from "@zxing/library";
import { Howl } from 'howler';
import axios from 'axios';

export default {
  name: "stream-barcode-reader",

  data() {
    return {
      text: "",
      id: null,
      isLoading: true,
      sound: null,
      itemData: null, // To store the retrieved item data
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        navigator &&
        navigator.mediaDevices &&
        "enumerateDevices" in navigator.mediaDevices,
    };
  },

  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
      return;
    }

    this.start();
    this.$refs.scanner.oncanplay = (event) => {
      this.isLoading = false;
      this.onLoaded();
    };
    this.sound = new Howl({
      src: require('@/assets/scanSound.mp3'),
    });
  },

  beforeUnmount() {
    this.codeReader.reset();
  },

  methods: {
    start() {
      this.codeReader.decodeFromVideoDevice(
        undefined,
        this.$refs.scanner,
        (result, err) => {
          if (result) {
            this.onDecode(result.text);
            this.$emit("result", result);
          }
        });
    },
    onDecode(a) {
      console.log(a);
      this.text = a;
      this.sound.play(); // Play the sound
      if (this.id) clearTimeout(this.id);
      this.id = setTimeout(() => {
        if (this.text === a) {
          this.text = "";
        }
      }, 5000);
    },

    onLoaded() {
      console.log("load");
    },
    // stopScanner() {
    //   this.codeReader.reset(); // Stop the barcode scanner
    // },

    viewDetails() {
      // Make an HTTP request to fetch the item data
      const itemBar = this.text;
      axios.get(`/api/inventoryitem/barcode/${itemBar}`)
        .then(response => {
          const itemData = response.data; // Retrieved data from the API
          // this.$router.push({ name: 'view', params: { item: itemData } });
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
video {
  width: 90vw;
  height: 100vh;
  object-fit: cover;
}

.container {
  padding: 20px;
}

label {
  margin-top: 20px;
  color: #000000;
}

.container-button {
  margin-bottom: 20px;
  position: absolute;
  top: 90%;
  left: 10%;
  z-index: 2;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.stop-button {
  margin: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}

.view-barcode-details {
  margin: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}

.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}

@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }
}

@keyframes scanning {
  50% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }
}
</style>