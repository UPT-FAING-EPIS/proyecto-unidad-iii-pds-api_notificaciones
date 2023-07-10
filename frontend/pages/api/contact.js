import { mailOptions, transporter } from "../../config/nodemailer";

const CONTACT_MESSAGE_FIELDS = {
  email: "Para",
  subject: "Servicio",
  message: "Monto",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Notificación</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <style type="text/css">
        body, table, td, a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table {
          border-collapse: collapse !important;
        }
    
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          font-family: Arial, sans-serif;
          background-color: #f8f8f8;
        }
    
        .wrapper {
          width: 100% !important;
          max-width: 600px !important;
          margin: 0 auto;
        }
    
        .main {
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 30px;
        }
    
        h2 {
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }
    
        .form-container {
          margin-bottom: 24px;
        }
    
        .form-heading {
          color: #555;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }
    
        .form-answer {
          color: #333;
          font-size: 16px;
          margin-bottom: 24px;
        }
        .red-text {
          color: red;
          font-size: 20px;
        }
        .pt{
          font-size: 20px;
        }
        .n{
          font-size: 25px;
        }
        .footer {
          background-color: #f8f8f8;
          padding: 10px 20px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main">
          <h2>Notificación</h2>
          <p class="pt">Realiza tus pagos y <span class="red-text">evita la suspensión de tu servicio</span></p>
          <div class="form-container">
            ${htmlData}
          </div>
        </div>
        <div class="footer">
          Este mensaje es una notificación. Por favor, no responda a este correo electrónico.
        </div>
      </div>
    </body>
    </html>
  `};
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.email || !data.subject || !data.message) {
      return res.status(400).json({ message: "Bad request" });
    }

    try {
      const emailContent = generateEmailContent(data);
      const customMailOptions = {
        ...mailOptions,
        ...emailContent,
        subject: data.subject,
        to: req.body.email, // Utilizar req.body.email como el destinatario
      };

      await transporter.sendMail(customMailOptions);

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};

export default handler;
