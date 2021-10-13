import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
import './../styles/column.css';

const Column = (props) => {
    return (
        <div className='column-container'>
            <h3 className='title'>{props.column.title}</h3>
            <Droppable droppableId={props.column.id}>
                {provided =>
                    <div className='task=list' {...provided.droppableProps} ref={provided.innerRef}>
                        {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>
    );
}

export default Column;
