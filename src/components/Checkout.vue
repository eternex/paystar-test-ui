<script setup>
import { ref, onMounted } from "vue";
import CartAxios from "../stores/axios-calls/cart";
import PaymenntGateAxios from "../stores/axios-calls/payment-gate";

/**
 * Used for load checkout page data.
 * Such as cart and order_io
 */
const cartAxios = CartAxios();

/**
 * Used for payment gate initialize. 
 */
const paymenntGateAxios = PaymenntGateAxios();

/**
 * Bellow refs hold checkout page info.
 */
let orderId = ref('');
let cartId = ref('');
let cartItems = ref([]);
let finalAmount = ref(0);
let loading_cart = ref(false);
/**
 * Load cart info.
 */
function loadCart(){
    cartAxios.get()
    .then((res)=>{
        orderId.value = res.data.order_id;
        cartId.value = res.data.cart_id;
        cartItems.value = res.data.cart;
        finalAmount.value = res.data.amount;
        loading_cart.value = true;
    })
    .catch(err=>{
        alert(err);
    });
}


/**
 * After mount action load cart.
 */
onMounted(() => {
    loadCart();
})


/**
 * To hold cart-number
 */
let cardNumber = ref('6104337333030417')

/**
 * Send a request to server to make an invoice and initialize IPG to pay.
 */

let loading_ipg = ref(true);
function requestToPay(){
    // Validation
    if(cardNumber.value.trim() == ''){
        alert('Error: card number not inserted!');
        return;
    }
    if(cardNumber.value.length != 16){
        alert("Error: cart number must be equal 16 char!");
        return;
    }
    loading_ipg.value = false;
    paymenntGateAxios.requestToPay({
        cart_id: cartId.value,
        card_number: cardNumber.value,
    })
    .then((res)=>{
        // Success.
        let result = res.data;
        loading_ipg.value = true;
        alert('Success: You will redirect to IPG.')
        window.location.replace(`${import.meta.env.VITE_APP_PAY_STAR_IPG_LINK_END_POINT}?token=${result.token}`);
    })
    .catch(err=>{
        loading_ipg.value = true;
        alert(err.response.data.message);
    });
}


/**
 * To control cart number insert action.
 * 
 * @param {*} evt event handler 
 */
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      evt.preventDefault();;
    } else {
      return true;
    }
}
</script>

<template>
    <h5>Here you can insert your Debit-Card numer and pay this bill.</h5>

    <div>
        <div style="color:red; font-size: 13px;">
            *In each page reload action a new fake OrderId generated, <br>
            But It's received and holded on server to track Pay operaiton. <br>
            Also the bill information is fake too and in each reload may changed. <br>
            ALL PRICES BASED ON TOMAN.
        </div>
        
        <table style="margin-top: 10px;">    
            <thead style="font-size: 16px; text-align: center;">
                <td>Row</td>
                <td>Product Name</td>
                <td>Unit Price</td>
                <td>Quantity</td>
                <td>Price</td>
            </thead>
            <tbody style="font-size: 14px; text-align: center;" v-if="loading_cart">
                <tr v-for="cart in cartItems" :key="cart.product_name">
                    <td>1</td>
                    <td>{{ cart.product_name }}</td>
                    <td>{{ cart.product_price }}</td>
                    <td>{{ cart.product_quantity }}</td>
                    <td>{{ new Intl.NumberFormat().format(cart.product_price*cart.product_quantity) }}</td>
                </tr>
                <tr><td colspan="5">&nbsp;</td></tr>
                <tr>
                    <td>Sum</td>
                    <td>{{ new Intl.NumberFormat().format(finalAmount) }}</td>

                </tr>
            </tbody>
            <tbody v-else>
                <h2>Loading...</h2>
            </tbody>
        </table>
    </div>

    <div style="margin-top: 10px">ORDER-ID: {{ orderId }}</div>
    <div style="margin-top: 10px">CART-ID: {{ cartId }}</div>
    <div style="margin-top: 10px;">
        <span>Debit-Card Number: </span>
        <input type="text" maxlength="16" v-model="cardNumber" @keypress="isNumber($event)">
    </div>

    <div style="margin-top: 10px;">
      <router-link :to="{name: 'Main'}" class="">
          <button>Back to main page</button>  
      </router-link>
        <button style="margin-left: 5px;" @click="requestToPay()" :disabled="!loading_ipg">Go to IPG {{ (!loading_ipg)?'...':'' }}</button>  
    </div>
</template>

<style scoped>
table, td, th {
  border: 1px solid;
}

table {
  border-collapse: collapse;
}
</style>
