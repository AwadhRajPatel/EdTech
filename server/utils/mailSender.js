const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),   // ✅ ADD THIS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    // ✅ ADD THESE 2 LINES HERE
    await transporter.verify();
    console.log("SMTP Connected Successfully");

    let info = await transporter.sendMail({
      from: `"StudyNotion By Awadh Raj Patel" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    })

    // ✅ CHANGE THIS
    console.log("Email Info:", info)

    return info
  } catch (error) {
    // ✅ CHANGE THIS
    console.error("Mail Error:", error)
    return error
  }
}

module.exports = mailSender





/*
const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: `"StudyNotion By Awadh Raj Patel " <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender
*/