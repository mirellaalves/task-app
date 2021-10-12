import React from 'react';
import Task from './task';
import './../styles/task.css';

const Column = (props) => {
    return (
        <div className='column-container'>
            <h3 className='title'>{props.column.title}</h3>
            <div className='task=list'>
                {props.tasks.map(task => <Task key={task.id} task={task} />)}
            </div>
        </div>
    );
}

export default Column;
