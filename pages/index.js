import React from "react";
import Link from 'next/link'

function Card({ title, description, link, image }) {
  return (
    <Link href={`/quiz/${link}`}>
      <div className="card-container">
        <h2>{title}</h2>
        <p>{description}</p>
        <img src={image} alt="Descrição da imagem"></img>
        <h2>Acessar</h2>
      </div>
    </Link>
  );
} 

function Home(props) {
  return (
    <div className="cards-main">
       <div className="cards-container">
        <Card
          title="CONJUNÇÕES"
          description="Memorização de classificação de conjunções"
          link="conjuncoes"
          image="conjuncoes.jpeg"
        />
        <Card
          title="ACENTUAÇÃO"
          description="Memorização de palavras acentuadas"
          link="acentuacao"
          image="acentuacao.jpeg"
        />
        <Card
          title="REGÊNCIA VERBAL"
          description="Memorização das principais regências verbais"
          link="regencia_verbal"
          image="regenciaverbal.jpeg"
        />
        <Card
          title="FORMAS NORMAIS"
          description="Memorização dos conceitos relacionados a Formas Normais."
          link="formas_normais"
          image="formasnormais.png"
        />
        <Card
          title="OWASP Top 10"
          description="Memorização das causas e das prevenções."
          link="owasp_top10"
          image="top10.jpeg"
        />
      </div>

    </div>
  );
}

export default Home;

