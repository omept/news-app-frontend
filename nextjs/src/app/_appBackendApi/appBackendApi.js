import axios from "axios";

export function log(args) {
  console.log(args);
}

export function isObject(variable) {
  if (typeof variable === "object" && variable !== null) {
    return true;
  }
  return false;
}

export function ucwords(words) {
  return words
    .split(" ") // Split the sentence into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a sentence
}
