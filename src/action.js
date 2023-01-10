

export function updateTasks(payload) {
    return {
        type: "tasks",
        payload: payload,
    }
}

export function updateNotes(payload) {
    return {
        type: "notes",
        payload: payload,
    }
}

export function updateCategory(payload) {
    return {
        type: "categories",
        payload: payload,
    }
}

export function updateFilteredTasks(payload) {
    return {
        type: "filtered_tasks",
        payload: payload,
    }
}

export function updateFilteredNotes(payload) {
    return {
        type: "filtered_notes",
        payload: payload,
    }
}