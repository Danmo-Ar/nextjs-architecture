export const formatMoney = (money: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(money);
};
