import axios from "axios";

const GET_ME = 'http://localhost:8080/api/v.1/users/me';

function getMe(headers) {
    return axios.get(GET_ME, {headers})
        .then(response => {return response.data})
}

export default getMe;