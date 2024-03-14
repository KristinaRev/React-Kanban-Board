const formatDate = (stringDate) => {
	const date = new Date(stringDate)
	return date.toLocaleString('ru-RU')
}

export { formatDate }

/**
 * Утилита для подсчета количества задач
 */
export function countTask (tasks) {
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
