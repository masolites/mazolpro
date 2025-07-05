 import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  // For demo, return test user data
  res.status(200).json({
    tokens: 1500,
    stage: 3,
    isBuyer: true,
    address: null,
  });
}
