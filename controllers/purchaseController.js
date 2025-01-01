const { Purchase, PurchaseOrder } = require('../models');
const Client=require('../models/client')
const {exportToPDF}=require('../utils/bill');

const createPurchase = async (req, res) => {
  const { voucherDate, clientId, oppositeAccountName, orders } = req.body;

  try {

    let totalInvoiceAmount= 0;
      orders.forEach(order => {
        const value=order.netWeight*order.rate;
          const val=value/10;
        totalInvoiceAmount+= val;
        console.log(totalInvoiceAmount)
    });
    const purchase = await Purchase.create({
      voucherDate,
      clientId,
      oppositeAccountName,
      totalInvoiceAmount
    });

    orders.forEach(order => {
      order.purchaseId = purchase.id;
      order.amount=(order.netWeight * order.rate)/10
    });

    await PurchaseOrder.bulkCreate(orders);

    let pur={};
        if(purchase.clientId)
        {
        pur=await Purchase.findOne({where:{clientId:purchase.clientId}});
        }

        const whereClause = {};
        if (purchase.clientId && pur) whereClause.purchaseId = pur.id;
        if(!pur)
            return res.json({msg:'data not found'});


        const purchaseorders= await PurchaseOrder.findAndCountAll({
            where:whereClause,
            include: [{ model: Purchase, include: [ {model: Client, as: 'client'}] }],
           
        });
    //    console.log("om",purchaseorders);

    const reportData = purchaseorders.rows.map(purchaseorders => ({
        clientName: purchaseorders.Purchase.client.name,
        CategoryName:purchaseorders.category,
        grossWeight: purchaseorders.grossWeight,
        netWeight: purchaseorders.netWeight,
        stoneWeight: purchaseorders.stoneWeight,
        rate:purchaseorders.rate,
        amount: purchaseorders.amount,
    }));

    // console.log(purchaseorders.rows[0].Purchase.client.email);
    let totalamount=0;
    reportData.forEach((reportData)=>totalamount+=reportData.amount)
    return exportToPDF(res, reportData,totalamount, 'purchasebill.hbs',purchaseorders.rows[0].Purchase.client.email);
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const listPurchases = async (req, res) => {
  const { page = 1, limit = 10, clientId, startDate, endDate } = req.query;
  const offset = (page - 1) * limit;

  try {
    const whereClause = {};

    if (clientId) whereClause.clientId = clientId;
    if (startDate && endDate) whereClause.voucherDate = { [Sequelize.Op.between]: [startDate, endDate] };

    const purchases = await Purchase.findAndCountAll({
      where: whereClause,
      include: PurchaseOrder,
      order: [['voucherDate', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      data: purchases.rows,
      total: purchases.count,
      currentPage: page,
      totalPages: Math.ceil(purchases.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewPurchase = async (req, res) => {
  const { id } = req.params;

  try {
    const purchase = await Purchase.findOne({
      where: { id },
      include: PurchaseOrder
    });

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPurchase, listPurchases, viewPurchase };
