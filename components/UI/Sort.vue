<template>
  <div class="sort">
    <div class="sort-box" @click="showSort = !showSort">
      Sort by...
      <i style="margin-left: 2px; margin-bottom: 3px" class="arrow down"></i>
      <transition name="s-fade" leave-active-class="">
        <ul v-if="showSort" class="sort-list">
          <li @click="sortByPrice('desc')">Price &darr;</li>
          <li @click="sortByPrice('asc')">Price &uarr;</li>
          <li @click="sortByName('desc')">Name &darr;</li>
          <li @click="sortByName('asc')">Name &uarr;</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSort: false
    };
  },
  props: {
    loadedProducts: Array
  },
  methods: {
    sortByPrice(order) {
      this.loadedProducts.sort(function(a, b) {
        if (order == "asc") {
          return parseFloat(a.price) - parseFloat(b.price);
        } else if (order == "desc") {
          return parseFloat(b.price) - parseFloat(a.price);
        }
      });
      this.$store.commit("setProducts", this.loadedProducts);
    },
    sortByName(order) {
      this.loadedProducts.sort(function(a, b) {
        if (order == "asc") {
          return a.name.localeCompare(b.name);
        } else if (order == "desc") {
          return b.name.localeCompare(a.name);
        }
      });
      this.$store.commit("setProducts", this.loadedProducts);
    }
  }
};
</script>

<style scoped>
.sort-box {
  border: 1px solid #ccc;
  padding: 10px 15px;
  position: relative;
  cursor: pointer;
}
.sort-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: -1px;
  left: -1px;
  top: 40px;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 9;
}
.sort-list li {
  list-style-type: none;
  padding: 5px 10px;
  white-space: nowrap;
  text-align: center;
}
.sort-list li:hover {
  background-color: #007bff;
  color: #fff;
}
</style>