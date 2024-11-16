import nodemailer from 'nodemailer';
import createMail from './createMail.js';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default async function sendMail(req, res) {
    try {
        const {
            username,
            userEmail,
            subject,
            mailType,
            bloodGroup,
            units,
            urgency,
            specialRequirements,
            medicalReason,
            transfusionDateTime,
            hospitalName,
            otp
        } = req.body;

        const fromAddress = `Blood Safe Life 🩸 <${process.env.EMAIL}>`;
        const toAddress = `${username} <${userEmail}>`;

        // Include the new data in the `mailHtml` by passing it to `createMail`
        const mailHtml = createMail(mailType, {
            username,
            bloodGroup,
            units,
            urgency,
            specialRequirements,
            medicalReason,
            transfusionDateTime,
            hospitalName,
            otp
        });

        const email = {
            from: fromAddress,
            to: toAddress,
            subject: subject,
            html: mailHtml,
        };

        transporter
            .sendMail(email)
            .then(() => res.status(200).send({ msg: 'Email sent successfully' }))
            .catch((err) => res.status(500).send({ error: 'Email not sent', err }));
    } catch (err) {
        res.status(401).send(err);
    }
}
