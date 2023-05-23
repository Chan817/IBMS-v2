<template>
    <div class="inventory-report">
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>SKU Number</th>
            <th>Barcode Number</th>
            <th>Image</th>
            <th>Product Number</th>
            <th>Current Quantity</th>
            <th>Cost Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventoryData" :key="item.sku">
            <td>{{ item.sku }}</td>
            <td>{{ item.barcode }}</td>
            <td><img :src="item.image" :alt="item.productName" /></td>
            <td>{{ item.productNumber }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.costPrice }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inventoryData: [] // 存储库存数据的数组
      };
    },
    mounted() {
      // 页面加载时获取初始库存数据
      this.loadData();
    },
    methods: {
      loadData() {
        // 使用适合的方式从数据库连接获取库存数据
        // 更新inventoryData数组，使其包含从数据库获取的数据
        // 例如，可以使用适当的后端技术（如Node.js、Express、MongoDB等）来连接数据库，并获取库存数据
  
        // 这里使用一个示例数据进行演示
        this.inventoryData = [
          {
            sku: 'SKU001',
            barcode: '123456789',
            image: 'path_to_image',
            productNumber: 'P001',
            quantity: 10,
            costPrice: 10.99,
            status: 'In Stock'
          },
          {
            sku: 'SKU002',
            barcode: '987654321',
            image: 'path_to_image',
            productNumber: 'P002',
            quantity: 5,
            costPrice: 15.99,
            status: 'Out of Stock'
          },
          // 添加更多的库存数据...
        ];
      }
    }
  };
  </script>
  
  <style scoped>
  .inventory-report {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }
  
  table th,
  table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  img {
    max-width: 100px;
    max-height: 100px;
  }
  </style>