import nodemailer from "nodemailer";
import getEnv from "../config/getEnv";
export const transport = nodemailer.createTransport({
  host: getEnv("MAIL_HOST", null),
  port: getEnv("MAIL_PORT", null),
  auth: {
    user: getEnv("MAIL_USER", null),
    pass: getEnv("MAIL_PASS", null),
  },
});

export const makeANiceEmail = (text: string) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
    <h2>Hello There!</h2>
    <p>${text}</p>

    <p>Gbolahan</p>

  </div>
`;

