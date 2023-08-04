//jshint esversion:6

const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

})
app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apikey = "9ed42c921f6779d70ef0bb990d668cd2"
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function (response) {

        response.on("data", function (data) {
            try {
                const WeatherData = JSON.parse(data);

                const temp = WeatherData.main.temp;

                const weatherDescription = WeatherData.weather[0].description;

                const icon = WeatherData.weather[0].icon

                const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
                res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
                res.write("<img src=" + imageURL + ">");
                res.send();

            } catch {
                res.write("<h1>404</h1>")
                res.send();
            }
        })
    })
})


/* */

app.listen(PORT||3000, function () {
    console.log("server is running on port 3000...")
})
