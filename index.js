import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.static("public"));

// affirmation API
const affirmationApiURL = "https://www.affirmations.dev/";

// weather API
const weatherApiKey = process.env.WEATHER_API_KEY;
const weatherApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=lucena`;

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(affirmationApiURL);
    const weather = await axios.get(weatherApiUrl);

    res.render("index.ejs", {
      affirm: result.data.affirmation,
      currentWeather: weather.data,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
