const cron = require('node-cron');
const RateMaster = require('./models/');

// Replace this with the logic to fetch the new rate
const fetchNewRate = async () => {
  // Example: Fetch rate from an external API or calculate based on logic
  return Math.random() * 100; // Random rate for demonstration
};

cron.schedule('0 1 * * *', async () => {
  console.log('Running Rate Master cron job at 1 AM...');
  try {
    // Delete old record
    await RateMaster.destroy({ where: {} });

    const newRate = await fetchNewRate();
    await RateMaster.create({ rate: newRate });

    console.log('Rate Master updated successfully with rate:', newRate);
  } catch (error) {
    console.error('Error in Rate Master cron job:', error);
  }
});



