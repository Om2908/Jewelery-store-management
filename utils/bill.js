const json2csv = require('json2csv').parse;
const pdf = require('html-pdf');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

hbs.registerHelper('eq', (a, b) => a === b);

exports.exportToPDF = async(res, data,totalAmount, templateName,email) => {
    console.log(__dirname);
    const templatePath = path.resolve(__dirname, `../templates/${templateName}`);
    console.log(templatePath);
    const templateHtml = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = hbs.compile(templateHtml);

    const html = compiledTemplate({ data,totalAmount,clientName:data[0].clientName });

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'omitaliya63@gmail.com', 
    pass: 'xnbk vsmg fqnb xzaq', 
  },
});

const mailOptions = {
  from: 'omitaliya63@gmail.com', 
  to: email,
  subject: 'jewelry bill', 
  html: html, 
};
try{
    let bill= await transporter.sendMail(mailOptions);
    res.json({bill})
   }
catch(error){
    res.json(error);
}
};


