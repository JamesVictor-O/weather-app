const inputValue = document.querySelector("#search");
const searchIcon = document.querySelector("#searchIcon");
const weatherImage = document.querySelector(".weatherImage");
const weatherConditon = document.querySelector(".weatherConditon");
const city = document.querySelector(".city");
const humidity2 = document.querySelector("#humdity");
const wind2 = document.querySelector(".wind2");

const apiKey = "fb326f256bd7f14776b90d44c2ae6561"
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
let cityName = inputValue.value;

async function checkWeather(nameCity,callBack,callBack2) {
    const response = await fetch(apiUrl + nameCity + `&appid=${apiKey}`)
    let data = await response.json()

    console.log()
    callBack(data)
    let countryName=data.name
    let country = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    let countryData = await country.json()

    callBack2(countryData)
}

function DisplayWeather(data) {
    const {main,name,wind}=data
    const {temp,humidity,...rest}=main
    weatherConditon.innerHTML = Math.round(temp) + "c";
    humidity2.innerHTML = `${humidity}%`
    wind2.innerHTML=`${wind.speed}`
}

function DisplayInformation(data) {
    console.log(data[0])
    const {
        flags, currencies, population, languages, name, continents
    } = data[0]
    let currencie;
    let language
    document.querySelector(".countryFlag").src = flags.png;
    document.querySelector(".population").innerHTML = population;
    document.querySelector(".con").innerHTML = name.official;
    document.querySelector(".tenent").innerHTML = continents[0]
    
    for (let cur in currencies) {
        currencie=cur
    }
    for (let lang in languages) {
        language=lang
    }
    document.querySelector(".currency").innerHTML = currencies[currencie].name;
    document.querySelector(".lang").innerHTML=languages[language]
}



searchIcon.addEventListener("click", () => {
    checkWeather(inputValue.value,DisplayWeather, DisplayInformation)  
})
