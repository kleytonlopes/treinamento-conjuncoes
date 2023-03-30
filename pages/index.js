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
    event.preventDefault();

    if (userAnswer === currentConjunction.correctAnswer.classification) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setUserAnswer("");
        if (currentConjunctionIndex + 1 < conjunctions.length) {
          setCurrentConjunctionIndex(currentConjunctionIndex + 1);
        } else {
          setCurrentConjunctionIndex(0);
        }
      }, 3000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setUserAnswer("");
      }, 3000);
    }
  }

  return (
    <div>
      <h1>Memorize a tabela de conjunções da língua portuguesa</h1>
      <p>
        Classifique a conjunção da seguinte frase em aditiva, adversativa,
        alternativa, conclusiva, etc:
      </p>
      <p>
        {currentConjunction.sentence.replace(
          currentConjunction.correctAnswer.conjunction,
          '<strong>${currentConjunction.correctAnswer.conjunction}</strong>'
        )}
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Classificação:
          <input
            type="text"
            value={userAnswer}
            onChange={handleAnswer}
            required
          />
        </label>
        <button type="submit">Verificar</button>
      </form>
      {showSuccess && <p>Parabéns, você acertou!</p>}
      {showError && <p>Você errou, tente novamente.</p>}
    </div>
  );
}

