import Modal from './modal.js'
const modal = Modal()

//Pegando classes do Modal(tela que aparece quando aperta um botão)
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//Pega todos os botoes que tenham a classe para manusear o CHECK e o DELETE
const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButton = document.querySelectorAll('.actions a.delete')

//Faz o laço para verificar se o botão foi clicado e com isso chamado a função
checkButtons.forEach(button => {
  //adiciona uma escuta para ver quando o botão foi clicado
  button.addEventListener('click', handleClick)
})

//Faz o laço para verificar se o botão foi clicado e com isso chamado a função
deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

//Função criada para não precisa ficar chamando varias vezes no for de check e delete
function handleClick(event, check = true) {
  event.preventDefault() //Faz nao alterar a rota do link acima
  const text = check ? 'Marcar como lida' : 'Excluir'
  const slug = check ? 'check' : 'delete'

  const roomId = document.querySelector('#room-id').dataset.id
  //Pegando o formulario para a passagem da rota e informações do botão enviar
  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/room/${roomId}/:question/${slug}`) //Muda o caminho da classe action para este

  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta`
  modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red') //Esse check é o usado ali em cima nos parametros

  modal.open()
}
