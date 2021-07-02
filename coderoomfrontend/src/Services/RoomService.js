import axios from "axios";

const SERVER_ADDRESS = 'http://localhost:8080';

const GET_ROOM_INIT_PAGE = `${SERVER_ADDRESS}/api/v.1/room/initializer`;
const CREATE_ROOM = `${SERVER_ADDRESS}/api/v.1/room/create`;
const GET_ROOM = `${SERVER_ADDRESS}/api/v.1/room/`;


function getRoomInitializePage(headers) {
    return axios.get(GET_ROOM_INIT_PAGE, { headers })
        .then(() => { return true })
        .catch(() => { return false })
}

function createRoom(roomDto, headers) {
    return axios.post(CREATE_ROOM, roomDto, { headers })
        .then(response => { return response.data });
}

function getRoom(roomId, headers) {
    return axios.get(GET_ROOM + roomId, { headers })
}


export { 
    createRoom, 
    getRoomInitializePage, 
    getRoom 
};