const formatCurrency = (balance: string | number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
}).format(Number(balance)).replace('IDR', 'Rp');

export default formatCurrency