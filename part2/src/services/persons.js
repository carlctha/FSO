import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObj => {
    return axios.post(baseUrl, personObj)

}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }