<template>
    <div class="container">
      <div v-show="!isLoading">
        <div>
          <video poster="data:image/gif,AAAA" ref="scanner"></video>
        </div>
        <div class="overlay-element"></div>
        <div class="laser"></div>
  
        <div class="table-wrapper">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>SKU Number</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Barcode Number</th>
                <th>Actions</th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="barcode in barcodeData" :key="barcode.Inv_BarcodeNum">
                <td>{{ barcode.Inv_SKU_Num }}</td>
                <td>{{ barcode.Inv_Name }}</td>
                <td>
                <img :src="barcode.InvImg" alt="Product Image" width="50" height="50" />
              </td>
                <td>{{ barcode.Inv_BarcodeNum }}</td>
                <td>
                <div class="row">
                  <v-btn class="el-button" @click="deleteItem(index)">Delete</v-btn>
                </div>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <v-btn class="el-button1" >Ship</v-btn>
  
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
        barcodeData: [], // Array to store the scanned barcode data
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
        // Make an HTTP request to fetch the item data
        const itemBar = this.text;
        axios.get(`/api/inventoryitem/barcode/${itemBar}`)
          .then(response => {
            this.itemData = response.data; // Assign retrieved data to itemData
            this.barcodeData.push(this.itemData); // Push the item data to the barcodeData array
          })
          .catch(error => {
            console.error(error);
          });
      },
  
      onLoaded() {
        console.log("load");
      },
      // stopScanner() {
      //   this.codeReader.reset(); // Stop the barcode scanner
      // },
  
      deleteItem(index) {
              this.barcodeData.splice(index, 1); // Remove the item at the specified index
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #6b6b6b;
  }
  
  table th,
  table td {
    padding: 8px;
    text-align: center;
    border: 1px solid #6b6b6b;
  }
  
  th {
    background-color: #4C4D6C;
    font-weight: bold;
    color: #ffffff;
  }
  
  tr:nth-child(even) {
    background-color: #e4e4f3;
  }
  
  .table-wrapper {
    overflow-y: auto;
  }
  .row {
    justify-content: center;
    display: flex;
  }
  .el-button {
  
  background-color: #ff2929;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  }
  
  .el-button1 {
  background-color: #4C4D6C;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
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