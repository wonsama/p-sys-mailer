require("dotenv").config();

const SMTP_SERVER = process.env.SMTP_SERVER;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_TO = process.env.MAIL_TO;

const config = {
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
};
const mail = {
  from: MAIL_FROM,
  to: MAIL_TO,
};

module.exports = { config, mail };
