function getBestSuitableSupportedLang(lang, supported) {
  var supported_lang = supported.shift();

  if (supported.includes(lang)) {
    supported_lang = lang;
  } else if (supported.includes(lang)) {
    supported_lang = lang;
  }

  return supported_lang;
}

var [lang] = (((navigator.userLanguage || navigator.language).replace('-', '_')).toLowerCase()).split('_');

var supported_languages = ['en', 'ru'];
var current_lang = 'en';

var suitable_lang = getBestSuitableSupportedLang(lang, supported_languages)

var hostname = window.location.hostname;
var referrer = document.referrer;

var landingPage = !referrer || referrer.indexOf(hostname) == -1;

if (landingPage && (current_lang !== suitable_lang)) {
  window.location = '/' + suitable_lang + '/';
}
