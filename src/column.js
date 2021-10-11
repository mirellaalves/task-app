import React from 'react';
import Task from './task';

const Column = (props) => {
    return (
        <div className='container'>
            <div className='title'>{props.column.title}</div>
            <div className='task=list'>
                {props.tasks.map(task => <Task key={task.id} task={task} />)}
            </div>
        </div>
    );
}

export default Column;
