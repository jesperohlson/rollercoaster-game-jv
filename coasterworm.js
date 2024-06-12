
//new DOM variables
const currentInvHTML = document.getElementById('current-inventory');
const statsHTML = document.getElementById('stat');
const financesHTML = document.getElementById('finances');
const loanRateHTML = document.getElementById('loan-rate');
const moneyText = document.getElementById('user-money');

//pages (buttons)
const mainButton = document.getElementById('main-menu');
const rideButton = document.getElementById('ride-buttons');
const financeButton = document.getElementById('finances-buttons');
const statsButton = document.getElementById('stats-buttons');
const developButton = document.getElementById('developments-buttons');

//new buttons 
const loanButton = document.getElementById('loan-button');

//money related variables
const loanAmount = document.getElementById('loan-amount').value;
let userMoney = JSON.parse(localStorage.getItem("userMoney")) || 1000;
let admissionFee = 0;
let guests = 0;
let rating = 100;
let loanRate = 1.5;
let userLoanRate = 0;
let debt = 0;

//store variables
let numOfStores = 0;
let storeMultiplier = 0;

let inventory = JSON.parse(localStorage.getItem("userData")) || [];
let numOfRides = inventory.length;


let guestsPerSec = numOfRides * rating;
let moneyPerSec = guests * admissionFee + numOfStores * storeMultiplier - debt;
//give each store a money per minute attribute and use it for above two equations

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
];

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
];

const stores = [

]


/*
update money, guests, rating per tick 

determine money multiplier policy 
*/
function perTickMain() {
    //add if statement to see if rating is going down or money flow is negative 
    userMoney += 5;
    guests += 1;

   
    currentInvHTML.innerHTML = `
        <h2><strong>Current Inventory</strong></h2>
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
        <p><strong>Money Per Second</strong> ${moneyPerSec * 8}</p>
        <p><strong>Debt Owned:</strong> ${debt}</p>
    `
}
//determine loan rate (random number)
function determineLoanRate() {

if(Math.random() * (10 - 0) > 5) {
    loanRate += Math.abs(Math.random().toFixed(2));
} else {
    loanRate -= Math.abs(Math.random().toFixed(2)) * 0.5;
}

if(loanRate < 0) {
    loanRate = 1.25;
} else if (loanRate > 10) {
    loanRate = 5;
}

loanRateHTML.innerHTML = `
    <p><strong>Loan Rate:</strong> ${loanRate.toFixed(2)}%</p>
`;

}

function buyCoaster(obj) {
    if(userMoney >= price) {
        inventory.push(obj);
        userMoney -= coasters.price;
    } else {
        alert("Insufficient funds, collect more money!")
    }
}//buyCoaster

function buyAmusements(obj) {
    if(userMoney >= price) {
        inventory.push(obj);
        userMoney -= amusements.price;
    } else {
        alert("Insufficient funds, collect more money!")
    }
}

function buyStores(obj) {
    if(userMoney >= price) {
        inventory.push(obj);
        userMoney -= stores.price;
    } else {
        alert("Insufficient funds, collect more money!")
    }
}

//allow user to take a loan, breaks inventory money display
function takeLoan() {
    const thisLoanRate = loanRate;//specific percentage
    userMoney += loanAmount;
    debt = loanAmount * thisLoanRate;
    moneyText.textContent = userMoney;
}
/*
use the inventory to find the avergage mutipler of all of the attreibutes of each items
then update the money per tick shit 
*/

loanButton.addEventListener('click', (e) => {
    e.preventDefault();

    takeLoan();
});


window.setInterval(perTickMain, 250);//in ms
window.setInterval(determineLoanRate, 5000);//changes loan rate every second


//add mechanic to buy and sell amusements 

//rideButton.addEventListener('click', onShit);
//need to update page, update css display setting when buttons are clicked on 

/*
local storage ---------
JSON.parse
JSON.stringify
key, value
*/

// local storage variables 
const inventorySave = localStorage.setItem("userData", JSON.stringify(inventory));
const moneySave = localStorage.setItem("userMoney", JSON.stringify(userMoney));
const guestsSave = localStorage.setItem("guests", JSON.stringify(guests));

