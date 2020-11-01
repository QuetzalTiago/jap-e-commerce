const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

const sortCategories = (criteria, array) => {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

const showCategoriesList = (array) => {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row m-0">
                    <div class="col-md-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col-md">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        $("#cat-list-container").html(htmlContentToAppend);
    }
}

const sortAndShowCategories = (sortCriteria, categoriesArray) => {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList(currentCategoriesArray);
}

$( document ).ready(() => {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
            currentCategoriesArray = resultObj.data;
        }
    });

    $("#sortAsc").click(() => {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    $("#sortDesc").click(() => {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    $("#sortByCount").click(() => {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    $("#clearRangeFilter").click( () => {
        $("#rangeFilterCountMin").val("");
        $("#rangeFilterCountMax").val("");
        $("#sortAsc").addClass("active");
        $("#sortDesc").removeClass("active");
        $("#sortByCount").removeClass("active");

        sortAndShowCategories(ORDER_ASC_BY_NAME);
        minCount = undefined;
        maxCount = undefined;

        showCategoriesList(currentCategoriesArray);
    });

    $("#rangeFilterCount").click( () => {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = $("#rangeFilterCountMin").val();
        maxCount = $("rangeFilterCountMax").val();

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

        showCategoriesList(currentCategoriesArray);
    })

});