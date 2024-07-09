//javascript code for the apple game -- notes at bottom

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DOM VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//top section 
const inventory = document.getElementById('apple-inventory');                       //top section of the page 
const numOfApplesHTML = document.getElementById('apple-info');                      //apple count
const workersHTML = document.getElementById("apple-workers");                       //apple workers
const appleRateHTML = document.getElementById('daily-apples');                      //apple daily gain
const appleRateLossHTML = document.getElementById('daily-loss');                    //apple dalily loss
const scenario = document.getElementById('scenario');                               //text at the very top of the page 
const buyVehicleBtn = document.getElementById('upgrade-vehicle');                   //button to upgrade vehicle to hold more trashbags 
const upgradeWarningText = document.getElementById('buy-vehicle-warning');          //warning text for vehicle purchase
const tutorialInformation = document.getElementById('tutorial');                    //tutorial button
const buyWorkerWarningText = document.getElementById('bribe-worker-warning');       //warning text for buying another worker

//apple transfer section 
const transferText = document.getElementById('transfer-text');                      //text for mid section of page
const transferWarningText = document.getElementById('transfer-warning');            //warning if transfer does not complete
const moveBagWarningText = document.getElementById('move-bag-warning');             //warning if moving apples does not work
const bagpackFullWarningText = document.getElementById('bag-full-warning');         //warning if bag is full 
const transferInformaton = document.getElementById('transfer-info');                //transfer info text
const buyShedWarningText = document.getElementById('buy-shed-warning');             //shed warning text
const offsiteMovementWarningText = document.getElementById('apple-loss-warning');   //moving trashbags warning text
const buyVehicleWarningText = document.getElementById('buy-vehicle-warning');       //vehicle purchase warning text 
const buyWorkerButton = document.getElementById('bribe-worker');                    //button to buy another worker 
const upgradeShedWarningText = document.getElementById('upgrade-warning');          //warning text for upgrading sheds
const upgradeShedBtn = document.getElementById('upgrade-shed-button');              //button to upgrade shed


//command section 
const shedWarningText = document.getElementById('shed-loss');                       //warning if sheds are destroyed
const recoveredApplesText = document.getElementById('recovered-apples');
const warTimeApplesText = document.getElementById('war-apples'); 
const addSoldiers = document.getElementById('worker-solider');                       //increase amoung of workers to soliders
const decSoldiers = document.getElementById('solider-worker');                       //decrease amount of soliders to workers   
const soldiersConvertWarningText = document.getElementById('bribe-solder-warning'); //convert solider warning text       
const soldiersCountHTML = document.getElementById('solider-count');                  //HTML text for number of soliders     

//command section buttons
const forestAppleRecoverBtn = document.getElementById('recover-forest');            //recover apples from the forest for war
const shedAppleRecoverBtn = document.getElementById('recover-shed');                //recover apples from the shed for war
const appleCampBtn = document.getElementById('campaign');                           //conduct campaign for apples 
const appleCampText = document.getElementById('house-info');                        //text for the house the apple
const appleCampResults = document.getElementById('campaign-result');                //resultant text after sending convoy for apple campaign

//market
const rateText = document.getElementById('market-rate');                            //number for apple cost
const blackMarketText = document.getElementById('black-market');                    //entire section 
const marketWarning = document.getElementById('market-warning');                    //warning text for market 

//market buttons 
const sellOne = document.getElementById('sell-1');                                  //sell 1 bag button
const sell10 = document.getElementById('sell-10');                                  //sell 10 bag button
const sell25 = document.getElementById('sell-25');                                  //sell 25 bag button
const sell100 = document.getElementById('sell-100');                                //sell 100 bag button


//buttons 
const transToBagsBtn = document.getElementById('transfer-to-trashbag');             //move apples from backpack to trashbags
const moveTrashbagsToForest = document.getElementById('store-to-forest');           //move apples to forest button
const moveTrashbagsToShed = document.getElementById('store-to-shed');               //move apples to shed button
const buyShedBtn = document.getElementById('buy-shed');                             //button to buy another shed 
const tutorialButton = document.getElementById('info-btn');                         //tutorial button
const saveBtn = document.getElementById('save');                                    //save button
const loadSaveBtn = document.getElementById('load-save');                           //load previous save button
const resetWarningBtn = document.getElementById('reset-first');                     //reset warning button
const resetBtn = document.getElementById('reset-second');                           //actual reset button

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS/VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//user game variables 
let apples = 0;                                 //total num of apples
let money = 0;                                  //user money 
let trashbags = 0;                              //current trashbags that have not been stored
let workers = 2;                                //current number of workers

