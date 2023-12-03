

document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelectorAll("#verSenha");

  btn.forEach((button) => {
    button.addEventListener('click', () => {
      toggleSenhaVisibility();
    });
  });

  let btnConfirm = document.querySelector('#verConfirmSenha');
  btnConfirm.addEventListener('click', () => {
    toggleConfirmSenhaVisibility();
  });
});

const nome = document.querySelector('#nome');
const labelNome = document.querySelector('#labelNome');
let validNome = false;

const sobreNome = document.querySelector('#sobrenome');
const labelSobreNome = document.querySelector('#labelSobreNome');
let validSobreNome = false;

const cidade = document.querySelector('#cidade');
const labelCidade = document.querySelector('#labelCidade');
let validCidade = false;

const estado = document.querySelector('#estado');
const labelEstado = document.querySelector('#labelEstado');
let validEstado = false;

const email = document.querySelector('#email');
const labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

const senha = document.querySelector('#senha');
const labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let msgError = document.querySelector('#msg-Error');

let msgsucess = document.querySelector('#msg-Sucess');

nome.addEventListener('keyup', () => {
  validNome = validarCampo(nome, labelNome, 3);
});

sobreNome.addEventListener('keyup', () => {
  validSobreNome = validarCampo(sobreNome, labelSobreNome, 3);
});

cidade.addEventListener('keyup', () => {
  validCidade = validarCampo(cidade, labelCidade, 3);
});

estado.addEventListener('keyup', () => {
  validEstado = validarCampo(estado, labelEstado, 2);
});

email.addEventListener('keyup', () => {
  validEmail = validarCampo(email, labelEmail, 3);
});

senha.addEventListener('keyup', () => {
  validSenha = validarCampo(senha, labelSenha, 6);
});

function fazerLogin() {
  if (validNome && validSobreNome && validCidade && validEstado && validEmail && validSenha) {

    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push(
{
  nomelog: nome.value,
  emaillog: email.value,
  cidadelog: cidade.value,
  estadolog: estado.value
});

localStorage.setItem('listaUser', JSON.stringify(listaUser));


    msgsucess.setAttribute('style', 'display: block');
    msgsucess.innerHTML = '<strong>entrando...</strong>';
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';
    setTimeout(()=>{
      window.location.href='';
    },3000)

    adicionarDadosALista({
      nome: nome.value,
      sobrenome: sobreNome.value,
      cidade: cidade.value,
      estado: estado.value
  });
  
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Campos do formulário incompletos</strong>';
    msgsucess.setAttribute('style', 'display: none');
    msgsucess.innerHTML = '';
  }
  atualizarLista();
}
//*
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelectorAll("#verSenha");

  btn.forEach((button) => {
    button.addEventListener('click', () => {
      toggleSenhaVisibility('#senha');
    });
  });

  const btnConfirm = document.querySelector('#verConfirmSenha');
  btnConfirm.addEventListener('click', () => {
    toggleSenhaVisibility('#confirmSenha');
  });
});

function toggleSenhaVisibility(selector) {
  const inputSenha = document.querySelector(selector);
  inputSenha.setAttribute('type', inputSenha.getAttribute('type') === 'password' ? 'text' : 'password');
}

function validarCampo(campo, labelCampo, tamanhoMinimo) {
  const isValid = campo.value.length >= tamanhoMinimo;
  const color = isValid ? 'green' : 'red';

  labelCampo.style.color = color;
  labelCampo.innerHTML = `${campo.name.charAt(0).toUpperCase() + campo.name.slice(1)}: ${isValid ? '' : `Insira no mínimo ${tamanhoMinimo} caracteres`}`;
  campo.style.borderColor = color;

  return isValid;
}



function adicionarDadosALista(dados) {
  let listaDados = JSON.parse(localStorage.getItem('listaDados') || '[]');

  // Adicionar a data e hora de envio aos dados
  let dataEnvio = new Date();
  dados.dataEnvio = `${dataEnvio.toLocaleDateString()} ${dataEnvio.toLocaleTimeString()}`;

  listaDados.push(dados);

  localStorage.setItem('listaDados', JSON.stringify(listaDados));

  // Atualizar a exibição da lista
  exibirLista();
  console.log('Dados adicionados:', dados);
}

