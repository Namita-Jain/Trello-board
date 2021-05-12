import React from 'react';
import Header from './components/Header';
import Dashboard from './container/Dashboard';


const App: React.FC = () => {
  return (
    <div>
        <Header />
        <Dashboard />
    </div>
  );
}

export default App;
