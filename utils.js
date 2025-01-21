export const getRandomWord = () => {
    const words = ['yank', 'mother', 'bravo'];
    return words[Math.floor(Math.random() * words.length)];
};
