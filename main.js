/* 
    Необходимо найти FREE REST API в просторах интернета. 

    Пускай эта FREE REST API сможет дать вам полный CRUD (Create, Read, Update, Delete)

    При проверке домашнего задания наставник должен иметь возможность увидеть список
    полученных данных с сервера на html странице.
    
    Так же с нее он должен иметь возможность удалить запись, создать новую,
    или же обновить запись.
*/

const requestUrl = 'https://reqres.in/api/users?page=2';
const usersWrapper = document.getElementById('users-wrapper');
let users = [];
let btnDelete;
const btnCreate = document.getElementById('btn-create');
const btnUpdate =document.getElementById('btn-update');

/* Get User*/

const createTemplate = data => {
    return template = `
    <div class = "wrapper-users" data-id="${data.id}">
        <div class = "id">ID: ${data.id}</div>
        <div class = "email">EMAIL: ${data.email}</div>
        <div class = "first-name">FIRST_NAME: ${data.first_name}</div>
        <div class = "last-name">LAST_NAME: ${data.last_name}</div>
        <div class = "avatar">AVATAR: ${data.avatar}</div>
        <button class = "btn-delete">Delete User</button>
    </div>
    `
}

const getUsers = url =>{
    fetch(url)
        .then(response => response.json())
        .then(json =>{
            users = json;
            let data = users.data;
            console.log(data);
            if(data) {
                data.filter(item => {
                    return item.id >=7 && item.id <=9
                }).forEach(user =>{
                    usersWrapper.innerHTML += createTemplate(user)
                })
                btnDelete = document.querySelectorAll('.btn-delete');
                //console.log(btnDelete);
            }
        })
        .then(() =>{
            for(let elem of btnDelete){
                elem.addEventListener('click', e =>{
                   let  idElem = e.target.parentNode.dataset.id;
                   deleteUser(requestUrl, idElem);
                })
            }
        })
}

getUsers(requestUrl);

/* Delete User*/

const deleteUser = (url) => {
    fetch(url, {
        method: 'DELETE'
    })
}

/* Create User*/

const createUser = (body, successResponse) => {
    const xhr = new XMLHttpRequest();
    const url = 'https://reqres.in/api/users';

    xhr.open('POST', url);

    xhr.addEventListener('load', () => {
        successResponse(JSON.parse(xhr.response));
    })

    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.send(JSON.stringify(body));
}

const succsesRequired = response => {
    console.log(response);
}

btnCreate.addEventListener('click', () => {
    const inputName = document.getElementById('user-name').value,
          inputJob = document.getElementById('user-job').value

    const newUser = {
        userName: inputName,
        userJob: inputJob
    }
    createUser(newUser, succsesRequired);
})

/* Update User*/

const updateUser = (body, successResponse) => {
    const xhr = new XMLHttpRequest();
    const url = 'https://reqres.in/api/users/2';

    xhr.open('PUT', url);

    xhr.addEventListener('load', () => {
        successResponse(JSON.parse(xhr.response));
    })

    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.send(JSON.stringify(body));
}

const succsesRequiredForUpdate = response => {
    console.log(response);
}

btnUpdate.addEventListener('click', () => {
    const inputNameUpdate = document.getElementById('user-name-update').value,
          inputJobUpdate = document.getElementById('user-job-update').value

    const newUser = {
        userNameUpdate: inputNameUpdate,
        userJobUpdate: inputJobUpdate
    }
    updateUser(newUser, succsesRequiredForUpdate);
})
