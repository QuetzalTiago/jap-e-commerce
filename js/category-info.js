let category = {};

const showImagesGallery = (array) => {

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        $("#productImagesGallery").html(htmlContentToAppend);
    }
}

$( document ).ready(() => {
    getJSONData(CATEGORY_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = $("#categoryName");
            let categoryDescriptionHTML = $("#categoryDescription");
            let productCountHTML = $("#productCount");
            let productCriteriaHTML = $("#productCriteria");
        
            categoryNameHTML.html(category.name);
            categoryDescriptionHTML.html(category.description);
            productCountHTML.html(category.productCount);
            productCriteriaHTML.html(category.productCriteria);

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
});