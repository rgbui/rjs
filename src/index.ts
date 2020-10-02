
///<reference path='token/tokenizer.ts' />
///<reference path='razor/template.ts'/>

if (typeof module != 'undefined' && module.exports) {
    module.exports = Ve.Lang.Razor.RazorTemplate;
}
if (typeof window != 'undefined') {
    (window as any).rjs=(window as any).RJS = Ve.Lang.Razor.RazorTemplate;
}