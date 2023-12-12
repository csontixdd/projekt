const container=document.querySelector(".container")
container.innerHTML=""
for(let i=1;i<15;i++){
    container.innerHTML=`<div class="box" id="${i}">${i}</div>`
}