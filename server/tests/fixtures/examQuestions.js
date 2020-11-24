const mongoose = require('mongoose');
const questions = [{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d000014"),
  description: "Pra que serve o arquivo settings.py?",
  alternatives: {
      a: "Para definir a configurações de um projeto Django",
      b: "Para definir as configurações de uma aplicação",
      c: "Para definir a data e hora no servidor",
      d: "Para sincronizar o Schema do Banco de Dados"
  },
  number: 1,
  answer: "a",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d000015"),
  description: "Como se define um campo ‘nome’ em um model Django com tamanho máximo de 255 caracteres?",
  alternatives: {
      a: "nome = models.CharField(max_len=255)",
      b: "model.CharField(max_length=255)",
      c: "nome = models.CharField(max_length=255)",
      d: "model = CharField(max_length=255)"
  },
  number: 2,
  answer: "c",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d000016"),
  description: "O que define uma boa aplicação Django?",
  alternatives: {
      a: "Uma boa aplicação Django provém uma pequena e específica funcionalidade que pode ser usada em outros projetos Django",
      b: "Uma boa aplicação Django é um site completamente funcional que possui 100% de cobertura de testes",
      c: "Uma boa aplicação Django é altamente customizada e não pode ser usada em outros projetos"
  },
  number: 3,
  answer: "a",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d000017"),
  description: "Como deixar o Django ciente do fuso horário?",
  alternatives: {
      a: "No arquivo settings.py: USE_L10N=True",
      b: "Em views.py, importe timezone",
      c: "Em views.py, importe tz",
      d: "No arquivo settings.py: USE_TZ=True"
  },
  number: 4,
  answer: "d",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d000018"),
  description: "Como retornar todas as instâncias de ‘User’ em um banco de dados?",
  alternatives: {
      a: "Users.objects.all()",
      b: "User.objects.all()",
      c: "User.all_records()",
      d: "User.object.all()"
  },
  number: 5,
  answer: "b",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d000019"),
  description: "Como se adiciona um model “User” ao admin Django?",
  alternatives: {
      a: "admin.register(Users)",
      b: "admin.site(self, User)",
      c: "user.site.register(Admin)",
      d: "users.site.register(Admin)",
      e: "admin.site.register(User)"
  },
  number: 6,
  answer: "e",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d00001a"),
  description: "Qual o comando para iniciar uma nova aplicação chamada “usuarios” em um projeto existente?",
  alternatives: {
      a: "manage.py –newapp usuarios",
      b: "manage.py newapp usuarios",
      c: "manage.py –startapp usuarios",
      d: "manage.py startapp usuarios",
      e: "manage.py start usuarios"
  },
  number: 7,
  answer: "d",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d00001b"),
  description: "Django é escrito em qual linguagem de programação?",
  alternatives: {
      a: "Ruby",
      b: "Python",
      c: "JavaScript",
      d: "Java",
      e: "PHP"
  },
  number: 8,
  answer: "b",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d00001c"),
  description: "Um conjunto de aplicações úteis para serem usadas em seu projeto está disponível na distribuição oficial do Django. Qual o nome desse conjunto?",
  alternatives: {
      a: "django.extras",
      b: "django.helpers",
      c: "django.utilities",
      d: "django.ponies",
      e: "django.contrib"
  },
  number: 9,
  answer: "e",
  type: "Exam"
},
{
  _id: mongoose.Types.ObjectId("5f961e56fc13ae454d00001d"),
  description: "Qual a função do comando “manage.py validate”?",
  alternatives: {
      a: "Checks for errors in your views",
      b: "Checks for errors in your templates",
      c: "Checks for errors in your controllers",
      d: "Checks for errors in your models",
      e: "Checks for errors in your settings.py file"
  },
  number: 10,
  answer: "d",
  type: "Exam"
}]

module.exports = { questions };