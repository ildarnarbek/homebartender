import { getApiPath } from "./apiHelpers";
import axios from 'axios';

class CocktailTypeApi {
  constructor() {
    this.url = getApiPath()
  }

  getAll = () => {
    return axios.get(this.url.concat('/cocktail-type/all'))
  }

}

export const cocktailTypeApi = new CocktailTypeApi()