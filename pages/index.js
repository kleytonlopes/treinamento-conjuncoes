import { useState } from "react";
import conjunctionsData from "./conjunctions.json";

export default function Conjunctions() {
  const [currentConjunctionIndex, setCurrentConjunctionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const conjunctions = conjunctionsData.conjunctions;
  const currentConjunction = conjunctions[currentConjunctionIndex];

  function handleAnswer(event) {
    const answer = event.target.value;
    setUserAnswer(answer);
  }

  function handleSubmit(event) {
    event.preventDefault()
    const answer = userAnswer.toLowerCase()
    if (answer === currentQuestion.correctAnswer.toLowerCase()) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
        setUserAnswer('')
        setQuestions(prevQuestions => prevQuestions.slice(1))
      }, 3000)
    } else {
      setShowErrorMessage(true)
      setTimeout(() => {
        setShowErrorMessage(false)
      }, 3000)
    }
  }

  return (
    <div className="conjunctions-container">
      <h1>Memorize a tabela de conjunções da língua portuguesa</h1>
      <p>
        Classifique a conjunção da seguinte frase em aditiva, adversativa,
        alternativa, conclusiva, etc:
      </p>
      <p
        className="conjunctions-sentence"
        dangerouslySetInnerHTML={{
          __html: currentConjunction.sentence.replace(
            currentConjunction.correctAnswer.conjunction,
            `<strong>${currentConjunction.correctAnswer.conjunction}</strong>`
          ),
        }}
      />
      <form onSubmit={handleSubmit}>
        <label>
          Classificação:
          <input
            type="text"
            value={userAnswer}
            onChange={handleAnswer}
            required
            className="conjunctions-input"
          />
        </label>
        <button className="py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg" type="submit">
          Verificar
        </button>

      </form>
      {showSuccess && <p className="conjunctions-success">Parabéns, você acertou!</p>}
      {showError && <p className="conjunctions-error">Você errou, tente novamente.</p>}
    </div>
  );
}
