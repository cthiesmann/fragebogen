import 'dotenv/config'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

const transporter = nodemailer.createTransport(
  {
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  },
  {
    from: process.env.EMAIL,
    subject: process.env.SUBJECT,
  }
)

// Load email addresses and mail body
const emails = fs.readFileSync(path.join(__dirname, 'emails.csv'), 'utf-8').split('\n')
const content = fs.readFileSync(path.join(__dirname, 'mail.html'), 'utf-8')
console.log(emails)
// Send mail for each email
for(let email of emails){
  if(!/[\w.-]+@[\w.-]+.[a-zA-Z]+/.test(email)){
    console.log(`Invalid email:'${email}'`)
    continue
  }
  try {
    transporter.sendMail({ to: email, html: content })
  }
  catch (err) {
    console.error(err);
  }
}
