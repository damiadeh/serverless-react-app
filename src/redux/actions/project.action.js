import * as actionTypes from './actionTypes';

export const addProjectSuccess = () => {
    return {
        type: actionTypes.ADD_PROJECT_SUCCESS,
    };
};

export const addProjectStart = () => {
    return {
        type: actionTypes.ADD_PROJECT_START,
    };
};

export const addProjectFailed = (message) => {
    return {
        type: actionTypes.ADD_PROJECT_FAILED,
        message: message
    };
};

export const fetchingProjectsSuccess = (data) => {
    return {
        type: actionTypes.FETCHING_PROJECTS_SUCCESS,
        data: data,
    };
};

export const fetchingProjectsStart = () => {
    return {
        type: actionTypes.FETCHING_PROJECTS_START,
    };
};

export const fetchingProjectsFailed = (message) => {
    return {
        type: actionTypes.FETCHING_PROJECTS_FAILED,
        message: message
    };
};

export const resetProjectState = () => {
    return {
        type: actionTypes.RESET_PROJECT_STATE,
    }
}

export const clearProjects = () => {
    return {
        type: actionTypes.CLEAR_PROJECTS
    }
}

//TODO : display success/error response and clear after 7 seconds
export const clearResponse = () => {
    return {
        type: actionTypes.CLEAR_RESPONSE,
    };
};

export const dispatchClearResponse = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(clearResponse());
        }, 7000);
    };
};

export const fetchProjects = () => {
    return dispatch => {
        fetch('/.netlify/functions/projectRead')
            .then(res => res.json())
            .then(response => dispatch(fetchingProjectsSuccess(response.data)))
            .then(() => dispatch(fetchProjectsOthers()))
            .catch((err) => {
                console.log('Error retrieving projects: ', err);
                dispatch(fetchingProjectsFailed("Something went wrong!!!"));
            })
    }
}

export const fetchProjectsOthers = () => {
    return dispatch => {
        fetch('/.netlify/functions/projectReadOthers')
            .then(res => res.json())
            .then(response => dispatch(fetchingProjectsSuccess(response.data)))
            .catch((err) => {
                console.log('Error retrieving projects: ', err);
                dispatch(fetchingProjectsFailed("Something went wrong!!!"));
            })
    }
}

export const fetchSortedProjectsDesc = () => {
    return dispatch => {
        // dispatch(fetchingProjectsStart())
        fetch('/.netlify/functions/projectSortDesc')
            .then(res => res.json())
            .then(response => dispatch(fetchingProjectsSuccess(response.data)))
            .then(() => dispatch(fetchSortedProjectsDescOthers()))
            .catch((err) => {
                console.log('Error retrieving sort projects: ', err);
                dispatch(fetchingProjectsFailed("Something went wrong!!!"));
            })
    }
}

export const fetchSortedProjectsDescOthers = () => {
    return dispatch => {
        // dispatch(fetchingProjectsStart())
        fetch('/.netlify/functions/projectSortDescOthers')
            .then(res => res.json())
            .then(response => dispatch(fetchingProjectsSuccess(response.data)))
            .catch((err) => {
                console.log('Error retrieving sort projects: ', err);
                dispatch(fetchingProjectsFailed("Something went wrong!!!"));
            })
    }
}

export const fetchSortedProjectsAsc = () => {
    return dispatch => {
        // dispatch(fetchingProjectsStart())
        fetch('/.netlify/functions/projectSortAsc')
            .then(res => res.json())
            .then(response => dispatch(fetchingProjectsSuccess(response.data)))
            .then(() => dispatch(fetchSortedProjectsAscOthers()))
            .catch((err) => {
                console.log('Error retrieving sort projects: ', err);
                dispatch(fetchingProjectsFailed("Something went wrong!!!"));
            })
    }
}

export const fetchSortedProjectsAscOthers = () => {
    return dispatch => {
        // dispatch(fetchingProjectsStart())
        fetch('/.netlify/functions/projectSortAscOthers')
            .then(res => res.json())
            .then(response => dispatch(fetchingProjectsSuccess(response.data)))
            .catch((err) => {
                console.log('Error retrieving sort projects: ', err);
                dispatch(fetchingProjectsFailed("Something went wrong!!!"));
            })
    }
}

export const addProject = (data) => {
    return dispatch => {
        dispatch(addProjectStart());
        fetch('/.netlify/functions/projectCreate', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(response => dispatch(fetchingProjectsSuccess([response.data])))
            .then(() =>  dispatch(addProjectSuccess()))
            .catch((err) => {
                console.log(err);
                dispatch(addProjectFailed('Adding project failed'))
            })
    }
}