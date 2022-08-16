import Viewport from './components/Viewport/Viewport';
import Keypad from './components/Keypad/Keypad';
import ModalMessage from './components/ModalMessage/ModalMessage';
import { createPortal } from 'react-dom';

function App() {
  // portal
  const portal = document.getElementById('modal');

  return (
    <>
      <Viewport />
      <Keypad />
      {createPortal(<ModalMessage />, portal)}
    </>
  );
}

export default App;
