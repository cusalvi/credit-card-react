// import Payment from 'payment'
import { DEFAULT_CVC_LENGTH, getCardType } from "./CardTypes"

function clearNumber(value = '') {
  return value.replace(/\D+/g, '')
}
function addZero(value) {
    console.log(value.length);
    if(value < 10) {
        return '0' + value;
    } 
    return value;
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value
  }

  const issuer = getCardType(value)
  console.log("issuer here", value, issuer);
  const clearValue = clearNumber(value)
  let nextValue

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
      break
  }

  return nextValue.trim()
}

export function formatCVV(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value)
  let maxLength = DEFAULT_CVC_LENGTH

  if (allValues.number) {
    // const issuer = Payment.fns.cardType(allValues.number)
    const issuer = getCardType(allValues.number);

    maxLength = issuer === 'amex' ? 4 : DEFAULT_CVC_LENGTH
  }

  return clearValue.slice(0, maxLength)
}

export function formatExpirationMonth(value) {
    const clearValue = addZero(value)
    console.log("value", value, clearValue);
    if (clearValue.length >= 2) {
        return `${clearValue.slice(0, 2)}`
    }
    return value;
    
}

