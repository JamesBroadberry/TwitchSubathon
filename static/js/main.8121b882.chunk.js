(this.webpackJsonptwitchsubathon=this.webpackJsonptwitchsubathon||[]).push([[0],{13:function(e,t,n){"use strict";(function(e){var a=n(5),c=n(2),r=n(0),i=n(20),s=n(1);t.a=function(){var t=Object(r.useState)("Loading..."),n=Object(c.a)(t,2),o=n[0],d=n[1],u=Object(r.useState)({goals:{},twitchUsername:"",initialMinutes:0,secondsPerSub:0,secondsPerBit:0,secondsPerPenny:0}),b=Object(c.a)(u,2),l=b[0],j=b[1];Object(r.useEffect)((function(){var t=new URLSearchParams(window.location.search).get("config"),n=e.from(t,"base64"),a=JSON.parse(n);j(a)}),[]);var h=Object(r.useState)(0),f=Object(c.a)(h,2),O=f[0],p=f[1],m=Object(r.useState)(0),v=Object(c.a)(m,2),w=v[0],g=v[1],x=Object(r.useState)(new Date(Date.now()+60*l.initialMinutes*1e3)),S=Object(c.a)(x,2),D=S[0],k=S[1],I=Object(r.useState)(new Date(0)),y=Object(c.a)(I,2),E=y[0],N=y[1],C=function(e){e>0&&N(Date.now()),k(new Date(D.getTime()+1e3*e)),g(w+e)};Object(r.useEffect)((function(){k(new Date(Date.now()+60*l.initialMinutes*1e3+1e3*w))}),[l]);var M=Object(r.useRef)(null);Object(r.useEffect)((function(){return M.current=new WebSocket("wss://irc-ws.chat.twitch.tv/"),M.current.onopen=function(){d("Connecting..."),M.current.send("NICK "+P()),d("Joining Twitch chat..."),M.current.send("JOIN #"+l.twitchUsername),d("")},M.current.onerror=function(){d("\ud83d\uded1 Connection to Twitch Chat Error \ud83d\uded1")},M.current.onclose=function(){d("\ud83d\uded1 Connection to Twitch Closed \ud83d\uded1")},function(){M.current.close()}}),[l]),Object(r.useEffect)((function(){M.current&&(M.current.onmessage=function(e){var t=e.data;if(t.startsWith("PING :tmi.twitch.tv"))return console.log("Received a PING, sending back PONG"),void M.current.send("PONG :tmi.twitch.tv");if(t.includes("PRIVMSG")){var n=t.split("#")[1],c=n.substring(n.indexOf(":")+1).split("\r\n")[0];switch(t.split("@")[1].split(".tmi.twitch.tv")[0]){case"jimib95":case l.twitchUsername:var r=c.match(/!subathonreset/i),i=c.match(/!addsubs (-?\d+)/i),s=c.match(/!addminutes (-?\d+)/i);r&&j(Object(a.a)({},l)),i&&(o=parseInt(i[1]),p(O+o),C(o*l.secondsPerSub)),s&&C(parseInt(60*s[1]))}}else{var o;if(t.includes("Welcome")||t.includes("JOIN")||t.includes("NAMES"))console.log("Received a known, ignored, message",t);else console.error("Unhandled message",t)}})}));var P=function(){return"justinfan"+(Math.floor(9e4*Math.random())+9999)};return Object(s.jsx)(s.Fragment,{children:o.length>0&&void 0!==l?Object(s.jsx)("span",{children:o}):Object(s.jsx)(i.a,{config:l,subsThisStream:O,subathonEndDate:D,timeLastAdded:E})})}}).call(this,n(27).Buffer)},20:function(e,t,n){"use strict";var a=n(3),c=n(4),r=n(19),i=n(2),s=n(0),o=n(14),d=n.n(o),u=n(15),b=n(1);var l,j,h,f,O=function(e){var t=e.children,n=Object(s.useState)(!1),a=Object(i.a)(n,2),c=a[0],r=a[1],o=Object(s.useRef)(null);return Object(s.useEffect)((function(){var e=Object(u.a)(t,"normal 800 25px sans-serif");r(e>o.current.offsetWidth)}),[t]),Object(b.jsx)("div",{ref:o,children:c?Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(d.a,{gradient:!1,speed:40,children:[t,"\xa0-\xa0"]})}):Object(b.jsx)(b.Fragment,{children:t})})};var p,m,v,w,g,x,S,D=function(e){var t=Math.abs(parseInt(e/60/60)).toString().padStart(2,"0"),n=Math.abs(parseInt(e/60%60)).toString().padStart(2,"0"),a=Math.abs(parseInt(e%60)).toString().padStart(2,"0");return"".concat(e<0?"-":"").concat(t,":").concat(n,":").concat(a)},k=c.a.span(l||(l=Object(a.a)(["\n  \n  animation: blinkRecentlyAdded step-end 0.3s infinite;\n\n  @keyframes blinkRecentlyAdded{\n    0% {\n      color: transparent;\n    }\n    50% {\n      color: var(--subathon-addedtime);\n    }\n    100% {\n      color: transparent;\n    }\n  }\n"]))),I=c.a.span(j||(j=Object(a.a)(["\n  color: var(--subathon-lowtime);\n"]))),y=c.a.span(h||(h=Object(a.a)(["\n  \n  animation: blinkCritical step-end 0.6s infinite;\n\n  @keyframes blinkCritical{\n    0% {\n      color: transparent;\n    }\n    30% {\n      color: var(--subathon-criticaltime);\n    }\n    70% {\n      color: var(--subathon-criticaltime);\n    }\n    100% {\n      color: transparent;\n    }\n  }\n"]))),E=c.a.span(f||(f=Object(a.a)(["\n"]))),N=function(e){var t=e.endDate,n=e.timeLastAdded,a=Object(s.useState)(!1),c=Object(i.a)(a,2),r=c[0],o=c[1],d=Object(s.useState)(""),u=Object(i.a)(d,2),l=u[0],j=u[1],h=Object(s.useState)(!1),f=Object(i.a)(h,2),O=f[0],p=f[1],m=Object(s.useState)(!1),v=Object(i.a)(m,2),w=v[0],g=v[1];return Object(s.useEffect)((function(){var e=setInterval((function(){o(new Date-n<=3e3),p(t-new Date<=36e5),g(t-new Date<=3e5),j(D(new Date(t-new Date)/1e3))}),200);return function(){return clearInterval(e)}}),[t,n]),r?Object(b.jsx)(k,{children:l}):w?Object(b.jsx)(y,{children:l}):O?Object(b.jsx)(I,{children:l}):Object(b.jsx)(E,{children:l})};var C=c.a.div(p||(p=Object(a.a)(["\n  font-weight: bold;\n  text-transform: uppercase;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  text-align: left;\n  width: 100%;\n"]))),M=c.a.div(m||(m=Object(a.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 65%;\n  align-items: flex-start;\n"]))),P=c.a.div(v||(v=Object(a.a)(["\n  font-size: 3rem;\n  width: 35%;\n"]))),A=c.a.div(w||(w=Object(a.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"]))),R=c.a.div(g||(g=Object(a.a)(["\n  .progress-bar{\n    background-color: var(--subathon-progressbarcolor);\n  }\n"]))),F=c.a.div(x||(x=Object(a.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"]))),J=c.a.div(S||(S=Object(a.a)(["\n  --subathon-criticaltime: #FF4136;\n  --subathon-lowtime: #FF4136;\n  --subathon-addedtime: #2ECC40;\n  --subathon-textcolor: white;\n  --subathon-progressbarcolor: #001f3f;\n  --subathon-background: linear-gradient(77deg, rgb(28,33,43) 0%, rgb(28,44,52) 50%, rgb(28,36,52) 100%);\n  \n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 0.5rem;\n  font-size: 1.5rem;\n  color: var(--subathon-textcolor);\n  background: var(--subathon-background);\n  width: 600px;\n  height: 150px;\n"])));t.a=function(e){var t=e.config,n=e.subsThisStream,a=e.subathonEndDate,c=e.timeLastAdded,i=function(){var e=Object.entries(t.goals).sort((function(e){return e[0]})).filter((function(e){return e[0]<=n}));return e.length>0?e[e.length-1]:[0,"No goal achieved"]},s=function(){var e=[1/0,"All goals achieved"],a=Object.entries(t.goals).sort((function(e){return e[0]})).filter((function(e){return e[0]>n}));return a.length>0?a[0]:e};return Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)(J,{className:"SubathonContainer",children:[Object(b.jsxs)(A,{children:[Object(b.jsxs)(M,{children:[Object(b.jsxs)("span",{children:[s()[0]-n," subs needed for:"]}),Object(b.jsx)(C,{children:Object(b.jsx)(O,{children:s()[1]})})]}),Object(b.jsx)(P,{children:Object(b.jsx)(N,{endDate:a,timeLastAdded:c})})]}),Object(b.jsxs)(R,{children:[Object(b.jsx)(r.a,{animated:!0,now:n,min:i()[0],max:s()[0]}),Object(b.jsxs)(F,{children:[Object(b.jsx)("span",{children:i()[0]}),Object(b.jsx)("span",{children:n}),Object(b.jsx)("span",{children:s()[0]})]})]})]})})}},21:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(12),i=n.n(r),s=(n(26),n(13)),o=n(1);i.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(s.a,{})}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.8121b882.chunk.js.map