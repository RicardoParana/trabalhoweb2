
document.addEventListener('DOMContentLoaded', function () {
  // Evento para capturar o envio do formulário
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário
    
    // 1. Obtenha os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // 2. Armazene os dados no Local Storage
    const novoItem = {
      nome,
      email,
      dataEnvio: new Date().toLocaleString()
    };

    const listaDados = JSON.parse(localStorage.getItem('listaDados')) || [];
    listaDados.push(novoItem);
    localStorage.setItem('listaDados', JSON.stringify(listaDados));

    // 3. Limpe os campos do formulário
    limparCampos();

    // 4. Atualize a lista
    visualizarLista();
  });

  // Chame a função para visualizar a lista quando a página carregar
  visualizarLista();
});

// Função para visualizar dados em uma lista
function visualizarLista() {
  const listaDados = JSON.parse(localStorage.getItem('listaDados')) || [];
  const listaElemento = document.getElementById('lista-dados');
  listaElemento.innerHTML = ''; // Limpe a lista antes de atualizar

  listaDados.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.nome}</strong> - ${item.email} - ${item.dataEnvio} 
    <button onclick="excluirItem('${item.email}')">Excluir</button>`;
    listaElemento.appendChild(li);
  });
}

// Função para limpar campos do formulário
function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
}

// Função para excluir item da lista
function excluirItem(email) {
  const listaDados = JSON.parse(localStorage.getItem('listaDados')) || [];
  const novaLista = listaDados.filter(item => item.email !== email);
  localStorage.setItem('listaDados', JSON.stringify(novaLista));
  visualizarLista(); // Atualize a lista após a exclusão
}

// Limpeza do Local Storage (apenas para teste, pode ser removido)
// localStorage.clear();
