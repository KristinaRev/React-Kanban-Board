import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

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
 * Вывод ошибки в консоль и алерт
 * @param {string} stringError - Строка с ошибкой
 * @param {unknown} error - Сообщение об ошибке
 * @returns {boolean} - Всегда возвращает false
 */
export function showErrorNotification(stringError: string, error: unknown): boolean {
  const notificationText = stringError;
  alert(notificationText);
  if (error instanceof Error) {
    console.log(`${notificationText}:`, error.message);
  } else {
    console.log(`${notificationText}:`, error);
  }
  return false;
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

  tasks.forEach((task) => {
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
