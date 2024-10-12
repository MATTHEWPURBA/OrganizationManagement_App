// Function to capitalize the first letter of each word in a string
export const capitalizeWords = (str) => {
  // Step 1: Split the string into an array of words using space as the separator
  const words = str.split(' ');

  // Step 2: Iterate through each word and capitalize the first letter
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      // Capitalize the first letter and add the rest of the word
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return word; // If the word is empty, just return it
  });

  // Step 3: Join the array of capitalized words back into a string
  return capitalizedWords.join(' ');
};
