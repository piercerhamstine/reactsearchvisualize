import React, { Component } from "react";

import './PathFindingVisualizer.css';
import { Dijkstras } from "./searchalgos/DijkstraShortestPath";
import GridCell from "./GridCell";

const ROWCOUNT = 30;
const COLCOUNT = 60;

const DEFAULTSTARTROW = 5
const DEFAULTSTARTCOL = 5

const DEFAULTFINALROW = 10
const DEFAULTFINALCOL = 10

export default class PathFindingVisualizer extends Component
{
    constructor()
    {
        super();
        this.state={grid: [], buttonsToggled: true, isMouseDown: false}
    }

    componentDidMount()
    {
        const grid = InitGrid()
        this.setState({grid: grid});

        this.LinkMenuBar()
    }

    LinkMenuBar()
    {
        document.getElementById("button-clear").onclick = ()=>
        {
            this.Reset();
        }

        document.getElementById("button-start").onclick = ()=>
        {
            this.RunDijkstra()
        }
    }

    ToggleNavbarButtons()
    {
        if(this.state.buttonsToggled)
        {
            console.log("Toggled off");
            this.state.buttonsToggled = false;
            const elements = document.querySelectorAll(".navbar-button");
            for(let element of elements)
            {
                element.classList.remove("navbar-button");
                element.classList.add("navbar-button-disabled");
            }
        }
        else
        {
            console.log("Toggled on");
            this.state.buttonsToggled = true;
            const elements = document.querySelectorAll(".navbar-button-disabled");
            for(let element of elements)
            {
                element.classList.remove("navbar-button-disabled");
                element.classList.add("navbar-button");
            }
        }
    }

    OnMouseDownHandler(row, col)
    {
        const currGrid = this.state.grid;
        const currCell = currGrid[row][col];
        currCell.isWallCell = !currCell.isWallCell;

        this.setState({grid: currGrid, isMouseDown: true});
    }

    OnMouseEnterHandler(row, col)
    {
        let isMouseDown = this.state.isMouseDown;
        if(!isMouseDown)
            return;
        
        let currGrid = this.state.grid;
        let currCell = currGrid[row][col];
        currCell.isWallCell = !currCell.isWallCell;
        this.setState({grid: currGrid});
    }

    OnMouseUpHandler()
    {
        console.log("mouse up");
        this.setState({isMouseDown: false});
    }

    RunDijkstra()
    {
        const {grid} = this.state;
        const cellsVisited = Dijkstras(grid);
        const pathCells = [];

        let finalCell = cellsVisited[cellsVisited.length-1];
        while(finalCell !== null)
        {
            pathCells.push(finalCell);
            finalCell = finalCell.prevCell;
        }

        for(let i = 0; i < cellsVisited.length; ++i)
        {
            if(i === cellsVisited.length-1 && pathCells[0].isFinishCell)
            {
                setTimeout(() =>{
                    this.UpdateFinalPath(pathCells);
                }, 10*i);
            }

            setTimeout(() =>{
                const cell = cellsVisited[i];
                document.getElementById(`${cell.row}_${cell.column}`).className = 'gridcell-visited';
            }, 10*i);
        }
    }

    UpdateFinalPath(path)
    {
        for(let i = 0; i < path.length; ++i)
        {
            setTimeout(() =>{
                const cell = path[i];
                document.getElementById(`${cell.row}_${cell.column}`).className = 'gridcell-final';
            }, 50*i);

        }

    };

    // I hate this implementation of resetting the grid
    // Need to study up and find a better solution
    Reset()
    {
        const currGrid = this.state.grid;
        for(let row of currGrid)
        {
            for(let cell of row)
            {
                let htmlElement = document.getElementById(`${cell.row}_${cell.column}`);
                
                if(cell.row === DEFAULTSTARTROW && cell.column === DEFAULTSTARTCOL)
                {
                    htmlElement.className = 'gridcell-start';
                }
                else if(cell.row === DEFAULTFINALROW && cell.column === DEFAULTFINALCOL)
                {
                    htmlElement.className = 'gridcell-finish';
                }
                else
                {
                    htmlElement.className = 'gridcell';
                }
            }
        }
        
        const newGrid = InitGrid();
        this.setState({grid: newGrid});
    };

    render()
    {
        const {grid} = this.state;

        return(
        <>
            <div className="container">
                <div className="dropdown">
                    <a className="dropdown-toggle" href="#">Algorithms</a>
                    <div className="dropdown-menu grid-selection">
                        <a className="dropdown-button" href="#">Dijkstra's</a>
                        <a className="dropdown-button" href="#">A*</a>
                    </div>
                </div>
                <div id="navbar-button" className="navbar-button">
                    <a id="button-start" href="#">Start</a>
                </div>
                <div id="navbar-button" className="navbar-button">
                    <a id="button-clear" href="#">Clear</a>
                </div>

            </div>
            <div className="grid">
                {
                    grid.map((row, ndx) =>
                    {
                        return(
                            row.map((cell, cellNdx) =>
                            {
                                return(
                                    <GridCell
                                        key={`${ndx}_${cellNdx}`}
                                        column={cell.column}
                                        row={cell.row}
                                        isStartCell={cell.isStartCell}
                                        isWallCell={cell.isWallCell}
                                        isFinishCell={cell.isFinishCell}
                                        mouseDownEvent={ (row, column)=>{this.OnMouseDownHandler(row, column)} }
                                        mouseEnterEvent={(row, column)=>{this.OnMouseEnterHandler(row, column)}}
                                        mouseUpEvent={()=>this.OnMouseUpHandler()}
                                    >
                                    </GridCell>
                                )
                            })
                        )
                    })
                }
            </div>
        </>
        )
    }
}

const InitGrid = function()
{
    const grid = [];
    for(let i = 0; i < ROWCOUNT; ++i)
    {
        const currRow = [];
        for(let j = 0; j < COLCOUNT; ++j)
        {
            const cell = ConstructGridCell(i,j);

            // Temp start/end cells
            if(i=== DEFAULTSTARTROW && j=== DEFAULTSTARTCOL)
            {
                cell.isStartCell = true;
                cell.distance = 0;
            }
            else if(i === DEFAULTFINALROW && j === DEFAULTFINALCOL)
                cell.isFinishCell = true;

            currRow.push(cell);
        }

        grid.push(currRow);
    }

    return grid;
}

const ConstructGridCell = function(row, column)
{    
    return{
        column,
        row,
        distance: Infinity,
        isVisited: false,
        prevCell: null,
        isWallCell: false,
        isStartCell: false,
        isFinishCell: false,
    }
}
