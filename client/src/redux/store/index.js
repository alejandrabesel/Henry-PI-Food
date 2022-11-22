import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'; // libreria que te evita escribir todo lo de WINDOWS - hay que instalarla
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
