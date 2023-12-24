import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import data from './mock.json';
import uniqid from 'uniqid';

function App() {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'));
    const initialStateUser = storedUser || null;
    const initialStateTasks = storedTasks || data;
    const [user, setUser] = useState(initialStateUser);
    const [tasks, setTasks] = useState(initialStateTasks);

    useEffect(() => {
        console.log('User data updated:', user);
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        console.log('Tasks data updated:', tasks);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleLogin = () => {
        const usernameToLogin = 'SPIKS';

        fetch(`http://localhost:3001/users?username=${usernameToLogin}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User logged in:', data);

                if (data.length > 0) {
                    const user = data[0];
                    setTasks(user.tasks || []);
                    setUser(user);
                } else {
                    console.error('User not found');
                }
            })
            .catch(error => console.error('Error logging in:', error.message));
    };

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('tasks');
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

            console.log('Task added:', data);
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
