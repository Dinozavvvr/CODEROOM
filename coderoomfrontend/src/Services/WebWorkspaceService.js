import axios from "axios";

const SERVER_ADDRESS = 'http://localhost:8080';

const CREATE_WEB_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/web-workspace/create`;
const GET_WEB_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/web-workspace/`;
const DELETE_WEB_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/web-workspace/delete`;
const UPDATE__WEB_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/web-workspace/update`;

function createWebWorkspace(webWorkspaceDto, headers) {
    return axios.post(CREATE_WEB_WORKSPACE, webWorkspaceDto, { headers })
}

function getWebWorkspace(webWorkspaceId, headers) {
    return axios.get(GET_WEB_WORKSPACE + webWorkspaceId, { headers })
}

function deleteWebWorkspace(webWorkspaceDto, headers) {
    return axios.delete(DELETE_WEB_WORKSPACE, { headers: headers, data: webWorkspaceDto })
    
}

function updateWebWorkspace(webWorkspaceDto, headers) {
    return axios.put(UPDATE__WEB_WORKSPACE, webWorkspaceDto, { headers })
}

export { 
    createWebWorkspace,
    getWebWorkspace,
    deleteWebWorkspace,
    updateWebWorkspace
}
