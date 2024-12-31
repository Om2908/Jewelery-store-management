const RateMaster = require('../models/rate');
const upsertRateMaster = async (req, res) => {
  const { rate } = req.body;

  if (typeof rate !== 'number' || rate <= 0) {
    return res.status(400).json({ error: 'Rate must be a positive number.' });
  }

  try {
    await RateMaster.destroy({truncate:true})

    const newRate = await RateMaster.create({ rate });

    res.status(200).json({ message: 'Rate Master updated successfully', newRate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the Rate Master.' });
  }
};

const getRateMaster = async (req, res) => {
    try {
      const rateMaster = await RateMaster.findOne();
  
      if (!rateMaster) {
        return res.status(404).json({ error: 'Rate Master not found.' });
      }
  
      res.status(200).json({ rateMaster });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the Rate Master.' });
    }
  };
  
  const deleteRateMaster = async (req, res) => {
    try {
      await RateMaster.destroy({ where: {} });
      res.status(200).json({ message: 'Rate Master deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the Rate Master.' });
    }
  };
  
  module.exports={getRateMaster,upsertRateMaster,deleteRateMaster}