//window.localStorage.getItem("token");
import * as auth from './auth.js';
import * as api from './api.js';
import * as ui from './ui.js';

document.addEventListener("DOMContentLoaded", async function() {
  
  const loginForm = document.getElementById("loginForm");
  const loginFormSection = document.querySelector(".loginFormSection");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageDiv = document.getElementById("message");
  const logoutLink = document.getElementById("logoutLink");
  const storedEmail = localStorage.getItem("email");
  const pageHeader = document.querySelector(".pageHeader");
  const loggedIn = document.querySelector(".loggedIn");
  const token = auth.checkToken();
  const users = await api.getUserList();
  ///////////////////////////////////////////////////////
  //new   
  if (token) {
    // If a token exists, show the logout link and hide the login form
    loginFormSection.style.display = "none";
    messageDiv.style.display = "block";
    messageDiv.textContent = "Hello, " + storedEmail;
    logoutLink.style.display = "block";
    pageHeader.style.display = "block";
    loggedIn.style.display = "block";
  } else {
    loginFormSection.style.display = "block";
    loggedIn.style.display = "none";
    pageHeader.style.display = "none";
  }

  if (storedEmail) {
    emailInput.value = storedEmail;
  }  
  $('#table_id').DataTable({
    paging: true,
    searching: true,
    data: users,
    "bDestroy": true,
    "columns":[  
        {data: "id"},  
        {data: "first_name"},  
        {data: "last_name"}, 
        {
            data: "id",
            render: function(data){
                return " <button class='profileButton btn btn-secondary' data-id="+ data +">View Profile</button>";
            }
        },   
    ]
  }); 
  
  ///////////////////////////////////////////////////////
  //new
  document.getElementById('table_id').addEventListener('click', async function(event) {
      if(event.target && event.target.classList.contains('profileButton')) {
          const userId = event.target.getAttribute('data-id');
          await userProfile(userId);
      }
  });

  ///////////////////////////////////////////////////////
  auth.handleLoginForm(loginForm, messageDiv, loginFormSection, loggedIn, pageHeader, logoutLink, emailInput, passwordInput);
  ///////////////////////////////////////////////////////
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    auth.removeTokenAndEmail();
    logoutLink.style.display = "none";
    messageDiv.style.display = "none";
    loginFormSection.style.display = "block";
    pageHeader.style.display = "none";
    loggedIn.style.display = "none";
  });
});
///////////////////////////////////////////////////////
document.getElementById("add-user-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const firstName = document.getElementById("user_first_name").value;
  const lastName = document.getElementById("user_last_name").value;

  const newUser = { first_name: firstName, last_name: lastName };
  let userList = await api.getUserList();
  userList = await api.addUser(newUser, userList.concat(userList)); // Concatenate the existing user list with the new user

  // Refresh the user list after adding the new user
  refreshUserList(userList);
});
async function refreshUserList(userList) {
  const table = $('#table_id').DataTable();
  table.clear(); // Clear the existing data in the table

  // Add each user to the table
  userList.forEach(user => {
    table.row.add({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name
    });
  });

  table.draw(); // Redraw the table with the updated data
}
///////////////////////////////////////////////////////
//new     
async function userProfile(userId) {
  const user = await api.fetchUser(userId);
  //console.log(user);
  ui.createProfile(user);
  const color = await api.fetchColor(userId);
  console.log(color);
  ui.createColor(color);
  if(color) {
    const colorValue = document.getElementById('colorValue').value;

    //console.log(colorValue)
  }

  if(user) {
    const updateBtn = document.getElementById("updateButton");
    updateBtn.addEventListener("click", () => {
      api.updateProfile(user.id);
    })
  } else {
    console.log('User not found');
  }
}
 


 
   