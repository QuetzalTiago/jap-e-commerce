const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

const updateCount = () => { //Updates product price according to count
  let parentDivTotal = document.getElementById("cart-products").getElementsByClassName("total");
  let parentDivCost = document.getElementById("cart-products").getElementsByClassName("cost");
  let parentDivProduct = document.getElementById("cart-products").getElementsByClassName("product");
  for (let i = 0; i < parentDivTotal.length; i++){
    let currency = parentDivTotal[i].innerHTML.replace(/[^a-zA-Z]+/g, ''); // Regex to remove numbers
    let unitTotal = parseInt(parentDivCost[i].innerHTML.replace(/\D+/g, '')); // Regex to remove letters
    let amount = parentDivProduct[i].value;
    parentDivTotal[i].innerHTML = (currency+' '+(unitTotal*amount))
  }
  if (parentDivTotal.length == 0){
    cartEmpty();
  }
};

const numberWithCommas = (x) => { // Makes numbers prettier
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const updateCartTotal = () => { // Updates total price with shipping
  let subtotal = 0;
  let parentDivArray = document.getElementById("cart-products").getElementsByClassName("total");
  for (let i = 0; i < parentDivArray.length; i++){
    let currency = parentDivArray[i].innerHTML.replace(/[^a-zA-Z]+/g, ''); // Regex to remove numbers
    let unitTotal = parseInt(parentDivArray[i].innerHTML.replace(/\D+/g, '')); // Regex to remove letters
    if (currency == 'USD'){
      subtotal+=changeCurrency(unitTotal) // USD
    }else {
      subtotal+=unitTotal; // UYU
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
};

const changeCurrency = (amount) => { //USD to UYU
  return amount * 42;
};

const showCart = (array) => { // Generates HTML code for each product and appends it
  let htmlContentToAppend = "";   
  for (let i = 0; i < array.articles.length; i++){
      htmlContentToAppend+=
      `   
      <div id="product`+i+`">
        <div class="row p-3 mb-2">
          <div class="col-xl text-left">
            <img src="`+array.articles[i].src+`" class="small-icon" alt="">
            <a href="./product-info.html" class="pl-2">`+array.articles[i].name+`</a>
          </div>
          <div class="col">
            <div class="row">
              <div class="col-sm price">
                <p class="cost">`+array.articles[i].currency+` `+array.articles[i].unitCost+` </p>
              </div>
              <div class="col-sm price">
                <input type="number" class="small-input product" value="`+array.articles[i].count+`" min="1">
              </div>
              <div class="col-sm price">
              <p class="font-weight-bold total">`+array.articles[i].currency+` `+array.articles[i].unitCost+` </p>
              </div>
              <i class="fas fa-times clickable remove" id="remove`+i+`" title="Quitar del carrito"></i>
            </div>
          </div>
        </div>
      </div>  
      `
  }
  document.getElementById("cart-products").innerHTML += htmlContentToAppend;
};

const cartEmpty = () => {
  let htmlContentToAppend = "";   
  htmlContentToAppend+=
  `
  <div class="text-center pt-5">
    <h2>Parece que tu carrito está vacio!</h2>
    <img src="img/cart-empty.png" class="small-img" alt="">
    <br>
    <a href="./products.html">Ver productos</a>
  </div>
  `
  $('#content').html(htmlContentToAppend);
};

$( document ).ready( () => {
    getJSONData(CART_URL).then( (resultObj) => {
        if (resultObj.status === "ok") {
          cart = resultObj.data;
        }
        showCart(cart);
        updateCount();
        updateCartTotal();
        $('.product').change( () => {
          updateCount();
          updateCartTotal();
        });

        $('.shipping').change( () => {
          updateCartTotal(cart);
        });

        //Check credit card fields
        $('.card-input').on('input', () => {
          let counter = 5;
          for (let i = 0; i < 5; i++){
            if($('.card-input')[i].value.length > 0){
              counter--;
            }
          }
          if (counter == 0){
            $('#next-slide').removeClass('btn-secondary');
            $('#next-slide').addClass('btn-success');
            $('#next-slide').removeAttr('disabled');
          }else {
            $('#next-slide').removeClass('btn-success');
            $('#next-slide').addClass('btn-secondary');
            $('#next-slide').attr('disabled','disabled');
          }
        });

        //Remove product
        $('.remove').click( (e) => {
          let i = e.target.id.replace(/\D+/g, '');
          document.getElementById("product"+i).innerHTML = '';
          let deletedItem = cart.articles.splice(i,1);
          updateCartTotal(cart);
          updateCount();
        });
       
    });

    //Card
    new Card({
        form: document.querySelector('#form'),
        container:'.card-wrapper'
      });
    
    
      

});

