import { useEffect } from "react";
import GenericQuiz from "./quiz";

export default function Quiz(props) {
  useEffect(() => {
    const partsPath = window.location.pathname.split("/");
    const lastPart = partsPath[partsPath.length - 1];
    console.log(lastPart);
  }, []);

  return (
    <GenericQuiz 
      title={props.title} 
      command={props.command}
      label={props.label}
      questionsData={props.data}
      explanations = {props.explanations}
    />
  );
}

export async function getStaticProps(context) {
  const { type_quiz } = context.params;
  let props = {type: type_quiz};
  var currentJson = {};
  switch (type_quiz) {
    case 'conjuncoes':
      currentJson = require('../../data/conjunctions.json');
      
      break;
    case 'regencia_verbal':
      currentJson = require('../../data/regencia_verbal.json');
      
      break;
    default:
      currentJson = require('../../data/acentuacao.json');
      break;
  }
  props = {
    ...props, 
    title: currentJson.title,
    command: currentJson.command,
    label: currentJson.label,
    data: currentJson.questions,
    explanations: currentJson.explanations
  }
  return {
    props: props,
  };
}

export async function getStaticPaths() {
  const paths = [
    {params: { type_quiz: 'conjuncoes'}},
    {params: { type_quiz: 'acentuacao'}},
    {params: { type_quiz: 'regencia_verbal'}}
  ];
  return { paths, fallback: false }
}
