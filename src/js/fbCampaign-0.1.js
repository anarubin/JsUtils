(function () {
    function setCookie(name, value, options) {
        options = options || {};
        var updatedCookie = name + "=" + encodeURIComponent(value);
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }

    function getSubDomain() {
        var domain = location.hostname.split('.').slice(-2).join('.');
        if (domain.indexOf('localhost')) {
            return domain;
        } else {
            return '';
        }
    }

    function checkURL() {
        var domainCookie = getSubDomain();
        var nameParam = 'fb_campaign';
        var urlBrowser = window.location.toString();

        if (urlBrowser.indexOf(nameParam + '=') === -1) {
            return;
        }

        if (urlBrowser) {
            if (urlBrowser.split('?').length > 1) {
                var arrStr1 = urlBrowser.split('?');
                var arrStr2 = arrStr1[1].split('&');
                var arrNameAndValue = [];
                for (var i = 0; i < arrStr2.length; i++) {
                    arrNameAndValue = arrStr2[i].split('=');
                    if (arrNameAndValue[0] === nameParam) {
                        setCookie(nameParam, arrNameAndValue[1].split('#')[0], {path: '/', domain: domainCookie});
                        break;
                    }
                }
            }
        }
    }

    checkURL();
})();