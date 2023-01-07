interface IUserData {
  [key: string]: any;
}

let userData: IUserData = {};

if (typeof window !== "undefined") {
  userData = JSON.parse(window.localStorage.getItem("user-data") || "{}");
}

/**
 * Set single line of user data
 * @param key
 * @param value - only string allowed to make it compatible with cookies
 * @remarks
 * At this point in time, only local storage is supported
 */
export function setSingleDataLine(key: string, val: string) {
  userData[key] = val;
  if (typeof window !== "undefined") {
    window.localStorage.setItem("user-data", JSON.stringify(userData));
  }
}
/**
 * Get single line of user data
 * @param key
 * @returns value as a string, so it should alway be converted to a number or boolean when needed
 */
export function getSingleDataLine(key: string): string {
  return userData[key] ?? "";
}
