import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

let emailToken797;
const sendEmails = async (email, name, otp, extraInfo) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ashrafahmed797@gmail.com",
      pass: "dcwqvqaoecgvvfgm",
    },
  });
  //create token to confirm email and encode the newPass in the extraInfo parameter.
  //  if user forget Pass 
  jwt.sign({ email, extraInfo }, "emailConfirmToken", async (err, token) => {
    // creating unique token bearer and adding it to token string
    const tokenBearer = "emailConfirmToken " + token;
    const info = await transporter.sendMail({
      from: '"Job Search App 💼" <ashrafahmed797@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome to Job Search App ✔", // Subject line
      // text: "Hello world?", // plain text body,
      html: emailTemplate(tokenBearer, name, otp), // html body
    });
    console.log("Message sent: %s", info.messageId);
    // storing token with bearer variable and storing it as a module to use it across the app
    emailToken797 = tokenBearer;
  });
};
export { emailToken797, sendEmails };
