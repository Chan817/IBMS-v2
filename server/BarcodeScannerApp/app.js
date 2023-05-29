const path = require('path');


// 获取视频和画布元素
const videoElement = document.getElementById('videoElement');
const canvasElement = document.getElementById('canvasElement');
const canvasContext = canvasElement.getContext('2d');

// 获取视频流
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoElement.srcObject = stream;

    // 在每一帧上执行扫描操作
    function scanFrame() {
      canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

      // 获取画布像素数据
      const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const { data, width, height } = imageData;

      // 转换为灰度图像数据
      const grayscaleData = new Uint8ClampedArray(width * height);
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const grayscaleValue = (r + g + b) / 3;
        grayscaleData[i / 4] = grayscaleValue;
      }

      // 使用 jsQR 解码图像中的 QR 码
      const code = jsQR(grayscaleData, width, height);

      if (code) {
        // 获取解码结果
        const barcodeData = code.data;
        const barcodeType = code.format;

        // 处理解码结果
        console.log('解码结果:');
        console.log('类型: ' + barcodeType);
        console.log('数据: ' + barcodeData);
      } else {
        console.log('未找到条形码或二维码');
      }

      // 递归调用下一帧的扫描
      requestAnimationFrame(scanFrame);
    }

    // 开始扫描
    scanFrame();
  })
  .catch(error => {
    console.error('无法获取摄像头视频流:', error);
  });

  app.use(express.static('client')); // 将静态文件目录指向 client 文件夹

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html')); // 发送 index.html
});

