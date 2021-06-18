import { Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search';

export default function SearchingVisualizer() {
    return (
        <Switch>
            <Route path='/searchingVisualizer' component={Search} />
            <Redirect to='/home#visualizer' />
        </Switch>
    )
}
