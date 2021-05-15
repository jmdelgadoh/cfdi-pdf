export const formatCurrency = (currency: number | string) =>
    Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' }).format(
        Number(currency),
    );

export const breakEveryNCharacters = (str = '', n = 86) => {
    const arr = str.match(new RegExp(`.{1,${n}}`, 'g'));
    let result = str;
    if (arr) {
        result = arr.reduce((a, b) => {
            const check = b.substr(0, Math.floor(n / 3));
            if (a.length + b.length < n || check.includes('+') || check.includes('|')) {
                return `${a}${b}`;
            }
            return `${a}\n${b}`;
        });
    }
    return result;
};
