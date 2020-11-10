const link = 'http://localhost:3000';
const from = 'minAcademy@minAcademy.com';

const mailBuilder = (email, subject, message) => {
  return {
    from: 'minAcademy@minAcademy.com',
    to: email,
    subject,
    html: `
      <html>
        <body>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');
            body {
              background-color: #F5F5F5;
            }
            .box_text {
              min-height: 50vh;
              padding: 3em;
              background: #FFFFFF;
              box-shadow: 0px 5px 10px rgba(43, 43, 43, 0.05), 0px 15px 40px rgba(0, 0, 0, 0.02);
              border-radius: 10px;
              margin-bottom: 3rem;
            }
            hr {
              border: 1px solid #9241C0;
            }
            h1 {
              color: #9241C0;
              box-sizing: border-box;
              font-family: Overpass;
            }
            p {
              color: #675775;
              font-weight: 300;
              font-family: Overpass;
              text-align: left;
              font-size: 1.5vw;
            }
            li {
              color: #675775;
              font-weight: 300;
              font-family: Overpass;
              text-align: left;
              font-size: 1.5vw;
            }
            img {
              position: absolute;
              right: 50px;
            }
          </style>
          <div class="box_text">
            <div class="email-header">
              <img src='https://raw.githubusercontent.com/fga-eps-mds/2020.1-Minacademy-FrontEnd/0395eb8b413765722f8b9c766020562608276217/src/assets/images/minacademyLogo.svg'>
              <h1>${subject}</h1>
            </div>
            <hr>
            ${message}
          </div>
        </body>
      </html>`,
  };
}

