exports.ContactFormNotification = (name, email, phoneNo, message) => {
  return `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission</title>
            <style>
                body {
                    background-color: #ffffff;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.4;
                    color: #333333;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: left;
                }
        
                .logo {
                    max-width: 200px;
                    margin-bottom: 20px;
                }
        
                .message {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    text-align: center;
                }
        
                .body {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
        
                .highlight {
                    font-weight: bold;
                }
        
                .details {
                    margin-top: 20px;
                    border-top: 1px solid #eeeeee;
                    padding-top: 20px;
                }
        
                .footer {
                    font-size: 14px;
                    color: #999999;
                    margin-top: 20px;
                    text-align: center;
                }
        
                .footer a {
                    color: #333333;
                    text-decoration: none;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <a href="https://www.projakinfotech.com/"><img class="logo"
                        src="https://firebasestorage.googleapis.com/v0/b/projak-2024.appspot.com/o/FEVICON%2FfeviconProjak.jpg?alt=media&token=f13fc66e-f491-4393-a293-2e4c136b8789" alt="Projak Logo"></a>
                <div class="message">New Contact Form Submission</div>
                <div class="body">
                    <p>Hello PROJAK Team,</p>
                    <p>You have received a new message from the contact form on your website.</p>
                    <div class="details">
                        <p><span class="highlight">Name:</span> ${name}</p>
                        <p><span class="highlight">Email:</span> ${email}</p>
                        <p><span class="highlight">Phone Number:</span> ${phoneNo}</p>
                        <p><span class="highlight">Message:</span></p>
                        <p>${message}</p>
                    </div>
                    <p>Please respond to the user as soon as possible.</p>
                </div>
                <div class="footer">
                    <p><a href="https://www.projakinfotech.com/">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>`;
};
