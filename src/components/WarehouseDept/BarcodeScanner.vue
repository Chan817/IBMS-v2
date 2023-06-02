<template>
    <div class="scanner">
      <video ref="videoElement" class="fullscreen-video" autoplay playsinline></video>
      <canvas ref="canvasElement" style="display: none;"></canvas>
      <div>
        <div class="laser"></div>
      </div>
      <div class="container-button">
        <VBtn class="stop-button" prepend-icon="mdi-close" @click="stopScanner">Stop</VBtn>
        <VBtn class="view-barcode-details" prepend-icon="mdi-eye">View</VBtn>
      </div>
      
    </div>
  </template>
  
  <script>
  import jsQR from 'jsqr';
  
  export default {
    mounted() {
      this.startScanner();
    },
    methods: {
      startScanner() {
        const videoElement = this.$refs.videoElement;
        const canvasElement = this.$refs.canvasElement;
        const canvasContext = canvasElement.getContext('2d');
  
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            videoElement.srcObject = stream;
  
            const scanFrame = () => {
              canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
              const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
              const { data, width, height } = imageData;
  
              const grayscaleData = new Uint8ClampedArray(width * height);
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const grayscaleValue = (r + g + b) / 3;
                grayscaleData[i / 4] = grayscaleValue;
              }
  
              const code = jsQR(grayscaleData, width, height);
  
              if (code) {
                const barcodeData = code.data;
                const barcodeType = code.format;
                console.log('解码结果:');
                console.log('类型: ' + barcodeType);
                console.log('数据: ' + barcodeData);
              } else {
                console.log('未找到条形码或二维码');
              }
  
              this.scanFrameId = requestAnimationFrame(scanFrame);
            };
  
            scanFrame();
          })
          .catch(error => {
            console.error('无法获取摄像头视频流:', error);
          });
      },
      stopScanner() {
      if (this.scanFrameId) {
        cancelAnimationFrame(this.scanFrameId);
        this.scanFrameId = null;
      }
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
      
    }
  };
  </script>

<style scoped>
.fullscreen-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.laser {
  width: 60%;
  background-color: tomato;
  height: 3px;
  position: absolute;
  margin-left: 20%;
  top: 50%;
  z-index: 2;
  box-shadow: 0 0 5px red;
  animation: scanning 2s infinite;
}

.container-button{
  margin-bottom: 20px;
  position: absolute;
  top: 90%;
  z-index: 2;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  
}
.stop-button{
  margin: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
.view-barcode-details{
  margin: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
@keyframes scanning {
  50% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }
}

</style>