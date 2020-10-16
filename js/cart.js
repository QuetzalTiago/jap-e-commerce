const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const updateCartTotal = (array) => {
  let subtotal = 0;
  for (let i = 0; i < array.articles.length; i++){
    if (array.articles[i].currency == 'USD'){
      subtotal+=changeCurrency(subtotal+=$("#amount"+i).val()*(array.articles[i].unitCost))
    }else {
      subtotal+=$("#amount"+i).val()*(array.articles[i].unitCost)
    }
  }
  $('#subtotal').text('UYU '+numberWithCommas(subtotal));
  let shipping = 0;
  
  if ($("#shipping-express").is(":focus")){
    shipping = (subtotal * 10) / 100;
  }
  else if ($("#shipping-premium").is(":focus")){
    shipping = (subtotal * 15) / 100;
  }
  else {
    shipping = (subtotal * 5) / 100;
  }
  $('#shipping').text('UYU '+numberWithCommas(shipping));

  $('#total').text('UYU '+numberWithCommas((subtotal + shipping)))
}

const changeCurrency = (amount) => {
  return amount * 42;
};

const showCart = (array) => {
  let htmlContentToAppend = "";   
  for (let i = 0; i < array.articles.length; i++){
      htmlContentToAppend+=
      `   
      <div id="product">
        <div class="row p-3 mb-2">
          <div class="col-xl text-left">
            <img src="`+array.articles[i].src+`" class="small-icon" alt="">
            <a href="./product-info.html" class="pl-2">`+array.articles[i].name+`</a>
          </div>
          <div class="col">
            <div class="row">
              <div class="col-sm price">
                <p>`+array.articles[i].currency+` `+array.articles[i].unitCost+` </p>
              </div>
              <div class="col-sm price">
                <input type="number" id="amount`+i+`" class="small-input product" value="`+array.articles[i].count+`" min="1">
              </div>
              <div class="col-sm price">
              <p id="total`+i+`" class="font-weight-bold">`+array.articles[i].currency+` `+array.articles[i].unitCost+` </p>
              </div>
            </div>
          </div>
        </div>
      `
  }
  document.getElementById("cart-products").innerHTML += htmlContentToAppend;
}

$( document ).ready( () => {
    getJSONData(CART_URL).then( (resultObj) => {
        if (resultObj.status === "ok") {
          cart = resultObj.data;
        }
        showCart(cart);
        //Check count
        for (let i = 0; i < cart.articles.length; i++){
          $("#total"+i).text(cart.articles[i].currency+" "+(cart.articles[i].count)*(cart.articles[i].unitCost));
        }
        //Update subtotal
        $('.product').change( () => {
          for (let i = 0; i < cart.articles.length; i++){
              $("#total"+i).text(cart.articles[i].currency+" "+($("#amount"+i).val())*(cart.articles[i].unitCost));
          }
          updateCartTotal(cart);
        });
        updateCartTotal(cart);
    });

    //Payment modal logic
    new Card({
        form: document.querySelector('#form'),
        container:'.card-wrapper'
      });
      
      

});

