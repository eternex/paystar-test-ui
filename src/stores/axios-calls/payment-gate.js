import { defineStore } from 'pinia'
import axiosClient from '../../axios';

const PaymentGateAxios = defineStore({
  id: 'store.axios.payment.gate',
  state: () => ({
    response: null, 
  }),
  getters: { 
  },
  actions: {
    requestToPay(payload){
      return axiosClient.post('/payment-gate/request-to-pay', payload).then((res)=>{
        this.response = res;
        return res;
      });
    },
    getPaymentRequestByInvoiceId(payload){
      return axiosClient.post(`/payment-gate/get-payment/${payload.invoice_id}`).then((res)=>{
        this.response = res;
        return res;
      });
    }
  },
  mutations: {
    
  }
});
export default PaymentGateAxios;
