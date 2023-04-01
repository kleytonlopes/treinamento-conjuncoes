import React from "react";
import Link from 'next/link'

function Card({ title, description, link, image }) {
  return (
    <Link href={`/quiz/${link}`}>
      <div className="card-container">
        <h2>{title}</h2>
        <p>{description}</p>
        <img src={image} alt="Descrição da imagem"></img>
        Acessar
      </div>
    </Link>
  );
} 

function Home(props) {
  return (
    <div className="cards-main">
       <div className="cards-container">
        <Card
          title="Exercícios de conjunções"
          description="memorização de classificação de conjunções"
          link="conjuncoes"
          image="conjuncoes.jpeg"
        />
        <Card
          title="Exercícios de acentuação"
          description="memorização de palavras acentuadas"
          link="acentuacao"
          image="acentuacao.jpeg"
        />
      </div>

    </div>
  );
}

export default Home;

