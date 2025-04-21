const formRegi = document.getElementById("formRegi");
const usernameEle = document.getElementById("username");
const emailEle = document.getElementById("email");
const passEle = document.getElementById("pass");
const confirm_passEle = document.getElementById("confirm_pass");

const useNameErr = document.querySelector(".usernameErr");
const emailErr = document.querySelector(".emailErr");
const passErr = document.querySelector(".passErr");
const confirm_passErr = document.querySelector(".confirm_passErr");

const mauten = /^[A-ZÀ-ỹ]{1}[A-Za-zÀ-ỹ]*(\s[A-ZÀ-ỹ]{1}[A-Za-zÀ-ỹ]*)+$/;
const mauemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Hàm kiểm tra và hiển thị lỗi
function showError(element, errorElement, message) {
    if (!element.value.trim()) {
        errorElement.textContent = message.empty;
        errorElement.style.display = "block";
        return false;
    }
    if (!message.condition.test(element.value.trim())) {
        errorElement.textContent = message.invalid;
        errorElement.style.display = "block";
        return false;
    }
    errorElement.style.display = "none";
    return true;
}

// Hàm kiểm tra tên
function checkUsername() {
    return showError(usernameEle, useNameErr, {
        empty: "Tên không được để trống",
        invalid: "Tên phải viết hoa chữ cái đầu mỗi từ",
        condition: mauten
    });
}

// Hàm kiểm tra email
function checkEmail() {
    return showError(emailEle, emailErr, {
        empty: "Email không được để trống",
        invalid: "Email không hợp lệ",
        condition: mauemail
    });
}

// Hàm kiểm tra mật khẩu
function checkPassword() {
    return showError(passEle, passErr, {
        empty: "Mật khẩu không được để trống",
        invalid: "Mật khẩu phải từ 8 ký tự",
        condition: /.{8,}/
    });
}

// Hàm kiểm tra xác nhận mật khẩu
function checkConfirmPassword() {
    if (!confirm_passEle.value.trim()) {
        confirm_passErr.textContent = "Vui lòng nhập lại mật khẩu";
        confirm_passErr.style.display = "block";
        return false;
    }
    if (confirm_passEle.value.trim() !== passEle.value.trim()) {
        confirm_passErr.textContent = "Mật khẩu không khớp";
        confirm_passErr.style.display = "block";
        return false;
    }
    confirm_passErr.style.display = "none";
    return true;
}

// Lắng nghe sự kiện input cho từng trường
usernameEle.addEventListener("input", checkUsername);
emailEle.addEventListener("input", checkEmail);
passEle.addEventListener("input", checkPassword);
confirm_passEle.addEventListener("input", checkConfirmPassword);

// Lắng nghe sự kiện submit của form
formRegi.addEventListener("submit", function (e) {
    e.preventDefault();

    // Kiểm tra lại các trường trước khi submit
    const isValid = checkUsername() && checkEmail() && checkPassword() && checkConfirmPassword();

    // Nếu tất cả các trường hợp lệ thì lưu vào localStorage
    if (isValid) {
        const user = {
            id: Date.now(),
            name: usernameEle.value.trim(),
            email: emailEle.value.trim(),
            password: passEle.value.trim()
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        setTimeout(function () {
            window.location.href = "login.html"; // Sau 1s chuyển hướng
        }, 1000);
    }
});
function togglePassword(id) {
    const field = document.getElementById(id);
    const icon = field.nextElementSibling; // vì icon đặt ngay sau input

    if (field.type === "password") {
        field.type = "text";
        icon.classList.replace('bx-hide', 'bx-show');
    } else {
        field.type = "password";
        icon.classList.replace('bx-show', 'bx-hide');
    }
}
