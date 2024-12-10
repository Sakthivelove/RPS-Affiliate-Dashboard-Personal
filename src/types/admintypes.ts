// types/index.ts or types/dataTypes.ts

export interface DataRow {
    id: number;           // The ID of the admin
    telegramId: string;   // The Telegram ID of the admin
    password: string;     // The encrypted password (or any other sensitive data you may have)
    ResetToken: string;   // The reset token for password reset
    ResetExpiry: string;  // Expiry date for the reset token
  }
  