import React, { useEffect, useState } from "react";
import axios from 'axios';
import './style.css'
function Home(){
    const[data, setData]= useState({
        celcius:10,
        name:'Hyderabad',
        humidity:10,
        speed: 5,
        image:'/images/clouds.png'
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleClick = () =>{
        if(name !=="") {
            const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main === "Clouds"){
                    imagePath ="/images/clouds.png"
                }else if(res.data.weather[0].main === "Clear"){
                    imagePath ="/images/clear.png"
                }else if(res.data.weather[0].main ==="Rain"){
                    imagePath ="/images/rain.png"
                }else if(res.data.weather[0].main ==="Drizzle"){
                    imagePath ="/images/drizzle.png"
                }else if(res.data.weather[0].main ==="Mist"){
                    imagePath ="/images/mist.png"
                }
                else if(res.data.weather[0].main ==="Haze"){
                    imagePath ="/images/haze.png"
                }else {
                    imagePath = '/images/clouds.png'
                }
                console.log(res.data);
                setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath })
            })
            .catch(err =>{
                if(err.response.status === 404){
                    setError("Invalid City")
                }
                else{
                    setError('');
                }
                console.log(err)
            });
        }
     } 

    return(
        <div className="container">
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter city' onChange={e =>setName(e.target.value)}/>
                <button width="30px"><img src="/images/magnifying-glass.png" onClick={handleClick} alt="" /></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
            <div className="weather-info">
                <img src={data.image} alt="" className='icon' />
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className="det">
                    <div className="c">
                        <img src="/images/h1.png" alt="" />
                        <div className="Humy">
                            <p>{Math.round(data.humidity)} %</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="c">
                        <img src="/images/w2.png" alt="" />
                        <div className="wind">
                            <p>{Math.round(data.speed)} km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Home