//shed related variables
var sheds = 1                                   //number of sheds currently built
let shedCost = 1200;                            //amount that buying THIS shed costs
let shedBags = 0;                               //amount of bags curerntly stored in sheds
let maxShedBags = 6;                            //max number of bags that can be stored in the shed 
let shedUpgradeCost = 12500;                    //cost to upgrade the shed capability


let backpackApples = 0;                         //amount of apples that are curerntly in the backpack
let trashbagApples = 0;                         //amount of apples that are curently in a unclosed trashbag
let forestBags = 0;                             //amount of trashbags that are in the forest

let appleBombers = 1;                           //NOT USED amount of bombers avaiable which represnets the max number of soldiers that you can bring on a campaign 
let appleSoldiers = 0;                          // soldiers that can be used for appling campaign 
let minApples = 0;                              //min apples that are needed to win a campaign
let successChance = 0;                          //NOT USED represents chance of winning campaign in percentage value
let backPackStorageSize = 60;                   //amount of apples that a backpack can store
let trashBagStorageSize = 200;                  //amount of apples that a trashbag can store
let maxTrashbags = 2;                           //maximum number of trashbags that can be held at once and not stored offsite
let sellAppleRate = appleBlackMarketRate();     //current rate for apples on the black market

let totalApples = apples + trashbags * 200;     //total amount of apples collected (including those in the sheds and forest) deducts recovered apples for war time

let dailyCollection = parseInt(workers) * 2;    //amount of apples that can be collected per tick 
let recoveredAppleCount = 0;                    //amount of apples that were recovered
let bagRecoveredCount = 0;                      //amount of bags that were recovered
let estAppleLoss = 0;                           //amount of apples lost after being recovered
let warApples = 0;                              //amount of apples on hand for war activites


//arrays to keep track of bags that have been stored
//when bags are placed somewhere each bag gets a '1' pushed into array
//each '1' represents 1 trashbag/200 apples can be randomly modified 
let forestBagArr = [];                          //tracks apples in the forest
let shedBagArr = [];                            //tracks apples in the sheds

let nextAvailVehicle = 0;                       //represents the current vehicle the user has in the vehicles array
let shedUpgradeCount = 1;                       //represents the amount of times that the sheds have been upgraded 
let currHouse = 0;                              //current house in house to apple array num




//tutorial information for the user put it here instead of HTML file cuz
tutorialInformation.innerHTML =  `
    <h2><strong> DA Tutorial </strong></h2>
    <p>Within this city there are multiple factions which run loose unleashing mayhem by attacking with inferior fruit</p>
    <p>You and your friends under the order of CoasterOffice collect apples from the school cafeteria to meet your quotas under the guise of the Jenks Apple Association<p>
    <p>You must take out the targets that CoasterOffice has with these apples, under their orders</p>
    <p>People are suspicious of your plans, which makes collecting apples difficult, so as a result, each person can only collect two apples</p>
    <h3><strong>How to Transfer Apples Around</strong></h3>
    <p>Apples are automatically stored in backpacks, apples must be then discreetly transfered from the backpacks into trashbags</p>
    <p>When each trashbag reaches it capacity of 200 apples, a new trashbag will automatically be created, however you can only hold onto so many trashbags at once</p>
    <p>To create more trashbags, current trashbags must be placed in inconspicuous locations, there are two storage options available: Forests or Sheds.</p>
    <p>You will lose a random, yet very large amount of apples in the forest in most cases, in comparison, very little apples will be lost in sheds because they provide beteter protection</p>
    <h3><strong>Apple Command Information</strong></h3>
    <p>To conduct an operation with your apples you will need to recover the apples that you have stored either in the forest or in the sheds</p>
    <p>You can "recruit" more workers into your operation, however you will need to convert some of the workers into soldiers when you are ready to attack</p>
    <p>Likewise, you need to recover the apples that you have stored offsite to use them in attacks, however these apples will decay quickly so only recover when you are absolutely ready to attack</p>
    <p>As a reward you will be paid for your efforts</p>
    <h3><strong>Black Market Information</strong></h3>
    <p>Another way to get cash in this game is by selling unstored trashbags on the black market to be exported to other countries running black markets</p>
    <p>Prices fluctuate, so find a good price to sell your apples at</p>
    <p><strong>Note:</strong> You can only sell trashbags that have not been stored</p>
    <h3><strong>Upgrades</strong></h3>
    <p>You can upgrade vehicles, which allow you to store more trashbags at once</p>
    <p>You can purhcase sheds which allow more trashbags to be stored in sheds</p>
    <p>You can also upgrade the capacity of the sheds that you have</p>
    <p><strong>Note: </strong> future sheds that are built will not be impacted by the upgrade, so time the upgrades carefully<p>

`;


