const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const {cityDets, weather } = data;

    //update details Template//
    details.innerHTML =`
        <h3>${cityDets.EnglishName}</h3>
        <div class="condition">${weather.WeatherText}</div>
        <div class="display">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update the night/day with icon images//
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day-svg.png';
    } else {
        timeSrc = 'img/night1.webp';
    }
    time.setAttribute('src', timeSrc);

    //remove d-none class if present//
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather };
};

cityForm.addEventListener('submit', e => {
    //prevent default action//
    e.preventDefault();


    //get city value//
    const city = cityForm.city.value.trim();
    cityForm.reset();


    //update the UI with the new city//
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});