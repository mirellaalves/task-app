import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data';
import Column from './components/column';
import './styles/index.css';

const App = () => {
	const [tasksList, settasksList] = useState(initialData);

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = tasksList.columns[source.droppableId];
		const finish = tasksList.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...finish,
				taskIds: newTaskIds,
			}

			const newState = {
				...tasksList,
				columns: {
					...tasksList.columns,
					[newColumn.id]: newColumn,
				},
			}

			return settasksList(newState);
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);

		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);

		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newState = {
			...tasksList,
			columns: {
				...tasksList.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		return settasksList(newState);
	}

		return (
			<DragDropContext onDragEnd={onDragEnd}>
				<div className='container'>
					{tasksList.columnOrder.map((columnId) => {
						const column = tasksList.columns[columnId];
						const tasks = column.taskIds.map(taskId => tasksList.tasks[taskId]);

						return <Column key={column.id} column={column} tasks={tasks} />;
					})}
				</div>
			</DragDropContext>
		)
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
