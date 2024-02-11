import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import uniqid from 'uniqid';

function App() {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/tasks`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log('Tasks data fetched:', data);
                    setTasks(data);
                })
                .catch(error => console.error('Error fetching tasks:', error.message));
        }
    }, [user]);

    const handleLogin = () => {
        const usernameToLogin = 'SPIKS';
        setUser(usernameToLogin);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        setUser(null);
        setTasks([]);
    };

    const formSubmit = async (title, description) => {
        const newTask = {
            id: uniqid(),
            title,
            description,
            created: new Date().toISOString(),
            status: 'backlog',
            userId: user.id,
        };

        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setTasks([...tasks, data]);

            // console.log('Task added:', data);
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    return (
        <BrowserRouter>
            <div>
                <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
                <Main tasks={tasks} setTasks={setTasks} formSubmit={formSubmit} />
                <Footer tasks={tasks} />
            </div>
        </BrowserRouter>
    );
}

export default App;
