const showProduct = () => {
  let product = productArray;
  let htmlContentToAppend = 
  `
  <!-- Category info -->

  <div class="row" id="category-info">
    <a class="text-left font-weight-bold pl-3 pb-1" id="category" href="./products.html">Categorias > ` + product.category + `</a>
  </div> 
  <div class="row" id="product-info">
    <div class="col-md-6">
    <!-- Carousel -->
      <div id="carousel" class="carousel slide" data-ride="carousel"> 
        <div class="carousel-inner">
        <div class="carousel-item active" >
          <img class="d-block w-100 img-fluid" src="` + product.images[0] + `" alt="slide number 1"">
        </div>
        `
        for (let i = 1; i < product.images.length; i++){
          htmlContentToAppend+=`
          <div class="carousel-item" >
            <img class="d-block w-100 img-fluid" src="` + product.images[i] + `" alt="slide number `+ (i+1) +`"">
          </div>
        `
        }
        htmlContentToAppend+=`
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <!-- Product info -->
    <div class="text-left p-4 col">
      <p class="text-muted small" id="sold">Nuevo - ` + product.soldCount + ` vendidos</p>
      <h2 class ="font-weight-bold">`+ product.name + `</h2> 
      <h4 class="price">`+ product.currency +` `+ product.cost + `</h4>
      <p class="font-weight-normal">` + product.description + `</p>
      <button type="button" class="btn btn-primary btn-lg btn-block">Añadir al carrito</button>
    </div>
  </div>
  
  <!-- Recommended products -->
  <h4 class="text-center pt-4">También te puede interesar</h4> 
  `
  const RELATED_PRODUCTS = product.relatedProducts.length;
  for (let i = 0; i <  RELATED_PRODUCTS; i++){
  htmlContentToAppend+=
  `
  <div class="col">
  <!-- Product 0 -->
    <div class="row text-center">
        <div class="card col-sm" style="width: 18rem;">
        <div class="card-body">
          <div class="text-left p-4 col">
              <h2 class ="font-weight-bold text-center">`+ productsArray[product.relatedProducts[i]].name +`</h2> 
              <img src="`+ productsArray[product.relatedProducts[i]].imgSrc +`" class="card-img-top" alt="...">
              <h4 class="price">USD `+ productsArray[product.relatedProducts[i]].cost +`</h4>
              <p class="font-weight-normal">`+ productsArray[product.relatedProducts[i]].description +`</p>
              <a href="product-info.html" class="btn btn-primary btn-lg btn-block ">Ver producto</a>
            </div>
    </div>
  </div>
  `
  }
  document.getElementById("product-container").innerHTML = htmlContentToAppend;
}

const showComments = (array) => {
  let comments = array;
  let htmlContentToAppend = 
  `
  <h4 class="text-center pt-4">Opiniones sobre el producto</h4>
  <hr>
  `;
  for (let i = 0; i < comments.length; i++){
    for (let j = 0; j < comments[i].score; j++){
      htmlContentToAppend+=`<span class="fa fa-star checked"></span>`
    }
    for (let k = 0; k < (5 - comments[i].score); k++){
      htmlContentToAppend+=`<span class="fa fa-star"></span>`
    }
    htmlContentToAppend+=
    `
      <small class="pl-2 font-weight-bold">`+ comments[i].user +`</small>
      <p class="pt-2">`+ comments[i].description +`</p>
      <small class="text-muted">`+ comments[i].dateTime +`</small>
      <hr>
    `
  }
  $("#comments-container").html(htmlContentToAppend);
  
}

const getCurrentTime = () => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;
  return dateTime;
}

const sendComment = (score, desc) => {
  let data = commentsArray;
  let user = localStorage.getItem("user");
  user = user.substring(0, user.indexOf('@'));
  if (score > 0){
    data.push({
      "score": score,
      "description": desc,
      "user": user,
      "dateTime": getCurrentTime()
    })
    showComments(data);
    document.getElementById("alert").innerHTML+=
    `
    <div class="alert alert-success text-center" role="alert">
      Comentario publicado
    </div>
    `
    setTimeout(() => {
      document.getElementById("alert").innerHTML=` `
    }, 4500); 
  }else {
    document.getElementById("alert").innerHTML+=
    `
    <div class="alert alert-danger text-center" role="alert">
      Debes elegir un puntaje antes de comentar!
    </div>
    `
    setTimeout(() => {
      document.getElementById("alert").innerHTML=` `
    }, 4500); 
  }
}

