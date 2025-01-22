export const getRandomWord = () => {
    const words = ['yank'];
    return words[Math.floor(Math.random() * words.length)];
};
