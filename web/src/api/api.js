import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555'
const URL_API = `${BASE_URL}/api/cordel`

export const makeCordel = async (briefing) => {
    const {data} = await axios.post(URL_API, briefing)
    return data
}
