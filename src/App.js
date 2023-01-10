import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useState } from 'react';
import data from './mock.json';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState(data);
  return (
    <BrowserRouter>
    <div>
      <Header/>
			<Main tasks={tasks} setTasks={setTasks} />
			<Footer tasks={tasks} />
    </div>
    </BrowserRouter>
  );
}

export default App;
