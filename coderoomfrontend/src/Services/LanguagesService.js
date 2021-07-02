import axios from "axios";

const GET_LANGUAGES = 'http://localhost:8080/api/v.1/languages/all';

function getLanguages() {
    return axios.get(GET_LANGUAGES)
        .then(response => {return response.data})
}

export default getLanguages;