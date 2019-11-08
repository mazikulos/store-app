<template>
  <div class="single-product">
    <div class="single-product__picture">
        <img class="single-product__img" :src="product.picture" :alt="product.name" />
      </div>
    <div class="single-product__content">
      <h2 class="single-product__name">{{product.name}}</h2>
      <div class="single-product__desc">{{product.desc}}</div>
      <div class="single-product__price-box">
        <span class="single-product__price">{{product.price}}</span> PLN
      </div>

      <div class="single-product__buy">
        <div class="single-product__input">
          <Button @click="quantity--">
            <span class="minus">-</span>
          </Button>
          <input class="single-product__qty" type="text" :value="quantity" />
          <Button @click="quantity = quantity + 1">
            <span class="plus">+</span>
          </Button>
        </div>
        <AddToCart class="btn-primary" @click="addProduct">Add to cart</AddToCart>
      </div>
    </div>
    <div style="margin-top: 30px;" class="back">
      <nuxt-link to="/">
        <Button class="btn-secondary">Go back</Button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1
    };
  },
  computed: {
    product() {
      const loadedProducts = this.$store.getters.getProducts;
      const loadedProduct = loadedProducts.find(
        prod => prod.id == this.$route.params.id
      );
      return loadedProduct;
    }
  },
  methods: {
    addProduct() {
      this.$store.commit("addProduct", {
        ...this.product,
        quantity: this.quantity
      });
    }
  },
  validate({ params, query, store }) {
    const products = store.state.products;
    const product = products.find(prod => prod.id == params.id);
    return product != undefined;
  }
};
</script>

<style scoped>
.single-product {
  margin-top: 50px;
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
}
.single-product__name {
  font-family: "Anton";
  margin-bottom: 15px;
  font-size: 28px;
}
.single-product__content {
  width: calc(50% - 30px);
  margin: auto;
}
.single-product__picture {
  width: calc(50% - 30px);
  text-align: center;
  height: 350px;
  margin: auto;
}
.single-product__desc {
  text-align: justify;
  margin-bottom: 20px;
}
.single-product__img {
  max-width: 100%;
  max-height: 100%;
}
.single-product__price {
  font-size: 24px;
  font-weight: 700;
}
.single-product__price-box {
  margin-bottom: 15px;
}
.single-product__input {
  display: flex;
  margin-right: 10px;
}
.single-product__buy {
  display: flex;
  flex-wrap: wrap;
}
.single-product__qty {
  width: 50px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0 5px;
  border-radius: 3px;
}
.back {
  margin-left: 15px;
  margin-bottom: 30px;
}
@media screen and (max-width: 575px) {
  .single-product__picture {
    width: calc(100% - 30px);
    margin-bottom: 30px;
  }
  .single-product__content {
    width: calc(100% - 30px);
  }
}
</style>