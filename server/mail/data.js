const link = process.env.FRONT_ENV_URL;

const mailBuilder = (email, subject, message) => { // eslint-disable-line arrow-body-style
  const styledMessage = message.replace(/<p>/g, '<p style="color: #675775;font-weight: 300;font-family: Overpass;text-align: left;font-size: 1.5vw;">').replace(/<li>/g, '<li style="color: #675775;font-weight: 300;font-family: Overpass;text-align: left;font-size: 1.5vw;">');
  return {
    from: 'minAcademy@minAcademy.com',
    to: email,
    subject,
    html: `
      <html>
        <body style="background-color: #F5F5F5;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');
            img {
              position: absolute;
              right: 50px;
            }
          </style>
          <div class="box_text" style="min-height: 50vh;padding: 3em;background: #FFFFFF;box-shadow: 0px 5px 10px rgba(43, 43, 43, 0.05), 0px 15px 40px rgba(0, 0, 0, 0.02);border-radius: 10px;margin-bottom: 3rem;">
            <div class="email-header">
              <img src="https://raw.githubusercontent.com/fga-eps-mds/2020.1-Minacademy-FrontEnd/33f742750ddbbe31d4f1cb213aa52aa83f2f9bc2/src/assets/images/minacademyLogo.svg" alt="logo">
              <h1 style="color: #9241C0;box-sizing: border-box;font-family: Overpass;">${subject}</h1>
            </div>
            <hr style="border: 1px solid #9241C0;">
            ${styledMessage}
            <p style="color: #675775;font-weight: 300;font-family: Overpass;text-align: left;font-size: 1.5vw;">Att., equipe Minacademy</p>
          </div>
        </body>
      </html>`,
  };
};

