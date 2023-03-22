const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD"
});

export default function FormatCurrency(num: number): string {
  return CURRENCY_FORMATTER.format(num);
}