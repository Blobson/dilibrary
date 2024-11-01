import axios from 'axios'
import yaml from 'js-yaml'

const fetchCatalog = async () => {
  const url = process.env.REACT_APP_CATALOG_URL
  const result = await axios({
    method: 'get',
    url: url,
    responseType: 'text'
  })
  return yaml.load(result.data)
}

export default fetchCatalog
