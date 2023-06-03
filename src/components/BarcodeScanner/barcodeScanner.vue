<template>
  <div>
    <button @click="startScanner">Start Scanner</button>
    <button @click="stopScanner">Stop Scanner</button>
    <button @click="showScanResults">View Scan Results</button>
    <div v-if="scanning">
      <video ref="videoElement" autoplay playsinline style="width: 100%; height: auto;"></video>
      <canvas ref="canvasElement" style="display: none;"></canvas>
    </div>
    <div v-if="scanResults.length > 0">
      <h2>Scan Results</h2>
      <ul>
        <li v-for="result in scanResults" :key="result.data">
          <p>Type: {{ result.type }}</p>
          <p>Data: {{ result.data }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
  data() {
    return {
      scanning: false,
      scanResults: [],
      videoElement: null,
      canvasElement: null,
    };
  },
  mounted() {
    this.videoElement = this.$refs.videoElement;
    this.canvasElement = this.$refs.canvasElement;
  },
  methods: {
    startScanner() {
      this.scanning = true;
      this.scanResults = [];
      this.scanFrame();
    },
    stopScanner() {
      this.scanning = false;
      this.showScanResults();
    },
    showScanResults() {
      console.log(this.scanResults);
    },
    scanFrame() {
      if (!this.scanning) return;

      const videoElement = this.videoElement;
      const canvasElement = this.canvasElement;
      const canvasContext = canvasElement.getContext('2d');

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
        this.scanResults.push({ type: barcodeType, data: barcodeData });
      }

      requestAnimationFrame(this.scanFrame);
    },
  },
};
</script>
