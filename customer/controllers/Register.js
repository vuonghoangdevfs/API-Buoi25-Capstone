import { UserAccount } from "../models/UserAccount.js";
import { validateName, validateEmail, validatePhone} from "../../assets/util/method.js";

document.querySelector('#register-form').onsubmit = async function (e) {
    e.preventDefault();
    let userData = new UserAccount();
    let arrInput = document.querySelectorAll('#register-form .input-data');
    let genderInput = document.querySelector('#register-form input[type="radio"]:checked');

    // Validate
    let hasError = validateRegisterForm(arrInput);
    if (!hasError) {
        for(let input of arrInput){
            let id = input.id;
            let value = input.value;
            userData[id] = value;
        }
        if(genderInput){
            userData['gender'] = genderInput.value;
        }

        const response = await fetch('https://shop.cyberlearn.vn/api/Users/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        // Clear validation message and form data
        resetData();

        alert(result.message)
    }
}

window.resetData = function () {
    let inputErrorMess = document.querySelectorAll('.input-error-message');
    for(let input of inputErrorMess){
        input.innerHTML='';
    }
    document.querySelector('#register-form').reset();
}

window.validateRegisterForm = function (arrInput) {
    let errorMess = '';

    for(let input of arrInput){
        
        // Validate
        if (input.id == 'name' && (!input.value || !validateName(input.value))) {
            errorMess = 'Vui lòng nhập tên của bạn';
            document.querySelector('#userNameErrorMess').innerHTML = errorMess;
        }
        if (input.id == 'email' && (!input.value || !validateEmail(input.value))) {
            errorMess = 'Email không hợp lệ';
            document.querySelector('#emailErrorMess').innerHTML = errorMess;
        }
        if (input.id == 'phone' && (!input.value || !validatePhone(input.value))) {
            errorMess = 'Số điện thoại không hợp lệ';
            document.querySelector('#phoneErrorMess').innerHTML = errorMess;
        }
        if (input.id == 'password' && (!input.value)) {
            errorMess = 'Vui lòng nhập mật khẩu';
            document.querySelector('#paswordErrorMess').innerHTML = errorMess;
        }
        if (input.id == 'confirm-password' && (!input.value)) {
            errorMess = 'Vui lòng xác nhận lại mật khẩu';
            document.querySelector('#confirmPasswordErrorMess').innerHTML = errorMess;
        }
    }
    return errorMess ? true : false;
}
