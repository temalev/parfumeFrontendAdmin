<template>
  <el-table :data="orders" style="width: 100%" :tree-props="{ children: 'items' }">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <h3>Family</h3>
          <el-table :data="props.row.items">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="State" prop="state" />
            <el-table-column label="City" prop="city" />
            <el-table-column label="Address" prop="address" />
            <el-table-column label="Zip" prop="zip" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="Номер заказа" width="180" />
    <el-table-column prop="createdAt" label="Дата заказа" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
