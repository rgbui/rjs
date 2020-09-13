
///<reference path='token/tokenizer.ts' />
///<reference path='razor/template.ts'/>

if (typeof module != 'undefined' && module.exports) {
    module.exports = Ve;
}
interface Window {
    RJS: Ve.Lang.Razor.RazorTemplate
}
if (typeof window != 'undefined') {
    window.RJS = Ve.Lang.Razor.RazorTemplate;
}