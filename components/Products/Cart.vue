<template>
  <div class="cart">
    <div class="cart__content">
      <div class="cart__header">
        <div class="cart__title">My Bag</div>
        <div class="cart__close" @click="$store.commit('showCart', false)">
          <Button>x</Button>
        </div>
      </div>
      <div class="cart__body">
        <template v-if="cart.length > 0">
          <div v-for="(product, index) in cart" class="cart__product" :key="index">
            <nuxt-link class="cart__product-img-link" :to="`/${product.id}`">
              <div @click="$store.state.showCart = false" class="cart__product-thumbnail">
                <img class="cart__product-img" :src="product.picture" :alt="product.name" />
              </div>
            </nuxt-link>
            <div @click="$store.state.showCart = false" class="cart__product-name">
              <nuxt-link class="cart__product-link" :to="`/${product.id}`">{{product.name}}</nuxt-link>
            </div>
            <div class="cart__product-quantity">
              <Button @click="$store.commit('decrement', product.id)">
                <span class="minus">-</span>
              </Button>
              <span class="cart__product_qty">{{product.quantity}}</span>
              <Button @click="$store.commit('increment', product.id)">
                <span class="plus">+</span>
              </Button>
            </div>
            <div class="cart__product-price">{{product.price}} PLN</div>
            <div class="cart__product-remove">
              <Button class="btn-secondary" @click="$store.commit('removeProduct', product.id)">x</Button>
            </div>
          </div>
        </template>
        <template v-else>
          <div>Your cart is empty</div>
        </template>
      </div>
      <div class="cart__footer">
        <div class="cart__summary">
          Total:
          <strong>{{ summary }} PLN</strong>
        </div>
        <div class="cart__footer-buttons">
          <Button class="btn-secondary" @click="$store.commit('showCart', false)">Close</Button>

          <Button class="btn-primary" @click="$store.commit('showCart', false)">Continue Shopping</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.products) {
      this.$store.commit("initCart", JSON.parse(localStorage.products));
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    summary() {
      let sum = 0;
      this.cart.forEach(element => {
        sum += element.price * element.quantity;
      });
      return sum;
    }
  }
};
</script>

<style scoped>
.cart {
  position: fixed;
  z-index: 100;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 50%;
  max-width: calc(100% - 20px);
}
.cart__content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}
.cart__header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart__footer {
  padding: 1rem;
  text-align: right;
}
.cart__body {
  padding: 1rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid#ccc;
  width: 500px;
  max-height: 60vh;
  overflow-y: auto;
  max-width: 100%;
}
.cart__product-img {
  max-width: 100%;
  max-height: 100%;
}
.cart__product:not(:last-of-type) {
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.cart__product {
  margin-bottom: 15px;
}
.cart__product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.cart__summary {
  text-align: right;
}
.cart__product-name {
  width: 25%;
}
.cart__product-quantity {
  width: 25%;
}
.cart__product_qty {
  width: 25px;
  text-align: center;
  display: inline-block;
}
.cart__product-price {
  width: 10%;
  text-align: center;
}
.cart__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.cart__product-thumbnail {
  max-width: 100%;
  max-height: 100%;
  display: contents;
}
.cart__product-img-link {
  width: 100px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart__product-link {
  color: #6c757d;
  text-decoration: none;
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
  .cart__product-name {
    width: calc(100% - 110px)
  }
  .cart__product-quantity {
    width: 50%;
    text-align: center;
  }
  .cart__product-price {
    width: 30%;
  }
  .cart__product-remove {
    width: 20%;
    text-align: center;
  }
  .cart__product-img-link {
    margin-bottom: 20px;
  }
  .cart__summary {
    margin-right: 0;
    margin-left: auto;
    margin-bottom: 10px;
  }
  .cart__footer-buttons {
    margin-right: 0;
    margin-left: auto;
  }
}
</style>