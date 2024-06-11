//grab html elements
const logText = document.getElementsByClassName('guide');
const moneyHTML = document.getElementById('user-money');
const updatesHTML = document.getElementById('update-id');
const guestsHTML = document.getElementById('guests');
const statsHTML = document.getElementById('stats');
const rideCounterHTML = document.getElementById('ride-count');

const purchaseRidesPage = document.getElementById('purchase-rides');

//pages (buttons)
const mainButton = document.getElementById('main-menu');
const rideButton = document.getElementById('ride-buttons');
const financeButton = document.getElementById('finances-buttons');
const statsButton = document.getElementById('stats-buttons');
const developButton = document.getElementById('developments-buttons');




//variables
let userMoney = 1000;
let admissionFee = 0;
let guests = 0;
let rating = 100;
let numOfRides = 0;
let numOfStores = 0;
let inventory = [];

//park multiplers
//find avg money,guest,rating multiplers and apply to the user Money 

const coasters = [
    {
        name: "King da Kum",
        price: 500,
        moneyMultiplier: 1.2,
        guestMultiplier: 1.1,
        ratingMultipler: 1
    },
    {
        name: "Banshee buster",
        price: 2500,
        moneyMultiplier: 1.2,
        guestMultiplier: 1.1,
        ratingMultipler: 1  
    }
]

const amusements = [
    {
        name: "merry-go-round",
        price: 250,
        moneyMultiplier: 1.2,
        guestMultiplier: 1.1,
        ratingMultipler: 1  
    },
    {
        name: "ferris-Wheel",
        price: 250,
        moneyMultiplier: 1.2,
        guestMultiplier: 1.1,
        ratingMultipler: 1  
    }
]

/*
update money, guests, rating per tick 

determine money multiplier policy 
*/
function perTickMain() {
    userMoney += 5;
    guests += 1;
    moneyHTML.innerHTML = `Money: ${userMoney}`;
    guestsHTML.innerHTML = `Guests: ${guests}`;
    rideCounterHTML.innerHTML = `Rides: ${numOfRides}`;
    statsHTML.innerHTML = `
        \nCurrent Park Rating: ${rating}
    `;

}

function onshit() {
    purchaseRidesPage = 
    `
    Current Rides Available:
    ${coasters[0]};
    `;

    logText.styles.display = "none";
    moneyHTML.styles.display = "none";
    guestsHTML.innerHTML = "none";
    statsHTML.innerHTML = "none";
}


function updateLog() {
    updatesHTML.innerHTML = "You need a loan to purchase your first amusement for your park SHWIKI!";
    
}

function buy(obj, price) {
    if(userMoney > price) {
        inventory.push(obj);
        userMoney -= price;
    } else {
        alert("Insufficient funds, collect more money!")
    }
}

function sell(obj, price) {
    /*
    have to find specific object to remove and remove it from the inventory 
    give back the price to the user money inventory 
    */
}

function takeLoan(amount, rate) {
    
    userMoney += amount;
        /*
        allow user to create their own loan 
        in a fieldset and the loan can be approveed
        deduct from userMoney every tick predefined
        in this method 
        */
}
/*

use the inventory to find the avergage mutipler of all of the attreibutes of each items
then update the money per tick shit 
*/


window.setInterval(perTickMain, 175);//in ms


//add mechanic to buy and sell amusements 

rideButton.addEventListener('click', onShit);
//need to update page, update css display setting when buttons are clicked on 


//learn js local storage 