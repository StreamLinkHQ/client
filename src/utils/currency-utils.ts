import axios from "axios";

export const getCurrentSolRate = async (currency: string) => {
  try {
    const formatCurrency = currency.toLowerCase();
    const currencyMap: { [key: string]: string } = {
      eur: "eur",
      cny: "cny",
      gbp: "gbp",
      ngn: "ngn",
      usd: "usd",
    };
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${formatCurrency}`
    );

    const rate = res.data.solana[currencyMap[formatCurrency]];
    return rate;
  } catch (error) {
    console.log(error);
  }
};
