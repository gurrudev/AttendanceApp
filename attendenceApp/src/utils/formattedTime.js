const FormatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
  
    // Ensure minutes always have two digits
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${minutes} ${ampm}`;
  }
  
  export default FormatTime
  
//   const currentTime = new Date();
//   const formattedTime = formatTime(currentTime);
//   console.log(formattedTime); // Output: "10:12 PM"
  