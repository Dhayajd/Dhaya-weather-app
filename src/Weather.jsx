import React, { useState } from 'react'
import myimg from './pic/bg-img.jpg'
import axios from 'axios'
const Weather = () => {
    const [city,setcity]=useState("")
    const [flag,setflag]=useState(false)
    const[weather,setweather]=useState("")
    const[temp,settemp]=useState("")
    const[desc,setdesc]=useState("")
    const [error,seterror]=useState(false)
    const handlechange=(event)=>{
        setflag(false)
        seterror(false)
       setcity(event.target.value)
    }
    const report=()=>{
       
        const wetherreport=axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e58b3065407e4e1bd733cf1e2239ae5e`)
         wetherreport.then((item)=>{
            seterror(false)
            setweather(item.data.weather[0].main)
            settemp(item.data.main.temp)
            setdesc(item.data.weather[0].description)
            console.log(item.data)
            setflag(true)
        })
        .catch(()=>{
            seterror(true)
            setflag(false)
        })

    }
    
    return (<>
        <div className="bg-cover bg-center h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${myimg})` }}>
            <div className='bg-[#AAC7FF]  p-10  opacity-85 rounded-lg '>
                <h1 className='font-bold text-2xl text-center text-blue-700'>Weather Report</h1>
                <div className='flex flex-col mt-5 '>
                    <input placeholder='Enter Your City Name' className='p-2 rounded-md focus:outline-blue-700' onChange={handlechange}></input>
                    <button className='bg-blue-700 p-2 mt-4 rounded-md text-white font-semibold ' onClick={report} >Get Report</button>
                </div>

            </div>
            {
                flag?<div className='text-blue-200 mt-7 font-semibold text-2xl'>
                    <p>Weather:<b> {weather}</b></p>
                    <p>Temperature: <b> {temp}</b></p>
                    <p>Description:<b> {desc}</b></p>
                </div>:""
            }
            {
                error?<div className='text-red-500 font-extrabold text-3xl bg-yellow-200 p-2 mt-5 rounded-md'>ENTER A VALID INPUT</div>:""
            }
        </div>

    </>)
}
export default Weather