//represents new vehicle that can be purchsed to hold more trashbags at once
const vehicles = [
    {
        name: "small SUV",
        maxBags: 6,
        cost: 5000
    },
    {
        name: "large SUV",
        maxBags: 18, 
        cost: 15000
    },
    {
        name: "pickup truck",
        maxBags: 35,
        cost: 25000
    },
    {
        name: "box truck",
        maxBags: 200,
        cost: 75000
    },
    {
        name: "semi truck",
        maxBags: 1000, 
        cost: 300000
    }
];

//represents the current target that needs to be appled
//NOTE: bombers attribute not used 
//TODO: add more targets and also update them in a sequential manner 
const houseToApple = [
    {
        name: "Random Party",
        minApples: 25, 
        soldiers: 1,
        bombers: 0,
        payout: 500
    },
    {
        name: "Winter Party",
        minApples: 50, 
        soldiers: 2, 
        bombers: 0,
        payout: 1000
    },
    {
        name: "Super Bowl Party", 
        minApples:  100, 
        soldiers: 6, 
        bombers: 2,
        payout: 2000
    },
    {
        name: "The Milkin Compound", 
        minApples: 200, 
        soldiers: 6, 
        bombers: 3, 
        payout: 10000
    },
    {
        name: "QL's House",
        minApples: 10, 
        soldiers: 1, 
        bombers: 1, 
        payout: 160
    },
    {
        name: "Carrot Citadel",
        minApples: 1250,
        soldiers: 10,
        bombers: null,//delete bomber val for other houses -- they not used 
        payout: 25000
    },
    {
        name: "CoasterOffice",
        minApples: 1000000,
        soldiers: 50,
        bombers: null,//delete bomber val for other houses -- they not used 
        payout: 25000000
    }
];

//name of enemies that destroy sheds
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
    "Nectarine Combine"
    ];

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//randomly destorys apples that are in wartime storage that can be used for appling campaign 
function warAppleLoss() {
    if(warApples > 0) {
    warApples -= Math.floor(10 * Math.random());
    if(warApples < 0) {
        warApples = 0;
    }
    warTimeApplesText.innerHTML = `<p id="war-apples"><strong>Ammunition:</strong> ${warApples} Apples</p>`
    }
}

//function to upgrade sheds (ONLY IMPACTS SHEDS THAT HAVE BEEN BUILT, NOT FUTURE ONES)
function upgradeShed() {

    if(money >= shedUpgradeCost) {
        money -= shedUpgradeCost;
        maxShedBags += 6 * sheds;
        shedUpgradeCount++;
        shedUpgradeCost = Math.pow(1.25, shedUpgradeCount) * 10000;
        upgradeShedBtn.innerText = `Upgrade Sheds $(${(shedUpgradeCost).toFixed(2)})`;

    } else {
        upgradeShedWarningText.innerText = "You do not have enough money to upgrade the sheds";
    }

}

function udpateHouseText() {
    appleCampText.innerHTML =  `
    
    <p id="house-info"><strong>Target:</strong> ${houseToApple[currHouse].name}</p>
    <p><strong>Minimum Apples Required:</strong> ${houseToApple[currHouse].minApples}</p>
    <p><strong>Minimum Soliders Required:</strong> ${houseToApple[currHouse].soldiers}</p>
    <p><strong>Payout:</strong> $${houseToApple[currHouse].payout}</p>
    <p></p>
    
    
    `;
}

