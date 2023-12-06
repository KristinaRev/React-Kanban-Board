import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import data from './mock.json';

function App() {
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'));
    const initialState = storedTasks || data;
    const [tasks, setTasks] = useState(initialState);

    useEffect(() => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Main tasks={tasks} setTasks={setTasks} />
                <Footer tasks={tasks} />
            </div>
        </BrowserRouter>
    );
}

export default App;
