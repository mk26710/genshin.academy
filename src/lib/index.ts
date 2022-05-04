export const unixNow = () => Math.floor(Date.now() / 1000);
export const unixToDate = (seconds: number) => new Date(seconds * 1000);

export const calculateResinTime = (current: number, target: number) => {
  const now = unixNow();
  const resinDelta = target - current;

  if (resinDelta < 0) {
    return -1;
  }

  return resinDelta * (8 * 60) + now;
};
