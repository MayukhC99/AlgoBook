import ShortestPath from './ShortestPath'
import Canvas from './canvas'
import MST from './MST'
import { Switch, Route, Redirect } from 'react-router-dom'

export default function GraphVisualizer() {
    return (
        <Switch>
            <Route path='/graphVisualizer/bfsdfs' component={Canvas} />
            <Route path='/graphVisualizer/dijkstra' selectedGraph='dijkstra' component={ShortestPath} />
            <Route path='/graphVisualizer/PrimMST' selectedGraph='prims' component={ShortestPath} />
            <Route path='/graphVisualizer/KruskalMST' component={MST} />
            <Redirect to="/home#visualizer" />
        </Switch>
    )
}
