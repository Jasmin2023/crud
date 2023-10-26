export function checkToken() {
    return localStorage.getItem("token");
  }
  
  export function storeToken(token) {
    localStorage.setItem("token", token);
  }
  
  export function storeEmail(email) {
    localStorage.setItem("email", email);
  }
  
  export function removeTokenAndEmail() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }
  
  export function handleLoginForm(loginForm, messageDiv, loginFormSection, loggedIn, pageHeader, logoutLink, emailInput, passwordInput) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const emailVal = emailInput.value;
    const passwordVal = passwordInput.value;
    if (emailVal === "eve.holt@reqres.in" && passwordVal === "cityslicka") {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://reqres.in/api/login", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.token) {
              storeToken("token", response.token);
              storeEmail("email", emailVal);
              messageDiv.style.display = "block";
              messageDiv.textContent = "Hello, " + emailVal;
              loginForm.style.display = "none";
              logoutLink.style.display = "block";
              loggedIn.style.display = "block";
              loginFormSection.style.display = "none";
              pageHeader.style.display = "block";
            } else {
              // Authentication failed
              messageDiv.textContent = "Authentication failed. Please try again.";
              loginFormSection.style.display = "block";
              messageDiv.style.display = "block";
              loggedIn.style.display = "none";
              pageHeader.style.display = "none";
            }
          }
        } else {
          // AJAX request failed
          messageDiv.textContent = "Error occurred while logging in. Please try again later.";
          messageDiv.style.display = "block";
        }
      };
      const data = JSON.stringify({ email: emailVal, password: passwordVal });
      xhr.send(data);
    }
  });
}