udpateHouseText(); //initial call to update text can only be called again after winning a campaign

//conduct an apple campaign 
function appleCamp() {

    if(appleSoldiers >= houseToApple[currHouse].soldiers && warApples >= houseToApple[currHouse].minApples) {

        const thisAppleCountDouble = houseToApple[currHouse].minApples * 2;
        const frac = warApples/thisAppleCountDouble;
        const applesUsed = Math.floor(Math.random() * warApples + minApples);
        const thisPayout = houseToApple[currHouse].payout;
    

        //win scenario
   
        if(frac > 1) {  //if you have more apples than double the minimum you automatically win 
    
            money += thisPayout;
            
            appleCampResults.innerText = `Summary:\nResult: SUCCESS \nApples Used: ${applesUsed}\nCoasterOffice Paid the JAA $${thisPayout} for the hit`;

            warApples -= applesUsed;
            if(warApples < 0) {
                warApples = 0;
            }
            currHouse++;
            udpateHouseText();

        
        } else if (Math.random() + frac >= 1.35) { //if you have more than the min but not enough completley random chance of winning
        
            money += thisPayout;
            
            appleCampResults.innerText = `Summary:\nResult: SUCCESS \nApples Used: ${applesUsed}\nCoasterOffice Paid the JAA $${thisPayout} for the hit`;

            warApples -= applesUsed;
            if(warApples < 0) {
                warApples = 0;
            }
            currHouse++;
            udpateHouseText();

        } else { //lose scenario 
        
            apples -= applesUsed;
            appleCampResults.innerText = `Summary:\nResult: FAILED \nApples Used: ${applesUsed}\nCoasterOffice Executives are threatning you...`;

        }

    } else if(appleSoldiers < houseToApple[currHouse].soldiers) {
        appleCampResults.innerText = `You do not have enough soliders to send a convoy, add more`;
    } else if(warApples < houseToApple[currHouse].minApples) {
        appleCampResults.innerText = `You do not have enough apples to go on a convoy, go recover trashbags`;
    } else {
        appleCampResults.innerText = `You have absolutely nothing to send`; 
    }

}

//function to buy bribe more workers
function buyWorker() {
    if(money >= Math.pow(1.25, workers) * 100) {
        money -= Math.pow(1.25, workers) * 100;
        dailyCollection += 2;
        workers++;
        backPackStorageSize += 60;
        buyWorkerButton.innerText = `Bribe Them ($${(Math.pow(1.25, workers) * 100).toFixed(2)})`;
    } else {
        buyWorkerWarningText.innerText = "You do not have enough influence (money) to recruit another worker";
    }
    
}

//updates the text at the very top of the page based on how many workers ther are 
function updateScenario() {
    if(workers <= 2) {
        scenario.innerText = "You and your friend start stealing apples from your school cafeteria...";
    } else if(workers > 2 && workers < 10) {
        scenario.innerText =  "Your other friends decide to help you collect apples too...";
    } else if(workers >= 10 && workers < 25) {
        scenario.innerText =  "A sizeable group has been assembled to assist with your collection...";
    } else {
        scenario.innerText = "Everybody knows about the apples";
    }
}

//main ticker ----------  move apple changes to a new function <-- im not doin that 
function ticker() {
    if(apples < backPackStorageSize) {
    apples += dailyCollection;
    backpackApples = apples;
    } else {
        bagpackFullWarningText.innerText = "Pierre's Backpack is filled to the brim with apples! Shove them into trashbags.";
    }
  
    totalApples = apples + forestBags * 200 + shedBags * 200 + trashbagApples + trashbags * 200;
    dailyCollection = workers * 2;

    

   // totalApples += dailyCollection;
    //update HTML elements
    
    updateInventory();
    updateTransfer();
    
}

//update text for the top two sections of the page (ivnentory and transfer) NOT USED
function inventoryTransferTextUpdate() {
    updateInventory();
    updateTransfer();
}

//updates text for specific portions or longer timed event
function textTicker() {
    updateBlackMarket();
    updateScenario();
    //shedDestruction();
}


