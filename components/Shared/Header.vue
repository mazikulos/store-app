<template>
  <div class="header">
    <div style="width: 50px"></div>
    <div class="logo">
      <nuxt-link to="/">STORE</nuxt-link>
    </div>
    <Button class="btn-shop" @click="$store.state.showCart = true">
      <ShoppingCart />
      <div v-if="cartCount > 0" class="cart-count">{{cartCount}}</div>
    </Button>

    <transition name="slide-fade" leave-active-class="animated bounceOutRight">
      <Cart v-if="$store.state.showCart" @closeCart="showCart = $event" :cart="cart" />
    </transition>
  </div>
</template>

<script>
import ShoppingCart from "@/components/UI/ShoppingCart";

export default {
  components: {
    ShoppingCart
  },
  watch: {
    showCart() {
      if (this.showCart) {
        let div = document.createElement("div");
        div.classList.add("cart-open");
        document.body.appendChild(div);
        div.classList.add("fade", "show");
      } else {
        let div = document.querySelector(".cart-open");
        div.classList.remove("show");
        setTimeout(function() {
          document.body.removeChild(div);
        }, 200);
      }
    },
    cartCount() {
    }
  },
  mounted() {
    if (localStorage.products) {
      this.countCart = JSON.parse(localStorage.products).length;
    }
    if (localStorage.products) {
      this.$store.commit("initCart", JSON.parse(localStorage.products));
    }
  },
  computed: {
    showCart() {
      return this.$store.state.showCart;
    },
    cartCount() {
      return this.$store.state.cart.length;
    }
  }
};
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin-bottom: 50px;
}
.logo {
  font-family: "Anton";
  font-size: 40px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 10px;
  cursor: pointer;
}
.logo a {
  color: #000;
  text-decoration: none;
}
.btn-shop {
  position: relative;
}
.cart-count {
  background-color: #007bff;
  color: #fff;
  position: absolute;
  right: -12px;
  top: -12px;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  line-height: 23px;
  font-size: 12px;
  font-weight: 700;
}
</style>