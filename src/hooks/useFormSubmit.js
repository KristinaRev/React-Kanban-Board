import React, {useCallback} from 'react';
import { useId } from 'react-id-generator';
import uniqid from "uniqid";


/**
 * Хук для создания новой задачи
 */
export function useFormSubmit({ tasks, setTasks, title, description, userId, updatedTasks }, callback) {

    return useCallback((title, description, userId) => {
        const newTask = {
            id: uniqid(),
            title,
            description,
            created: new Date().toISOString(),
            status: 'backlog',
        };

        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            callback(data);
        }).catch((error) => {
            console.error('Error adding task:', error.message);
        });

        setTasks(prevTasks => [...prevTasks, newTask]);

    }, [userId, callback]);
}
