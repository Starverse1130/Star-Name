var h1 = document.querySelector('h1')
var Name = document.querySelector('#name')
// var btn = document.querySelector('#btn')
// var card = document.querySelector('.card')
// // console.log(Name)

btn.addEventListener('click',function(){
    h1.innerHTML = `Welcome ` + Name.value
})


