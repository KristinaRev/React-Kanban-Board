/**
 * Форматирование даты в строке
 * @param {string} stringDate - Строка с датой
 * @returns {string} Отформатированная дата
 */
export function formatDate(stringDate: string): string {
	const date = new Date(stringDate);
	return date.toLocaleString('ru-RU');
}

/**
 * Утилита для подсчета количества задач в каждом статусе
 * @param {Array} tasks - Массив задач
 * @returns {Object} Объект с количеством задач в каждом статусе
 */
export interface Task {
	status: string;
}

export function countTask(tasks: Task[]) {
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

	return counts;
}
