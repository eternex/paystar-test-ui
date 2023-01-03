import { defineStore } from 'pinia'
import axiosClient from '../../axios';

const CartAxios = defineStore({
  id: 'store.axios.cart',
  state: () => ({
    response: null, 
  }),
  getters: { 
  },
  actions: {
    get(){
      return axiosClient.get('carts/get-new-fake-cart').then((res)=>{
        this.response = res;
        return res;
      });
    },
    
  },
  mutations: {
    
  }
});
export default CartAxios;
