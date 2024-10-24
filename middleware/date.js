function convertToDDMMYYYY(dateString) {
    const dateParts = dateString.split("-"); // Split the YYYY-MM-DD format
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    
    // Return in DD-MM-YYYY format
    return `${day}-${month}-${year}`;
  }

module.exports = convertToDDMMYYYY;

