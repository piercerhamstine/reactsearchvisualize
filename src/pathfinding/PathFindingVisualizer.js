import React, { Component } from "react";

import './PathFindingVisualizer.css'
import GridCell from "./GridCell";

const ROWCOUNT = 10;
const COLCOUNT = 10;

export default class PathFindingVisualizer extends Component
{
    constructor()
    {
        super();
        this.state={grid: []}
    }

    componentDidMount()
    {
        const grid = InitGrid()
        this.setState({grid});
    }

    render()
    {
        const {grid} = this.state;
        
        return(
            <div className="grid">
                {
                    grid.map((row, ndx) =>
                    {
                        return(
                            row.map((cell, cellNdx) =>
                            {
                                return(
                                    <GridCell
                                        column={cell.column}
                                        row={cell.row}
                                        isStartCell={cell.isStartCell}
                                        isWallCell={cell.isWallCell}
                                        isFinishCell={cell.isFinishCell}
                                        ></GridCell>
                                )
                            })
                        )
                    })
                }
            </div>
        )
    }
}

const InitGrid = function()
{
    let grid = [];
    for(let i = 0; i < ROWCOUNT; ++i)
    {
        let currRow = [];
        for(let j = 0; j < COLCOUNT; ++j)
        {
            let cell = ConstructGridCell(i,j);

            if(i===0 && j===0)
                cell.isStartCell = true;
            else if(i === 5 && j === 5)
                cell.isFinishCell = true;

            currRow.push(cell);
        }

        grid.push(currRow);
    }

    return grid;
}

const ConstructGridCell = function(row, column){
    const gridCell = new GridCell({
        column: column,
        row: row,
        isWallCell: false,
        isStartCell: true,
        isFinishCell: false,
    });
    return gridCell;
}
