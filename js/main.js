document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById('search-icon');
    const searchBox = document.querySelector('.search-box');
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");
    const loginBtn = document.querySelector(".login-btn");
    const welcomeMessage = document.getElementById("welcome-message");
    const userNameSpan = document.getElementById("user-name");

    searchIcon.onclick = () => {
        searchBox.classList.toggle('active');
    };

    menuIcon.onclick = () => {
        navbar.classList.toggle("active");
    };

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        loginBtn.style.display = "none";
        welcomeMessage.classList.remove("d-none");
        userNameSpan.textContent = JSON.parse(loggedInUser);
    }
});
