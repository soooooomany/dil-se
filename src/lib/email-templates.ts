interface EmailTemplateProps {
  name: string
  otp: number
}

export const getVerificationEmailTemplate = ({ name, otp }: EmailTemplateProps) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Dil Se!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for registering with Dil Se. To complete your registration, please use the following OTP:</p>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
        <strong>${otp}</strong>
      </div>
      <p>This OTP will expire in 30 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>The Dil Se Team</p>
    </div>
  `
}

export const getPasswordResetTemplate = ({ name, otp }: EmailTemplateProps) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Please use the following OTP to reset your password:</p>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
        <strong>${otp}</strong>
      </div>
      <p>This OTP will expire in 30 minutes.</p>
      <p>If you didn't request this, please contact our support team immediately.</p>
      <p>Best regards,<br>The Dil Se Team</p>
    </div>
  `
}