import { Switch, Route, Redirect } from 'react-router-dom';
import BubbleSort from './SortComponent';

export default function SortingVisualizer() {
    return (
        <Switch>
            <Route path='/sortingVisualizer' component={BubbleSort} />
            <Redirect to='/home#visualizer' />
        </Switch>
    )
}