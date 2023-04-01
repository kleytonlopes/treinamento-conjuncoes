import { useState, useEffect } from "react";
import conjunctionsData from "./conjunctions.json";
//test

export default function Conjunctions() {
  const [currentConjunctionIndex, setCurrentConjunctionIndex] = useState(-1);
  const [hitCounter, setHitCounter] = useState(0);
  const [missCounter, setMissCounter] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNewQuestion, setShowNewQuestion] = useState(true);

  const conjunctions = conjunctionsData.conjunctions;
  const currentConjunction = currentConjunctionIndex > -1 ? conjunctions[currentConjunctionIndex] : '';
  
  useEffect(() => {
    setCurrentConjunctionIndex(Math.floor(Math.random() * conjunctionsData.conjunctions.length));
  }, []);

  function handleAnswer(event) {
    const answer = event.target.value;
    setUserAnswer(answer);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      userAnswer.toLowerCase().trim() ===
      currentConjunction.correctAnswer.classification.toLowerCase()
    ) {
      setHitCounter(hitCounter + 1)
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setUserAnswer("");
        setCurrentConjunctionIndex(
          Math.floor(Math.random() * conjunctions.length)
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
    <div className="conjunctions-container">
      <h1>Memorize a tabela de conjunções da língua portuguesa</h1>
      <p>
        Classifique a conjunção da seguinte frase em aditiva, adversativa,
        alternativa, conclusiva, explicativa, causal, consecutiva, concessiva,
        comparativa, condicional, conformativa, final, proporcional ou temporal:
      </p>
      {showNewQuestion && currentConjunction != '' &&(
        <p
          className="conjunctions-sentence"
          dangerouslySetInnerHTML={{
            __html: currentConjunction.sentence.replace(
              currentConjunction.correctAnswer.conjunction,
              `<strong>${currentConjunction.correctAnswer.conjunction}</strong>`
            ),
          }}
        />
      )}
      <form onSubmit={handleSubmit} className="conjunctions-form">
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
      {<p>Acertos: {hitCounter} - Erros: {missCounter}</p>}
    </div>
  );
}
