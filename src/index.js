import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data';
import Column from './components/column';
import './styles/index.css';

const App = () => {
	const [tasksList, settasksList] = useState(initialData);

	const onDragStart = () => {
		document.body.style.color = 'orange';
	}

	const onDragUpdate = (update) => {
		const { destination } = update;
		const opacity = destination 
		  ? destination.index /Object.keys(tasksList.tasks).length
		  : 0;
		document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
	}

	const onDragEnd = (result) => {
		document.body.style.color = 'inherit';
		document.body.style.backgroundColor = 'inherit';
		const { destination, source, draggableId } = result;
		console.log('result:', result)

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const column = tasksList.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
			taskIds: newTaskIds,
		}

		const newListState = {
			...tasksList,
			columns: {
				...tasksList.columns,
				[newColumn.id]: newColumn,
			},
		}

		return settasksList(newListState);
	}

		return (
			<DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
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
