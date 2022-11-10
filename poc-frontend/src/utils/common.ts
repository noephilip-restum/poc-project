export const getRandomNumber = (max: number): number => {
  let byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);

  let range = max - 0 + 1;
  let max_range = 256;
  if (byteArray[0] >= Math.floor(max_range / range) * range)
    return getRandomNumber(max);
  return 0 + (byteArray[0] % range);
};

export const formatMinuteToReadable = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;

  if (h > 0) {
    return `${h}h ${m}m`;
  } else {
    return `${m}m`;
  }
};
