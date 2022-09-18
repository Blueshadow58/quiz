export const getQuestions = async () => {
  const options = { method: "GET" };
  try {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple",
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
