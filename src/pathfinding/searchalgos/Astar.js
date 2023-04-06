export function Astar(graph, startCell, endCell)
{
    InitfScores(graph, endCell);

    const openNodes = [];
    const visited = [];

    openNodes.push(startCell);

    while(openNodes.length !== 0)
    {
        openNodes.sort((lhs, rhs) => lhs.fScore - rhs.fScore);

        const currCell = openNodes.shift();
        currCell.isVisited = true;

        if(currCell.distance >= Infinity)
            break;
        
        if(currCell.isWallCell)
            continue;

        visited.push(currCell);

        if(currCell.isFinishCell)
            break;

        const adjacents = GetAdjacents(graph, currCell);

        for(let i = 0; i < adjacents.length; ++i)
        {
            if(adjacents[i].isVisited || adjacents[i].isWallCell)
                continue;

            let gScore = currCell.distance;
            let hScore = GetManhattenDistance(currCell, endCell);

            let newDist = currCell.distance + 1;
            if(newDist < adjacents[i].distance)
            {
                adjacents[i].distance = newDist;
                adjacents[i].fScore = newDist + GetManhattenDistance(adjacents[i], endCell);
                adjacents[i].prevCell = currCell;

                if(!openNodes.includes(adjacents[i]))
                    openNodes.push(adjacents[i]);
            }
        }
    }

    return visited;
}

function GetAdjacents(graph, currCell)
{
    const adjacentCells = [];

    const rows = graph.length;
    const cols = graph[0].length;

    const x = currCell.column;
    const y = currCell.row;

    if(x > 0)
    {
        adjacentCells.push(graph[y][x-1]);
    };
    if(x < cols-1)
    {
        adjacentCells.push(graph[y][x+1]);
    };
    if(y > 0)
    {
        adjacentCells.push(graph[y-1][x]);
    }
    if(y < rows-1)
    {
        adjacentCells.push(graph[y+1][x]);
    };

    return adjacentCells;  
}

function GetManhattenDistance(currCell, endCell)
{
    return Math.abs(currCell.column - endCell.column) + Math.abs(currCell.row - endCell.row);   
}

function InitfScores(graph, endCell)
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
