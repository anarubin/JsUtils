(function () {
    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

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

    function getAndSaveInCookieFbCampaign() {
        var domainCookie = getSubDomain();
        var paramFbCampaign = 'fb_campaign';

        var urlBrowser = window.location.toString();
        if (urlBrowser.indexOf(paramFbCampaign + '=') === -1) {
            return;
        }

        if (urlBrowser) {
            if (urlBrowser.split('?').length > 1) {
                var arrStr1 = urlBrowser.split('?');
                var arrStr2 = arrStr1[1].split('&');
                var arrNameAndValue = [];
                for (var i = 0; i < arrStr2.length; i++) {
                    arrNameAndValue = arrStr2[i].split('=');
                    if (arrNameAndValue[0] === paramFbCampaign) {
                        var value = arrNameAndValue[1].split('#')[0];
                        setCookie(paramFbCampaign, value, {path: '/', domain: domainCookie});
                        break;
                    }
                }
            }
        }
    }

    function getAndSaveInCookieRefer() {
        var domainCookie = getSubDomain();
        var paramRefer = 'partner';
        var paramReferInCookie = 'referer1';

        var urlBrowser = window.location.toString();
        if (urlBrowser.indexOf(paramRefer + '=') === -1) {
            return;
        }

        if (urlBrowser) {
            //регулярка partner=refcode&subid={source_id}:{banner_id}
            var reg = urlBrowser.match(/partner=.*&subid={.*}:{.*}/gi);
            var value = reg[0].split('partner=')[1];
            var date = new Date;
            date.setDate(date.getDate() + 30);
            setCookie(paramReferInCookie, value, {expires: date.toUTCString(), path: '/', domain: domainCookie});
        }
    }

    function init() {
        getAndSaveInCookieFbCampaign();
        getAndSaveInCookieRefer();
    }

    init();
})();