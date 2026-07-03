export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        currency: "BDT",
        style: "currency"
    }).format(amount)
}