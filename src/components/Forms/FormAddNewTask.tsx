import { FC, useContext, useState, ChangeEvent, FormEvent } from 'react';
import Button from '../../ui/button/Button';
import { StoreContext } from '../../stores/root.store';
import { observer } from 'mobx-react-lite';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import { Textarea } from '../../ui/textarea/textarea';
import css from './Forms.module.css';

interface TaskPriority {
  value: string;
  label: string;
}

const FormAddNewTask: FC = () => {
  const { tasksStore } = useContext(StoreContext);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    tasksStore.changeFormValue(e);
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (tasksStore.taskForm.title) {
      await tasksStore.addTask(
        tasksStore.taskForm.title,
        tasksStore.taskForm.description,
        tasksStore.taskForm.priority
      );
      tasksStore.changeFormVisible(false);
    } else {
      setShowPrompt(true);
    }
  };

  const taskPriorities: TaskPriority[] = tasksStore.taskPriorities.map((priority: string) => ({
    value: priority,
    label: priority
  }));

  return (
    <form onSubmit={formSubmit} className={css.form}>
      <Input
        id="taskTitle"
        name="title"
        type="text"
        placeholder="Введите название задачи"
        onChange={handleChange}
        value={tasksStore.taskForm.title}
        label="Название задачи"
      />
      <Select
        id="taskPriority"
        options={taskPriorities}
        onChange={handleChange}
        name="priority"
        label="Приоритет задачи"
        className={css.additionalSelectClass}
      />
      <Textarea
        id="taskDescription"
        name="description"
        placeholder="Введите описание задачи"
        value={tasksStore.taskForm.description}
        onChange={handleChange}
        label="Описание задачи"
      />
      <Button type="submit">Add</Button>
      {showPrompt && <span className="error">Введите название задачи</span>}
    </form>
  );
};

export default observer(FormAddNewTask);
