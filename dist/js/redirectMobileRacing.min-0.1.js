(function(){var userAgent=window.navigator.userAgent.toLowerCase();function findInUserAgent(needle){return userAgent.indexOf(needle)!==-1}function isMobileDevice(){var arrMobileDevices=["iphone","ipod","ipad","j2me","midp","android","mobile","blackberry","bb10","rim","tablet","touch"];return arrMobileDevices.some(function(device){return findInUserAgent(device)===true})}function isOperaMini(){return Object.prototype.toString.call(window.operamini)==="[object OperaMini]"}function getLang(){var lang;
if(!lang)lang=getLangHTMLTag();if(!lang)lang=getLangPath();if(!lang)lang=getLangBrowser();if(!lang)lang=getLangCookie();if(!lang)lang="ru";return lang}function getLangCookie(){return getCookie("lang")}function getCookie(name){var matches=document.cookie.match(new RegExp("(?:^|; )"+name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):undefined}function getLangBrowser(){var l="";if(navigator.userLanguage)l=navigator.userLanguage;else if(navigator.language)l=
navigator.language;if(l.length>2)l=l.substr(0,2);return l}function getLangPath(){var regexS="\\/(ru|en)\\/";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);if(results==null)return"";else return results[1]}function getLangHTMLTag(){var l=document.getElementsByTagName("html")[0].lang;if(l&&l.length>2)l=l.substr(0,2);return l}function getSubDomain(){return location.hostname.split(".").slice(-2).join(".")}function getModeSite(){return getCookie("modeSite")}if(getModeSite()!==
"full")if(isMobileDevice()||isOperaMini())if(getLang()==="en")window.location="http://m."+getSubDomain()+"/racing/index_en.html";else window.location="http://m."+getSubDomain()+"/racing/"})();
