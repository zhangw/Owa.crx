// Saves options to localStorage.
function save_options(e) {
    if (!document.getElementById("site").value) {
        alert("Options not saved;\nPlease enter an outlook URL (e.g. exchange.somewhere.edu).");
        return;
    }
    var select = document.getElementById("username");
    var username = select.value;
    chrome.storage.sync.set({
        "username": username
    });
    select = document.getElementById("password");
    var password = select.value;
    if (password) {
        chrome.storage.sync.set({
            "password": sjcl.encrypt(PASS, password)
        });
    }
    select = document.getElementById("site");
    var site = select.value;
    chrome.storage.sync.set({
        "site": site
    });
    alert("Changes saved.");
}

function setPassword(passBox) {
    chrome.storage.sync.get("password", function(password1) {
        password = password1['password']
        var password = sjcl.decrypt(PASS, password1['password']);
        if (password) passBox.value = password;
    });
}
// Restores select box state to saved value from localStorage.
function restore_options() {
    chrome.storage.sync.get("username", function(username) {
        if (username['username']) document.getElementById("username").value = username['username'];
    });
    chrome.storage.sync.get("site", function(site) {
        if (site['site']) document.getElementById("site").value = site['site'];
    });
    chrome.storage.sync.get("password", function(password1) {
        var password = sjcl.decrypt(PASS, password1['password']);
        setPassword(document.getElementById("password"))
    });
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("button").addEventListener('click', save_options);
    restore_options();
});