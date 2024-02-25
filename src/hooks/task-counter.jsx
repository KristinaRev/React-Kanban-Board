import React, { useState, useEffect } from 'react';

const useTaskCounter = (tasks) => {
    const [taskCounts, setTaskCounts] = useState({
        backlog: 0,
        inProgress: 0,
        ready: 0,
        done: 0,
    });

    useEffect(() => {
        const countTasks = () => {
            const counts = {
                backlog: 0,
                inProgress: 0,
                ready: 0,
                done: 0
            };

            tasks.forEach(task => {
                switch (task.status) {
                    case 'backlog':
                        counts.backlog++;
                        break;
                    case 'inProgress':
                        counts.inProgress++;
                        break;
                    case 'ready':
                        counts.ready++;
                        break;
                    case 'done':
                        counts.done++;
                        break;
                    default:
                        break;
                }
            });

            setTaskCounts(counts);
        };

        countTasks();


    }, [tasks]);

    return taskCounts;
};

export default useTaskCounter;
