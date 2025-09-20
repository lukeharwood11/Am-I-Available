import { Text } from '../../../components';
import { MdCheckCircle } from 'react-icons/md';
import Card from '../../../components/card/Card';
import { useState } from 'react';
import styles from './TasksSection.module.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TasksSection = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [tasks, setTasks] = useState<Task[]>([
  //   {
  //     id: '1',
  //     text: 'Review quarterly report',
  //     completed: false
  //   },
  //   {
  //     id: '2',
  //     text: 'Call dentist for appointment',
  //     completed: true
  //   },
  //   {
  //     id: '3',
  //     text: 'Buy groceries for dinner party',
  //     completed: false
  //   }
  // ]);

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  return (
    <Card contentClassName={styles.card}>
      <div className={styles.sectionTitle}>
        <MdCheckCircle />
        <Text variant="heading-small">Today's Tasks</Text>
      </div>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
              className={styles.checkbox}
            />
            <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>
              {task.text}
            </span>
          </div>
        ))}
        {
            tasks.length === 0 && (
                <Text variant="caption">No tasks</Text>
            )
        }
      </div>
    </Card>
  );
};

export default TasksSection;
