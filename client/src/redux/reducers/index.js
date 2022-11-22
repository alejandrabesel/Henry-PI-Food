import { GET_ALL_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPES_BY_ID,  GET_RECIPE_DETAILS, CREATE_RECIPE, GET_ALL_DIETS, GET_RECIPES_BY_DIET, GET_RECIPES_BY_CREATOR, GET_RECIPES_BY_ORDER, GET_NAME_CHARACTERS} from "../actions/index"

const initialState = {
  recipes: [],
  allRecipes : [],
  recipeDetail: {},
  diets: [],
};

const reducer = (state = initialState, action) => {
switch (action.type) {
  case GET_ALL_RECIPES:
    return {
      ...state, 
      recipes: action.payload,
      allRecipes: action.payload
    }
  case GET_NAME_CHARACTERS:
    return {
      ... state,
      recipes: action.payload
    }
  case GET_ALL_DIETS:
    return {
      ...state, 
      diets: action.payload
    }
  case GET_RECIPES_BY_DIET:
    const allRecipes = state.allRecipes; // SIEMPRE tendra todas las recetas, no se modifica ese estado. Sobre este estado es sobre el que haré el filter
    const recipesFilteredByDiet = action.payload === 'All' ? allRecipes : allRecipes?.filter(recipe => recipe.diets.map(diet => diet.name).includes(action.payload));
     
    return {
      ... state,
      recipes: recipesFilteredByDiet // y en el estado recipes es en el que actualizo el estado
    }
  case GET_RECIPES_BY_CREATOR:
    const allRecipes2 = state.allRecipes;
    const recipesByCreator = action.payload === 'Api' ? allRecipes2.filter(recipe => typeof(recipe.id) === "number") :  allRecipes2.filter(recipe => typeof(recipe.id) === "string");
    return {
      ...state, 
      recipes: action.payload === "All" ? state.allRecipes : recipesByCreator
    }
  case GET_RECIPES_BY_ORDER:
    let sortedArr = [];
    switch(action.payload) {
      case "AscAlph":
        sortedArr = state.recipes.sort(function(a, b) {
          if (a.name > b.name) return 1; // si a es mayor(=esta antes) adelantalo un lugar
          if (b.name > a.name) return -1; // si es menor(=esta dsp) atrasalo un lugar
          return 0; // sino dejalo donde estaba
      }); 
      return {
        ... state,
        recipes: sortedArr
      }
      case "DescAlph":
        sortedArr = state.recipes.sort(function(a, b) { // desc
          if (a.name > b.name) return -1; // si a es mayor(=esta antes) atrasalo un lugar
          if (b.name > a.name) return 1; // si a es menor(=esta dsp) adelantalo un lugar
          return 0; // sino dejalo donde estaba
      });
      return {
        ... state,
        recipes: sortedArr
      }
      case "AscNum":
        sortedArr = state.recipes.sort(function(a, b) {
          if (a.healthScore > b.healthScore) return 1; 
          if (b.healthScore > a.healthScore) return -1; 
          return 0;
      });
      return {
        ... state,
        recipes: sortedArr
      }
      case "DescNum":
        sortedArr = state.recipes.sort(function(a, b) { 
          if (a.healthScore > b.healthScore) return -1; 
          if (b.healthScore > a.healthScore) return 1; 
          return 0;
      });   
      return {
        ... state,
        recipes: sortedArr
      }
    }
    console.log("sortedArr:", sortedArr);
  case CREATE_RECIPE:
    return {
      ... state,
    }
  case GET_RECIPE_DETAILS:
    return {
      ...state,
      recipeDetail: action.payload
    }
  default:
    return {
      ... state
    }
  }
}


export default reducer;
