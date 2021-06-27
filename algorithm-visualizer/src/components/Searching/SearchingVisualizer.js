import { Switch, Route, Redirect } from 'react-router-dom';
import LinearParent from './linear_parent';
import BinaryParent from './Binary_parent';
import InterpolationParent from './interpolation_parent';

export default function SearchingVisualizer() {
    return (
        <Switch>
            <Route path='/searchingVisualizer/linearsearch' component={LinearParent} />
            <Route path='/searchingVisualizer/binarysearch' component={BinaryParent} />
            <Route path='/searchingVisualizer/interpolationsearch' component={InterpolationParent} />
            <Redirect to='/home#visualizer' />
        </Switch>
    )
}
