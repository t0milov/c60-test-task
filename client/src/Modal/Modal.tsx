import './modal.css'

const Modal = () => {
    return(
        <div id='parent' className="modal" 
        onClick={() => { 
            document.getElementById('parent')?.setAttribute('class', 'modal')
            document.getElementById('child')?.setAttribute('class', 'modal__content')}
            }>
            <div id='child' className="modal__content">
                <h1 id="message"></h1>
            </div>
        </div>
    )
}

export default Modal;