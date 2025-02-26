/**
 * This funtion runs when the HTML-Body is loaded and highlight the current Page link
 * 
 */
function init() {
    highlightNavLinkPolicys("legalLink");
    initLoad();
}

/**
 * This function highlight the current PageLink
 * 
 * @param {*} idDesktop = teh LinkId which gets highlighted
 */
function highlightNavLinkPolicys(idDesktop) {
    document.getElementById(idDesktop).classList.add('markedLink')
}