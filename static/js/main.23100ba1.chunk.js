(this.webpackJsonpwebsite=this.webpackJsonpwebsite||[]).push([[0],{122:function(e,t,n){"use strict";n.r(t);var c,r=n(2),a=n.n(r),s=n(78),i=(n(90),n(30)),o=n(31),l=n(56),u="https://scraper-staging.herokuapp.com",j={main:u,auth:"".concat(u,"/auth"),graphql:"".concat(u,"/graphql")},b={isAuthenticated:!1,setIsAuthenticated:function(){},user:void 0,setUser:function(){}},d=Object(r.createContext)(b),h=function(){return Object(r.useContext)(d)},f=function(e,t){return"".concat(e," ").concat(null!==t&&void 0!==t?t:"")},x="authorizationToken",O=function(){return localStorage.getItem(x)},m=function(e){return localStorage.setItem(x,e)},p=function(){return localStorage.removeItem(x)},v=n(4),g=j.graphql,F={watchQuery:{fetchPolicy:"cache-and-network",errorPolicy:"ignore"},query:{fetchPolicy:"network-only",errorPolicy:"all"},mutate:{errorPolicy:"all"}},w=function(e){var t=e.children,n=Object(r.useState)(),c=Object(i.a)(n,2),a=c[0],s=c[1],u=h().isAuthenticated,j=Object(r.useMemo)((function(){var e;if(u)return null!==(e=O())&&void 0!==e?e:void 0}),[u]);return Object(r.useEffect)((function(){var e="undefined"!==typeof j?{authorization:j}:void 0,t=Object(o.createHttpLink)({uri:g,credentials:"include",headers:e}),n=new o.InMemoryCache;Object(l.b)({cache:n,storage:new l.a(window.sessionStorage)}).then((function(){var c=new o.ApolloClient({cache:n,link:t,defaultOptions:F,headers:e});s(c),console.log("apollo client is loaded!")})).catch((function(){return console.log("error setting up apollo cache persist")}))}),[j]),Object(v.jsx)(v.Fragment,{children:"undefined"!==typeof a?Object(v.jsx)(o.ApolloProvider,{client:a,children:t}):null})},y=n(15),N=n.n(y),C=n(25),A=n(35),B=n.n(A),k="".concat(j.auth,"/login"),P=function(){var e=Object(C.a)(N.a.mark((function e(t){var n;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.a.post(k,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D="".concat(j.auth,"/logout"),S=function(){var e=Object(C.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.a.post(D,void 0,{headers:{authorization:t}});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E="".concat(j.auth,"/isAuthenticated"),I=function(){var e=Object(C.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.a.get(E,{headers:{authorization:t}});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(e){var t=e.children,n=Object(r.useState)(!1),c=Object(i.a)(n,2),a=c[0],s=c[1],o=Object(r.useState)(),l=Object(i.a)(o,2),u=l[0],j=l[1];return Object(r.useEffect)((function(){var e=O();null!==e&&I(e).then((function(){return s(!0)})).catch((function(){p(),s(!1)}))}),[]),Object(v.jsx)(d.Provider,{value:{isAuthenticated:a,setIsAuthenticated:s,user:u,setUser:j},children:t})},L=n(83),q=Object(o.gql)(c||(c=Object(L.a)(["\n  query me {\n    me {\n      ... on User {\n        id\n        username\n        firstName\n        lastName\n      }\n    }\n  }\n"]))),z=function(e){var t=e.children,n=h(),c=n.isAuthenticated,a=n.setUser,s=Object(o.useLazyQuery)(q),l=Object(i.a)(s,2),u=l[0],j=l[1].data;return Object(r.useEffect)((function(){c?u():a(void 0)}),[c,a,u]),Object(r.useEffect)((function(){"undefined"!==typeof j&&null!==j.me&&"User"===j.me.__typename&&a(j.me)}),[j,a]),Object(v.jsx)(v.Fragment,{children:t})},U=n(32),M=n(9),J=n(36),Q=n(10),_=n.p+"static/media/robot.c78c2b88.png",H=function(e){var t=Object.assign({},e),n=Object(M.f)(),c=h(),r=c.isAuthenticated,a=c.setIsAuthenticated,s=function(){var e=Object(C.a)(N.a.mark((function e(){var t;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,null!==(t=O())){e.next=4;break}throw new Error("Token does not exist in the local storage. This is a no-op.");case 4:return e.next=6,S(t);case 6:p(),a(!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),alert("There was an error logging you out. Please try again.");case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return Object(v.jsxs)("div",Object(Q.a)(Object(Q.a)({},t),{},{className:f("w-full h-10 md:h-12 lg:h-16 flex flex-row justify-between items-center px-4",null===t||void 0===t?void 0:t.className),children:[Object(v.jsxs)("div",{className:"h-full flex flex-row items-center space-x-2 cursor-pointer",onClick:function(){return n.push("/")},children:[Object(v.jsx)("img",{src:_,alt:"robot",className:"h-full m-1"}),Object(v.jsx)("h1",{className:"text-lg lg:text-2xl xl:text-3xl",children:"Blue Nebula"})]}),Object(v.jsx)("div",{children:r?Object(v.jsx)(U.b,{className:"text-base",to:"/",onClick:s,children:"Logout"}):Object(v.jsx)(U.b,{className:"text-base",to:"/auth",children:"Login"})})]}))},G=function(e){var t=e.overridingClassName,n=e.children,c=Object(J.a)(e,["overridingClassName","children"]);return Object(v.jsxs)("div",{className:null!==t&&void 0!==t?t:f("container mx-auto",null===c||void 0===c?void 0:c.className),children:[Object(v.jsx)(H,{}),n]})},K=function(e){var t=Object.assign({},e);return Object(v.jsx)("div",Object(Q.a)(Object(Q.a)({},t),{},{className:f("text-center animate-bounce",null===t||void 0===t?void 0:t.className),children:Object(v.jsx)("h1",{className:"mt-2 text-3xl",children:"Coming Soon"})}))},R=function(){return Object(v.jsx)(G,{className:"h-screen flex flex-col",children:Object(v.jsx)("div",{className:"h-full flex flex-col justify-center items-center",children:Object(v.jsx)(K,{})})})},V=n(123),W=n(47),X=function(e){var t=e.labelText,n=e.labelProps,c=e.inputProps,r=Object(J.a)(e,["labelText","labelProps","inputProps"]);return Object(v.jsxs)("div",Object(Q.a)(Object(Q.a)({},r),{},{className:f("flex flex-col",null===r||void 0===r?void 0:r.className),children:[Object(v.jsx)("label",Object(Q.a)(Object(Q.a)({htmlFor:t},n),{},{children:t})),Object(v.jsx)("input",Object(Q.a)({id:t},c))]}))},Y=function(e){var t=e.handleSubmit,n=Object(J.a)(e,["handleSubmit"]),c=Object(r.useState)({username:"",password:""}),a=Object(i.a)(c,2),s=a[0],o=a[1],l=function(e){return function(t){return o((function(n){return Object(Q.a)(Object(Q.a)({},n),{},Object(W.a)({},e,t.target.value))}))}};return Object(v.jsxs)("form",Object(Q.a)(Object(Q.a)({},n),{},{className:f("flex flex-col",n.className),children:[[{label:"Username",key:"username"},{label:"Password",key:"password",props:{inputProps:{type:"password"}}}].map((function(e,t){var n=e.label,c=e.key,r=e.props;return Object(v.jsx)(X,Object(Q.a)(Object(Q.a)({labelText:n},r),{},{inputProps:Object(Q.a)({className:"border border-gray-200 rounded p-1",value:s[c],onChange:l(c)},null===r||void 0===r?void 0:r.inputProps),className:f(0!==t?"mt-2":"",null===r||void 0===r?void 0:r.className)}),t)})),Object(v.jsx)("button",{className:"mt-4 btn btn-primary",onClick:function(e){e.preventDefault(),t(s)},type:"submit",children:"Login"})]}))},Z=n(48),$=n.n(Z),ee=function(){var e=h().setIsAuthenticated,t=Object(M.f)(),n=function(){var n=Object(C.a)(N.a.mark((function n(c){var r;return N.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,P(c);case 3:r=n.sent,m(r),e(!0),t.replace("/"),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),console.log(n.t0),alert("An error occurred logging you in. Please try again.");case 13:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}();return Object(v.jsx)("div",{className:"w-screen h-screen flex flex-col justify-center items-center",children:Object(v.jsxs)("div",{className:"w-full max-w-md p-4",children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("img",{src:_,alt:"robot",className:"w-28 h-28 mx-auto"}),Object(v.jsxs)("div",{className:"mt-2 flex justify-center items-center space-x-2",children:[Object(v.jsx)(V.a,{color:$.a.warning[500]}),Object(v.jsx)("p",{className:"font-semibold text-center",children:"Please login to use blue nebula services"})]})]}),Object(v.jsx)("div",{className:"mt-6",children:Object(v.jsx)(Y,{handleSubmit:n})})]})})},te=n(124),ne=function(){return Object(v.jsxs)("div",{className:"w-screen h-screen flex flex-col justify-center items-center",children:[Object(v.jsx)(te.a,{size:40,color:$.a.warning[500]}),Object(v.jsx)("h1",{className:"mt-2 text-3xl",children:"404 Not Found"}),Object(v.jsx)("button",{className:"mt-6 btn btn-primary",children:Object(v.jsx)(U.b,{to:"/",children:"Back to home page"})})]})},ce=function(){return Object(v.jsx)(U.a,{children:Object(v.jsxs)(M.c,{children:[Object(v.jsx)(M.a,{exact:!0,path:"/auth",children:Object(v.jsx)(ee,{})}),Object(v.jsx)(M.a,{exact:!0,path:"/",children:Object(v.jsx)(R,{})}),Object(v.jsx)(M.a,{children:Object(v.jsx)(ne,{})})]})})};var re=function(){return Object(v.jsx)(T,{children:Object(v.jsx)(w,{children:Object(v.jsx)(z,{children:Object(v.jsx)(ce,{})})})})},ae=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,125)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};Object(s.render)(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(re,{})}),document.getElementById("root")),ae()},48:function(e,t){e.exports={primary:{100:"#D6E4FF",200:"#ADC8FF",300:"#84A9FF",400:"#6690FF",500:"#3366FF",700:"#1939B7",800:"#102693",900:"#091A7A"},success:{100:"#CAFDD8",200:"#97FBBC",300:"#62F5A7",400:"#3BECA0",500:"#00E096",600:"#00C093",700:"#00A18B",800:"#00817D",900:"#00646B"},info:{100:"#CCF5FF",200:"#99E6FF",300:"#66D0FF",400:"#3FBAFF",500:"#0095FF",600:"#0073DB",700:"#0056B7",800:"#003C93",900:"#002B7A"},warning:{100:"#FFF6CD",200:"#FFEB9B",300:"#FFDD69",400:"#FFCF43",500:"#FFB805",600:"#DB9703",700:"#B77902",800:"#935D01",900:"#7A4900"},danger:{100:"#FFDCD8",200:"#FFB3B1",300:"#FF8A93",400:"#FF6D86",500:"#FF3D71",600:"#DB2C6C",700:"#B71E65",800:"#93135B",900:"#7A0B54"}}},90:function(e,t,n){}},[[122,1,2]]]);
//# sourceMappingURL=main.23100ba1.chunk.js.map