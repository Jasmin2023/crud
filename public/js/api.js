const baseurl = 'https://reqres.in/api/';

///////////////////////////////////////////////////////
//new
export async function getUserList() {
    // Your getUserList function logic here
    const userList = [];
    const url = baseurl + 'users?page=';
    const response = await fetch(url + 1);
    const data = await response.json();
    const totalNumberOfPages = data.total_pages;

    for (let id = 1; id <= totalNumberOfPages; id++) {
        const response = await fetch(url + id);
        const result = await response.json();
        result.data.forEach((element) => {
          userList.push(element);
           
        });
    }
    const result = $('#table_id').DataTable({
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
                    return " <button class='profileButton btn btn-secondary' data-id="+ data +">View Profile</button>";
                }
            },   
        ]
      }); 
    return result;
}
///////////////////////////////////////////////////////
//new
export async function addUser(newUser, userList) {
    const url = baseurl + 'users';
    try {
        const url = baseurl + 'users';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        if(response.ok){
            const addedUser = await response.json();
            userList.push(addedUser);
            return userList;
        } else {
            // Handle the case when the request fails
            throw new Error('Failed to add user');
        }
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error adding user:', error);
        return userList; // Return the original userList in case of error
    }
}
///////////////////////////////////////////////////////
//new
export async function fetchUser(userId) {
    // Your fetchUser function logic here
    const para = 'users/';
    const url = baseurl + para + userId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
///////////////////////////////////////////////////////
//new
export async function fetchColor(userId) {
    // Your fetchProfileColor function logic here
    const para = 'unknown/';
    const url = baseurl + para + userId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
///////////////////////////////////////////////////////
//new
export async function deleteUser(userId) {
    // Your deleteUser function logic here
}
///////////////////////////////////////////////////////
//new
export function updateProfile(id){
    const para = 'users/'+id;
    const url = baseurl + para;
    fetch(url, {
        method: 'PATCH',
        headers: {
         'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            first_name: document.getElementById('updated-fname').value,
            job: document.getElementById('updated-Job').value
        })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('updated-at').innerHTML = data.updatedAt;
            document.getElementById('updated-fname').value = data.first_name;
            document.getElementById('updated-Job').value = data.job;   
    })
}
///////////////////////////////////////////////////////
//new
export function updateColor() {
     
}