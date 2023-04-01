import React from "react";

const Link = ({ className, href, children }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

function Card({ title, description, link }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={link}>Acessar</Link>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <Card
        title="Exercício de conjunções"
        description="memorização de classificação de conjunções"
        link="/conjunctions"
      />
    </div>
  );
}

export default Home;
