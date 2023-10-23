console.log("123");
//window.localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function() { 

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageDiv = document.getElementById("message");
    const logoutLink = document.getElementById("logoutLink");
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const crudAllUsers = document.querySelector(".crudAllUsers");
    const pageHeader = document.querySelector(".pageHeader");
    const profileTable = document.getElementById("profileTable");
    
    if (token) {
      // If a token exists, show the logout link and hide the login form
      loginForm.style.display = "none";
      messageDiv.style.display = "block";
      messageDiv.textContent = "Hello, " + storedEmail;
      logoutLink.style.display = "block";
      crudAllUsers.style.display = "block";
      pageHeader.style.display = "block";
    } else {
      loginForm.style.display = "block";
      crudAllUsers.style.display = "none";
      pageHeader.style.display = "none";
    }
    if (storedEmail) {
      emailInput.value = storedEmail;
    }
    loginForm.addEventListener("submit", function(e){
      e.preventDefault();
      const emailVal = emailInput.value;
      const passwordVal = passwordInput.value;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://reqres.in/api/login", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if(response.token){
              localStorage.setItem("token", response.token);
              // Store the email in localStorage
              localStorage.setItem("email", emailVal);
              // Display greeting message
              messageDiv.style.display = "block";
              messageDiv.textContent = "Hello, " + emailVal;
              loginForm.style.display = "none";
              logoutLink.style.display = "block";
              crudAllUsers.style.display = "block";
              pageHeader.style.display = "block";
            } else {
              // Authentication failed
              messageDiv.textContent = "Authentication failed. Please try again.";
              messageDiv.style.display = "block";
              crudAllUsers.style.display = "none";
              pageHeader.style.display = "none";
            }
          }
        } else {
          // AJAX request failed
          messageDiv.textContent = "Error occurred while logging in. Please try again later.";
          messageDiv.style.display = "block";
        }
      }
      const data = JSON.stringify({email: emailVal, password: passwordVal});
      
      xhr.send(data);
    });

    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      logoutLink.style.display = "none";
      messageDiv.style.display = "none";
      loginForm.style.display = "block";
      crudAllUsers.style.display = "none";
      pageHeader.style.display = "none";
    });
     // login form end
     
  });
  const baseurl = 'https://reqres.in/api/';
  var userList = [];
  let totalNumberOfPages = 0;
  function deleteUser() {
    console.log("color")
  }
  function profileColor(userId) {
    const para = 'unknown/';
    const url = baseurl + para + userId;
    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const profileTheme = data.data;
        createColor(profileTheme)

      });
  }
  function changeColorFunction() {
    const colorValue = document.getElementById('colorValue').value;
    document.getElementById('colorTitle').style.color =  colorValue;
  }
  function back() {
    //const crudAllUsers = document.querySelector(".crudAllUsers");
    //const profileTableContainer = document.querySelector(".profileTableContainer");
    //const profileTheme = document.querySelector(".profileTheme");

    //crudAllUsers.style.display = "block";
    //profileTableContainer.style.display = "none";
    //profileTheme.style.display = "none";

  } 
  function createColor(data) {
    const profileTheme = document.querySelector(".profileTheme");
    profileTheme.innerHTML = `
      <h3 class="title" id="colorTitle" style="color:${data.color}">My Color</h3>
      <table class="table" width="100%">
          <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Year</th>
              <th>Color</th>
              <th>Pantone value</th>
          </tr>
          <tr>
              <td>${data.id}</td>
              <td>${data.name}</td>
              <td>${data.year}</td>
              <td><input class="form-control" type="text" id="colorValue" oninput="changeColorFunction()" value="${data.color}"> </td>
              <td>${data.pantone_value}</td>
          </tr>
      </table>
    `
  }
  function updateProfile(userId) {
    const para = 'users/';
    const url = baseurl + para + userId;
    fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        first_name: document.getElementById('updated-fname').value,
        job: document.getElementById('updated-Job').value
    })
    }).then(response => response.json())
      .then(data => {
         
        document.getElementById('updated-at').innerHTML = data.updatedAt;
        document.getElementById('updated-fname').value = data.first_name;
        document.getElementById('updated-Job').value = data.job;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function userProfile(userId) {
    //profileTableContainer, .profileTheme
    const profileTableContainer = document.querySelector(".profileTableContainer");
    const profileTheme = document.querySelector(".profileTheme");
    const add_user = document.getElementById("add_user");
    //const table_id = document.getElementById("table_id_wrapper");
    //table_id.style.display = "none";
    const crudAllUsers = document.querySelector(".crudAllUsers");
    //crudAllUsers.style.display = "none";
    //add_user.style.display = "none";
    profileTableContainer.classList.add("active");
    profileTheme.classList.add("active");
    const para = 'users/';
    const url = baseurl + para + userId;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const profile = data.data;
        profileTable.innerHTML = `
        <table class="table" width="100%">
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Last Updated</th>
                        <th>Job</th>
                    </tr>
                    <tr>
                        <td>${profile.id}</td>
                        <td><input class="form-control" type="text" id="updated-fname" value="${profile.first_name}"> </td>
                        <td>${profile.last_name}</td>
                        <td>${profile.email}</td>
                        <td><img width="40" src="${profile.avatar}"></td>
                        <td id="updated-at">${profile.updatedAt}</td>
                        <td><input class="form-control" type="text" id="updated-Job" value="${profile.job}"></td>
                    </tr>
                </table>
                <div class="back-btn-container col-xs-12 text-center">
                    <button class="btn btn-secondary" onclick="updateProfile(${profile.id})">UPDATE</button>
                   
                </div>
        `
      })
  }
  function loadData() {
      const para = 'users?page=';
      const url = baseurl + para;
      fetch(url + 1).then(res => res.json()).then(res => {
        totalNumberOfPages = res.total_pages;
        for(let id = 1; id <= totalNumberOfPages; id++){
          fetch(url + id).then(response => response.json()).then(response => {
            response.data.forEach(element => {
              userList.push(element);
            });
            $('#table_id').DataTable({
                paging: true,
                searching: true,
                data: userList,
                "bDestroy": true,
                "columns":[  
                    {data: "id"},  
                    {data: "first_name"},  
                    {data: "last_name"}, 
                    {
                        data: "id",
                        render: function(data){
                            return " <button class='btn btn-secondary' data-id="+ data +" onclick='profileColor("+ data +");userProfile("+ data +");'>Update</button><button class='btn btn-danger' data-id=" + data + " onclick='deleteUser("+ data +")'>Delete</button>";
                        }
                    },   
               ]
            }); 
          });
        }
      })
  }
  
  loadData();
  //function addNewUser(first, last) {
  //  const url = 'https://reqres.in/api/users';
  //  const data = {
  //    first_name: firstName,
  //    last_name: lastName,
  //  };

  //}