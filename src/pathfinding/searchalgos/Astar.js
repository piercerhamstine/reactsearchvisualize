export function Astar(graph)
{
    InitfScores(graph);
}

function InitfScores(graph)
{
    for(let row of graph)
    {
        for(let cell of row)
        {
            cell.fScore = Infinity;
            console.log(cell);
        }
    }
}
