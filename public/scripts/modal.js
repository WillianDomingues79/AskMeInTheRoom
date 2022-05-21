export default function Modal() {
  const modalWrapper = document.querySelector('.modal-wrapper')

  const cancelButton = document.querySelector('.button.cancel')
  cancelButton.addEventListener('click', close)

  function open() {
    //função para pegar a classe modal-wrapper e adicionar a classe active para abrir a pagina
    modalWrapper.classList.add('active')
  }
  function close() {
    //Nessa função remove essa classe para fechar a janela
    modalWrapper.classList.remove('active')
  }

  return {
    open,
    close
  }
}
