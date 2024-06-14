//DOM variables
//top section 
const inventory = document.getElementById('apple-inventory');//top section of the page 
const numOfApplesHTML = document.getElementById('apple-info');//apple count
const workersHTML = document.getElementById("apple-workers");//apple workers
const appleRateHTML = document.getElementById('daily-apples');//apple daily gain
const appleRateLossHTML = document.getElementById('daily-loss')//apple dalily loss

//middle section 
const transferText = document.getElementById('transfer-text');//text for mid section of page
const transferWarningText = document.getElementById('transfer-warning');//warning if transfer does not complete
const moveBagWarningText = document.getElementById('move-bag-warning')//warning if moving apples does not work
const bagpackFullWarningText = document.getElementById('bag-full-warning')//warning if bag is full 

//bottom section 


//market
const rateText = document.getElementById('market-rate');//number for apple cost
const blackMarketText = document.getElementById('black-market');//entire section 

//buttons 
const transToBagsBtn = document.getElementById('transfer-to-trashbag');
const moveTrashbagsToForest = document.getElementById('store-to-forest');
const moveTrashbagsToShed = document.getElementById('store-to-shed');


//variables
let apples = 0;
let money = 0;
let trashbags = 0;

let workers = 2;
let dailyCollection = workers * 2;

let backpackApples = 0;
let trashbagApples = 0;
let forestBags = 0;
let shedBags = 0;
let appleBombers = 1;
let appleSoldiers = 2;
let minApples = 0;
let successChance = 0;
let backPackstorageSize = 60;
let trashBagStorageSize = 200;
let maxTrashbags = 2;
let sellAppleRate = appleBlackMarketRate();
let dailyLoss = forestBags * 30 + shedBags * 8;
let totalApples = apples + trashbags * 200;


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
    } else {
        bagpackFullWarningText.innerText = "Pierre's Backpack is filled to the brim with apples!";
    }
    apples -= dailyLoss;

   // totalApples += dailyCollection;
    //update HTML elements
    updateInventory();
    updateTransfer();
    
    
}

function textTicker() {
    updateBlackMarket();
}


//update top portion of HTML
function updateInventory() {
    inventory.innerHTML = `
        <h2><strong>Apples</strong></h2>
        <p class="apple-info"><strong>Current Apple Count:</strong> ${apples}</p>
        <p id="total-apples"><strong>Total Apples:</strong> ${totalApples}</p>
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
        <p><strong>Number of Trashbags:</strong> ${trashbags}/2</p>
        <p><strong>Trashbags in Forests: </strong> ${forestBags}</p>
        <p><strong>Trashbags in Sheds</strong> ${shedBags}</p>
    `;
}

function updateBlackMarket() {
    sellAppleRate = appleBlackMarketRate().toFixed(2);
    blackMarketText.innerHTML = `
    
    <h2>Black Market: Sell Apples for Cash</h2>
    <p><strong>Apple Rate:</strong> $${sellAppleRate} per apple</p>
    `;
}


//takes apples from backpacks into the trashbags
function transferToBag() {
    //take apples from the backpack number 
    //put backpack apples into trashbag 
    if(backpackApples >= 0) {

        if(trashbagApples < trashBagStorageSize) {
        trashbagApples += backpackApples;
        apples -= backpackApples;
        }

        if(trashbagApples >= trashBagStorageSize) {
            if(trashbags < maxTrashbags) {
            trashbags++;
            trashbagApples -= 200;
            } else {
                moveBagWarningText.innerText = "There is not enough room for another trashbag, move bags offsite!";
            }
        } 
    } 
}//transferToBag

//takes apples from trashbags into either the forest or sheds 
function moveTrashbags(destination) {
    if(destination === "forest") {
        forestBags++;
        trashbags--;
    } else if(destination === "shed") {
        shedBags++;
        trashbags--;
    }

}//moveTrashbags





//transfer apples from backpacks to trashbags
transToBagsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    transferWarningText.innerText = "";

    if(backpackApples >= 0 || backpackApples >= '0') {
        transferToBag();
        
    } else {
        transferWarningText.innerText = "There are not enough apples to transfer! Wait for backpack apples to be replenished.";
    }
});
//move appples to frest button
moveTrashbagsToForest.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(trashbags > 0) {
        moveTrashbags("forest");
   
    } else {
        transferWarningText.innerText = "There are no trashbags to move!"
    }
        
    
});
//move apples to shed button
moveTrashbagsToShed.addEventListener('click', (e) => {
    e.preventDefault();
  
    if(trashbags > 0) {
        moveTrashbags("shed");
      
    } else {
        transferWarningText.innerText = "There are no trashbags to move!"
    }
        
    
});







//black market apples
function appleBlackMarketRate() {
    return Math.random() * (1.5-0.2);
}   


window.setInterval(ticker, 25);//1sec tick 
window.setInterval(textTicker, 10000);

