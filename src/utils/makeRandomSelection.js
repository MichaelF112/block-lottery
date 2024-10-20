export const makeRandomSelection = (participants) => {
  const randomIndex = Math.floor(
    Math.random() * participants.length
  );
  return participants[randomIndex];
};
