/**
 * This function runs when the HTML-Body is loaded and highlight the current Page link
 * 
 */
function init() {
    highlightNavLinkPolicys("privacyLink");
    initLoad();
}

/**
 * This function highlight the current PageLink
 * 
 * @param {*} idDesktop = the LinkId which gets highlighted
 */
function highlightNavLinkPolicys(idDesktop) {
    document.getElementById(idDesktop).classList.add('markedLink')
}