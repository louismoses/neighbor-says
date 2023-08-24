import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// affirmation API
const affirmationApiURL = "https://www.affirmations.dev/";

const getAffirmResult = async () => {
  const response = await axios.get(affirmationApiURL);
  return response.data;
};

app.get("/", async (req, res) => {
  try {
    const affirmResult = await getAffirmResult();
    res.render("index.ejs", {
      affirm: affirmResult.affirmation,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/submit", async (req, res) => {
  // weather API
  const weatherApiKey = process.env.WEATHER_API_KEY;
  const currentCity = req.body["cityWeather"];
  const weatherApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${currentCity}`;

  try {
    const weatherResult = await axios.get(weatherApiUrl);
    const affirmResult = await getAffirmResult();

    res.render("index.ejs", {
      currentWeather: weatherResult.data,
      affirm: affirmResult.affirmation,
    });
  } catch (error) {
    console.log(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