$( document ).ready(() => {
  //Get all products data
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
    }
  });
  
  //Get specific product data
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productArray = resultObj.data;
    }
    showProduct(productArray);
  });

  //Get comments data
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentsArray = resultObj.data;
    }
    showComments(commentsArray);
  });

  // Comment & rating logic
  let score = 0;

  const checkStars = () => {
    if (score == 1){
      $("#star1").addClass("checked");
    }
    else if (score == 2){
      $("#star1").addClass("checked");
      $("#star2").addClass("checked");
    }
    else if (score == 3){
      $("#star1").addClass("checked");
      $("#star2").addClass("checked");
      $("#star3").addClass("checked");
    }
    else if (score == 4){
      $("#star1").addClass("checked");
      $("#star2").addClass("checked");
      $("#star3").addClass("checked");
      $("#star4").addClass("checked");
    }
    else if (score == 5){
      $("#star1").addClass("checked");
      $("#star2").addClass("checked");
      $("#star3").addClass("checked");
      $("#star4").addClass("checked");
      $("#star5").addClass("checked");
    }
  }

  const uncheckStars = () => {
    $("#star1").removeClass("checked");
    $("#star2").removeClass("checked");
    $("#star3").removeClass("checked");
    $("#star4").removeClass("checked");
    $("#star5").removeClass("checked");
  }

  //Star 1
  document.getElementById("star1").addEventListener("mouseover", function() {
    uncheckStars();
    $("#star1").addClass("checked");
  })
  document.getElementById("star1").addEventListener("click", function() {
    score = 1;
  })
  document.getElementById("star1").addEventListener("mouseleave", function() {
    uncheckStars();
    checkStars();
  })

  //Star 2
  document.getElementById("star2").addEventListener("mouseover", function() {
    uncheckStars();
    $("#star1").addClass("checked");
    $("#star2").addClass("checked");
  })
  document.getElementById("star2").addEventListener("click", function() {
    score = 2;
  })
  document.getElementById("star2").addEventListener("mouseleave", function() {
    uncheckStars();
    checkStars();
  })

  //Star 3
  document.getElementById("star3").addEventListener("mouseover", function() {
    uncheckStars();
    $("#star1").addClass("checked");
    $("#star2").addClass("checked");
    $("#star3").addClass("checked");
  })
  document.getElementById("star3").addEventListener("click", function() {
    score = 3;
  })
  document.getElementById("star3").addEventListener("mouseleave", function() {
    uncheckStars();
    checkStars();
  })

  //Star 4
  document.getElementById("star4").addEventListener("mouseover", function() {
    uncheckStars();
    $("#star1").addClass("checked");
    $("#star2").addClass("checked");
    $("#star3").addClass("checked");
    $("#star4").addClass("checked");
  })
  document.getElementById("star4").addEventListener("click", function() {
    score = 4;
  })
  document.getElementById("star4").addEventListener("mouseleave", function() {
    uncheckStars();
    checkStars();
  })

  //Star 5
  document.getElementById("star5").addEventListener("mouseover", function() {
    uncheckStars();
    $("#star1").addClass("checked");
    $("#star2").addClass("checked");
    $("#star3").addClass("checked");
    $("#star4").addClass("checked");
    $("#star5").addClass("checked");
  })
  document.getElementById("star5").addEventListener("click", function() {
    score = 5;
  })
  document.getElementById("star5").addEventListener("mouseleave", function() {
    uncheckStars();
    checkStars();
  })

  //Send and show comment
  document.getElementById("send-comment").addEventListener("click", function(){
    let text = document.getElementById("textarea").value;
    sendComment(score, text);
    if (score > 0){
      uncheckStars();
      document.getElementById("textarea").value="";
      score = 0;
    }
  })


});