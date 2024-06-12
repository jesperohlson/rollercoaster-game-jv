//DOM variables
const inventory = document.getElementById('apple-inventory');
const appleWorkers = document.getElementById('apple-info');

//variables
let apples = 0;
let workers = 2;
let dailyCollection = workers * 2;
let dailyLoss = 0;
let backpackApples = 0;
let trashbagApples = 0;
let trashbags = 0;
let forestBags = 0;
let shedBags = 0;
let appleBombers = 0;
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



