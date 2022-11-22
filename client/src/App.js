import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom"; // switch se va a mover solo entre los componentes que esta enrutando. Si pones un url que no es valida, va a ir a la ultima en la que entró
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = '/' component={LandingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route path = '/home/create' component={CreateRecipe}/>
        <Route path = '/home/:id' render={({match}) => <RecipeDetail match = {match} /> } />
      </Switch>
    </div>
  );
}

export default App;
