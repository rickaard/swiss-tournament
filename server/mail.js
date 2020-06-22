const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const sendMailWithLinks = (emailAdress, tournamentId, authId) => {
    const transporter = nodeMailer.createTransport(smtpTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secureConnection: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    }));

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: emailAdress,
        subject: `Your tournament-links from swisstournaments.com`,
        text: `Hello! \n
Here's the links to your generated swiss tournament:
Admin page: https://app.swisstournaments.com/tournament/${tournamentId}?auth=${authId} 
Display page: https://app.swisstournaments.com/tournament/${tournamentId} \n

Good luck and have fun in your tournament!
`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        transporter.close();
        if (err) {
            console.log('ERROR från mejl: ', err)
        } else {
            console.log('success från mejl: ', info);
        }
    })
};

module.exports = sendMailWithLinks;