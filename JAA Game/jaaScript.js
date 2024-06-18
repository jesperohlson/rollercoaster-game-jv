//TODO work on combat shit and total apple and total collection variables 
//figure out local storage shit too 
//be able to upgrade how many apples sheds can cost and backpacks and shit
//add ability to automically create trash bags with purchase 
//random shed destruction 


//style.display to change css from html 
//confirm()
/*

const startGame = () => {
  canvas.style.display = 'block';
  startScreen.style.display = 'none';
}
*/

//DOM variables
//top section 
const inventory = document.getElementById('apple-inventory');//top section of the page 
const numOfApplesHTML = document.getElementById('apple-info');//apple count
const workersHTML = document.getElementById("apple-workers");//apple workers
const appleRateHTML = document.getElementById('daily-apples');//apple daily gain
const appleRateLossHTML = document.getElementById('daily-loss')//apple dalily loss
const scenario = document.getElementById('scenario');//text at the very top of the page 
const buyVehicleBtn = document.getElementById('upgrade-vehicle');//button to upgrade vehicle to hold more trashbags 
const upgradeWarningText = document.getElementById('buy-vehicle-warning');//warning text for vehicle purchase
const tutorialInformation = document.getElementById('tutorial');

//middle section 
const transferText = document.getElementById('transfer-text');//text for mid section of page
const transferWarningText = document.getElementById('transfer-warning');//warning if transfer does not complete
const moveBagWarningText = document.getElementById('move-bag-warning')//warning if moving apples does not work
const bagpackFullWarningText = document.getElementById('bag-full-warning')//warning if bag is full 
const transferInformaton = document.getElementById('transfer-info');//transfer info text
const buyShedWarningText = document.getElementById('buy-shed-warning');//shed warning text
const offsiteMovementWarningText = document.getElementById('apple-loss-warning');//moving trashbags warning text


//bottom section 

//command section 
const shedWarningText = document.getElementById('shed-loss');
const recoveredApplesText = document.getElementById('recovered-apples');
const warTimeApplesText = document.getElementById('war-apples');
//command section buttons
const forestAppleRecoverBtn = document.getElementById('recover-forest');
const shedAppleRecoverBtn = document.getElementById('recover-shed');



//market
const rateText = document.getElementById('market-rate');//number for apple cost
const blackMarketText = document.getElementById('black-market');//entire section 
const marketWarning = document.getElementById('market-warning');//warning text for market 
//market buttons 
const sellOne = document.getElementById('sell-1');
const sell10 = document.getElementById('sell-10');
const sell25 = document.getElementById('sell-25');
const sell100 = document.getElementById('sell-100');


//buttons 
const transToBagsBtn = document.getElementById('transfer-to-trashbag');//move apples from backpack to trashbags
const moveTrashbagsToForest = document.getElementById('store-to-forest');//move apples to forest button
const moveTrashbagsToShed = document.getElementById('store-to-shed');//move apples to shed button
const buyShedBtn = document.getElementById('buy-shed');//button to buy another shed 
const tutorialButton = document.getElementById('info-btn');



//user game variables 
let apples = 0;
let money = 0;
let trashbags = 0;
let workers = 2;

//shed related variables
var sheds = 1
let shedCost = 1200;
let shedBags = 0;
let maxShedBags = 6;


let backpackApples = 0;
let trashbagApples = 0;
let forestBags = 0;

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

let dailyCollection = parseInt(workers) * 2;
let recoveredAppleCount = 0;
let bagRecoveredCount = 0;
let estAppleLoss = 0;//for recovery
let warApples = 0;


//arrays to keep track of bags that have been stored
//when bags are placed somewhere each bag gets a '1' pushed into array
//each '1' represents 1 trashbag/200 apples can be randomly modified 
let forestBagArr = [];
let shedBagArr = [];

