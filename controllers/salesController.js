const { Purchase, PurchaseOrder,Sales,SalesOrder } = require('../models');
const Client=require('../models/client')
const {exportToPDF}=require('../utils/bill')
const createSales = async (req, res) => {
  const { voucherDate, clientId, oppositeAccountName, orders } = req.body;

  try {

    let totalInvoiceAmount= 0;
      orders.forEach(order => {
        const value=order.netWeight*order.rate;
          const val=value/10;
        totalInvoiceAmount+= val;
    });
    const sales = await Sales.create({
      voucherDate,
      clientId,
      totalInvoiceAmount
    });

    orders.forEach(order => {
      order.salesId = sales.id;
      order.amount=(order.netWeight * order.rate)/10
    });

    await SalesOrder.bulkCreate(orders);

    let sale={};
    if(sales.clientId)
    {
    sale=await Sales.findOne({where:{clientId:sales.clientId}});
    }
    console.log(sale);

    const whereClause = {};
    if (sales.clientId && sale) whereClause.salesId = sale.id;
    if(!sale)
        return res.json({msg:'data not found'});

   

    const salesorders= await SalesOrder.findAndCountAll({
        where:whereClause,
        include: [{ model:Sales, include: [ {model: Client, as: 'client'}] }],
       
    });

const reportData = salesorders.rows.map(salesorders => ({
    clientName: salesorders.Sale.client.name,
    CategoryName:salesorders.category,
    grossWeight: salesorders.grossWeight,
    netWeight: salesorders.netWeight,
    stoneWeight:salesorders.stoneWeight,
    rate:salesorders.rate,
    amount: salesorders.amount,
}));
//  console.log(salesorders.rows[0].Sale.client.email);
let totalamount=0;
    reportData.forEach((reportData)=>totalamount+=reportData.amount)
    return exportToPDF(res, reportData,totalamount, 'salesbill.hbs',salesorders.rows[0].Sale.client.email);
   res.json({salesorders})
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const listSales = async (req, res) => {
  const { page = 1, limit = 10, clientId, startDate, endDate } = req.query;
  const offset = (page - 1) * limit;

  try {
    const whereClause = {};

    if (clientId) whereClause.clientId = clientId;
    if (startDate && endDate) whereClause.voucherDate = { [Sequelize.Op.between]: [startDate, endDate] };

    const sales = await Sales.findAndCountAll({
      where: whereClause,
      include: SalesOrder,
      order: [['voucherDate', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      data: sales.rows,
      total: sales.count,
      currentPage: page,
      totalPages: Math.ceil(sales.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewSales = async (req, res) => {
  const { id } = req.params;

  try {
    const sales = await Sales.findOne({
      where: { id },
      include: SalesOrder
    });

    if (!sales) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSales, listSales, viewSales };
