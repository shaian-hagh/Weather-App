const loti = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');



const  getLocation = async () => {
    const res = await fetch('http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone');
    const resjson = await res.json();
    console.log(resjson);
    return resjson
}
const getWeather = async (lat, lon) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f0894defae7c5584798f8812232a40c2`);
    const resjson = res.json();
    console.log(resjson);
    return resjson
}
const getDayOrNight = () => {
    let dayOrNight;
    let time = new Date();
    let hour = time.getHours();
    if(hour >= 6 && hour <= 19) {
        dayOrNight = "Day";
    } else {
        dayOrNight = "Night";
    }
    return dayOrNight;
}
const getIcon = (weMain) => {
    let icon;
    switch(weMain) {
        case 'Thunderstorm' :
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle' :
            icon = `${weMain}.svg`;
            break;
        case 'Rain' :
            icon = `${weMain}.svg`;
            break;
        case 'Snow' :
            icon = `${weMain}.svg`;
            break;
        case 'Clear' :
            let wichIcon = getDayOrNight();
            icon = `${weMain}-${wichIcon}.svg`;
            break;
        case 'Clouds' :
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere' :
            icon = `${weMain}.png`;
            break;
    }
    console.log(icon);
    return icon;
}
const getTemp = weTemp => {
    const k = weTemp;
    const f = (k - 273.15) * 9.5 + 32;
    const c = k - 273.15;
    return temperature = {
        kel: Math.floor(k),
        far: Math.floor(f),
        can: Math.floor(c)
    }
}

getLocation()
.then(locData => {
    console.log(locData);
    const timezone = `${locData.country} / ${locData.city}`;
    loti.innerHTML = timezone;
    return getWeather(locData.lat, locData.lon)
})
.then(weData => {
    const weTemp = weData.main.temp;
    const weMain = weData.weather[0].main;
    const weDes = weData.weather[0].description;
    console.log(weTemp, weMain, weDes);
    const iconName = getIcon(weMain);
    icon.innerHTML = `<img src='icons/${iconName}'></img>`;

    deg.innerHTML = Math.floor(weTemp);
    unit.innerHTML = 'K'
    console.log(getIcon(weMain))

    dese.addEventListener('click', () => {
        if(unit.innerHTML === "K") {
            deg.innerHTML = getTemp(weTemp).far;
            unit.innerHTML = "F";
        } else if (unit.innerHTML === "F") {
            deg.innerHTML = getTemp(weTemp).can;
            unit.innerHTML = "C"
        } else {
            deg.innerHTML = getTemp(weTemp).kel;
            unit.innerHTML = "K"
        }
    })
    tede.innerHTML = weDes;
})
