import nodemailer from "nodemailer";
import crypto from "crypto";
import express from "express";
import { success, reject } from "../../response.js";

const sendEmail = async (receiver, title, content) => {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'twodev.assistance@gmail.com',
            pass: 'mqlw jdrw vksr pbst'
        }
    }

    const msg = {
        from: 'twodev.assistance@gmail.com',
        to: `${receiver}`,
        subject: `${title}`,
        html: `${content}
      `
    }

    const transport = nodemailer.createTransport(config);
    await transport.sendMail(msg);
}

const generateToken = () => crypto.randomBytes(8).toString('hex');

const htmlToken = (tokenGenerated) => `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 0; padding: 20px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); padding: 30px;">
                                <tr>
                                    <td align="center" style="font-size: 24px; color: #2c3e50; padding-bottom: 20px;">
                                        <img src="https://i.ibb.co/Gp2wwkY/logo.png" alt="True Gaming" style="max-width: 200px; margin-bottom: 20px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px; color: #7f8c8d; text-align: center; padding-bottom: 30px;">
                                        Por favor, ingrese el siguiente token para la verificación de su cuenta.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <div style="font-size: 20px; font-weight: bold; color: #e74c3c; background-color: #ecf0f1; border-radius: 5px; padding: 15px; display: inline-block;">
                                            ${tokenGenerated}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
`;

const executeToken = async (receiver, title, tokenGenerated) => {
    const content = htmlToken(tokenGenerated);
    await sendEmail(receiver, title, content);
}

const sendToken = express.Router();

sendToken.post('/:email/:title', (req, res) => {
    const email = decodeURIComponent(req.params.email);
    const title = req.params.title;
    const tokenGenerated = generateToken();

    executeToken(email, title, tokenGenerated)
        .then(answer => {
            const response = {
                data: {
                    message: tokenGenerated,
                    email: email
                }
            };
            success(req, res, response, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

const htmlChange = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 0; padding: 20px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); padding: 30px;">
                                <tr>
                                    <td align="center" style="font-size: 24px; color: #2c3e50; padding-bottom: 20px;">
                                        <img src="https://i.ibb.co/Gp2wwkY/logo.png" alt="True Gaming" style="max-width: 200px; margin-bottom: 20px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px; color: #7f8c8d; text-align: center; padding-bottom: 30px;">
                                        Se ha cambiado tu contraseña.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
`;

const sendChange = express.Router();
sendChange.post('/:email/:title', async (req, res) => {
    const email = decodeURIComponent(req.params.email);
    const title = req.params.title;

    await sendEmail(email, title, htmlChange)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

const htmlNotification = (user1, user2) => `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 0; padding: 20px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); padding: 30px;">
                                <tr>
                                    <td align="center" style="font-size: 24px; color: #2c3e50; padding-bottom: 20px;">
                                        <img src="https://i.ibb.co/Gp2wwkY/logo.png" alt="True Gaming" style="max-width: 200px; margin-bottom: 20px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px; color: #7f8c8d; text-align: center; padding-bottom: 30px;">
                                        Hola ${user1}. Parece que ${user2} ha publicado una nueva reseña, ven a echarle un vistazo.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
`;

const executeNotification = async (receiver, title, user1, user2) => {
    try {
        const content = htmlNotification(user1, user2);
        await sendEmail(receiver, title, content);
    } catch (error) {
        console.error("Error in executeNotification:", error);
        throw error;
    }
};


const sendNotification = express.Router()

sendNotification.post('/:email/:title/:user1/:user2', async (req, res) => {
    const email = decodeURIComponent(req.params.email);
    const title = req.params.title;
    const user1 = req.params.user1;
    const user2 = req.params.user2;
    console.log(email,title,user1,user2)


    await executeNotification(email, title, user1, user2)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

export const sendEmails = {
    sendToken,
    sendChange,
    sendNotification
};