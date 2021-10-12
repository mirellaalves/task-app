import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
import './../styles/task.css';

const Column = (props) => {
    return (
        <div className='column-container'>
            <h3 className='title'>{props.column.title}</h3>
            <Droppable>
                {(provided) =>
                    <div className='task=list' {...provided.droppableProps}>
                        {props.tasks.map(task => <Task key={task.id} task={task} />)}
                    </div>
                }
            </Droppable>
        </div>
    );
}

export default Column;
