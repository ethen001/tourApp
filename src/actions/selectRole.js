import {ROLE_SELECTED, RESET_SELECTION} from "./ActionTypes";

export function selectRole (role) {
    return {type: ROLE_SELECTED, payload: role};
};

export function resetRoleSelection() {
    return {type: RESET_SELECTION};
}