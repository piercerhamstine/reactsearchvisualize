import React, { Component } from 'react'

import './GridCell.css'

export default class GridCell extends Component
{
    render(){
        const
        {
            column,
            row,
            isWallCell,
            isStartCell,
            isFinishCell,
        } = this.props;

        const cellTag = 
            isStartCell?'gridcell-start':
            isFinishCell?'gridcell-finish':
            isWallCell?'gridcell-wall':
            'gridcell';

        return(
            <div className={`${cellTag}`}>
            </div>
        );
    }
}