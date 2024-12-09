// services/user/userService.ts
import { api } from "../../api/api"; // Import the Axios API instance

// Define a type for the user data returned from the API
export interface User {
  id: string;               // Unique identifier for the user
  walletId: string;         // User's wallet ID
  referralCode: string;     // User's referral code
  playerId: string;         // Player ID associated with the user
  userName: string;         // The user's name (or username)
  avatarGender?: string;    // Gender associated with the user's avatar (optional)
  userAvatar?: string;      // URL of the user's avatar (optional)
  avatarName?: string;      // Avatar's name (optional)
  nftAddress?: string;      // NFT address (optional)
  email?: string;           // User's email address (optional)
  playerLevel?: number;     // Player level (optional)
  adminWallet?: string | null; // Admin wallet address (optional, could be null)
  rockUSDPrice?: number | null; // USD price in rock (optional, could be null)
  telegramLink?: string;    // Telegram link associated with the user (optional)
  XLink?: string;           // Another link (optional)
  defaultMove?: string;     // Default move for the user (optional)
  telegramId: string;      // User's Telegram ID
  xUserName?: string;       // External username (optional)
  userToken?: string;       // Token associated with the user (optional)
  totalWinAmount?: number;  // Total win amount for the user (optional)
  isAvatarCreated?: boolean; // Whether the user's avatar is created (optional)
  createdOn?: string;       // The timestamp when the user was created (optional)
  password?: string;        // User's password (optional)
  ResetToken?: string;      // Reset token for password reset (optional)
  ResetExpiry?: string;     // Expiry timestamp for the reset token (optional)
}

// Define a type for the paginated response data
export interface UsersResponse {
  users: User[];   // Array of user objects
  total: number;    // Total number of users available in the database
}

// Fetch users from the API with pagination parameters (page and limit)
export const fetchUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  try {
    // Make the API call using the Axios instance (`api`)
    const response = await api.get<UsersResponse>('/users', {
      params: {       // Include pagination params in the query string
        page,
        limit
      }
    });

    // Return the data received from the API response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    throw new Error('Error fetching users: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};
