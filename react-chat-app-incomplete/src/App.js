import { Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChatWindow from './pages/./Chat/ChatWindow';

function App() {
  return (
    <main>
      {/* pages */}
      <Routes>
        {/* signin */}
        <Route path='/' element={<SignIn />} />

        {/* signup */}
        <Route path='/signup' element={<SignUp />} />

        {/* chat */}
        <Route path='/chat' element={<ChatWindow />} />

        {/* fallback page */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </main>
  );
}

export default App;