module.exports = {
  changeEmailLink(email, changeEmailLink) {
    const message = `
      <p>Olá, recebemos a sua solicitação de troca do endereço de e-mail. Estamos aqui para ajudar!</p>
      <p>Para efetivar a mudança, clique <a href="${link}confirma-mudanca-email/${changeEmailLink}">aqui</a>.</p>
      <p>Caso você não tenha requisitado essa alteração, ignore essa mensagem.</p>
      `;
    return mailBuilder(email, 'Redefinição de Email', message);
  },

  resetLink(email, resetLink) {
    const message = `
      <p>Olá, ficamos sabendo que você esqueceu a sua senha, mas não se preocupe, estamos aqui para ajudar.</p>
      <p>Para ser redirecionado(a) à página de redefinição de senha clique <a href="${link}change/${resetLink}">aqui</a>.</p>
      `;
    return mailBuilder(email, 'Redefinição de Senha', message);
  },

  learnerPromotion(email, name) {
    const message = `
        <p>Parabéns ${name}! Você foi promovida a Mentora na plataforma Minacademy. O que muda agora?</p>
        <p>A mentoria é um serviço voluntário, no qual aqueles que já tem conhecimento em Django se dispõem a ajudar quem está fazendo o tutorial. 
        O contato é feito a partir de um chat na própria plataforma.</p>
        <p>Caso queira procurar por aprendizes, basta acessar sua conta, clicar na guia "Mentoria" e clicar em solicitar aprendizes.</p>
        <p>Quando suas aprendizes finalizarem o tutorial, você receberá um certificado de mentoria, e poderá consultá-lo na página de "Certificados".</p>
        <p>O seu histórico como Aprendiz ainda poderá ser consultado, assim como seu certificado. Porém, agora você pode ajudar outras aprendizes sendo mentora delas.</p>
        `;

    return mailBuilder(email, 'Você foi promovida para Mentora', message);
  },

  courseConcluded(email, certificate, name) {
    const message = `
      <p>Parabéns ${name}! Você conseguiu concluir o tutorial da plataforma Minacademy</p>
      <p>Você recebeu um certificado de Conclusão de Tutorial, que pode ser consultado <a href="${link}certificado/${certificate}">aqui</a>.</p>
      <p>Na próxima vez que você entrar na nossa dashboard, você já será promovida automaticamente a uma Mentora validada, 
      e receberá um email com tudo que precisa saber sobre Mentoria.</p>
      <p>Caso queira, você também pode navegar pela plataforma, e procurar pelo seu certificado em "Certificados".</p> 
      `;
    return mailBuilder(email, 'Conclusão do tutorial', message);
  },

  courseConcludedForMentor(email, certificate, mentorName, learnerName) {
    const message = `
      <p>Parabéns ${mentorName}! Sua aprendiz ${learnerName} concluiu o tutorial na plataforma Minacademy!</p>
      <p>Você recebeu um certificado de mentoria, que pode ser consultado <a href="${link}certificado/${certificate}">aqui</a>.</p>
      <p>Caso queira, você também pode navegar pela plataforma, e procurar pelo(s) seu(s) certificado(s) em "Certificados".</p>
      `;
    return mailBuilder(email, 'Aprendiz Concluiu o Tutorial', message);
  },

  unassignMentor(email, name, mentor, mentorGender) {
    let message;
    if (mentorGender === 'Female') {
      message = `<p>Olá ${name}</p>
        <p>Você se desvinculou da mentora ${mentor}. Com isso, não será mais possível tirar dúvidas ou receber mentoria caso precise.</p>
        <p>Caso mude de idéia, você pode solicitar novamente um novo mentor com os seguintes passos:</p>
        <ul>
        <li>Acesse sua conta de usuário</li>
        <li>Na guia "Dashboard" acesse o link "solicitar mentor" no área de mentoria ou acesse diretamente pela guia "Mentoria"</li>
        <li>Dentro da página de "Mentoria", clique no botão "Solicitar Mentor"</li>
        </ul>
        <p>Assim que possível você receberá um novo monitor para te ajudar no que precisar para concluir o tutorial e adquirir seu certificado.</p>
        `;
    } else {
      message = `<p>Olá ${name}</p>
        <p>Você se desvinculou do mentor ${mentor}. Com isso, não será mais possível tirar dúvidas ou receber mentoria caso precise.</p>
        <p>Caso mude de idéia, você pode solicitar novamente um novo mentor com os seguintes passos:</p>
        <ul>
        <li>Acesse sua conta de usuário;</li>
        <li>Na guia "Dashboard" acesse o link "solicitar mentor" no área de mentoria ou acesse diretamente pela guia "Mentoria";</li>
        <li>Dentro da página de "Mentoria", clique no botão "Solicitar Mentor";</li>
        </ul>
        <p>Assim que possível você receberá um novo monitor para te ajudar no que precisar para concluir o tutorial e adquirir seu certificado.</p>
        `;
    }
    return mailBuilder(email, 'Cancelamento de Mentoria', message);
  },

  unassignLearner(email, name, learner) {
    const message = `<p>Olá ${name}</p>
      <p>A aprendiz ${learner} foi desvinculada de sua mentoria. Portanto, não há mais a necessidade de dar suporte a ela.</p>
      <p>Caso deseje receber mais aprendizes, você pode solicitar uma nova aprendiz com os seguintes passos:</p>
      <ul>
      <li>Acesse sua conta de usuário;</li>
      <li>Na guia "Dashboard" acesse o link "solicitar mentoria" na área de mentoria ou acesse diretamente pela guia "Mentoria";</li>
      <li>Dentro da página de "Mentoria", clique no botão "Solicitar Aprendiz".</li>
      </ul>
      <p>Caso alguma aprendiz tenha solicitado um mentor, ela poderá ser atribuída a você.</p>
      <p>Caso não deseje vinculaçaõ com outra aprendiz, clique no botão "Ficar indisponível".
        Dessa forma, não serão atribuídas outras aprendizes à sua mentoria.</p>
        `;
    return mailBuilder(email, 'Cancelamento de Mentoria', message);
  },

  assignMentor(email, name, mentor, mentorGender) {
    let message;
    if (mentorGender === 'Female') {
      message = `<p>Olá ${name}</p>
      <p>Agora você possui uma mentora chamada ${mentor}.</p>
      <p>Caso caso tenha dificuldades para continuar o tutorial, ou alguma dúvida, ou qualquer outra coisa que torne necessário o auxílio de um mentor
      você pode entrar em contato com sua mentora a qualquer momento pelo ícone de chat que estará visível no canto inferior direito em toda a plataforma, desde que esteja vinculada a um mentor.</p>
      <p>Caso deseje saber mais informações sobre sua mentora você pode clicar na guia "Mentoria" ou ainda 
      clicando na guia "Dashboard" e acesse o link "mentoria" na área de mentoria.</p>
      <p>Dentro da página de "Mentoria" você tem acesso as informações do nome e email da sua mentora.</p>
      <p>Caso deseje cancelar a mentoria, você pode, dentro da página de mentoria, clicar no botão "Desvincular" para se desvincular da sua mentora atual.</p>
      `;
    } else {
      message = `<p>Olá ${name}</p>
      <p>Agora você possui um mentor chamado ${mentor}.</p>
      <p>Caso caso tenha dificuldades para continuar o tutorial, ou alguma dúvida, ou qualquer outra coisa que torne necessário o auxílio de um mentor
      você pode entrar em contato com seu mentor a qualquer momento pelo ícone de chat que estará visível no canto inferior direito em toda a plataforma, desde que esteja vinculada a um mentor.</p>
      <p>Caso deseje saber mais informações sobre seu mentor você pode clicar na guia "Mentoria" ou ainda 
      clicando na guia "Dashboard" e acesse o link "mentoria" na área de mentoria.</p>
      <p>Dentro da página de "Mentoria" você tem acesso as informações do nome e email do seu mentor.</p>
      <p>Caso deseje cancelar a mentoria, você pode, dentro da página de mentoria, clicar no botão "Desvincular" para se desvincular do seu mentor atual.</p>
      `;
    }
    return mailBuilder(email, 'Vinculação de Mentor', message);
  },

  assignLearner(email, learner) {
    const message = `<p>Agora você possui uma aprendiz chamada ${learner}.</p>
    <p>Caso seja solicitado(a) você pode ajudá-la no que for preciso para que ela consiga concluir o tutorial.</p>
    <p>Quando ela terminar todo o tutorial e fizer todas as atividades, você receberá um certificado de 
      mentoria, comprovando que você a auxiliou na conclusão do tutorial.</p>
    <p>Caso deseje saber mais informações sobre suas aprendizes você pode clicar na guia "Mentoria" ou ainda 
      clicando na guia "Dashboard" e acesse o link "acessar mentoria" na área de mentoria. Lá você terá acesso ao nome, email e progresso de cada aprendiz que está vinculado(a).</p>
    <p>Dentro da página de Mentoria ainda é possível se desvincular de qualquer aprendiz, clicando no botão "Desvincular" associado a cada aprendiz.</p>
    `;
    return mailBuilder(email, 'Vinculação de Aprendiz', message);
  },

  validateMentor(user) {
    let message;
    if (user.isValidated) {
      if (user.gender === 'Female') {
        message = `
        <p>Parabéns, você foi aprovada como mentora em nossa plataforma.</p>
        <p>A mentoria é um serviço voluntário, no qual aqueles que já tem conhecimento em Django se dispõem a ajudar quem está fazendo o tutorial. 
        O contato é feito a partir de um chat na própria plataforma.</p>
        <p>Caso queira procurar por aprendizes, basta ir à página de Mentoria e clicar em solicitar aprendizes.</p>
        <p>Quando suas aprendizes finalizarem o tutorial, você receberá um certificado de mentoria, e poderá consultá-lo na página de Certificados.</p>
        `;
      } else {
        message = `
        <p>Parabéns, você foi aprovado como mentor em nossa plataforma.</p>
        <p>A mentoria é um serviço voluntário, no qual aqueles que já tem conhecimento em Django se dispõem a ajudar quem está fazendo o tutorial. 
        O contato é feito a partir de um chat na própria plataforma.</p>
        <p>Caso queira procurar por aprendizes, basta ir à página de Mentoria e clicar em solicitar aprendizes.</p>
        <p>Quando suas aprendizes finalizarem o tutorial, você receberá um certificado de mentoria, e poderá consultá-lo na página de Certificados.</p>
        `;
      }
    } else {
      if (user.attempts > 0) { // eslint-disable-line no-lonely-if
        if (user.gender === 'Female') {
          message = `
          <p>Infelizmente, você não foi aprovada como mentora em nossa plataforma.</p>
          <p>Mas não se preocupe, você ainda possui ${user.attempts} tentativa(s) para fazer a prova.</p>
          <p>Estamos torcendo por você!</p>
          `;
        } else {
          message = `
          <p>Infelizmente, você não foi aprovado como mentor em nossa plataforma.</p>
          <p>Mas não se preocupe, você ainda possui ${user.attempts} tentativa(s) para fazer a prova.</p>
          <p>Estamos torcendo por você!</p>
          `;
        }
      } else {
        if (user.gender === 'Female') { // eslint-disable-line no-lonely-if
          message = `
          <p>Infelizmente, você não foi aprovada como mentora em nossa plataforma.</p>
          <p>Não te restam mais tentativas, logo não será possível que você se torne mentora. =(</p>
            `;
        } else {
          message = `
          <p>Infelizmente, você não foi aprovado como mentor em nossa plataforma.</p>
          <p>Não te restam mais tentativas, logo não será possível que você se torne mentor. =(</p>
            `;
        }
      }
    }
    return mailBuilder(user.email, 'Validação de Mentor', message);
  },

  registerConfirm(email, name, registerLink) {
    const message = `<p>Oi, ${name}!</p>
    <p> Sua conta está quase pronta. Para ativá-la, por favor confirme o seu endereço de email clicando <a href="${link}confirma-cadastro/${registerLink}">aqui</a>.</p>
    <p> Sua conta não será ativada até que seu email seja confirmado.</p>
    <p>Se você não se cadastrou na plataforma Minacademy recentemente, por favor ignore este email.</p>
    <p>Se foi você, desde já agradecemos pela decisão de ingressar nessa maravilhosa plataforma de estudos que têm incentivado diversas mulheres a adentrar no mundo maravilhoso da programação!</p>
    `;
    return mailBuilder(email, 'Confirmação de Cadastro', message);
  },
};
