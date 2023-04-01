import { useState, useEffect } from "react";

export default function Quiz(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [hitCounter, setHitCounter] = useState(0);
  const [missCounter, setMissCounter] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNewQuestion, setShowNewQuestion] = useState(true);
  const {questionsData, title, command, label} = props;

  const questions = questionsData;
  const currentQuestion = currentQuestionIndex > -1 ? questions[currentQuestionIndex] : '';
  
  useEffect(() => {
    setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
  }, []);

  function handleAnswer(event) {
    const answer = event.target.value;
    setUserAnswer(answer);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      userAnswer.toLowerCase().trim() ===
      currentQuestion.correctAnswer.text.toLowerCase()
    ) {
      setHitCounter(hitCounter + 1)
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setUserAnswer("");
        const currentIndex = Math.floor(Math.random() * questions.length);
        console.log(currentIndex+'--'+questions.length);
        setCurrentQuestionIndex(
          currentIndex
        );
        setShowNewQuestion(true);
      }, 1500);
    } else {
      setMissCounter(missCounter + 1)
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setUserAnswer("");
      }, 3000);
    }
  }

  return (
    <div className="quiz-container">
      <h1>{title}</h1>
      <p>
        {command}
      </p>
      {showNewQuestion && currentQuestion != '' &&(
        <p
          className="quiz-question"
          dangerouslySetInnerHTML={{
            __html: currentQuestion.question.replace(
              currentQuestion.highlight,
              `<strong>${currentQuestion.highlight}</strong>`
            ),
          }}
        />
      )}
      <form onSubmit={handleSubmit} className="quiz-form">
        <label>
          {label}
          <input
            type="text"
            value={userAnswer}
            onChange={handleAnswer}
            required
            className="quiz-input"
          />
        </label>
          <button type="submit" className="quiz-button">
            Verificar
          </button>
       </form>
      {showSuccess && <p className="conjunctions-success">Parabéns, você acertou!</p>}
      {showError && <p className="conjunctions-error">Você errou, tente novamente.</p>}
      {<p>Acertos: {hitCounter} - Erros: {missCounter}</p>}
    </div>
  );
}
