const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const templates = {
    password_reset_confirm: "d-cb18b9992569475a80e335653422e67a",
};

function sendEmail(data) {
    const msg = {
        to: data.receiver,
        from: data.sender,
        templateId: templates[data.templateName],
        dynamic_template_data: {
            subject: data.subject,
            name: data.name,
            confirm_account_url: data.confirm_account__url || "",
            reset_password_url: data.reset_password_url || ""
        }
    };
    sgMail.send(msg, (error, result) => {
        if (error) {
            console.log(error)
            return new Error(error);
        } else {
            console.log(result)
            return result;
        }
    });
}

exports.sendEmail = sendEmail;
