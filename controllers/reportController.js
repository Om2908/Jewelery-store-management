const { Purchase, PurchaseOrder,Sales,SalesOrder } = require('../models');
const Client=require('../models/client');
const { Op } = require('sequelize');
const { exportToCSV, exportToPDF } = require('../utils/index');



exports.getPurchaseCsvReport = async (req, res) => {
    try {
        const { page = 1, limit = 10, clientId, date_from, date_to } = req.query;

        let purchase={};
        if(clientId)
        {
        purchase=await Purchase.findOne({where:{clientId:clientId}});
        }
        // console.log(purchase);

        const  offset=(page-1)*limit;

        const whereClause = {};
        if (clientId && purchase) whereClause.purchaseId = purchase.id;
        if(!purchase)
            return res.json({msg:'data not found'});

        if (date_from && date_to) {
            whereClause.voucherDate = { [Op.between]: [date_from, date_to] };
        }

        const purchaseorders= await PurchaseOrder.findAndCountAll({
            where:whereClause,
            include: [{ model: Purchase, include: [ {model: Client, as: 'client'}] }],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    //    console.log("hello Deep",purchaseorders);

    const reportData = purchaseorders.rows.map(purchaseorders => ({
        clientName: purchaseorders.Purchase.client.name,
        CategoryName:purchaseorders.category,
        grossWeight: purchaseorders.grossWeight,
        netWeight: purchaseorders.netWeight,
        stoneWeight: purchaseorders.stoneWeight,
        rate:purchaseorders.rate,
        amount: purchaseorders.amount,
    }));


        return exportToCSV(res, reportData, 'purchasereport.csv');

        res.json({ data: purchaseorders});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch purchase reports' });
    }
};

exports.getPurchasePdfReport = async (req, res) => {
    try {
        const { page = 1, limit = 10, clientId, date_from, date_to } = req.query;

        let purchase={};
        if(clientId)
        {
        purchase=await Purchase.findOne({where:{clientId:clientId}});
        }
        // console.log(purchase);

        const  offset=(page-1)*limit;

        const whereClause = {};
        if (clientId && purchase) whereClause.purchaseId = purchase.id;
        if(!purchase)
            return res.json({msg:'data not found'});

        if (date_from && date_to) {
            whereClause.voucherDate = { [Op.between]: [date_from, date_to] };
        }

        const purchaseorders= await PurchaseOrder.findAndCountAll({
            where:whereClause,
            include: [{ model: Purchase, include: [ {model: Client, as: 'client'}] }],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    //    console.log("hello Deep",purchaseorders);

    const reportData = purchaseorders.rows.map(purchaseorders => ({
        clientName: purchaseorders.Purchase.client.name,
        CategoryName:purchaseorders.category,
        grossWeight: purchaseorders.grossWeight,
        netWeight: purchaseorders.netWeight,
        stoneWeight: purchaseorders.stoneWeight,
        rate:purchaseorders.rate,
        amount: purchaseorders.amount,
    }));

    return exportToPDF(res, reportData, 'purchase.hbs', 'purchasereport.pdf');

        
        res.json({ data: reportData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch purchase reports' });
    }
};


exports.getSalesPdfReport = async (req, res) => {
    try {
        const { page = 1, limit = 10, clientId, date_from, date_to } = req.query;

        let sale={};
        if(clientId)
        {
        sale=await Sales.findOne({where:{clientId}});
        }
        console.log(sale);

        const  offset=(page-1)*limit;

        const whereClause = {};
        if (clientId && sale) whereClause.salesId = sale.id;
        if(!sale)
            return res.json({msg:'data not found'});

        if (date_from && date_to) {
            whereClause.voucherDate = { [Op.between]: [date_from, date_to] };
        }

        const salesorders= await SalesOrder.findAndCountAll({
            where:whereClause,
            include: [{ model:Sales, include: [ {model: Client, as: 'client'}] }],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    // //    console.log("hello Deep",purchaseorders);

    const reportData = salesorders.rows.map(salesorders => ({
        clientName: salesorders.Sale.client.name,
        CategoryName:salesorders.category,
        grossWeight: salesorders.grossWeight,
        netWeight: salesorders.netWeight,
        stoneWeight:salesorders.stoneWeight,
        rate:salesorders.rate,
        amount: salesorders.amount,
    }));
    return exportToPDF(res, reportData,'sales.hbs','salesreport.pdf');


        
        res.json({ data: reportData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sales reports' });
    }
};

exports.getSalesCsvReport = async (req, res) => {
    try {
        const { page = 1, limit = 10, clientId, date_from, date_to } = req.query;

        let sale={};
        if(clientId)
        {
        sale=await Sales.findOne({where:{clientId}});
        }
        console.log(sale);

        const  offset=(page-1)*limit;

        const whereClause = {};
        if (clientId && sale) whereClause.salesId = sale.id;
        if(!sale)
            return res.json({msg:'data not found'});

        if (date_from && date_to) {
            whereClause.voucherDate = { [Op.between]: [date_from, date_to] };
        }

        const salesorders= await SalesOrder.findAndCountAll({
            where:whereClause,
            include: [{ model:Sales, include: [ {model: Client, as: 'client'}] }],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    // //    console.log("hello Deep",purchaseorders);

    const reportData = salesorders.rows.map(salesorders => ({
        clientName: salesorders.Sale.client.name,
        CategoryName:salesorders.category,
        grossWeight: salesorders.grossWeight,
        netWeight: salesorders.netWeight,
        stoneWeight:salesorders.stoneWeight,
        rate:salesorders.rate,
        amount: salesorders.amount,
    }));
    return exportToCSV(res, reportData, 'sales_report.csv');

        res.json({ data: reportData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sales reports' });
    }
};

exports.getBalanceSheetPdfReport = async (req, res) => {
    try {

        const purchases = await Purchase.findAll({
          
            include: [{ model: Client, as: 'client' }],
        });


        const sales = await Sales.findAll({
            
            include: [{ model: Client, as: 'client' }],
        });

        const reportData = [];

        purchases.forEach(purchase => {
            reportData.push({
                party_name: purchase.client.name,
                credit: purchase.totalInvoiceAmount,
                debit: 0,
            });
            reportData.push({
                party_name: purchase.oppositeAccountName,
                credit: 0,
                debit: purchase.totalInvoiceAmount,
            });
        });

        sales.forEach(sale => {
            reportData.push({
                party_name: sale.client.name,
                credit: 0,
                debit: sale.totalInvoiceAmount,
            });
            reportData.push({
                party_name: sale.oppositeAccountName,
                credit: sale.totalInvoiceAmount,
                debit: 0,
            });
        });

        const totalCredit = reportData.reduce((sum, row) => sum + parseFloat(row.credit), 0);
        const totalDebit = reportData.reduce((sum, row) => sum + parseFloat(row.debit), 0);

        reportData.push({
            party_name: 'Total',
            credit: totalCredit,
            debit: totalDebit,
        });


        return exportToPDF(res, reportData, 'balance.hbs', 'balancesheet.pdf');
         res.json({data:purchases})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch balance sheet report' });
    }
};

exports.getBalanceSheetCsvReport = async (req, res) => {
    try {

        const purchases = await Purchase.findAll({
          
            include: [{ model: Client, as: 'client' }],
        });


        const sales = await Sales.findAll({
            
            include: [{ model: Client, as: 'client' }],
        });

        const reportData = [];

        purchases.forEach(purchase => {
            reportData.push({
                party_name: purchase.client.name,
                credit: purchase.totalInvoiceAmount,
                debit: 0,
            });
            reportData.push({
                party_name: purchase.oppositeAccountName,
                credit: 0,
                debit: purchase.totalInvoiceAmount,
            });
        });

        sales.forEach(sale => {
            reportData.push({
                party_name: sale.client.name,
                credit: 0,
                debit: sale.totalInvoiceAmount,
            });
            reportData.push({
                party_name: sale.oppositeAccountName,
                credit: sale.totalInvoiceAmount,
                debit: 0,
            });
        });

        const totalCredit = reportData.reduce((sum, row) => sum + parseFloat(row.credit), 0);
        const totalDebit = reportData.reduce((sum, row) => sum + parseFloat(row.debit), 0);

        reportData.push({
            party_name: 'Total',
            credit: totalCredit,
            debit: totalDebit,
        });

        

        return exportToCSV(res, reportData, 'balancesheet.csv');
        res.json({data:{reportData}});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch balance sheet report' });
    }
};