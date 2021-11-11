import { getApiPath } from "./apiHelpers";
import axios from 'axios';

class GlassApi {
  constructor() {
    this.url = getApiPath()
  }

  getAll = () => {
    return axios.get(this.url.concat('glass/all'))
  }

}

export const glassApi = new GlassApi()