//tutorial information for the user 
tutorialInformation.innerHTML =  `
    <h2><strong>LeTutorial</strong></h2>
    <p>There are many factions in this city which assert dominance by using various fruit to destroy buildings and mark their territory</p>
    <p>You and your friends steal apples from your school in order to show what the supeior fruit is<p>
    <p>Apple collection is hard though, as stealing apples is very hard to conceal, so each person can only collect two apples in a day</p>
    <h3><strong>Apple Transfer Information:</strong></h3>
    <p>Apples are automatically stored in backpacks, apples must be then discreetly transfered from the backpacks into trashbags</p>
    <p>(Trashbags will automatically be created when the trashbags are full)</p>
    <p>The trashbags must be placed in inconspicuous locations, there are two storage options available: Forests or Sheds.</p>
    <p>You will lose a random, yet very large amount of apples in the forest in most cases</p>
    <p>In comparison, very little apples will be lost in sheds because they provide beteter protection</p>
    <h3><strong>Apple Command Information</strong></h3>
    <p>To conduct an operation with your apples you will need to recover the apples that you have stored</p>
    <p>As you progress through your targets you will need to get more apples and soliders to assist you</p>

    <h3><strong>Black Market Information</strong></h3>
    <p>To get cash in this game you will need to sell trashbags of apples on the black market</p>
    <p><strong>Note:</strong> You can only sell trashbags that have not been stored</p>



`;


//way to store more trashbags at once
const vehicles = [
    {
        name: "Small SUV",
        maxBags: 6,
        cost: 5000
    },
    {
        name: "Large SUV",
        maxBags: 18, 
        cost: 15000
    },
    {
        name: "Pickup Truck",
        maxBags: 35,
        cost: 25000
    },
    {
        name: "Box truck",
        maxBags: 200,
        cost: 75000
    },
    {
        name: "Semi Truck",
        maxBags: 1000, 
        cost: 300000
    }
]
const houseToApple = [
    {
        name: "Random Party",
        minApples: 25, 
        soldiers: 1,
        bombers: 0
    },
    {
        name: "Winter Party",
        minApples: 50, 
        soldiers: 2, 
        bombers: 0
    },
    {
        name: "Super Bowl Party", 
        minApples:  100, 
        soldiers: 6, 
        bombers: 2,
    },
    {
        name: "The Milkin Compound", 
        minApples: 200, 
        solders: 6, 
        bombers: 3
    },
    {
        name: "QL's House",
        minApples: 10, 
        soldiers: 1, 
        bombers: 1
    }
];

const workerCost = {

};

function warAppleLoss() {
    if(warApples > 0) {
    warApples -= Math.floor(10 * Math.random());
    if(warApples < 0) {
        warApples = 0;
    }
    warTimeApplesText.innerHTML = `<p id="war-apples"><strong>Ammunition:</strong> ${warApples} Apples</p>`
    }
}

window.setInterval(warAppleLoss, 500);


//updates the text at the very top of the page based on how many workers ther are 
function updateScenario() {
    if(workers === 2) {
        scenario.innerText = "You and your friend start stealing apples from your school cafeteria...";
    } else if(workers > 2 && workers < 10) {
        scenario.innerText =  "Your other friends decide to help you collect apples too...";
    } else if(workers >= 10 && workers < 25) {
        scenario.innerText =  "A sizeable group has been assembled to assist with your collection...";
    } else {
        scenario.innerText = "Everybody knows about the apples";
    }
}

//main ticker ----------  move apple changes to a new function 
function ticker() {
    if(apples < backPackstorageSize) {
    apples += dailyCollection;
    backpackApples = apples;
    } else {
        bagpackFullWarningText.innerText = "Pierre's Backpack is filled to the brim with apples! Shove them into trashbags.";
    }
    apples -= dailyLoss;
    totalApples = apples + forestBags * 200 + shedBags * 200 + trashbagApples + trashbags * 200;
    dailyCollection = workers * 2;

   // totalApples += dailyCollection;
    //update HTML elements
    updateInventory();
    updateTransfer();
    
    
}
//updates text for specific portions or longer timed event
function textTicker() {
    updateBlackMarket();
    updateScenario();
    shedDestruction();
}


//update top portion of HTML
function updateInventory() {
    inventory.innerHTML = `
        <h2><strong>Apples & Workers</strong></h2>
        <p class="apple-info"><strong>Current Apple Count:</strong> ${apples}</p>
        <p id="total-apples"><strong>Total [Estimated] Apples:</strong> ${totalApples}</p>
         <p id="JAA-fund"><strong>Laundered Money:</strong> $${money.toFixed(2)}</p>
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
        <p><strong>Number of Trashbags:</strong> ${trashbags}/${maxTrashbags}</p>
        <p><strong>Trashbags in Forests: </strong> ${forestBags}</p>
        <p><strong>Trashbags in Sheds</strong> ${shedBags}/${maxShedBags}</p>
    `;
}

