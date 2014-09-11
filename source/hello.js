if (localStorage['username']) {
    chrome.storage.sync.set({
        'username': localStorage['username'],
        'site': localStorage['site'],
        'password': sjcl.encrypt(PASS, localStorage['password'])
    }, function() {
        localStorage['username'] = ''
        localStorage['password'] = 'Not here, you fool!'
    });
}

function setPassword(passBox) {
    chrome.storage.sync.get("password", function(password1) {
        var password = sjcl.decrypt(PASS, password1['password']);
        if (password) passBox.value = password;
        document.forms[0].elements[8].click();
    });
}
if (window.location.href.indexOf('reason=2') == -1) {
    chrome.storage.sync.get("site", function(site) {
        if (site['site'] != window.location.host) {
            if (!site['site']) {
                if (confirm('You downloaded OWA Auto logon, and you\'re on an OWA login page. Would you like to set up OWA auto logon now?')) {
                    window.open(chrome.extension.getURL("options.html") + "#" + window.location.host, "_self");
                }
                return;
            }
        }
        var username = chrome.storage.sync.get("username", function(username) {
            if (username) document.forms[0].elements[6].value = username['username'];
            setPassword(document.forms[0].elements[7]);
        });
    });
}
