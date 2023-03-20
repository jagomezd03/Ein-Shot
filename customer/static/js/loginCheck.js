const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')

export const loginCheck = user => {
  if(user){
    loggedOutLinks.forEach(link => link.style.display = 'none')
    loggedInLinks.forEach(link => link.style.display = 'block')
  }else{
    loggedOutLinks.forEach(link => link.style.display = 'block')
    loggedInLinks.forEach(link => link.style.display = 'none')
  }
}