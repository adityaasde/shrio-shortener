import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Action Required</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #222;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    padding: 30px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    line-height: 1.6;
  }
  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #000;
  }
  p {
    margin: 15px 0;
    font-size: 15px;
  }
  .button {
    display: inline-block;
    background-color: #000;
    color: #ffffff !important;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0;
  }
  .button:hover {
    background-color: #333;
  }
  a {
    color: #000;
    text-decoration: underline;
  }
  .footer {
    margin-top: 30px;
    font-size: 13px;
    color: #666;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Hello Shrio User,</h1>
    <p>{{messageBody}}</p>

    <p style="text-align:center;">
      <a href="{{actionLink}}" class="button">{{buttonText}}</a>
    </p>

    <p>If the button doesn’t work, copy and paste this link into your browser:</p>
    <p><a href="{{actionLink}}">{{actionLink}}</a></p>

    <div class="footer">
      <p>Thanks,<br>The Shrio Team</p>
    </div>
  </div>
</body>
</html>
`;

export const sendMailUser = async (to, token, type) => {
  try {
    let messageBody, buttonText, subject;
    if (type == "verify") {
      messageBody =
        "Please verify your email to activate your account, This link will expire in 5 minutes";
      buttonText = "Verify Email";
      subject = "Verify Your Email";
    } else {
      messageBody =
        "Click the button below to reset to your password, This link will expire in 5 minutes!";
      buttonText = "Reset Password";
      subject = "Reset Your Password";
    }

    const lastLink = `${process.env.BASE_URL}/auth/confirm-mail/${token}`;

    const html = template
      .replace("{{messageBody}}", messageBody)
      .replace(/{{actionLink}}/g, lastLink)
      .replace("{{buttonText}}", buttonText);

    const info = await transporter.sendMail({
      from: `Shrio`,
      to: to,
      subject,
      html,
    });

    console.log("Email sent :", to);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