function atualizarLista(lista = []) {
  const listaUsuarios = document.getElementById('listaUsuarios');
  listaUsuarios.innerHTML = '';

  const listaUser = lista.length > 0 ? lista : JSON.parse(localStorage.getItem('listaUser') || '[]');

  listaUser.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `Nome: ${item.nomelog}, Email: ${item.emaillog}, Cidade: ${item.cidadelog}, Estado: ${item.estadolog}, Data/Hora: ${item.dataEnvio}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => excluirItem(index));

    li.appendChild(btnExcluir);
    listaUsuarios.appendChild(li);
  });
  console.log('Lista atualizada:', listaUser);
}




/******* */

document.getElementById('btnAdicionar').addEventListener('click', fazerLogin);
document.getElementById('btnLimpar').addEventListener('click', limparCampos);
document.getElementById('btnExcluirTodos').addEventListener('click', excluirTodos);

document.addEventListener('DOMContentLoaded', function() {
  // Recuperar a lista do Local Storage
  const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

  // Obter o elemento de input de pesquisa
  const inputPesquisa = document.getElementById('campoPesquisa');

  // Obter o elemento datalist
  const datalistAutocomplete = document.getElementById('nomesAutocomplete');

  // Preencher o datalist com os nomes da lista
  listaUser.forEach(item => {
    const option = document.createElement('option');
    option.value = item.nomelog;
    datalistAutocomplete.appendChild(option);
  });

  // Adicionar evento de input para atualizar o autocomplete enquanto digita
  inputPesquisa.addEventListener('input', function() {
    const termoPesquisa = inputPesquisa.value.toLowerCase();

    // Limpar o datalist
    datalistAutocomplete.innerHTML = '';

    // Filtrar os nomes da lista com base no termo de pesquisa
    const nomesFiltrados = listaUser
      .map(item => item.nomelog)
      .filter(nome => nome.toLowerCase().includes(termoPesquisa));

    // Adicionar os nomes filtrados ao datalist
    nomesFiltrados.forEach(nome => {
      const option = document.createElement('option');
      option.value = nome;
      datalistAutocomplete.appendChild(option);
    });
  });
});


function limparCampos() {
  
  document.getElementById('nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
  document.getElementById('email').value = '';
  document.getElementById('senha').value = '';
  // Limpar outros campos conforme necessário
}

function excluirItem(index) {
  // Recuperar as listas do Local Storage
  let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
  let listaDados = JSON.parse(localStorage.getItem('listaDados') || '[]');

  // Verificar se o índice é válido para ambas as listas
  if (index >= 0 && index < listaUser.length && index < listaDados.length) {
    // Remover o item das duas listas
    listaUser.splice(index, 1);
    listaDados.splice(index, 1);

    // Atualizar o Local Storage com as novas listas
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    localStorage.setItem('listaDados', JSON.stringify(listaDados));

    // Atualizar a exibição das listas
    atualizarLista();
  }
}

function excluirTodos() {
  // Confirmar se o usuário realmente deseja excluir todos os itens
  const confirmacao = confirm('Tem certeza de que deseja excluir todos os itens?');

  if (confirmacao) {
    // Limpar o Local Storage
    localStorage.removeItem('listaUser');
    localStorage.removeItem('listaDados');

    // Atualizar a exibição da lista
    atualizarLista();
  }
}

//***** */
function pesquisar() {
  const inputPesquisa = document.getElementById('campoPesquisa');
  const termoPesquisa = inputPesquisa.value.toLowerCase();
  const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

  const resultadosPesquisa = listaUser.filter(item =>
    ['nomelog', 'emaillog', 'cidadelog', 'estadolog']
      .some(prop => item[prop].toLowerCase().includes(termoPesquisa))
  );

  atualizarLista(resultadosPesquisa);
}

function atualizarLista(lista = []) {
  const listaUsuarios = document.getElementById('listaUsuarios');
  listaUsuarios.innerHTML = '';

  const listaUser = lista.length > 0 ? lista : JSON.parse(localStorage.getItem('listaUser') || '[]');

  listaUser.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `Nome: ${item.nomelog}, Email: ${item.emaillog}, Cidade: ${item.cidadelog}, Estado: ${item.estadolog}`;
    
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => excluirItem(index));

    li.appendChild(btnExcluir);
    listaUsuarios.appendChild(li);
  });
}

window.onload = function() {
  atualizarLista();
};

function abrirPaginaVisualizar() {
  // Substitua 'sua_pagina.html' pelo caminho da página para a qual você deseja redirecionar
  window.location.href = 'http://127.0.0.1:5501/visualizar.html';
}

function excluirItem(index) {
  const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
  listaUser.splice(index, 1);
  localStorage.setItem('listaUser', JSON.stringify(listaUser));
}

