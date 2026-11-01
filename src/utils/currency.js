export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rate: 0.0121, label: 'USD ($)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0097, label: 'GBP (£)' },
  AED: { code: 'AED', symbol: 'د.إ', rate: 0.0445, label: 'AED (د.إ)' },
};

export const formatPrice = (inrAmount, currencyCode = 'INR') => {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = inrAmount * curr.rate;
  
  if (currencyCode === 'INR') {
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  } else if (currencyCode === 'USD') {
    return `$${Math.round(converted).toLocaleString('en-US')}`;
  } else if (currencyCode === 'GBP') {
    return `£${Math.round(converted).toLocaleString('en-GB')}`;
  } else if (currencyCode === 'AED') {
    return `${Math.round(converted).toLocaleString('en-US')} AED`;
  }
  return `${curr.symbol}${Math.round(converted)}`;
};
