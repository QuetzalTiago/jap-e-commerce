const CATEGORIES_URL = 'https://japdevdep.github.io/ecommerce-api/category/all.json';
const PUBLISH_PRODUCT_URL = 'https://japdevdep.github.io/ecommerce-api/product/publish.json';
const CATEGORY_INFO_URL = 'https://japdevdep.github.io/ecommerce-api/category/1234.json';
const PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/product/all.json';
const PRODUCT_INFO_URL = 'https://japdevdep.github.io/ecommerce-api/product/5678.json';
const PRODUCT_INFO_COMMENTS_URL = 'https://japdevdep.github.io/ecommerce-api/product/5678-comments.json';
const CART_INFO_URL = 'https://japdevdep.github.io/ecommerce-api/cart/987.json';
const CART_BUY_URL = 'https://japdevdep.github.io/ecommerce-api/cart/buy.json';

var showSpinner = () => { document.getElementById('spinner-wrapper').style.display = 'block'; }
var hideSpinner = () => { document.getElementById('spinner-wrapper').style.display = 'none'; }

const getJSONData = (url) => {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch((error) => {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

$( document ).ready(() => {
  const logoutButton = document.getElementById('logout');
  // let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  $('#user').text(user);

  logoutButton.onclick = () => {
    //localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = './login.html';
  };

  if (!user) {
    window.location.href = './login.html'; 
  }
});