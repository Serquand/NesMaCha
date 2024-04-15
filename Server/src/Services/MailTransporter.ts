import nodemailer, { Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
    service: process.env.SERVICE_MAIL as string, 
    auth: { 
        user: process.env.USER_MAIL as string,
        pass: process.env.PASS_MAIL as string
    }, 
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;