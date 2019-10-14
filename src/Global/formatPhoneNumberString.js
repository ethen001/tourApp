
export function formatPhoneNumberString (phoneNumber) {
    const areaCode = Math.floor(phoneNumber / 10000000)
    const midNumber = Math.floor(phoneNumber % 10000000 / 10000);
    const last4Digits = phoneNumber % 10000000 % 10000;
    return `${areaCode}-${midNumber}-${last4Digits}`;
}