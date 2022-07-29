import './App.css';

import Modal from './Modal/Modal';

const App = () => {

  return (
    <div className="App">
        <canvas id='game'/>
        <Modal/>
        {/* <button onClick={() => setModalActive(true)}>ModalWindow</button> */}
    </div>
  );
}


export default App;
