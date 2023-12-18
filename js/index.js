let userList = document.getElementById('user-list');
let repoList = document.getElementById('repos-list');

document.addEventListener('DOMContentLoaded', () => {
    formSubmit();
})

function formSubmit(){
    let form = document.getElementById('github-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        userData();
        form.reset();
    })
}

function userData(user){
    fetch(`https://api.github.com/search/users?q=${user}`)
    .then(res => res.json())
    .then(users => {
        for(let i = 0; i < users.items.length; i++){
            const userName = document.createElement('a') 
            userName.id = 'username'
            const avatar = document.createElement('img')
            const li = document.createElement('li')
                
            userName.textContent = `${users.items[i].login}`
            avatar.src = `${users.items[i].avatar_url}`
            userList.appendChild(li)
            li.appendChild(userName)
            li.appendChild(avatar)
        }
    })

    userList.addEventListener('click', (user) => {
        repoInfo(user);
    })
}

function repoInfo(user){
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(repos => {
        for(let item in repos){
            userRepos = repos[item].name;
            let reposLi = document.createElement('li');
            reposLi.textContent = userRepos;
            repoList.appendChild(reposLi);
        }
    })
}
