const container = document.querySelector(".container");
const btnWinner = document.querySelector("#btn-winner");
const popupContainer = document.querySelector(".popup-container");
const bgSound = document.querySelector("#bg-song");
const matchSound = document.querySelector("#match-sound");
bgSound.volume = 0.1;
const listes = [
    {
        name:"naruto",
        src:"images/naruto.png"
    },
    {
        name:"sasuke",
        src:"images/sasuke.png"
    },
    {
        name:"sakura",
        src:"images/sakura.png"
    },
    {
        name:"kakashi",
        src:"images/kakashi.png"
    },
    {
        name:"shikamaru",
        src:"images/shikamaru.png"
    },
    {
        name:"jiraya",
        src:"images/jiraya.png"
    },
    {
        name:"gaara",
        src:"images/gaara.png"
    },
    {
        name:"tsunade",
        src:"images/tsunade.png"
    },  
];

const listeDouble = listes.reduce((prev,current)=> [...prev,current,current]
,[]);
let activeCard = null;
let openedCard = [];

//Sort to random list
listeDouble.sort(() => 0.5 - Math.random());

listeDouble.map(key => {
    container.innerHTML += `
    <div class="card">
    <div class="content"  data-content=${key.name}>
        <audio class="card-sound" src="audios/card.mp3"></audio>
        <div class="back">
            <img src="images/shuriken.png"></img>
        </div>
        <div class="front">
            <img src=${key.src}></img>
        </div>
    </div>
    </div>
    `
})


btnWinner.addEventListener("click",()=>{
    reStart();
})

const cards = [...document.querySelectorAll(".content")];
cards.map(el => {
    el.parentElement.addEventListener("click",()=>{
        el.parentElement.querySelector(".card-sound").play();
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
            //match
            if(card.dataset.content === activeCard.dataset.content){
                openedCard.push(card,activeCard);

                setTimeout(()=>{
                    matchSound.play();
                },1000)
                match(card);
                match(activeCard)

                if(openedCard.length === listeDouble.length ){
                    win();
                    cards.map(el =>{
                        match(el);
                    })
                }
            }
            else{
                await returnCardBackWithDelay(card,activeCard);
            }
            activeCard = null;
        }
    }
}

const match = (card) => {
    card.querySelector(".front").style.backgroundColor = "rgb(255, 208, 108)";
    setTimeout(()=>{
        card.querySelector(".front").style.backgroundColor = "white";
    },1000)
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

function win(){
    setTimeout(()=>{
        document.querySelector(".game").classList.add("blur-filter");
        popupContainer.classList.remove("hidden");
    },2000)
}

function reStart(){
    document.querySelector(".game").classList.remove("blur-filter");
    popupContainer.classList.add("hidden");

    activeCard = null;
    openedCard = [];

    cards.map(el => {
        el.classList.remove("active");
    })
    
    setTimeout(()=>{
        listeDouble.sort(() => 0.5 - Math.random());
        for(let i = 0;i<cards.length;i++){
            cards[i].dataset.content = listeDouble[i].name;
            cards[i].querySelector(".front img").src = `${listeDouble[i].src}`;
        }
    },500)
}
