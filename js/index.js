document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("#github-form")

form.addEventListener("submit", fetchUserOrRepo)

function fetchUserOrRepo(e) {
    e.preventDefault()
    const userName = e.target.search.value
    
    fetch(`https://api.github.com/search/users?q=${userName}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }})
    .then((response) => response.json())
    .then((data) => materializeUsers(data.items))
}

const userUl = document.getElementById("user-list")

function materializeUsers(users) {

    for(let user of users) {
        let userLi = document.createElement("li")
        let userName = document.createElement("h2")
        let userImg = document.createElement("img")
        userImg.id = "userImage"

        let aTag = document.createElement("a")
        aTag.href = user.html_url
        aTag.innerHTML = "Profile!"

        userName.textContent = user.login

        userName.addEventListener("click",() => fetchRepos(user.login))

        userImg.src = user.avatar_url
        userLi.append(userName, userImg)
        userUl.append(userLi, aTag)

        
    }
}

function fetchRepos(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }})
    .then((response) => response.json())
    .then((data) => materializeRepos(data))
}

function materializeRepos(repos) {
    let repoList = document.getElementById("repos-list")

    for(let repo of repos) {
        count = repo.length
        let repoLi = document.createElement("li")
        repoLi.textContent = `Repo #${count}: ${repo.name}`
        repoList.append(repoLi)
    }
}

const dropDown = document.getElementById("searchFor")

dropDown.addEventListener("change", function(e) {
    console.log(e.target.value)
})

//Will have to use interpolation on 
//"https://api.github.com/users/octocat/repos"

//replace "octoca" with the path to the username with interpolation


})