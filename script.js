const container = document.querySelector(".container");
const listes = [0,1,2,3,4,5];
const listeDouble = listes.reduce((prev,current)=> [...prev,current,current]
,[]);
let activeCard = null;
let openedCard = [];

//Sort to random list
listeDouble.sort(() => 0.5 - Math.random());

listeDouble.map(key => {
    container.innerHTML += `
    <div class="card">
    <div class="content"  data-content=${key}>
        <div class="back"></div>
        <div class="front">${key}</div>
    </div>
    </div>
    `
})

const cards = [...document.querySelectorAll(".content")];
cards.map(el => {
    el.parentElement.addEventListener("click",()=>{
        returnCard(el);
    })
})

async function returnCard(card){
    if(activeCard !== card && !openedCard.includes(card)){
        card.classList.add("active")
        if(activeCard === null || activeCard === card){
            activeCard = card;
        }
        else{
            stopEvent();
            if(card.dataset.content === activeCard.dataset.content){
                openedCard.push(card,activeCard);
            }
            else{
                await returnCardBackWithDelay(card,activeCard);
            }
            activeCard = null;
        }
    }
}

const returnCardBackWithDelay = (card,activeCard) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            card.classList.remove("active");
            activeCard.classList.remove("active");
            resolve();
        },1000);
    })
}

function stopEvent(){
    container.classList.add('no-event');
    setTimeout(()=>{
        container.classList.remove("no-event");
    },1000);
}

function randomInt(max,min=0){
    return Math.round( Math.random() * max - min);
}
