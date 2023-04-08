"use strict";(self.webpackChunklmdb=self.webpackChunklmdb||[]).push([[129],{9129:function(e,a,n){n.r(a);var s=n(4942),l=n(1413),i=n(3433),t=n(9439),r=n(2791),c=n(7689),o=n(8174),u=(n(3575),n(825)),m=n(9040),d=n(184);a.default=function(){var e=(0,r.useState)({type:"",title:"",year:0,desc:"",duration:0}),a=(0,t.Z)(e,2),n=a[0],h=a[1],x=(0,r.useState)([""]),p=(0,t.Z)(x,2),N=p[0],b=p[1],f=(0,r.useState)([{fullName:"",roleName:"",imageUrl:"",wikiUrl:""}]),j=(0,t.Z)(f,2),v=j[0],g=j[1],C=(0,r.useState)([""]),y=(0,t.Z)(C,2),k=y[0],Z=y[1],U=(0,c.s0)(),F=(0,u.n)().showAdd,w=function(e,a){var n=e.target,s=n.name,l=n.value;if("movieImgUrl"===s){var t=(0,i.Z)(N);t[a]=l,b(t)}else if("genre"===s){var r=(0,i.Z)(k);r[a]=l,Z(r)}else{var c=(0,i.Z)(v);c[a][s]=l,g(c)}},S=function(e,a,n){if(e.preventDefault(),"movie"===n){var s=(0,i.Z)(N);s.splice(a,1),b(s)}else if("actor"===n){var l=(0,i.Z)(v);l.splice(a,1),g(l)}else if("genre"===n){var t=(0,i.Z)(k);t.splice(a,1),Z(t)}},D=function(e,a){e.preventDefault(),"movie"===a?b([].concat((0,i.Z)(N),[""])):"actor"===a?g([].concat((0,i.Z)(v),[{fullName:"",roleName:"",imageUrl:"",wikiUrl:""}])):"genre"===a&&Z([].concat((0,i.Z)(k),[""]))},L=function(e){h((function(a){return(0,l.Z)((0,l.Z)({},a),{},(0,s.Z)({},e.target.name,e.target.value))}))};return(0,d.jsxs)("section",{action:"",className:"form-section",children:[(0,d.jsx)("h2",{className:"heading",children:"Add new show"}),(0,d.jsxs)("form",{action:"",className:"form",onSubmit:function(e){e.preventDefault();var a=n.type,s=n.title,l=n.year,i=n.desc,t=n.duration,r=n.director;l=Number(l),t=Number(t);var c={type:a,title:s,year:l,duration:t,director:r,desc:i,imageList:N,actorsList:v,genreList:k};"Movie"===a?((0,m.oe)("Movie",c).then((function(e){F(e,a)})),U("/movies")):((0,m.oe)("Series",c).then((function(e){F(e,a)})),U("/series")),o.Am.success("You added ".concat(s," to the ").concat(a," collection!"))},children:[(0,d.jsxs)("div",{className:"input-box",children:[(0,d.jsx)("div",{className:"label",children:"Type of show"}),(0,d.jsxs)("div",{children:[(0,d.jsx)("input",{className:"input-radio",type:"radio",id:"movie",name:"type",defaultValue:"Movie",onChange:L}),(0,d.jsx)("label",{htmlFor:"movie",children:"Movie"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("input",{className:"input-radio",type:"radio",id:"series",name:"type",defaultValue:"Series",onChange:L}),(0,d.jsx)("label",{htmlFor:"series",children:"Series"})]})]}),(0,d.jsx)("br",{}),(0,d.jsxs)("div",{className:"input-box",children:[(0,d.jsx)("label",{className:"label",htmlFor:"title",children:"Title"}),(0,d.jsx)("input",{type:"text",name:"title",id:"title",className:"input",onChange:L})]}),(0,d.jsxs)("div",{className:"input-box",children:[(0,d.jsx)("label",{className:"label",htmlFor:"year",children:"Year"}),(0,d.jsx)("input",{type:"number",name:"year",id:"year",className:"input",onChange:L})]}),(0,d.jsxs)("div",{className:"input-box",children:[(0,d.jsx)("label",{className:"label",htmlFor:"duration",children:"Duration"}),(0,d.jsx)("input",{type:"number",name:"duration",id:"duration",className:"input",onChange:L})]}),(0,d.jsxs)("div",{className:"input-box",children:[(0,d.jsx)("label",{className:"label",htmlFor:"director",children:"Director"}),(0,d.jsx)("input",{type:"text",name:"director",id:"director",className:"input",onChange:L})]}),(0,d.jsx)("div",{className:"input-box",children:(0,d.jsx)("label",{className:"label",htmlFor:"genre",children:"Genre"})}),k.map((function(e,a){return(0,d.jsxs)("div",{className:"input-box",children:[(0,d.jsx)("input",{className:"input",name:"genre",value:e,onChange:function(e){return w(e,a)}}),(0,d.jsxs)("div",{className:"btn-box",children:[1!==k.length&&(0,d.jsx)("button",{className:"btn",onClick:function(e){return S(e,a,"genre")},children:(0,d.jsx)("i",{className:"fa-solid fa-minus"})}),k.length-1===a&&(0,d.jsx)("button",{className:"btn",onClick:function(e){return D(e,"genre")},children:(0,d.jsx)("i",{className:"fa-solid fa-plus"})})]})]},a)})),(0,d.jsx)("label",{className:"label",htmlFor:"desc",children:"Description"}),(0,d.jsx)("textarea",{name:"desc",id:"desc",className:"input".concat(" ","textarea"),onChange:L}),(0,d.jsxs)("div",{className:"images",children:[(0,d.jsx)("label",{className:"label",htmlFor:"imgUrl",children:"Image URL"}),N.map((function(e,a){return(0,d.jsxs)("div",{className:"box",children:[(0,d.jsx)("input",{className:"input",name:"movieImgUrl",value:e,onChange:function(e){return w(e,a)}}),(0,d.jsxs)("div",{className:"btn-box",children:[1!==N.length&&(0,d.jsx)("button",{className:"btn",onClick:function(e){return S(e,a,"movie")},children:(0,d.jsx)("i",{className:"fa-solid fa-minus"})}),N.length-1===a&&(0,d.jsx)("button",{className:"btn",onClick:function(e){return D(e,"movie")},children:(0,d.jsx)("i",{className:"fa-solid fa-plus"})})]})]},a)})),(0,d.jsx)("label",{className:"label",htmlFor:"imgUrl",children:"Actors"}),v.map((function(e,a){return(0,d.jsxs)("div",{children:[(0,d.jsx)("input",{className:"input",name:"fullName",placeholder:"Full Name",value:e.fullName,onChange:function(e){return w(e,a)}}),(0,d.jsx)("input",{className:"input",name:"roleName",placeholder:"Role Name",value:e.roleName,onChange:function(e){return w(e,a)}}),(0,d.jsx)("input",{className:"input",name:"imageUrl",placeholder:"Image URL",value:e.imageUrl,onChange:function(e){return w(e,a)}}),(0,d.jsx)("input",{className:"input",name:"wikiUrl",placeholder:"Link to Wikipedia",value:e.wikiUrl,onChange:function(e){return w(e,a)}}),(0,d.jsxs)("div",{className:"btn-box",children:[1!==v.length&&(0,d.jsx)("button",{className:"btn",onClick:function(e){return S(e,a,"actor")},children:(0,d.jsx)("i",{className:"fa-solid fa-minus"})}),v.length-1===a&&(0,d.jsx)("button",{className:"btn",onClick:function(e){return D(e,"actor")},children:(0,d.jsx)("i",{className:"fa-solid fa-plus"})})]})]},a)}))]}),(0,d.jsx)("button",{className:"btn ".concat("action-btn"),children:"Submit"})]})]})}}}]);
//# sourceMappingURL=129.cf5f9dbf.chunk.js.map