<template>
  <div class="container">
    <div class="container2">

      <div class="title">Neksom Product</div>

    </div>

    <div class="table-wrapper">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>SKU Number</th>
            <th>Barcode Number</th>
            <th>Product Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in scannedItems" :key="item._id">
            <td>{{ item.Inv_SKU_Num }}</td>
            <td>{{ item.Inv_BarcodeNum }}</td>
            <td>{{ item.Inv_Name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

</script>