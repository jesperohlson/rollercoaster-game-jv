//JS for tha wiki and jeremy song coaster game

//new DOM variables
const currentInvHTML = document.getElementById('current-inventory');
const statsHTML = document.getElementById('stat');
const financesHTML = document.getElementById('finances');

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

let numOfStores = 0;

let inventory = [];
let numOfRides = inventory.length;

let moneyPerSec = guests * rating;

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
    userMoney += 5; //figure out equation 
    guests += 1;
   
    currentInvHTML.innerHTML = `
        <h2><strong>Current</strong></h2>
        <p><strong>Money:</strong> ${userMoney}</p>
        <p><strong>Guests:</strong> ${guests}</p>
    `;//update current  inventory

    statsHTML.innerHTML = ` 
        <h2><strong>Park Stats</strong></h2>
        <p><strong>Rides:</strong> ${numOfRides}</p>
        <p><strong>Park Rating:</strong> ${rating}</p>
    `;//update stats

    financesHTML.innerHTML = `
    
        <h2><strong>Finances</strong></h2>
        <p><strong>Money Flow:</strong> ${moneyPerSec}</p>
        <p><strong>Debt Owned:</strong> (Insert HERE)</p>
    
    `
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

//rideButton.addEventListener('click', onShit);
//need to update page, update css display setting when buttons are clicked on 

/*
local storage ---------
JSON.parse
JSON.stringify
key, value
*/

const dataSave = localStorage.setItem("userData", JSON.stringify(inventory));