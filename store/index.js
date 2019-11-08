import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      products: {},
      cart: [],
      showCart: false,
    },
    mutations: {
      setProducts(state, products) {
        state.products = products;
      },
      initCart(state, ls) {
        state.cart = ls;
      },
      addProduct(state, product) {
        let productInLS;
        let ls = JSON.parse(localStorage.getItem('products'));
        if (ls && ls.length > 0) {
          // check if product is in LS
          productInLS = ls.find(prod => prod.id == product.id);
          if (productInLS) {
            // if product is in LS, increment it
            productInLS.quantity = productInLS.quantity + product.quantity;
            localStorage.setItem('products', JSON.stringify(ls));
          } else {
            // if not, push it into LS
            ls.push(product);
            localStorage.setItem('products', JSON.stringify(ls));
          }
          state.cart = ls;
        } else {
          let cart = [];
          cart.push(product);
          localStorage.setItem('products', JSON.stringify(cart));
        }
        state.showCart = true;
      },
      showCart(state, action) {
        state.showCart = action;
      },
      removeProduct(state, productId) {
        let ls = JSON.parse(localStorage.getItem('products'));
        let filteredLs = ls.filter(prod => prod.id !== productId);

        state.cart = filteredLs;
        localStorage.setItem('products', JSON.stringify(filteredLs));
      },
      increment(state, productId) {
        let ls = JSON.parse(localStorage.getItem('products'));
        let productInLS = ls.find(prod => prod.id == productId);
        productInLS.quantity++;

        state.cart = ls;
        localStorage.setItem('products', JSON.stringify(ls));

      },
      decrement(state, productId) {
        let ls = JSON.parse(localStorage.getItem('products'));
        let productInLS = ls.find(prod => prod.id == productId);
        if (productInLS.quantity > 1) {
          productInLS.quantity--;
        }

        state.cart = ls;
        localStorage.setItem('products', JSON.stringify(ls));

      },
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        const products = await context.app.$axios.$get('products.json');
        vuexContext.commit('setProducts', products);
      }
    },
    getters: {
      getProducts(state) {
        return state.products;
      },
      getCart(state) {
        return state.cart
      }
    }
  });
};


export default createStore;
