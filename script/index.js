let weather = {
    featchWeather: function (city) {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=384901a7d4904d209c8214058241604&q=${city}&days=3`)
            .then(response => response.json())
            .then(data => {
                this.display(data);
            });
    },

    display: function (data) {
        var cityName = data.location.name;
        var temp = data.current.temp_c;
        var image = data.current.condition.icon;
        var type = data.current.condition.text;
        var humidity = data.current.humidity;
        var windSpeed = data.current.wind_kph;
        var windDir = data.current.wind_dir;

        console.log(image);
        document.querySelector(".city").innerHTML = `${cityName}`
        document.querySelector(".temp").innerHTML = `${temp}°C <img  src="${image}">`;
        document.querySelector(".type").innerHTML = `${type}`
        document.querySelector(".humidity").innerHTML = `${humidity} %`
        document.querySelector(".wind").innerHTML = `${windSpeed}  km/h`
        document.querySelector(".windDir").innerHTML=`${windDir}`


        // 
        // get the day name
        let todayDate = new Date();
        document.querySelector(".day").innerHTML = todayDate.toLocaleDateString("en-US", {
            weekday: 'long',
        });

        //   get the date of the day
        var forecast = data.forecast;
        var date = forecast.forecastday[0].date;
        document.querySelector(".date").innerHTML = `${date}`

        // get next day
        var nextDay = document.getElementsByClassName("nextDay");
        var nextTempImg = document.getElementsByClassName("nextImg");
        var nextMaxTemp = document.getElementsByClassName("nextMax");
        var nextMinTemp = document.getElementsByClassName("nextMin");
        var nextType = document.getElementsByClassName("nextType");

        let forecastData = data.forecast.forecastday;
        for (let i = 0; i < 2; i++) {
            let nextDate = new Date(forecastData[i + 1].date);
            nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
                weekday: "long",
            });

            nextTempImg[i].setAttribute(
                "src",
                forecastData[i + 1].day.condition.icon
            );
            nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c +"°C";
            nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c +"°C";
            nextType[i].innerHTML = forecastData[i+1].day.condition.text;                 
        }
    },

    search: function () {
        let city = document.querySelector(".search_bar").value;
        this.featchWeather(city);
    },
};

document.querySelector(".search_btn").addEventListener("click", function () {
    weather.search();
    // console.log("hfie");
});

weather.search();
weather.featchWeather("cairo");
