const cron = require('node-cron');
const RateMaster = require('./models/');
const fetchNewRate = async () => {
  return Math.random() * 100; 
};

cron.schedule('0 1 * * *', async () => {
  console.log('Running Rate Master cron job at 1 AM...');
  try {
    await RateMaster.destroy({ where: {} });

    const newRate = await fetchNewRate();
    await RateMaster.create({ rate: newRate });

    console.log('Rate Master updated successfully with rate:', newRate);
  } catch (error) {
    console.error('Error in Rate Master cron job:', error);
  }
});



