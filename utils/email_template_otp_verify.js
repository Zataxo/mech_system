module.exports.emailHtmlTemplate = {
    otpVerification: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your OTP Code - Mech Org</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-wrapper {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
            overflow: hidden;
        }
        .header {
            background-color: #003366;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px 25px;
            line-height: 1.6;
        }
        .otp-box {
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            background-color: #f0f8ff;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            letter-spacing: 3px;
            border-radius: 6px;
        }
        .footer {
            background-color: #f1f1f1;
            color: #777;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
    </style>
</head>
<body>
<div class="email-wrapper">
    <div class="header">
        <h2>Mech Org</h2>
    </div>
    <div class="content">
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) is below. Please use this code to continue your verification process. This code is valid for a limited time.</p>

        <div class="otp-box">{{OTP_CODE}}</div>

        <p>If you did not request this code, please ignore this email.</p>
    </div>
    <div class="footer">
        &copy; 2025 Mech Org. All rights reserved.<br>
        This message was sent to {{USER_EMAIL}}.
    </div>
</div>
</body>
</html>
`,
    verifiedAccount: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Mech Org</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .header {
      background-color: #003366;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px 25px;
      line-height: 1.6;
    }
    .highlight {
      background-color: #e6f7ff;
      padding: 12px;
      border-left: 4px solid #007bff;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      background-color: #f1f1f1;
      color: #777;
      text-align: center;
      padding: 15px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h2>Mech Org</h2>
    </div>
    <div class="content">
      <p>Hello {{USER_NAME}},</p>
      <p>🎉 Your account has been successfully verified. Welcome to <strong>Mech Org</strong> — we're excited to have you onboard!</p>

      <div class="highlight">
        You can now access all features and get started using our platform.
      </div>

      <p>If you ever need help, feel free to reach out to our support team. We're here for you.</p>

      <p>Let’s build something great together,<br>The Mech Org Team</p>
    </div>
    <div class="footer">
      &copy; 2025 Mech Org. All rights reserved.<br>
      This message was sent to {{USER_EMAIL}}.
    </div>
  </div>
</body>
</html>`
}
