const mongoose = require('mongoose');

const questions = [
  {
    _id: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000064'),
    number: 1,
    module: mongoose.Types.ObjectId('5f652249fc13ae49f0000000'),
    description:
      'Julgue as seguintes assertivas diante do que foi apresentado. \nI. Ao fim desse tutorial você se tornará magicamente em uma programadora. \nII. São necessários meses, ou até mesmo anos de treino e prática para se tornar uma programadora excepcional. \nÉ correto o que se afirma somente em: ',
    alternatives: {
      a: 'I;',
      b: 'II;',
      c: 'Ambas as alternativas;',
      d: 'Nenhuma das alternativas.',
    },
    answer: 'b',
  },
  {
    _id: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000065'),
    number: 2,
    module: mongoose.Types.ObjectId('5f652249fc13ae49f0000000'),
    description: 'Qual é a proposta do Tutorial Django Girls?',
    alternatives: {
      a: 'Te transformar em uma programadora;',
      b: 'Ensinar a criar um website;',
      c:
        'Te mostrar que programação e a criação de websites não são tão complicados quanto parecem;',
      d: 'Capacitar e ajudar mulheres a serem programadoras;',
    },
    answer: 'c',
  },
  {
    _id: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000066'),
    number: 3,
    module: mongoose.Types.ObjectId('5f652249fc13ae49f0000001'),
    description: 'Qual das alternativas abaixo não é um sistema operacional?',
    alternatives: {
      a: 'Windows;',
      b: 'Linux;',
      c: 'IBM;',
      d: 'Mac OS X.',
    },
    answer: 'c',
  },
  {
    _id: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000067'),
    number: 4,
    module: mongoose.Types.ObjectId('5f652249fc13ae49f0000001'),
    description: 'Por que não usar o Word como editor de texto?',
    alternatives: {
      a: 'Pois não compila python;',
      b: 'Pois não destaca o código com cores de acordo com seu significado;',
      c: 'Pois é um editor de texto rico;',
      d: 'Pois é da Microsoft.',
    },
    answer: 'c',
  },
];

const modules = [
  {
    _id: mongoose.Types.ObjectId('5f652249fc13ae49f0000000'),
    title: 'Introdução',
    moduleNumber: 1,
  },
  {
    _id: mongoose.Types.ObjectId('5f652249fc13ae49f0000001'),
    title: 'Instalação',
    moduleNumber: 2,
  },
];

module.exports = { questions, modules };
