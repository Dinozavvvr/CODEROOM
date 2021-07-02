import axios from "axios";

const SERVER_ADDRESS = 'http://localhost:8080';

const GET_WORKSPACE_INIT_PAGE = `${SERVER_ADDRESS}/api/v.1/workspace/initializer`
const CREATE_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/workspace/create`;
const GET_USER_WORKSPACES = `${SERVER_ADDRESS}/api/v.1/workspace/all/user/`;
const GET_WORKSPASE = `${SERVER_ADDRESS}/api/v.1/workspace/`;
const DELETE_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/workspace/delete`;
const UPDATE_WORKSPACE = `${SERVER_ADDRESS}/api/v.1/workspace/update`;

function getCreteWorkspacePage(headers) {
    return axios.get(GET_WORKSPACE_INIT_PAGE, { headers })
        .then(() => { return true })
        .catch(() => { return false })
}

function createWorkspace(workspaceDto, headers) {
    return axios.post(CREATE_WORKSPACE, workspaceDto, { headers })
        .then(response => { return response.data });
}

function getUserWorkspaces(userId, headers) {
    return axios.get(GET_USER_WORKSPACES + userId, { headers })
        .then(response => { return response.data })
}

function getWorkspace(workspaceId, headers) {
    return axios.get(GET_WORKSPASE + workspaceId, { headers })
        .then(response => { return response.data })
}

function deleteWorkspace(workspace, headers) {
    return axios.delete(DELETE_WORKSPACE, { headers: headers, data: workspace })
        .then(response => { return response.status === 200 ? true : false })
}

function updateWorspace(workspace, headers) {
    return axios.put(UPDATE_WORKSPACE, workspace, { headers })
        .then(response => { return response.status === 200 ? true : false })
}

export {
    createWorkspace,
    getWorkspace,
    deleteWorkspace,
    updateWorspace,
    getCreteWorkspacePage,
    getUserWorkspaces
};