//updates text and prices for the black market section 
function updateBlackMarket() {
    sellAppleRate = appleBlackMarketRate().toFixed(2);
    blackMarketText.innerHTML = `
    
    <h2>Black Market: Export Stolen Apples for Cash</h2>
    <p><strong>Global Apple Rate:</strong> $${sellAppleRate} per apple</p>

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
                transferWarningText.innerText = "Pierre's car cannot hold anymore trashbags, move the other bags offsite!";
            }
        } 
    } 
}//transferToBag

//takes apples from trashbags into either the forest or sheds 
function moveTrashbags(destination) {
    offsiteMovementWarningText.innerText = "";
    if(destination === "forest") {
        forestBags++;
        trashbags--;
        forestBagArr.push(1);
    } else if(destination === "shed") {
        if(shedBags < maxShedBags) {
        shedBags++;
        trashbags--;
        shedBagArr.push(1);
        } else {
            offsiteMovementWarningText.innerText = "The shed cannot store anymore apples! Put the bags in the forest."
        }
    }

}//moveTrashbags





//~~~~~~~~~~~~~~~~~~~~~BUTTONS~~~~~~~~~~~~~~~~~~~~~~~~~

//transfer apples from backpacks to trashbags
transToBagsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    transferWarningText.innerText = "";

    if(backpackApples >= 0 || backpackApples >= '0') {
        transferToBag();
        
    } else {
        transferWarningText.innerText = "There are not enough apples to transfer! Wait for backpack apples to be replenished.";
    }

    if(backpackApples < 0) {
        backpackApples = 0;
    }


});
//move appples to frest button
moveTrashbagsToForest.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(trashbags > 0) {
        moveTrashbags("forest");
   
    } else {
        offsiteMovementWarningText.innerText = "There are no trashbags to move!"
    }
        
    
});
//move apples to shed button
moveTrashbagsToShed.addEventListener('click', (e) => {
    e.preventDefault();
  
    if(trashbags > 0) {
        moveTrashbags("shed");
      
    } else {
        offsiteMovementWarningText.innerText = "There are no trashbags to move!"
    }
        
    
});
//sell one apple button
sellOne.addEventListener('click', (e) => {

        e.preventDefault();
        sellApples(1);

});
//sell 10 apples button 
sell10.addEventListener('click', (e) => {

    e.preventDefault();
    sellApples(10);

});
//sell 25 apples button
sell25.addEventListener('click', (e) => {

    e.preventDefault();
    sellApples(25);

});
//sell 100 apples button
sell100.addEventListener('click', (e) => {

    e.preventDefault();
    sellApples(100);

});
//buy shed button 
buyShedBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    buyShedWarningText.innerText = "";
    if(money < shedCost) {
        buyShedWarningText.innerText = "You do not have enough money to buy another shed!"
    } else {
        buyShed();
        buyShedWarningText.innerText = "Shed has been purchased and illegally built..."
    }
});
//recover forest apples for battle
forestAppleRecoverBtn.addEventListener('click', (e) => {
    e.preventDefault();
    recoveredApplesText.innerText = "";
    if(forestBagArr.length > 0) {
        recoverForestApples(forestBagArr);
        recoveredApplesText.innerText = `JAA Recovery Team Report:\nType: Forest Apples\nApples Recovered: ${recoveredAppleCount}\nTrasbags Recovered: ${bagRecoveredCount}\nEstimated Apples Lost: ${estAppleLoss}`;
    } else {
        recoveredApplesText.innerText = "JAA Apple Recovery Team: There are no bags to recover!";
    }
    warTimeApplesText.innerHTML =  `<p id="war-apples"><strong>Ammunition:</strong> ${warApples} Apples</p>`
});
//recover shed apples for battle
shedAppleRecoverBtn.addEventListener('click', (e) => {
    e.preventDefault();
    recoveredApplesText.innerText = ""
    if(shedBagArr.length > 0) {
        recoverShedApples(shedBagArr);
        recoveredApplesText.innerText = `JAA Recovery Team Report:\nType: Shed Apples\nApples Recovered: ${recoveredAppleCount}\nTrasbags Recovered: ${bagRecoveredCount}\nEstimated Apples Lost: ${estAppleLoss}`;
    } else {
        recoveredApplesText.innerText = "JAA Apple Recovery Team: There are no bags to recover!";
    }
     warTimeApplesText.innerHTML =  `<p id="war-apples"><strong>Ammunition:</strong> ${warApples} Apples</p>`
});
tutorialButton.addEventListener('click', (e) => {
    e.preventDefault();
  
    if(tutorialInformation.style.display === 'none') {
        tutorialInformation.style.display = "block";
    } else {
        tutorialInformation.style.display = 'none';
    }

});




//upgrade vehicle (or trashbags that can be held at once)
buyVehicleBtn.addEventListener('click', (e) => {
    e.preventDefault();

});

function upgradeVehicle() {
    if(money > vehicles[0].cost) {
        maxTrashbags = vehicles[0].maxBags;
        money -= vehicles[0].cost;
    }
}

//purchase additional sheds
function buyShed() {
    money -= shedCost;
    sheds++;
    maxShedBags += 6;
    shedCost = 1.2 ** sheds * 1000;//exponential equation
    buyShedBtn.innerText = `Buy Addtional Shed ($${shedCost.toFixed(2)})`;
}//buyShed


//black market apples
function appleBlackMarketRate() {
    return Math.random() * (1.5-0.2);
}   

//sell apples on the market amt represents the amount of apples being sold 
function sellApples(amt) {
    marketWarning.innerText = "";
    if(trashbags >= amt && trashbags > 0) {
        money += amt * sellAppleRate * 200;
        trashbags -= amt;
        marketWarning.innerText = `Da Ro The Exporter Says: "Your apples were sold for $${(amt * sellAppleRate * 200).toFixed(2)}, take the money and run."'`;

    } else {
        marketWarning.innerText = 'Da Ro The Exporter Says: "You got no bags boy"';
    }
}//sellApples