module.exports = {
  changeEmailLink(email, changeEmailLink) {
    const message = `
      <p>Olá, recebemos a sua solicitação de troca do endereço de e-mail. Estamos aqui para ajudar!</p>
      <p>Para efetivar a mudança, clique <a href="${link}/confirma-mudanca-email/${changeEmailLink}">aqui</a>.</p>
      <p>Caso você não tenha requisitado essa alteração, ignore essa mensagem.</p>`;
    return {
      from,
      to: email,
      subject: 'Redefinição de Email',
      html: html('Redefinição de Email', message),
    };
  },

  resetLink(email, resetLink) {
    const message = `
      <p>Olá, ficamos sabendo que você esqueceu a sua senha, mas não se preocupe, estamos aqui para ajudar.</p>
      <p>Para ser redirecionado(a) para a página de redefinição de senha clique <a href="${link}/change/${resetLink}">aqui</a>.</p>`;
    return {
      from,
      to: email,
      subject: 'Redefinição de Senha',
      html: html('Redefinição de Senha', message),
    };
  },

  learnerPromotion(email) {
    const message = `
      <p>Parabéns! Você foi promovida para Mentora na plataforma Minacademy, e o que muda agora?</p>
      <p>A mentoria é um serviço voluntário, onde aqueles que já tem conhecimento em Django, ajudam quem está fazendo o tutorial ainda, 
      caso queira ter aprendizes, você poderá ajuda-los por meio do chat na pŕopria plataforma.</p>
      <p>Caso queira procurar por aprendizes, basta ir em <a href="${link}/mentoria">Mentoria</a> e clicar em solicitar aprendizes</p>
      <p>E quando seus aprendizes finalizarem o tutorial, você receberá um certificado de mentoria, e poderá consulta-lo em <a href="${link}/certificados">Certificados</a></p>
      <p>Não se preocupe todo o seu histórico como Aprendiz ainda poderá ser consultado, assim como seu certificado mas agora você pode ajudar outras aprendizes sendo mentora delas.</p>`;
      return mailBuilder(email, 'Você foi promovida para Mentora', message);
  },

  unassignMentor(email, mentor) {
    const message = `<p>Você se desvinculou do mentor ${mentor}. Com isso não será mais possível tirar dúvidas ou receber monitoria caso precise.</p>
      <p>Caso mude de idéia, você pode solicitar novamente um novo mentor com os seguintes passos:</p>
      <ul>
      <li>Acesse sua conta de usuário</li>
      <li>Na guia "Dashboard" acesse o link "solicitar mentor" no área de mentoria</li>
      <li>Dentro da página de "Mentoria", clique no botão "Solicitar Mentor"</li>
      </ul>
      <p>Assim que possível você receberá um novo monitor para te ajudar no que precisar para concluir o tutorial e adquirir seu certificado.</p>`;
    return mailBuilder(email, 'Cancelamento de Mentoria', message);
  },
  unassignLearner(email, learner){
    const message = `<p>A aprendiz ${learner} se desvinculou da sua mentoria. Portanto não há mais a necessidade de monitorá-la.</p>
      <p>Caso deseje receber mais aprendizes, você pode solicitar uma nova aprendiz com os seguintes passos:</p>
      <ul>
      <li>Acesse sua conta de usuário</li>
      <li>Na guia "Dashboard" acesse o link "solicitar mentoria" na área de mentoria</li>
      <li>Dentro da página de "Mentoria", clique no botão "Solicitar Aprendiz"</li>
      </ul>
      <p>Caso alguma aprendiz tenha solicitado um mentor, ela poderá ser atribuída a você</p>
      <p>Caso não deseje ser vinculada(o) à outra aprendiz, clique no botão "Ficar indisponível".
        Dessa forma não serão atribuídas outras aprendizes à sua monitoria.</p>`;
    return mailBuilder(email, 'Cancelamento de Mentoria', message);
  },
  
  assignMentor(email, mentor){
    const message = `<p>Agora você possui um(a) mentor(a) chamado(a) ${mentor}.</p>
    <p>Caso caso tenha dificuldades para continuar o tutorial, ou alguma dúvida, ou qualquer outra coisa que ache necessário o auxílio de um mentor(a)
    você pode entrar em contato com seu mentor(a) a qualquer momento pelo ícone de chat que estará visível no canto inferior direito em toda a plataforma, desde que esteja vinculada a um mentor.</p>
    <p>Caso deseje saber mais informações sobre seu(a) mentor(a) você pode clicar na guia "Mentoria" ou ainda 
    clicando na guia "Dashboard" e acesse o link "monitoria" na área de mentoria.</p>
    <p>Dentro da página de "Mentoria" você tem acesso as informações do nome e email do seu mentor</p>
    <p>Caso deseje cancelar a mentoria, você pode, dentro da página de mentoria clicar no botão "Desvincular" para se desvincular do seu monitor atual.</p>
    `;
  return mailBuilder(email, 'Vinculação de Mentor', message);
  },

  assignLearner(email, learner){
    const message = `<p>Agora você possui uma aprendiz chamada ${learner}.</p>
    <p>Caso seja solicitado(a) você pode ajudá-la no que for preciso para que ela consiga concluir o tutorial.</p>
    <p>Quando ela terminar todo o tutorial e fizer todas as atividades, você receberá um certificado de 
      mentoria, comprovando que você á auxiliou na conclusão do tutorial.</p>
    <p>Caso deseje saber mais informações sobre suas aprendizes você pode clicar na guia "Mentoria" ou ainda 
      clicando na guia "Dashboard" e acesse o link "acessar mentoria" na área de mentoria. Lá você terá acesso ao nome, email e progresso de cada aprendiz que está vinculado(a).</p>
    <p>Dentro da página de Mentoria ainda é possível se desvincular de qualquer aprendiz, clicando no botão "Desvincular" associado à cada aprendiz.</p>
    `;
  return mailBuilder(email, 'Vinculação de Aprendiz', message);
  },
  
  courseConcluded(email, certificate, name) {
    const message = `
      <p>Parabéns ${name}! Você conseguiu concluir o tutorial da plataforma Minacademy</p>
      <p>Você recebeu um certificado de Conclusão de Tutorial, e pode ser consultado <a href="${link}/certificado/${certificate}">aqui</a></p>
      <p>A próxima vez que você entrar na nossa dashboard, você já será promovida automaticamente para uma Mentora validada, 
      e receberá um email com tudo que precisa saber sobre Mentoria.</p>
      <p>Caso queira, você também pode navegar pela plataforma, e procurar pelo seu certificado em <a href="${link}/certificados">Certificados</a></p>`;
    return mailBuilder(email, 'Conclusão do tutorial', message);
  },

  courseConcludedForMentor(email, certificate, mentorName, learnerName) {
    const message = `
      <p>Parabéns ${mentorName}! Sua aprendiz ${learnerName} concluiu o tutorial na plataforma Minacademy</p>
      <p>Você recebeu um certificado de mentoria, e pode ser consultado <a href="${link}/certificado/${certificate}">aqui</a></p>
      <p>Caso queira, você também pode navegar pela plataforma, e procurar pelo(s) seu(s) certificado(s) em <a href="${link}/certificados">Certificados</a></p>`
    return mailBuilder(email, 'Aprendiz Concluiu o Tutorial', message);
  },
};
