function showProduct() {
  let product = productArray;
  let htmlContentToAppend = 
  `
  <!-- Category info -->

  <div class="row" id="category-info">
    <a class="text-left font-weight-bold pl-3 pb-1" id="category" href="./products.html">Categorias > ` + product.category + `</a>
  </div> 
  <div class="row" id="product-info">
    <div class="col">
    <!-- Carousel -->
      <div id="carousel" class="carousel slide" data-ride="carousel"> 
        <div class="carousel-inner">
        <div class="carousel-item active" >
          <img class="d-block w-100" src="` + product.images[0] + `" alt="slide number 1"">
        </div>
        `
        for (let i = 1; i < product.images.length; i++){
          htmlContentToAppend+=`
          <div class="carousel-item" >
            <img class="d-block w-100" src="` + product.images[i] + `" alt="slide number `+ (i+1) +`"">
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

  <!-- Product 0 -->
    <div class="row pt-4 text-center">
        <div class="card col-sm" style="width: 18rem;">
        <img src="`+ productsArray[product.relatedProducts[0]].imgSrc +`" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title font-weight-bold">`+ productsArray[product.relatedProducts[0]].name +`</h5>

  <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Más información
      </button>

  <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="text-left p-4 col">
                <p class="text-muted small" id="sold">Nuevo - `+ productsArray[product.relatedProducts[0]].soldCount +` vendidos</p>
                <h2 class ="font-weight-bold">`+ productsArray[product.relatedProducts[0]].name +`</h2> 
                <img src="`+ productsArray[product.relatedProducts[0]].imgSrc +`" class="card-img-top" alt="...">
                <h4 class="price">USD `+ productsArray[product.relatedProducts[0]].cost +`</h4>
                <p class="font-weight-normal">`+ productsArray[product.relatedProducts[0]].description +`</p>
                <a href="product-info.html" class="btn btn-primary btn-lg btn-block ">Ver producto</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Product 1 -->

    <div class="card col-sm" style="width: 18rem;">
      <img src="`+ productsArray[product.relatedProducts[1]].imgSrc +`" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title font-weight-bold">`+ productsArray[product.relatedProducts[1]].name +`</h5>
        
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
        Más información
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="text-left p-4 col">
                <p class="text-muted small" id="sold">Nuevo - `+ productsArray[product.relatedProducts[1]].soldCount +` vendidos</p>
                <h2 class ="font-weight-bold">`+ productsArray[product.relatedProducts[1]].name +`</h2> 
                <img src="`+ productsArray[product.relatedProducts[1]].imgSrc +`" class="card-img-top" alt="...">
                <h4 class="price">USD `+ productsArray[product.relatedProducts[1]].cost +`</h4>
                <p class="font-weight-normal">`+ productsArray[product.relatedProducts[1]].description +`</p>
                <a href="product-info.html" class="btn btn-primary btn-lg btn-block ">Ver producto</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  <!-- Product 0 (again for esthetic porpuses) -->

      <div class="card col-sm" style="width: 18rem;">
      <img src="`+ productsArray[product.relatedProducts[0]].imgSrc +`" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title font-weight-bold">`+ productsArray[product.relatedProducts[0]].name +`</h5>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Más información
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="text-left p-4 col">
                <p class="text-muted small" id="sold">Nuevo - `+ productsArray[product.relatedProducts[0]].soldCount +` vendidos</p>
                <h2 class ="font-weight-bold">`+ productsArray[product.relatedProducts[0]].name +`</h2> 
                <img src="`+ productsArray[product.relatedProducts[0]].imgSrc +`" class="card-img-top" alt="...">
                <h4 class="price">USD `+ productsArray[product.relatedProducts[0]].cost +`</h4>
                <p class="font-weight-normal">`+ productsArray[product.relatedProducts[0]].description +`</p>
                <a href="product-info.html" class="btn btn-primary btn-lg btn-block ">Ver producto</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  `
  document.getElementById("product-container").innerHTML = htmlContentToAppend;
}

function showComments(array){
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
  document.getElementById("comments-container").innerHTML = htmlContentToAppend;
  
}

function getCurrentTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}

function sendComment(score, desc){
  var data = commentsArray
  var user = localStorage.getItem("user");
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
    setTimeout(function (){
      document.getElementById("alert").innerHTML=` `
    }, 4500); 
  }else {
    document.getElementById("alert").innerHTML+=
    `
    <div class="alert alert-danger text-center" role="alert">
      Debes elegir un puntaje antes de comentar!
    </div>
    `
    setTimeout(function (){
      document.getElementById("alert").innerHTML=` `
    }, 4500); 
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
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

  function checkStars(){
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

  function uncheckStars(){
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