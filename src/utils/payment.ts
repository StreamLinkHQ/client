const calculateWinnings = (totalAmount: number, winners: number) => {
  let percentages: number[] = [];
  switch (winners) {
    case 1:
      percentages = [100];
      break;
    case 3:
      percentages = [50, 30, 20];
      break;
    case 5:
      percentages = [20, 20, 20, 20, 20];
      break;

    default:
      throw new Error("Unsupported number of winners");
      break;
  }
  const winnings = percentages.map(
    (percentage) => (totalAmount * percentage) / 100
  );
  return winnings;
};

export const getWinners = (data: any) => {
  console.log(data)
  try {
    const res = data.sort((a: any, b: any) => b.score - a.score).slice(0, data[0]?.quiz?.numberOfWinners);
    const winnings = calculateWinnings(data[0]?.quiz?.reward, data[0]?.quiz?.numberOfWinners);

    const winners = winnings.map((w, i) => ({
      amount: w,
      wallet: res[i].user.walletAddress,
      userId: res[i].user.id,
    }));
    return winners;
  } catch (error) {
    console.log(error);
  }
};
