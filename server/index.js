import express, { response } from "express";
import axios from "axios";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("WORKING !!!");
});

app.post("/getWeather", async (req, res) => {
  const data = {};
  try {
    const weatherFunc = async (city) => {
      try {
        const weather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27e5aba33fce5e94ffcd8533b8f9a10c`
        );

        if (weather.status === 200) {
          data[city] = weather.data.main.temp;
        } else {
          data[city] = "invalid";
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          data[city] = "invalid";
        } else {
          throw error;
        }
      }
    };

    const weatherPromises = req.body.cities.map((city) => weatherFunc(city));

    await Promise.all(weatherPromises);

    res.status(200).json({
      weather: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
      weather: "smething went wrong",
    });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