//update top portion of HTML
function updateInventory() {
    inventory.innerHTML = `
        <h2><strong>Apples & Workers</strong></h2>
        <p class="apple-info"><strong>Current Apple Count:</strong> ${apples}</p>
        <p id="total-apples"><strong>Total (Estimated) Apples:</strong> ${totalApples}</p>
         <p id="JAA-fund"><strong>Laundered Money:</strong> $${money.toFixed(2)}</p>
        <p id="apple-workers"><strong>Workers:</strong> ${workers}</p>
        <p class="daily-apples"><strong>Daily Collection:</strong> ${dailyCollection} Apples</p>
       
    `;
}

//update numeric portion of transfer page
function updateTransfer() {
    transferText.innerHTML = `
        <p><strong>Apples in Backpacks:</strong> ${backpackApples}/${backPackStorageSize}</p>
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



//function that will upgrade the users vehicle and therefore the amount of apples that can be held in trashbags at once

//TODO: fix bug can buy the last vehicle twice check comparison statement on first if statement doesnt afftec money or anything might have to be with button display issues
function upgradeVehicle() {
    if(nextAvailVehicle < vehicles.length) {
        if(money >= vehicles[nextAvailVehicle].cost) {
            maxTrashbags = vehicles[nextAvailVehicle].maxBags;
            money -= vehicles[nextAvailVehicle].cost;
            buyVehicleWarningText.innerText = "Pierre purchased a " + vehicles[nextAvailVehicle].name + " which can now hold up to " + vehicles[nextAvailVehicle].maxBags + " trashbags at once";
            nextAvailVehicle++;
            buyVehicleBtn.innerText =  `Upgrade Apple Transport Vehicle ($${vehicles[nextAvailVehicle].cost})`;
           
        } else {
            buyVehicleWarningText.innerText = "You do not have enough money to purchase a larger vehicle";
        }
    } else {
        buyVehicleWarningText.innerText = "There is nothing larger to purchase";
        buyVehicleBtn.style.display = "none";
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



//randomly destroys sheds
//MAY DELETE -- all calls to this function have been removed 
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





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BUTTONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
//move appples to forest button
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

//shows the help button when the player clicks it and goes away once clicked again
tutorialButton.addEventListener('click', (e) => {
    e.preventDefault();
  
    if(tutorialInformation.style.display === 'none') {
        tutorialInformation.style.display = "block";
    } else {
        tutorialInformation.style.display = 'none';
    }

});

//initial reset button, reveals the actual reset button that will clear local storage
resetWarningBtn.addEventListener('click', (e) => {

    e.preventDefault();

    if(resetBtn.style.display === 'none') {
        resetBtn.style.display = "block";
    } else {
        resetBtn.style.display = 'none';
    }
})

//actual reset button that clears the current save on local storage
resetBtn.addEventListener('click', (e) => {

    e.preventDefault();

    localStorage.clear();

});

//upgrade vehicle (or trashbags that can be held at once)
buyVehicleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(nextAvailVehicle == vehicles.length) {
        buyVehicleBtn.style.display = "none";
    }
    upgradeVehicle();
    
});

//button to buy more workers
buyWorkerButton.addEventListener('click', (e) => {
    e.preventDefault();
    buyWorker();
});


//button to upgrade the sheds
upgradeShedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    upgradeShed();
})

//increase the amount of soliders available by decreasing the number of workers
addSoldiers.addEventListener('click', (e) => {

    e.preventDefault();
    if(workers > 0) {
        workers--;
        dailyCollection -= 2;
        appleSoldiers++;
        //update solider inner text
        soldiersCountHTML.innerHTML = `<p id="solider-count"><strong>Apple Soldiers:</strong> ${appleSoldiers}</p>`;
        
    } else {
        soldiersConvertWarningText.innerText = "There are no more workers!";
    }

});

//decrease amount of soldiers and increase amount of workers
decSoldiers.addEventListener('click', (e) => {

    e.preventDefault();
    if(appleSoldiers > 0) {
        appleSoldiers--;
        dailyCollection += 2;
        workers++;
        soldiersCountHTML.innerHTML = `<p id="solider-count"><strong>Apple Soldiers:</strong> ${appleSoldiers}</p>`;
    } else {
        soldiersConvertWarningText.innerText = "There are no more soldierss";
    }

});



//calls apple camp function to send campaign for apples
appleCampBtn.addEventListener('click', (e) => {
    e.preventDefault();
    appleCamp();

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SAVES/LOCAL STORAGE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`~`~~~~~~~~~~~~~~~~~~~~~

let thisSaveDeserialized = JSON.parse(localStorage.getItem("save"));

//save button stores all user data onto local storage can be overriden
saveBtn.addEventListener('click', (e) => {

        e.preventDefault();
        
        let thisSave = {

            applesSave: apples,
            moneySave: money,
            trashbagsSave: trashbags,
            workersSave: workers,
            shedSave: sheds, 
            shedCostSave: shedCost, 
            shedBagsSave: shedBags, 
            maxShedBagsSave: maxShedBags, 
            shedUpgradeCostSave: shedUpgradeCost, 
            backpackApplesSave: backpackApples,
            trashbagApplesSave: trashbagApples,
            forestBagsSave: forestBags, 
            appleSoliderSave: appleSoldiers,
            backPackStorageSizeSave: backPackStorageSize,
            trashbagStorageSizeSave: trashBagStorageSize, 
            maxTrashbagsSave: maxTrashbags, 
            totalApplesSave: totalApples, 
            forestBagArrSave: forestBagArr, 
            shedBagArrSave: shedBagArr, 
            nextAvailVehicleSave: nextAvailVehicle, 
            shedUpgradeCountSave: shedUpgradeCost, 
            currHouseSave: currHouse, //should save the war time index position 
            
        }

        localStorage.setItem("save", JSON.stringify(thisSave));  
        
});

//load save from original save 
loadSaveBtn.addEventListener('click', (e) => {

    e.preventDefault();//wtf does this do 

    apples = thisSaveDeserialized.applesSave;
    money = thisSaveDeserialized.moneySave;
    trashbags = thisSaveDeserialized.trashbagsSave;
    workers = thisSaveDeserialized.workersSave;
    sheds = thisSaveDeserialized.shedSave;
    shedCost = thisSaveDeserialized.shedCostSave;
    shedBags = thisSaveDeserialized.shedBagsSave;
    maxShedBags = thisSaveDeserialized.maxShedBagsSave;
    shedUpgradeCost = thisSaveDeserialized.shedUpgradeCostSave;
    backpackApples = thisSaveDeserialized.backpackApplesSave;
    trashbagApples = thisSaveDeserialized.trashbagApplesSave;
    forestBags = thisSaveDeserialized.forestBagsSave;
    appleSoldiers = thisSaveDeserialized.appleSoliderSave;
    backPackStorageSize = thisSaveDeserialized.backPackStorageSizeSave;
    trashBagStorageSize = thisSaveDeserialized.trashbagStorageSizeSave;
    maxTrashbags = thisSaveDeserialized.maxTrashbagsSave;
    totalApples = thisSaveDeserialized.totalApplesSave;
    forestBagArr = thisSaveDeserialized.forestBagArrSave;
    shedBagArr = thisSaveDeserialized.shedBagArrSave;
    nextAvailVehicle = thisSaveDeserialized.nextAvailVehicleSave;
    shedUpgradeCost = thisSaveDeserialized.shedUpgradeCostSave;
    currHouse = thisSaveDeserialized.currHouseSave;
     
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~WINDOW INTERVALS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//shed loss tick should be longer than forest loss tick 
window.setInterval(forestAppleLoss, 1000);          //1 second tick to make storage of forest apples more random
window.setInterval(shedAppleLoss, 10000);           //10 second tick to change shed loss of apples slower

//tickers for text updates
window.setInterval(ticker, 1000);                      //1ms tick for testing purposes set to one when done 
window.setInterval(textTicker, 10000);              //i forgo what this does
//window.setInterval(inventoryTransferTextUpdate, 1);     //inventory and transfer page infromation text update

window.setInterval(warAppleLoss, 500);              //updates the amount of apples being lost in wartime storage when converted

//notes ------------------------------------------------------------------------
/*

const startGame = () => {
  canvas.style.display = 'block';
  startScreen.style.display = 'none';
}

        -fix or remove shed destruction function and features 


    3. create some feature where trash bags can be made automically
    5. create feature where you can upgrade trashbag capacity
*/

