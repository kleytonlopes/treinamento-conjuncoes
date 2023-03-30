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

    if (userAnswer.toLowerCase() === currentConjunction.correctAnswer.classification.toLowerCase()) {
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
        <button type="submit" className="conjunctions-button">
          Verificar
        </button>

      </form>
      {showSuccess && <p className="conjunctions-success">Parabéns, você acertou!</p>}
      {showError && <p className="conjunctions-error">Você errou, tente novamente.</p>}
    </div>
  );
}
