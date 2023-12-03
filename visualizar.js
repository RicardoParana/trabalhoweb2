
document.addEventListener('DOMContentLoaded', function() {
  // Criação do formulário
  const form = document.createElement('form');
  form.setAttribute('id', 'meuFormulario');

  // Campo Nome
  const labelNome = document.createElement('label');
  labelNome.textContent = 'Nome:';
  const inputNome = document.createElement('input');
  inputNome.setAttribute('type', 'text');
  inputNome.setAttribute('name', 'nome');
  form.appendChild(labelNome);
  form.appendChild(inputNome);
  form.appendChild(document.createElement('br'));

  // Campo E-mail
  const labelEmail = document.createElement('label');
  labelEmail.textContent = 'E-mail:';
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('name', 'email');
  form.appendChild(labelEmail);
  form.appendChild(inputEmail);
  form.appendChild(document.createElement('br'));

  // Campo Cidade
  const labelCidade = document.createElement('label');
  labelCidade.textContent = 'Cidade:';
  const inputCidade = document.createElement('input');
  inputCidade.setAttribute('type', 'text');
  inputCidade.setAttribute('name', 'cidade');
  form.appendChild(labelCidade);
  form.appendChild(inputCidade);
  form.appendChild(document.createElement('br'));

  // Campo Estado
  const labelEstado = document.createElement('label');
  labelEstado.textContent = 'Estado:';
  const inputEstado = document.createElement('input');
  inputEstado.setAttribute('type', 'text');
  inputEstado.setAttribute('name', 'estado');
  form.appendChild(labelEstado);
  form.appendChild(inputEstado);
  form.appendChild(document.createElement('br'));

  // Botão de Envio
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'button');
  submitButton.textContent = 'Adicionar';
  submitButton.addEventListener('click', function() {
    // Obter os valores dos campos do formulário
    const nome = inputNome.value;
    const email = inputEmail.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;

    // Criar objeto com os dados do formulário e a data/hora
    const dataEnvio = new Date().toLocaleString();
    const dadosFormulario = {
      nome: nome,
      email: email,
      cidade: cidade,
      estado: estado,
      dataEnvio: dataEnvio
    };

    // Armazenar no localStorage
    const listaDados = JSON.parse(localStorage.getItem('listaDados') || '[]');
    listaDados.push(dadosFormulario);
    localStorage.setItem('listaDados', JSON.stringify(listaDados));

    // Limpar os campos do formulário
    limparCampos();
  });
  form.appendChild(submitButton);

  // Adicionar formulário ao body
  document.body.appendChild(form);

  // Função para limpar os campos do formulário
  function limparCampos() {
    inputNome.value = '';
    inputEmail.value = '';
    inputCidade.value = '';
    inputEstado.value = '';
  }
});

  

// Obter a lista de dados do Local Storage
const listaDados = JSON.parse(localStorage.getItem('listaDados')) || [];
// const listaUserDados = JSON.parse(localStorage.getItem('listaUser')) || [];

// Obter os elementos UL onde os itens serão exibidos
const listaItens = document.getElementById('listaItens');
// const listaUser = document.getElementById('listaUser');
      
const botaoAtualizar = document.createElement('button');
botaoAtualizar.textContent = 'Atualizar Lista';
botaoAtualizar.addEventListener('click', atualizarLista);
document.body.appendChild(botaoAtualizar);

// Função para gerar dinamicamente a lista a partir do Local Storage
function gerarLista() {
  // Limpar as listas atuais
  listaItens.innerHTML = "";
  listaUser.innerHTML = "";

   // Verificar se há itens na lista
   if (listaDados.length === 0) {
    const liItens = document.createElement('li');
    liItens.textContent = 'Nenhum item na lista.';
    listaItens.appendChild(liItens);
  } else {
    // Iterar sobre a lista e adicionar cada item à lista no HTML
    listaDados.forEach((item, index) => {
      const liItens = document.createElement('li');
      liItens.textContent = `Nome: ${item.nome}, Cidade: ${item.cidade}, Estado: ${item.estado}, Data/Hora: ${item.dataEnvio}`;

      // Adicionar botão de exclusão
      const botaoExcluirItens = document.createElement('button');
      botaoExcluirItens.textContent = 'Excluir';
      botaoExcluirItens.onclick = function () {
        excluirItem(index);
      };

      liItens.appendChild(botaoExcluirItens);
      listaItens.appendChild(liItens);
    });
  }

  // Verificar se há itens na lista de usuários
  if (listaUserDados.length === 0) {
    const liUser = document.createElement('li');
    liUser.textContent = 'Nenhum item na lista de usuários.';
    listaUser.appendChild(liUser);
  } else {
    // Iterar sobre a lista de usuários e adicionar cada item à lista no HTML
    listaUserDados.forEach((user) => {
      const liUser = document.createElement('li');
      liUser.textContent = `Nome de usuário: ${user.username}, Email: ${user.email}`;

      listaUser.appendChild(liUser);
    });
  }
}

      // Adicionar o item e o botão à lista
      liItens.appendChild(botaoExcluirItens);
      listaItens.appendChild(liItens);

      // Adicionar o mesmo item à lista de usuários
      const liUser = document.createElement('li');
      liUser.textContent = `Nome: ${item.nome}, Sobrenome: ${item.sobrenome}, Cidade: ${item.cidade}, Estado: ${item.estado}, Data/Hora: ${item.dataEnvio}`;
      listaUser.appendChild(liUser);
    
  


  
