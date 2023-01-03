<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import PaymenntGateAxios from "../stores/axios-calls/payment-gate";

const route = useRoute()

let invoice_id = ref(route.query.invoice_id);
let tracking_code = ref('-');
let payment_amount = ref('-');
let status = ref(false);
let message = ref();


const paymenntGateAxios = PaymenntGateAxios();

function loadPaymentRequestByInvoiceId(){
    paymenntGateAxios.getPaymentRequestByInvoiceId({
        invoice_id: invoice_id.value,
    })
    .then((res)=>{
        let result = res.data;
            
        tracking_code.value = result.tracking_code;
        payment_amount.value = result.payment_amount;
        status.value = result.status;
        message.value = result.message;
    })
    .catch(err=>{
        alert(err.response.data.message);
    });
}

onMounted(() => {
    loadPaymentRequestByInvoiceId();
})

</script>

<template>
    <h5>Here you can see payment result</h5>

    Tracking Code: {{tracking_code}}<br><br>
    Amount Based IRR: {{payment_amount}}<br><br>
    
    Payment Result: <span :class="[status?'be-green':'be-red']">{{ (status)?'Success':'Failed' }}</span><br>

    <br>
    <span style="font-size: 16px; color:#ff4411;">{{message}}</span>
    
    <br><br>
    <router-link :to="{name: 'Main'}" class="">
          <button>Back to main page</button>  
    </router-link>
</template>

<style scoped>
.be-green{
    color: green;
}
.be-red{
    color: red;
}
</style>
