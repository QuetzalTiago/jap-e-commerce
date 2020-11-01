//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
$( document ).ready(() => {

    let userData = localStorage.getItem('userData');

    if (userData) {
        let json = JSON.parse(userData);
        let htmlContentToAppend = '';
        htmlContentToAppend+=
        `
        <div id="user-info" class="row">
        <div class="row">
          <img class="profile-img" src=`+"data:image/png;base64," + json.img+` alt="">
        </div>
        <div class="col-sm">
          <h4 class="pl-2">`+json.name+` `+json.lastName+` </h4>
          <p class="pl-2 text-muted">Acerca de mi</p>
          <p class="pl-2 ">`+json.age+` años</p>
          <p class="pl-2">`+json.email+`</p>
          <p class="pl-2">`+json.phone+`</p>
        </div>
        </div>
        `;
        $('#content').html(htmlContentToAppend);
    }

    const getBase64Image = (img) => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        let dataURL = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    const getAge = (dateString) => {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    $('#customFileLang').change( (e) => {
        let image = document.getElementById('output');
        image.src = URL.createObjectURL(e.target.files[0]);

        let profileImg = document.getElementById('profilePic');
        profileImg.src = URL.createObjectURL(e.target.files[0]);
    });

    $('#myForm').submit( () => {
        let name = $('#InputName1').val();
        let lastName = $('#InputLastName1').val();
        let date = $('#date-input').val();
        let age = getAge((date, $('#date-input').val()));
        let email = $('#exampleInputEmail1').val();
        let phone = $('#InputPhone1').val();
        let profileImg = $('#profilePic');
        let img = getBase64Image(profileImg[0]);
        let obj = {name: name, lastName: lastName, age: age, email: email, phone: phone, img: img };
        localStorage.setItem('userData', JSON.stringify(obj));
        //add dropzone.js
    });
});