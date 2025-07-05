/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
    FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    TOKEN_CONTRACT: process.env.TOKEN_CONTRACT
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
