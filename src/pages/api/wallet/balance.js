import { getBalance } from "../../../lib/thirdweb";
export default async function handler(req, res) {
  const { wallet } = req.query;
  const balance = await getBalance(wallet);
  res.status(200).json({ balance });
}
