//DOM variables
//top section 
const inventory = document.getElementById('apple-inventory');//top section of the page 
const numOfApplesHTML = document.getElementById('apple-info');//apple count
const workersHTML = document.getElementById("apple-workers");//apple workers
const appleRateHTML = document.getElementById('daily-apples');//apple daily gain
const appleRateLossHTML = document.getElementById('daily-loss')//apple dalily loss

//middle section 
const transferText = document.getElementById('transfer-text');

//bottom section 


//buttons 
const transToBagsBtn = document.getElementById('transfer-to-trashbag');



//variables
let apples = 0;
let totalApples = 0;
let workers = 2;
let dailyCollection = workers * 2;
let dailyLoss = 0;
let backpackApples = 0;
let trashbagApples = 0;
let trashbags = 0;
let forestBags = 0;
let shedBags = 0;
let appleBombers = 1;
let appleSoldiers = 2;
let minApples = 0;
let successChance = 0;
let backPackstorageSize = 60;
let trashBagStorageSize = 200;

//houses to apple
const houseToApple = [
    {
        name: "Wilkin House",
        minApples: 500
    }, 
    {
        name: "AirTime Thrills",
        minApples: 250

    }, 
    {
        name: "Random House Party",
        minApples: 25
    },
    {
       name:  "Wiki HQ",
       minApples: 2000
    }
];

//main ticker 
function ticker() {
    if(apples < backPackstorageSize) {
    apples += dailyCollection;
    backpackApples = apples;
    }
    apples -= dailyLoss;

    totalApples += dailyCollection;
    //update HTML elements
    updateInventory();
    updateTransfer();
}

function textTicker() {
    updateInventory();
    updateTransfer();
}


//update top portion of HTML
function updateInventory() {
    inventory.innerHTML = `
        <h2><strong>Apples</strong></h2>
        <p class="apple-info"><strong>Apple Count:</strong> ${totalApples}</p>
        <p id="apple-workers"><strong>Workers:</strong> ${workers}</p>
        <p class="daily-apples"><strong>Daily Collection:</strong> ${dailyCollection} Apples</p>
        <p class="daily-loss"><strong>Daily Loss:</strong> ${dailyLoss} Apples</p>
    `;
}

//update numeric portion of transfer page
function updateTransfer() {
    transferText.innerHTML = `
        <p><strong>Apples in Backpacks:</strong> ${backpackApples}/60</p>
        <p><strong>Apples in Trashbags:</strong> ${trashbagApples}/200</p>
        <p><strong>Number of Trashbags:</strong> ${trashbags}</p>
        <p><strong>Trashbags in Forests: </strong> 0</p>
        <p><strong>Trashbags in Sheds</strong> 0</p>
    `;
}

function transferToBag() {
    //take apples from the backpack number 
    //put backpack apples into trashbag 
    if(trashbagApples < trashBagStorageSize) {
    trashbagApples += backpackApples;
    apples -= backpackApples;
    }

    if(trashbagApples >= trashBagStorageSize) {
        trashbags++;
        trashbagApples -= 200;
    }
}

//transfer apples from backpacks to trashbags
transToBagsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    transferToBag();
});

window.setInterval(ticker, 100);//1sec tick 
window.setInterval(textTicker, 1);


