<template>
  <div class="product-list">
    <ProductPreview v-for="(product, index) in products" :key="index" :data="product" />
  </div>
</template>

<script>
import ProductPreview from "@/components/Products/ProductPreview";

export default {
  props: {
    products: Array
  },
  components: {
    ProductPreview
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
}
</style>