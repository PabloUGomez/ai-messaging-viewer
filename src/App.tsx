import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MessageViewer from './pages/MessageViewer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MessageViewer />} />
      </Routes>
    </Router>
  );
};

export default App;