import React, { useEffect, useState } from "react";
import { Button, Container } from "../components/index.js";
import { useSelector } from "react-redux";
function Profile() {
  const selector = useSelector((state) => state.user);
  const profileImage = selector.profileImage.profileImage;
  const [age, setAge] = useState("Calculating Age...");


  function calculateAge() {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const todayDate = date.toLocaleDateString();
    const DOB = new Date(selector.DOB);
    let years = date.getFullYear() - DOB.getFullYear();
    let months = date.getMonth() - DOB.getMonth();
    let days = date.getDate() - DOB.getDate();
    let hours = date.getHours() - DOB.getHours();
    let minutes = date.getMinutes() - DOB.getMinutes();
    let seconds = date.getSeconds() - DOB.getSeconds();
    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    // Adjust for negative minutes
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    // Adjust for negative hours
    if (hours < 0) {
      days--;
      hours += 24;
    }
    if (days < 0) {
      months--;
      const previousMonth = (date.getMonth() - 1 + 12) % 12;
      const daysInPreviousMonth = new Date(
        date.getFullYear(),
        previousMonth + 1,
        0
      ).getDate();
      days += daysInPreviousMonth;
      console.log(days);
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge(
      `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
    );
  
  }
  useEffect(() => {
    const timer = setInterval(() => {
      calculateAge();
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <Container flex={false} className="">
      <div className="w-1/2 h-1/4 flex bg-white shadow-2xl shad rounded-xl mx-auto">
        <div className="pl-10 pt-5 w-1/4">
          <img
            src={profileImage}
            className="rounded-full border-2 border-black "
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            alt="Profile Picture"
          />
        </div>
        <div className="pl-10 pt-10 w-3/4 ">
          <span className="font-serif font-bold text-xl block">
            {selector.name}
          </span>
          <span className="font-sans block">
            Current Weight : {selector.currentWeight + " Kgs"}
          </span>
          <span className="font-sans block text-sm">Age : {age}</span>
        </div>
        <Button className="h-10 w-auto relative right-10 top-32" >Update</Button>
      </div>
    </Container>
  );
}

export default Profile;
