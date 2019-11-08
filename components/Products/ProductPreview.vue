<template>
  <div class="product">
    <nuxt-link class="product__link" :to="`/${data.id}`">
      <div class="product__picture">
        <img class="product__img" :src="data.picture" />
        <div class="product__more">MORE</div>
      </div>
    </nuxt-link>
    <div class="product__name">{{data.name}}</div>
    <div class="product__price">{{data.price}} PLN</div>
    <AddToCart class="btn-primary" @click="addProduct">Add to cart</AddToCart>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      product: {
        id: this.data.id,
        name: this.data.name,
        price: this.data.price,
        picture: this.data.picture,
        quantity: 1
      }
    };
  },
  methods: {
    addProduct() {
      this.$store.commit("addProduct", { ...this.data, quantity: 1 });
    }
  }
};
</script>

<style scoped>
.product {
  width: calc(25% - 30px);
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 30px;
  text-align: center;
}
.product__img {
  max-width: 100%;
  max-height: 100%;
}
.product__name {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
}
.product__price {
  margin-bottom: 10px;
}
.product__picture {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.product__link {
  height: 200px;
  display: inline-block;
  width: 100%;
}
.product__picture:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #6c757d;
  border-radius: 5px;
  opacity: 0;
  transition: 0.3s;
  z-index: 1;
}
.product__picture:hover:before {
  opacity: 0.9;
}
.product__picture:hover .product__more {
  opacity: 1;
   transition-delay: 0.3s;
}
.product__more {
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  color: #fff;
  font-family: "Anton";
  opacity: 0;
  letter-spacing: 1px;
  font-size: 26px;
  transition: 0.65s;
}
.product__more:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 1px;
  width: 100%;
  transition: 0.3s;
  background-color: #fff;
  z-index: 3;
}
.product__more:after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 1px;
  height: 1px;
  width: 100%;
  transition: 0.3s;
  background-color: #fff;
  z-index: 3;
}
.product__more:hover:before {
  width: 0%;
}
.product__more:hover:after {
  width: 0%;
}
@media screen and (max-width: 991px) {
  .product {
    width: calc(33.3333% - 30px);
    margin-bottom: 50px;
  }
}
@media screen and (max-width: 767px) {
  .product {
    width: calc(50% - 30px)
  }
}
@media screen and (max-width: 575px) {
  .product {
    width: calc(100% - 30px);
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 70px;
  }
}
</style>