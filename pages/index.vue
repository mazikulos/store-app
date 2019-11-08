<template>
  <div>
    <div class="product-list__header">
      <h2>Product List</h2> 
      <Sort @sort="prod = $event" :loadedProducts="loadedProducts" />
    </div>
    <ProductList :products="loadedProducts" />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ProductList from "~/components/Products/ProductList.vue";
import Sort from "~/components/UI/Sort.vue";

export default {
  components: {
    Logo,
    ProductList,
    Sort
  },
  data() {
    return {
      prod: this.$store.getters.getProducts
    };
  },
  computed: {
    loadedProducts() {
      // this.prod = this.$store.getters.getProducts;
      return this.$store.getters.getProducts;
    }
  }
};
</script>

<style scoped>
.product-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
</style>