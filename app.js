const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const categoryRoutes = require('./routes/category');
const clientRoutes = require('./routes/client');
const purchaseRoutes=require('./routes/purchase');
const salesRoutes=require('./routes/sales');
const rateRoutes=require('./routes/rate');
const reportRoutes=require('./routes/report')
const bodyParser = require('body-parser');
require('./cron');
app.use(express.json());
app.use('/users', userRoutes);
app.use('/login',loginRoutes);
app.use('/category',categoryRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/clients', clientRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/sales',salesRoutes);
app.use('/rate',rateRoutes);
app.use('/report',reportRoutes)

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
