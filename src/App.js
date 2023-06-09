import "./styles.css";
import { useEffect, useRef, useState } from "react";
export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [submit, setSubmit] = useState(false);
  const inputElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(inputElement.current.value);
    // setCity(inputElement.current.value);
    // console.log(city);
    // console.log(data);
    setSubmit(true);
    console.log(city);
    console.log(data);
  };
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9a8894e7f14322cd45b5144a678a556d`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        setSubmit(false);
      });
    setSubmit(false);
  }, [city]);
  return (
    <div className="App">
      {true && (
        <>
          <div className="container">
            <div className="title">Weather App</div>

            <div className="form">
              <form onSubmit={handleSubmit}>
                <input
                  required
                  ref={inputElement}
                  className="city"
                  type="text"
                  name="city"
                  value={city}
                  placeholder="Enter City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                ></input>
                <input
                  className="country"
                  type="text"
                  placeholder="Country(Optional)"
                ></input>
                <button className="submit" type="submit">
                  Submit
                </button>
              </form>
            </div>

            <div className="details">
              {submit && (
                <>
                  <span className="mumbai">
                    {submit && data.name},{submit && data.sys.country} .Weather
                  </span>
                  <p className="para">
                    As of {new Date().toDateString()},
                    {new Date().toLocaleTimeString()}
                  </p>
                  <span className="temp">
                    {data.main.temp}
                    <sup>*</sup>C{" "}
                  </span>
                  <img className="image"></img>
                  <br></br>
                  <span className="desc">{data.weather[0].description}</span>
                </>
              )}
            </div>

            <div className="last-contain">
              <div className="last-container">
                <div className="lft">
                  <div className="left-div">
                    High/Low: {submit && data.main.temp_max}/
                    {submit && data.main.temp_min}
                  </div>
                  <div className="left-div">
                    Humidity: {submit && data.main.humidity}
                  </div>
                  <div className="left-div">
                    Pressure: {submit && data.main.pressure}
                  </div>
                  <div className="left-div">
                    Visibility: {submit && data.visibility}
                  </div>
                </div>
                <div className="rgt">
                  <div className="right-div">
                    Wind: {submit && data.wind.speed}km/hr
                  </div>
                  <div className="right-div">
                    Wind Direction: {submit && data.wind.deg}
                    <sup>*</sup>deg
                  </div>
                  <div className="right-div">
                    Sunrise:{" "}
                    {submit && new Date(data.sys.sunrise).toLocaleTimeString()}
                  </div>
                  <div className="right-div">
                    Sunset:{" "}
                    {submit && new Date(data.sys.sunset).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
