import { ThirdwebSDK } from "thirdweb";
const sdk = new ThirdwebSDK("binance"); // Use "binance" for BSC mainnet

const contractAddress =
  "0x49F4a728BD98480E92dBfc6a82d595DA9d1F7b83";

export async function sendTokens(to, amount) {
  const contract = await sdk.getContract(contractAddress);
  return contract.erc20.transfer(to, amount);
}

export async function burnTokens(amount) {
  const contract = await sdk.getContract(contractAddress);
  return contract.erc20.burn(amount);
}

export async function getBalance(address) {
  const contract = await sdk.getContract(contractAddress);
  return contract.erc20.balanceOf(address);
}
