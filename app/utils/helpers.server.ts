import invariant from "tiny-invariant";

export const requiredServerEnv = (key: string) => {
  const value = process.env[key];
  invariant(value, `${key} is a required env variable but it is unset.`);
  return value;
};
