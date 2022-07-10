import aws from "aws-sdk";

const ses = new aws.SES({
  region: "ap-southeast-2",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

export default async function handler(req, res) {
  const { name, email, subject, message } = req.body;

  sesSend("nd.marks00@gmail.com", email, message, name, subject)
    .then((val) => {
      res.status(200).send("Success");
    })
    .catch((err) => {
      res.status(400).send("/error" + err);
    });
}

function sesSend(emailTo, emailFrom, message, name, subject) {
  const params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${name}\nContact: ${emailFrom}\n\nMessage: ${message}`,
        },
      },
      Subject: {
        Data: `Subject: ${subject}`,
      },
    },
    Source: "chumbers.io.site@gmail.com",
  };

  return ses.sendEmail(params).promise();
}
