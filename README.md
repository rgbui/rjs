# RJS
Graceful JavaScript templates.   
Do you feel comfortable? Like this
```
@if(user){
    <h2>@user.name</h2>
}
```
is it more graceful than EJS?  
I just don't like EJS, that's why I designed RJS  
I think you'll like it.   
# Installation

browser
```
<script src="dist/rjs.js"></script>
```

nodeJS
```
 $ npm install rarzor-js-template
```  
# Usage
browser
```
var html = rjs.compile(`<ul>
    @for(var i=0;i<users.length;i++>)
    {
        <li><span>@users[i].name</span></li>
    } 
</ul>`,{ 
   users:["Donald John Trump","Obama","George Walker Bush"]
});

```
nodejs
```
var RJS=require('rarzor-js-template')
var rjs=new RJS({
    include(filePath,data)=>{
        var template=require("fs").readFileSync(path.join(__dirname,filePath+".rjs"),"utf8");
        return RJS.compile(template,data);
    }
});
var html=rjs.compile(`<ul>
     @for(var i=0;i<users.length;i++>)
     {
         @{var user=users[i];}
         @include("user/show",user)
     }
</ul>`,
{users:[
    {name:"Donald John Trump",email:"trump@viewparse.com"},
    {name:"Obama",email:"obama@viewparse.com"}
    ]
});
```
You can customize the @include() statement   
You can customize the @html() for HTML escape    
You can do more    
It's very easy   


**It doesn't just support HTML, it supports product code**
```
rjs.compile(`
if(confrim("@message")){
   alert("@yes");
}
else{
   alert("@no");
}
`,{
     message:"Do you confirm to cancel this submission?",
     yes:"Cancel the submission",
     no:"Submit"
})
```
> You need to make sure that () and {} are paired, otherwise you'll get an error
# Features
 * @for(){} 
 * @while(){} 
 * @if(){ }else if(){ } else{ }
* @{} statement
* @() express
* escape character ["@@","@)","@}","@#{","@#("]
  > () and {} are normally paired, and the escape character is mainly used to match half
* @**@ annotation
# License
MIT License