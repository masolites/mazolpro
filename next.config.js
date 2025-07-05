module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    TOKEN_CONTRACT: process.env.TOKEN_CONTRACT
  }
};
