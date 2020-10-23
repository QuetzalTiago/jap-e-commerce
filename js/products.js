const ORDER_DESC_BY_COST = "AZ";
const ORDER_ASC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let productsArray = [];
let results = [];
let currentProductsArray = [];
let resultsFound;
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


const sortProducts = (criteria, array) => {
    let result = [];
    if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

const showProductList = (array) =>  {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            htmlContentToAppend += 
            `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4> 
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        
                        <p class="mb-1">` + product.description + `</p>
                        <h4 class="price">USD ` + product.cost + `</h4>
                    </div>
                </div>
            </a>
            `
            $("#cat-list-container").html(htmlContentToAppend);
        }
    }
}

const sortAndShowProducts = (sortCriteria, categoriesArray) => {
    currentSortCriteria = sortCriteria;
    if (results.length > 0) {
        if (categoriesArray != undefined) {
            currentProductsArray = categoriesArray;
        }

        currentProductsArray = sortProducts(currentSortCriteria, results);
        if (resultsFound) {
            showProductList(results);
        }
    } else if (results.length == 0) {
        if (categoriesArray != undefined) {
            currentProductsArray = categoriesArray;
        }

        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
        if (resultsFound) {
            showProductList(productsArray);
        }
    }
}

const makeSearch = () => {
    results = []; // clear array
    let counter = productsArray.length; // counter
    let searchInput = $("#search-bar").val();
    console.log(searchInput);
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];
        if ((product.name.toLowerCase().includes(searchInput.toLowerCase())) || (product.description.toLowerCase().includes(searchInput.toLowerCase()))) {
            results.push(product) //match adds to the results array
            resultsFound = true;
        } else {
            counter -= 1; //no match found, counter goes down and tries next item
        }
    }
    if (counter == 0) { // if counter gets to 0, no matches were found, shows no products
        resultsFound = false;
        htmlContentToAppend =
        `
        <div>
            <div class="row">
                <div class="col">
                    <div class="justify-content-between">
                        <h5>No se encontraron resultados para: `+ searchInput + `</h5> 
                    </div>
                </div>
            </div>
        </div>
        `
        $("#cat-list-container").html(htmlContentToAppend);
    }
    showProductList(results);
}

$( document ).ready(() => {
    getJSONData(PRODUCTS_URL).then((resultObj) => {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            sortAndShowProducts(ORDER_BY_PROD_COUNT, resultObj.data);
            resultsFound = true;
            //Muestro las categorías ordenadas
            showProductList(productsArray);
        }

    $("#sortAsc").click(() => {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    $("#sortDesc").click(() => {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    $("#sortByCount").click(() => {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    $("#clearRangeFilter").click(() => {    
        $("#rangeFilterCountMin").val("");
        $("#rangeFilterCountMax").val("");
        $("#search-bar").val("");
        $("#sortAsc").removeClass("active");
        $("#sortDesc").removeClass("active");
        $("#sortByCount").addClass("active");

        sortAndShowProducts(ORDER_BY_PROD_COUNT);
        minCount = undefined;
        maxCount = undefined;
        makeSearch();
    });

    $("#rangeFilterCount").click(() => {
        if (resultsFound) {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;

            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
                minCount = parseInt(minCount);
            }
            else {
                minCount = undefined;
            }

            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
                maxCount = parseInt(maxCount);
            }
            else {
                maxCount = undefined;
            }

            if (!(results.length == 0)) {
                showProductList(results);
            } else {
                showProductList(productsArray);
            }
        }
    });

    $("#search-bar").on('input', () =>{
        makeSearch();
    });

    $('[data-toggle="tooltip"]').tooltip();
    });
});