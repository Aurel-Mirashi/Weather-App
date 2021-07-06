const cityName = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


//Update UI

const updateUI = data =>{

   const {cityDetails , weather} = data;

    details.innerHTML=`
                 <h5 class="my-3">${cityDetails.EnglishName}</h5>
                 <div class="my-3">${weather.WeatherText}</div>
                 <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                 </div>`
    //Update Day&Night and icons
    let timeSrc = null;
    weather.IsDayTime ? timeSrc = './img/day.svg' : timeSrc = './img/night.svg'
    time.setAttribute('src', timeSrc);

    const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src' , iconSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

//Function to update the city

const updateCity = async(city) =>{

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather }
}

cityName.addEventListener('submit', e =>{
   e.preventDefault();

   //Get city name
   const city = cityName.city.value.trim();
   cityName.reset();

   //Update city
   updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


    //Set new data on local storage

    localStorage.setItem('city' , city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
     .then(data => updateUI(data))
     .catch(err => console.log(err));
}