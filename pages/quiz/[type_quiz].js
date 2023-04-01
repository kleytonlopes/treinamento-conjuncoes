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
  var currentJson = {};
  switch (type_quiz) {
    case 'conjuncoes':
      currentJson = require('../../data/conjunctions.json');
      
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
    data: currentJson.questions
  }
  return {
    props: props,
  };
}

export async function getStaticPaths() {
  const paths = [
    {params: { type_quiz: 'conjuncoes'}},
    {params: { type_quiz: 'acentuacao'}}
  ];
  return { paths, fallback: false }
}
