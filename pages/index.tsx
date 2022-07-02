import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { TimerContainer } from '../Components/TimerContainer'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { TimerInput } from '../Components/TimerInput'

const Home: NextPage = () => {
  const [newTime, setNewTime] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

 const timeToDays = time * 60 * 60 * 24 * 1000;

 let countDownDate = new Date().getTime() + timeToDays;
 useEffect(() => {


  var updateTime = setInterval(() => {
    var now = new Date().getTime();

    var difference = countDownDate - now;

    var newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    var newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    setDays(newDays);
    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(newSeconds);


    if (difference <= 0) {
      clearInterval(updateTime);
      setMessage("The Launch Has Started");
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  })

  return () => {
    clearInterval(updateTime);
  }

}, [time]);
const handleClick = () => {

  setTime(newTime);
  console.log(time);
  setNewTime(0);
};

const handleChange = (e: any) => {
  let inputTime = e.target.value;
  setNewTime(inputTime);

};




return (

<div className="flex min-h-screen flex-col items-center bg-[#1e1f29]">
      <Head>
        <title>Launch Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <Header message={message} />

      <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      <TimerInput value={newTime} handleClick={handleClick} handleChange={handleChange} />

      <Footer />
    </div>

)}

export default Home;

