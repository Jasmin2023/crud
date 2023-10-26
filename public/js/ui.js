// ui.js

///////////////////////////////////////////////////////
//new
export function updateColor() {
    // Your updateColor function logic here
    const colorValue = document.getElementById('colorValue').value;
    document.getElementById('colorTitle').style.color =  colorValue;
}

///////////////////////////////////////////////////////
//new
export function goBack() {
    // Your goBack function logic here
    const crudAllUsers = document.querySelector(".crudAllUsers");
    const profileTableContainer = document.querySelector(".profileTableContainer");
    const profileTheme = document.querySelector(".profileTheme");

    crudAllUsers.style.display = "block";
    profileTableContainer.style.display = "none";
    profileTheme.style.display = "none";
}
 
///////////////////////////////////////////////////////
//new
export function createProfile(profile) {
    const profileTable = document.getElementById("profileTable");
    profileTable.innerHTML = `
        <table class="table" id="profile-table" width="100%">
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
                <td><input class="updateButton" type="text" id="updated-Job" value="${profile.job}"></td>
            </tr>
        </table>
        <button id="updateButton" class="btn btn-secondary">UPDATE</button>
    `
}
 
///////////////////////////////////////////////////////
//new
export function createColor(data) {
    // Your createColor function logic here
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
                <td><input class="form-control" type="text" id="colorValue" value="${data.color}"> </td>
                <td>${data.pantone_value}</td>
            </tr>
        </table>
        <button class="btn btn-secondary" onclick="back()">BACK</button>
    `;
}

///////////////////////////////////////////////////////
//new
export function loadData() {
    // Your loadData function logic here
}