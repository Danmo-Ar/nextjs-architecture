export const formatMoney = (money: number, currency: "XOF" = "XOF") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(money);
};