//**
 // Função para adicionar um novo item à lista diretamente do botão "Adicionar"
 function adicionarItem() {
      const nome = prompt('Digite o Nome:');
      const sobrenome = prompt('Digite o Sobrenome:');
      const cidade = prompt('Digite a Cidade:');
      const estado = prompt('Digite o Estado:');

      // Validar se os campos estão preenchidos
      if (nome && sobrenome && cidade && estado) {
        // Criar um novo objeto de item
        const novoItem = {
          nome: nome,
          sobrenome: sobrenome,
          cidade: cidade,
          estado: estado,
          dataEnvio: new Date().toLocaleString()  // Adicionando data/hora atual
        };
       // Adicionar o novo item à lista
       listaDados.push(novoItem);

// Atualizar o Local Storage
localStorage.setItem('listaDados', JSON.stringify(listaDados));

// Gerar a lista atualizada
gerarLista();
} else {
alert('Por favor, preencha todos os campos.');
}
}

// Função para criar um elemento de lista com botão de exclusão
function criarElementoLista(item, index) {
  const li = document.createElement('li');
  li.textContent = `Nome: ${item.nome}, Sobrenome: ${item.sobrenome}, Cidade: ${item.cidade}, Estado: ${item.estado}, Data/Hora: ${item.dataEnvio}`;

  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.onclick = function () {
    excluirItem(index);
  };
  li.appendChild(botaoExcluir);
  return li;
}

// Função para excluir um item do Local Storage e atualizar a lista
function excluirItem(index) {
  // Remover o item do array
  listaDados.splice(index, 1);

  // Atualizar o Local Storage
  localStorage.setItem('listaDados', JSON.stringify(listaDados));

  // Gerar a lista atualizada
  gerarLista();
}

// Função para excluir todos os itens do Local Storage e atualizar a lista
function excluirTodos() {
  // Limpar a lista de dados e o Local Storage
  listaDados.length = 0;
  localStorage.setItem('listaDados', JSON.stringify(listaDados));

  // Gerar a lista atualizada
  gerarLista();
}

document.getElementById('btnPesquisar').addEventListener('click', function() {
  pesquisar();
});

document.addEventListener('click', function (event) {
  const autocompletarLista = document.getElementById('autocompletarLista');
  const campoPesquisa = document.getElementById('campoPesquisa');

  if (event.target !== autocompletarLista && event.target !== campoPesquisa) {
    autocompletarLista.innerHTML = ''; // Limpar a lista de sugestões ao clicar fora dela
  }
});

// Função para pesquisar itens na lista com autocompletar
function pesquisar() {
  const campoPesquisa = document.getElementById('campoPesquisa');
  const termoPesquisa = campoPesquisa.value.toLowerCase();

  // Filtrar a lista com base no termo de pesquisa
  const listaFiltrada = listaDados.filter(item => {
    return (
      item.nome.toLowerCase().includes(termoPesquisa) ||
      item.sobrenome.toLowerCase().includes(termoPesquisa) ||
      item.cidade.toLowerCase().includes(termoPesquisa) ||
      item.estado.toLowerCase().includes(termoPesquisa)
    );
  });

  // Atualizar a lista com os resultados da pesquisa
  gerarLista(listaFiltrada);

  // Adicionar autocompletar diretamente no botão de pesquisa
  const sugestoesAutocompletar = listaFiltrada.map(item => item.nome); // Utilizando apenas o campo 'nome' como exemplo
  exibirAutocompletar(sugestoesAutocompletar);
}

// Função para exibir sugestões de autocompletar
function exibirAutocompletar(sugestoes) {
  const autocompletarLista = document.getElementById('autocompletarLista');
  autocompletarLista.innerHTML = '';

  sugestoes.forEach(sugestao => {
    const sugestaoItem = document.createElement('div');
    sugestaoItem.textContent = sugestao;
    sugestaoItem.onclick = function () {
      document.getElementById('campoPesquisa').value = sugestao;
      autocompletarLista.innerHTML = ''; // Limpar a lista de sugestões
      pesquisar(); // Executar a pesquisa novamente ao clicar na sugestão
    };

    autocompletarLista.appendChild(sugestaoItem);
  });
}

// Adicionar um evento de input ao campo de pesquisa para chamar a função de autocompletar
document.getElementById('campoPesquisa').addEventListener('input', function () {
  const termoPesquisa = this.value.toLowerCase();
  const sugestoesAutocompletar = listaDados
    .map(item => item.nome)
    .filter(nome => nome.toLowerCase().includes(termoPesquisa));
  exibirAutocompletar(sugestoesAutocompletar);
});

//cadastrar cliente
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("listaDados", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(listaDados)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(listaDados)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const listaDados = getLocalStorage()
    listaDados.push (client)
    setLocalStorage(listaDados)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            estado: document.getElementById('estado').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const listaDados = readClient()
    clearTable()
    listaDados.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('estado').value = client.estado
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${client.nome}`
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}


  