const secondsHand = document.querySelector(".second-hand");
const minutesHand = document.querySelector(".min-hand");
const hoursHand = document.querySelector(".hour-hand");

function clockTiming() {
  const currentDate = new Date();

  const seconds = currentDate.getSeconds();
  const secondsDegree = (seconds / 60) * 360 + 90;
  secondsHand.style.transform = `rotate(${secondsDegree}deg)`;

  const minutes = currentDate.getMinutes();
  const minutesDegree = (minutes / 60) * 360 + 90;
  minutesHand.style.transform = `rotate(${minutesDegree}deg)`;

  const hours = currentDate.getHours();
  const hoursDegree = (hours / 60) * 360 + 90;
  hoursHand.style.transform = `rotate(${hoursDegree}deg)`;
  console.log(seconds);
}

setInterval(clockTiming, 1000);
