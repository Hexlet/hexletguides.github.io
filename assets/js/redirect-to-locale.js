function getBestSuitableSupportedLang(lang, supported) {
  let supported_lang = supported.shift();
 
  if (supported.includes(lang)) {
    supported_lang = lang;
  }
 
  return supported_lang;
}
 
const [lang] = (((navigator.userLanguage || navigator.language).replace('-', '_')).toLowerCase()).split('_');
const supported_languages = ['en', 'ru'];
const current_lang = 'en';
const suitable_lang = getBestSuitableSupportedLang(lang, supported_languages)
const hostname = window.location.hostname;
const referrer = document.referrer;
const landingPage = !referrer || referrer.indexOf(hostname) == -1;
 
if (landingPage && (current_lang !== suitable_lang)) {
  window.location = '/' + suitable_lang + '/';
}
