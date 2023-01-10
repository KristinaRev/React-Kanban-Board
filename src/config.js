const LIST_TYPES = {
	BACKLOG: 'backlog',
	IN_PROGRESS: 'inProgress',
	DONE: 'done',
}

const LIST_COPY = {
	[LIST_TYPES.BACKLOG]: 'Backlog',
	[LIST_TYPES.IN_PROGRESS]: 'In progress',
	[LIST_TYPES.DONE]: 'Done',
}

const LIST_COLORS = {
	[LIST_TYPES.BACKLOG]: '#b95959',
	[LIST_TYPES.IN_PROGRESS]: '#4b69b1',
	[LIST_TYPES.DONE]: '#a0b959',
}

export { LIST_TYPES, LIST_COPY, LIST_COLORS }