import{S as n,P as o,W as t,T as e,M as s,a,b as i,A as d,c as r,O as w,d as c,B as p,e as l,f as m,g as f,C as g}from"./vendor.33bc14fa.js";const u=new n,y=new o(75,window.innerWidth/window.innerHeight,.1,1e3),h=new t({canvas:document.querySelector("#bg")});h.setPixelRatio(window.devicePixelRatio),h.setSize(window.innerWidth,window.innerHeight),y.position.setZ(30),y.position.setX(-3),h.render(u,y);const b=new e(10,3,16,100),x=new s({color:16737095}),j=new a(b,x);u.add(j);const z=new i(16777215);z.position.set(5,5,5);const A=new d(16777215);u.add(z,A);const S=new r(16777215);S.position.set(-10,10,10),u.add(S);const v=new w(y,h.domElement);Array(200).fill().forEach((function(){const n=new m(.25,24,24),o=new s({color:16777215}),t=new a(n,o),[e,i,d]=Array(3).fill().map((()=>f.randFloatSpread(100)));t.position.set(e,i,d),u.add(t)}));const E=(new c).load("./dist/assets/space.jpg");u.background=E;const P=(new c).load("dist/assets/jeff.jpeg"),R=new a(new p(15,10,6),new l({map:P}));R.position.set(20,0,-5),u.add(R);const W=(new c).load("./dist/assets/moon.jpg"),k=(new c).load("./dist/assets/normal.jpg"),q=new a(new m(3,32,32),new s({map:W,normalMap:k}));q.position.set(-10,0,30),u.add(q);const B=new i(16777215,1,100);function C(){const n=document.body.getBoundingClientRect().top;q.rotation.x+=.05,q.rotation.y+=.075,q.rotation.z+=.05,R.rotation.y+=.01,R.rotation.z+=.01,y.position.z=30+-.01*n,y.position.x=-2e-4*n-3,y.rotation.y=-2e-4*n}B.position.set(-10,0,25),u.add(B),document.body.onscroll=C,C(),function n(){requestAnimationFrame(n),j.rotation.x+=.01,j.rotation.y+=.005,j.rotation.z+=.01,q.rotation.x+=.005,u.children.forEach((n=>{n.geometry instanceof m&&n!==q&&(n.rotation.x+=.001,n.rotation.y+=.001)}));const o=5e-4*Date.now();u.background=new g(`hsl(${10*o%360}, 50%, 50%)`),v.update(),h.render(u,y)}();
