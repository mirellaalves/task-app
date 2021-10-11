import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';
import Column from './column';

const App = () => {
  const [tasksList, settasksList] = useState(initialData);

  return (
    tasksList.columnOrder.map((columnId) => {
      const column = tasksList.columns[columnId];
      const tasks = column.taskIds.map(taskId => tasksList.tasks[taskId]);

      return <Column key={column.id} column={column} tasks={tasks} />;
    })
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
