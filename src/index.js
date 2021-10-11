import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';

const App = () => {
  const [tasksList, settasksList] = useState(initialData);

  return (
    tasksList.columnOrder.map((columnId) => {
      const column = tasksList.columns[columnId];
      const tasks = column.taskIds.map(taskId => tasksList.tasks[taskId]);

      return column.title;
    })
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
