const formLogin = document.getElementById("formLogin");
const emailEle = document.getElementById("email");
const passEle = document.getElementById("pass");
const alertErr = document.getElementById("alertErr");
const passInput = document.getElementById("pass");
const togglePass = document.getElementById("togglePass");

alertErr.style.display = "none";

togglePass.addEventListener("click", function () {
  const isPassword = passInput.type === "password";
  passInput.type = isPassword ? "text" : "password";
  togglePass.classList.toggle("bxs-hide", !isPassword);
  togglePass.classList.toggle("bxs-show", isPassword);
});

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const findUser = users.find(user =>
    user.email === emailEle.value.trim() &&
    user.password === passEle.value.trim()
  );

  if (!findUser) {
    alertErr.style.display = "block";  // hiển thị lỗi
  } else {
    alertErr.style.display = "none";   // ẩn nếu trước đó có lỗi
    localStorage.setItem("loggedInUser", JSON.stringify(findUser.name));
    window.location.href = 'home.html';
  }
});
