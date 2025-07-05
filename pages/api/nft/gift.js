import { getThirdwebSDK } from "../../../utils/thirdweb";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { recipient } = req.body;
  if (!recipient)
    return res
      .status(400)
      .json({ error: "Recipient required" });

  try {
    const sdk = getThirdwebSDK();
    const nftContract = await sdk.getContract(
      process.env.NEXT_PUBLIC_MAZOLETS_NFT_CONTRACT,
    );
    // Mint and transfer NFT to recipient
    await nftContract.erc1155.mintTo(recipient, 1); // 1 = tokenId, can be dynamic
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        error: error.message || "NFT gifting failed",
      });
  }
}
