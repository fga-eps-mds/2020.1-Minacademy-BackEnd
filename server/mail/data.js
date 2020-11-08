const link = 'http://localhost:3000';
const from = 'minAcademy@minAcademy.com';

function html(subject, message) {
  return `
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
  </html>`;
}

module.exports = {
  changeEmailLink(email, changeEmailLink) {
    const message = `<p>Olá, recebemos a sua solicitação de troca do endereço de e-mail. Estamos aqui para ajudar!</p>
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
    const message = `<p>Olá, ficamos sabendo que você esqueceu a sua senha, mas não se preocupe, estamos aqui para ajudar.</p>
      <p>Para ser redirecionado(a) para a página de redefinição de senha clique <a href="${link}/change/${resetLink}">aqui</a>.</p>`;

    return {
      from,
      to: email,
      subject: 'Redefinição de Senha',
      html: html('Redefinição de Senha', message),
    };
  },

  costum(email, subject, message) {
    return {
      from,
      to: email,
      subject,
      html: html(subject, message),
    };
  },
};
