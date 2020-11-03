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

const darkMode = () => {
  $('.bg-light').addClass('bg-dark');
  $('div').addClass('bg-dark');
  $('body').addClass('bg-dark');
  $('main').addClass('bg-dark');
  $('input').addClass('bg-dark');
  $('p').addClass('bg-dark');
  $('a').addClass('bg-dark');
  $('textarea').addClass('bg-dark');
  $('select').addClass('bg-dark');
  $('li').addClass('bg-dark');
  $('form').addClass('bg-dark');
  $('footer').addClass('bg-dark');
  $('.jumbotron').addClass('bg-dark');
  $('.container').addClass('bg-dark');
  $('.btn').addClass('btn-dark');
  
  $('.jumbotron').css('background', 'url("./img/cover_back_dark.png")');
  $('.jumbotron').css('background-size', '100%');
  $('.jumbotron').css('background-position', 'center');

  $('input').addClass('text-light');
  $('div').addClass('text-light');
  $('textarea').addClass('text-light');
  $('h1').addClass('text-light');
  $('h2').addClass('text-light');
  $('h3').addClass('text-light');
  $('h4').addClass('text-light');
  $('h5').addClass('text-light');
  $('p').addClass('text-light');
  $('label').addClass('text-light');
}

$( document ).ready(() => {
  const logoutButton = document.getElementById('logout');
  const darkModeButton = document.getElementById('dark-mode');
  // let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  let dark = localStorage.getItem('dark');
  $('#user').text(user);

  darkModeButton.onclick = () => {
    if(!dark){
      localStorage.setItem('dark','true');
      location.reload();
    }else {
      localStorage.removeItem('dark');
      location.reload();
    }
  }

  logoutButton.onclick = () => {
    //localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('dark');
    window.location.href = './login.html';
  };

  if (!user) {
    window.location.href = './login.html'; 
  }

  if (dark) {
    $('#dark-mode').html('Desactivar modo oscuro')
    darkMode();
  }

});