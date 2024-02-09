const FormatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  export default FormatDate
  
//   const today = new Date();
//   const formattedDate = formatDate(today);
//   console.log(formattedDate); // Output: "07-02-2024"
  