
// lib/auth.js

// Dummy authentication/session function for development and build success.
// Replace with real authentication logic as needed.

export async function getSession(req) {
  // Always returns a dummy user for now.
  return {
    user: {
      _id: "demo-user-id",
      wallet: "0x0000000000000000000000000000000000000000",
      isGold: false,
      hasPurchased: true,
    },
  };
}
