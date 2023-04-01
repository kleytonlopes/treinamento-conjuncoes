import { useEffect } from "react";
import Conjunctions from "./quiz";

export default function Quiz(props) {
  useEffect(() => {
    const partsPath = window.location.pathname.split("/");
    const lastPart = partsPath[partsPath.length - 1];
    console.log(lastPart);
  }, []);

  return (
    <Conjunctions 
      title={props.title} 
      command={props.command}
      label={props.label}
      questionsData={props.data}
    />
  );
}

export async function getStaticProps(context) {
  const { type_quiz } = context.params;
  let props = {type: type_quiz};
  switch (type_quiz) {
    case 'conjuncoes':
       const dataConjunctions = require('../../data/conjunctions.json');
       props = {
        ...props, 
        title: 'Memorize a tabela de conjunções da língua portuguesa',
        command: 'Classifique a conjunção da seguinte frase em aditiva, adversativa,\n'+
        'alternativa, conclusiva, explicativa, causal, consecutiva, concessiva,\n'+
        'comparativa, condicional, conformativa, final, proporcional ou temporal:',
        label:'Insira a classificação: ',
        data: dataConjunctions
      }
      break;
    default:
      const dataCrase = require('../../data/conjunctions.json');
       props = {
        ...props, 
        title: 'Memorize o usa da crase da língua portuguesa',
        command: 'Verifique se o uso da crase está correto!',
        label:'Entre com a resposta correta: ',
        data: dataCrase
      }
      break;
  }
  
  return {
    props: props,
  };
}

export async function getStaticPaths() {
  const paths = [
    {params: { type_quiz: 'conjuncoes'}},
    {params: { type_quiz: 'crase'}}
  ];
  return { paths, fallback: false }
}
