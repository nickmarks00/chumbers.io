import aws from "aws-sdk";

const ses = new aws.SES({ region: "ap-southeast-2" });

export default async function handler(req, res) {
  const { name, email, subject, message } = req.body;

  console.log(req.body);

  sesSend("nd.marks00@gmail.com", email, message, name, subject)
    .then((val) => {
      console.log(`SES Returned ${val}`);
      res.send("Success");
    })
    .catch((err) => {
      res.send("/error" + err);
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
          Data: `Name: ${name}\n Contact: ${emailFrom}\n\n Message: ${message}`,
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
