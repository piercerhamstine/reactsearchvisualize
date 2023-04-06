export function Astar(graph, startNode, endNode)
{
    InitfScores(graph);
}

function GetManhattenDistance(currCell, endCell)
{
    return Math.abs(currCell.column - endCell.column) + Math.abs(currCell.row - endCell.row);   
}

function InitfScores(graph)
{
    for(let row of graph)
    {
        for(let cell of row)
        {
            if(cell.isStartCell)
            {
                cell.fScore = GetManhattenDistance(cell, endCell);
            }
            else
            {
                cell.fScore = Infinity;
            }
        }
    }
}
