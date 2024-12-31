const { Purchase, PurchaseOrder,Sales,SalesOrder } = require('../models');

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

    res.status(201).json({ message: 'sales created successfully', sales });
    
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
