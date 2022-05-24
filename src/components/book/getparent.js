import $ from "jquery";

export function getparent(element, clas, attr) {
    for (var parent of $(element).parents()) {
        if (attr !== undefined) {
            if (parent.getAttribute(clas) === attr) { return parent }

        } else if (parent.classList.contains(clas) || parent.id === clas || (parent.getAttribute(clas) !== null && parent.getAttribute(clas) !== "true" && parent.getAttribute(clas) !== "false")) {
            return parent


        }
    }
    return null
}
// !
export function gettarget(e, clas) {
    if (e.target.classList.contains(clas) || e.target.id === clas || (e.target.getAttribute(clas) != null && e.target.getAttribute(clas) !== "true" && e.target.getAttribute(clas) !== "false")) {
        return e.target
    } else {
        return getparent(e.target, clas)
    }
}