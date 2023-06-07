// Function to calculate the utilization rate of a resource
const calculateUtilizationRate = (usedQuantity, totalQuantity) => {
    if (usedQuantity < 0 || totalQuantity <= 0) {
      return null;
    }
  
    const utilizationRate = (usedQuantity / totalQuantity) * 100;
  
    return utilizationRate.toFixed(2);
  };
  
  // Function to format a date string to a user-friendly format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    return formattedDate;
  };
  
  // Function to send a counseling request notification
  const sendCounselingRequestNotification = (recipient, message) => {
    // Code to send a notification to the recipient
    console.log(`Notification sent to ${recipient}: ${message}`);
  };
  
  module.exports = {
    calculateUtilizationRate,
    formatDate,
    sendCounselingRequestNotification,
  };  