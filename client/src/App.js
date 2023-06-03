import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);

    const splitArray = e.target[0].value.split(",");
    console.log(splitArray);
    const response = await axios.post("http://localhost:8000/getWeather", {
      cities: splitArray,
    });
    setData(response.data);
    console.log(response);
  };
  return (
    <div className="App">
      <div className="display-container">
        <form className="weather-form mx-auto mt-5" onSubmit={handleSubmit}>
          <div className="mb-3 form-1">
            <p>ENTER CITIES</p>

            <input
              type="text"
              className="form-control form-control-custom"
              id="cities"
              aria-describedby="emailHelp"
              placeholder="Enter the cities separated by commas"
            />
          </div>

          <button type="submit" className="btn btn-light">
            FETCH
          </button>
        </form>

        <div>
          <textarea
            className="form-textarea"
            name=""
            id=""
            cols="30"
            rows="10"
            value={JSON.stringify(data.weather)}
            readOnly={true}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
