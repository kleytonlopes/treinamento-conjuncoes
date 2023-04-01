import React from "react";
import Link from 'next/link'

function Card({ title, description, link }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={`/quiz/${link}`}>Acessar</Link>
    </div>
  );
} 

function Home(props) {
  return (
    <div className="home">
      <Card
        title="Exercício de conjunções"
        description="memorização de classificação de conjunções"
        link="conjuncoes"
      />
    </div>
  );
}

export default Home;