const opps = [
"Orange Citadel",
"Strawberry Mafia",
"Pear Syndicate",
"Apple Exporters Corp.",
"Evil Kiwi Group",
"Math Meat Menaces",
"Wikis",
"Duck fat man",
"Pickle lovers",
"JS Niu Nai",
"Natty Confederation",
];

//randomly destroys sheds
function shedDestruction() {
    if(sheds != 1) {
        if(Math.random() <= 0.5) {
            shedWarningText.innertext = `
                JAA INTELLGEINCE: The ${opps[Math.floor(Math.random() * (opps.length))]} have destroyed one of our sheds, we do not know how many apples were lost
                `;//take random index from opps array
            maxShedBags -= 6;
            if(shedBags > maxShedBags) {
                shedBags = maxShedBags;
            }
        } else {
            shedWarningText.innerText = "JAA INTELLIGENCE: There was an attempt by an unknown group to destroy one of our sheds.";
        }
    }
}//shedDestruction

//randomly decreases the amount of apples that are in the forest
function forestAppleLoss() {
    if(forestBagArr.length > 0) {
        forestBagArr[Math.floor(Math.random() * forestBagArr.length)] = Math.random();
    }
}//forestAppleLoss

//function to recover apples from the forest into war apples
function recoverForestApples(arr) {
    recoveredAppleCount = 0;
    bagRecoveredCount = arr.length;
    const recoveredApples = Math.floor(arr.reduce((bag, a) => bag  + a, 0) * 200);
    forestBagArr = [];
    forestBags = 0;
    recoveredAppleCount = recoveredApples;
    estAppleLoss = bagRecoveredCount * 200 - recoveredApples;
    warApples += recoveredApples;
}//recoverForestApples

//constantly decreases the amount of apples that are in the forest 
function shedAppleLoss() {
    if(shedBagArr.length > 0) {
        shedBagArr[Math.floor(Math.random() * shedBagArr.length)] -= 0.015;
    }
}//shedAppleLoss

//function to recover apples from the forest into war apples
function recoverShedApples(arr) {
    recoveredAppleCount = 0;
    bagRecoveredCount = arr.length;
    const recoveredApples = Math.floor(arr.reduce((bag, a) => bag  + a, 0) * 200);
    shedBagArr = [];
    shedBags = 0;
    recoveredAppleCount = recoveredApples;
    estAppleLoss = bagRecoveredCount * 200 - recoveredApples;
    warApples += recoveredApples;
}

//set shed loss of apples to be lower than the apples from the forest 
window.setInterval(forestAppleLoss, 1000);
window.setInterval(shedAppleLoss, 10000);

window.setInterval(ticker, 1);//1sec tick 
window.setInterval(textTicker, 10000);


