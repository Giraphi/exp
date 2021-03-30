(this.webpackJsonpexp=this.webpackJsonpexp||[]).push([[0],{47:function(e,t,n){"use strict";n.r(t);var i=n(1),r=n.n(i),o=n(27),c=n.n(o),s=n(8),a=n(9),u=n(10),d=r.a.createContext({isMovingForward:!1,isMovingBackward:!1,isTurningRight:!1,isTurningLeft:!1}),h=n(6),b=n(5),j=n(3);Object(u.b)({BirdControls:function(e,t){this.object=e,this.domElement=t,this.movementSpeed=1,this.lookSpeed=.005,this.panSpeed=0,this.moveForward=!1,this.moveBackward=!1,this.viewHalfX=0,this.viewHalfY=0;var n=0,i=0;this.domElement!==document&&this.domElement.setAttribute("tabindex",-1),this.setMoveForward=function(e){this.moveForward=e},this.setMoveBackward=function(e){this.moveBackward=e},this.setPanSpeed=function(e){this.panSpeed=e},this.handleResize=function(){this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/2,this.viewHalfY=this.domElement.offsetHeight/2)},this.onKeyDown=function(e){switch(e.code){case"ArrowUp":case"KeyW":this.moveForward=!0;break;case"ArrowLeft":case"KeyA":this.panSpeed=-800;break;case"ArrowDown":case"KeyS":this.moveBackward=!0;break;case"ArrowRight":case"KeyD":this.panSpeed=800}},this.onKeyUp=function(e){switch(this.panSpeed=0,e.code){case"ArrowUp":case"KeyW":this.moveForward=!1;break;case"ArrowLeft":case"KeyA":this.moveLeft=!1;break;case"ArrowDown":case"KeyS":this.moveBackward=!1;break;case"ArrowRight":case"KeyD":this.moveRight=!1}},this.update=function(){var e=new b.Vector3;return function(t){var r=t*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.object.translateZ(-r),this.moveBackward&&this.object.translateZ(r);var o=t*this.lookSpeed;i-=this.panSpeed*o,n=Math.max(-85,Math.min(85,n));var c=b.MathUtils.degToRad(90-n),s=b.MathUtils.degToRad(i),a=this.object.position;e.setFromSphericalCoords(1,c,s).add(a),this.object.lookAt(e)}}(),this.dispose=function(){window.removeEventListener("keydown",r),window.removeEventListener("keyup",o)};var r=c(this,this.onKeyDown),o=c(this,this.onKeyUp);function c(e,t){return function(){t.apply(e,arguments)}}window.addEventListener("keydown",r),window.addEventListener("keyup",o),this.handleResize()}});var f=function(e){var t=Object(i.useRef)(null),n=Object(u.d)().gl,r=Object(i.useContext)(d);return Object(u.c)((function(e,n){t&&t.current&&t.current.update(n)})),Object(i.useEffect)((function(){t&&t.current&&t.current.setMoveForward(r.isMovingForward)}),[r.isMovingForward]),Object(i.useEffect)((function(){t&&t.current&&t.current.setMoveBackward(r.isMovingBackward)}),[r.isMovingBackward]),Object(i.useEffect)((function(){t&&t.current&&(r.isTurningRight?t.current.setPanSpeed(500):t.current.setPanSpeed(0))}),[r.isTurningRight]),Object(i.useEffect)((function(){t&&t.current&&(r.isTurningLeft?t.current.setPanSpeed(-500):t.current.setPanSpeed(0))}),[r.isTurningLeft]),e.object&&e.object.current?Object(j.jsx)("birdControls",{args:[e.object.current,n.domElement],ref:t,movementSpeed:500,lookSpeed:.1}):Object(j.jsx)(j.Fragment,{})};function g(e){var t=Object(i.useRef)(null),n=Object(u.d)().setDefaultCamera,r=Object(i.useState)(),o=Object(h.a)(r,2),c=o[0],s=o[1],a=Object(i.useCallback)((function(e){null!==e&&(n(e),s(e))}),[n]);return Object(u.c)((function(){c&&c.updateMatrixWorld()})),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("group",{ref:t,position:e.position,children:[Object(j.jsx)("group",{rotation:[-.3,0,0],children:Object(j.jsx)("perspectiveCamera",{ref:a})}),Object(j.jsx)("pointLight",{color:"0xfffff5",intensity:.2,distance:500,decay:2,castShadow:!0,position:[-100,0,0]}),Object(j.jsx)("pointLight",{color:"0xfffff5",intensity:.2,distance:500,decay:2,castShadow:!0,position:[100,0,0]})]}),Object(j.jsx)(f,{object:t})]})}var l=n(7);function w(e){return Object(j.jsx)("pointLight",{color:"0xffffff",intensity:1,distance:500,decay:2,position:e.position,castShadow:!0,children:Object(j.jsxs)("mesh",{children:[Object(j.jsx)("meshStandardMaterial",{emissive:new b.Color("#ffffee"),emissiveIntensity:1,color:"#000000"}),Object(j.jsx)("sphereGeometry",{args:[10,16,8]})]})})}var v,m=n(34);function O(e){var t=Object(i.useState)(),n=Object(h.a)(t,2),r=n[0],o=n[1],c=Object(i.useState)(),s=Object(h.a)(c,2),a=s[0],d=s[1],b=(Object(u.d)().gl,Object(i.useCallback)((function(e){null!==e&&o(e)}),[])),f=Object(i.useCallback)((function(e){null!==e&&d(e)}),[]),g=Object(i.useMemo)((function(){if(a&&a)return Object(j.jsx)(j.Fragment,{children:Object(l.a)(Array(e.numCuboids)).map((function(e,t){return Object(j.jsx)("mesh",{position:[1600*Math.random()-800,0,1600*Math.random()-800],scale:[20,160*Math.random()+100,20],material:r,geometry:a,castShadow:!0,receiveShadow:!0},t)}))})}),[a,r,e.numCuboids]);return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("ambientLight",{color:"white",intensity:.001}),Object(j.jsx)("meshStandardMaterial",{ref:b,attach:"material",color:"white"}),Object(j.jsx)("boxBufferGeometry",{ref:f,attach:"geometry",args:[1,1,1]}),g,Object(j.jsx)(w,{position:new m.a(0,200,0)}),Object(j.jsxs)("mesh",{position:[0,0,0],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[Object(j.jsx)("planeBufferGeometry",{attach:"geometry",args:[1800,1800]}),Object(j.jsx)("meshStandardMaterial",{attach:"material",color:"white",flatShading:!0})]})]})}function p(){var e=Object(u.d)().gl;return Object(i.useEffect)((function(){e.shadowMap.enabled=!0,e.shadowMap.type=b.PCFSoftShadowMap}),[e]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(g,{position:[0,200,1e3]}),Object(j.jsx)(O,{numCuboids:400})]})}function x(){var e=Object(i.useContext)(d);return Object(j.jsx)(u.a,{shadowMap:!0,children:Object(j.jsx)(d.Provider,{value:e,children:Object(j.jsx)(p,{})})})}var M=Object(a.a)(v||(v=Object(s.a)(["\n    html,\n    body,\n    #root {\n      width: 100%;\n      height: 100%;\n      margin: 0;\n      padding: 0;\n    }\n\n    html {\n      box-sizing: border-box;\n    }\n    *, *:before, *:after {\n      box-sizing: inherit;\n    }\n"]))),k=r.a.createContext({setIsMovingForward:function(){},setIsMovingBackward:function(){},setIsTurningLeft:function(){},setIsTurningRight:function(){}});function S(e){var t=Object(i.useState)(!1),n=Object(h.a)(t,2),r=n[0],o=n[1],c=Object(i.useState)(!1),s=Object(h.a)(c,2),a=s[0],u=s[1],b=Object(i.useState)(!1),f=Object(h.a)(b,2),g=f[0],l=f[1],w=Object(i.useState)(!1),v=Object(h.a)(w,2),m=v[0],O=v[1],p=Object(i.useMemo)((function(){return{setIsMovingForward:o,setIsMovingBackward:u,setIsTurningLeft:l,setIsTurningRight:O}}),[]);return Object(j.jsx)(d.Provider,{value:{isMovingForward:r,isMovingBackward:a,isTurningLeft:g,isTurningRight:m},children:Object(j.jsx)(k.Provider,{value:p,children:e.children})})}var y,T,F,I,B,A,E,L,R,C,K,D=n.p+"static/media/arrow-white.fb6e3d97.svg",P=n.p+"static/media/arrow-white-pressed.acc87111.svg",U=Object(a.b)(y||(y=Object(s.a)(["50px"]))),H=function(e){return Object(a.b)(T||(T=Object(s.a)(["\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  cursor: pointer;\n\n  background-image: url(",");\n\n  ","\n  \n  @media (min-width: 768px) {\n    background-image: url(",");\n\n    ","\n  }\n"])),D,e&&Object(a.b)(F||(F=Object(s.a)(["\n      background-image: url(",");\n  "])),P),D,e&&Object(a.b)(I||(I=Object(s.a)(["\n      background-image: url(",");\n    "])),P))},z=a.c.div(B||(B=Object(s.a)(["\n  grid-row: 1;\n  grid-column: 2;\n  ",";\n"])),(function(e){return H(e.isActive)})),W=a.c.div(A||(A=Object(s.a)(["\n  grid-row: 2;\n  grid-column: 1;\n  transform: rotate(-90deg);\n  ",";\n"])),(function(e){return H(e.isActive)})),G=a.c.div(E||(E=Object(s.a)(["\n  grid-row: 2;\n  grid-column: 3;\n  transform: rotate(90deg);\n  ",";\n"])),(function(e){return H(e.isActive)})),X=a.c.div(L||(L=Object(s.a)(["\n  grid-row: 3;\n  grid-column: 2;\n  transform: rotate(180deg);\n  ",";\n"])),(function(e){return H(e.isActive)})),Y=a.c.div(R||(R=Object(s.a)(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  position: absolute;\n  \n  bottom: 0;\n  padding-bottom: calc("," / 2);\n  padding-right: calc("," / 2);\n  justify-content: flex-end;\n  \n  @media(min-width: 768px) {\n    justify-content: center;\n    bottom: 10%;   \n    right: unset;\n    padding-right: 0;\n    padding-bottom: 0;\n  }\n"])),U,U),J=a.c.div(C||(C=Object(s.a)(["\n  display: grid;\n  grid-template-columns: repeat(3, ",");\n  grid-template-rows: repeat(3, ",");\n  user-select: none;\n"])),U,U);function Z(){var e=Object(i.useContext)(k),t=Object(i.useContext)(d);return Object(j.jsx)(Y,{children:Object(j.jsxs)(J,{children:[Object(j.jsx)(z,{isActive:t.isMovingForward,onMouseDown:function(){return e.setIsMovingForward(!0)},onTouchStart:function(){return e.setIsMovingForward(!0)},onMouseUp:function(){return e.setIsMovingForward(!1)},onTouchEnd:function(){return e.setIsMovingForward(!1)}}),Object(j.jsx)(X,{isActive:t.isMovingBackward,onMouseDown:function(){return e.setIsMovingBackward(!0)},onTouchStart:function(){return e.setIsMovingBackward(!0)},onMouseUp:function(){return e.setIsMovingBackward(!1)},onTouchEnd:function(){return e.setIsMovingBackward(!1)}}),Object(j.jsx)(W,{isActive:t.isTurningLeft,onMouseDown:function(){return e.setIsTurningLeft(!0)},onTouchStart:function(){return e.setIsTurningLeft(!0)},onMouseUp:function(){return e.setIsTurningLeft(!1)},onTouchEnd:function(){return e.setIsTurningLeft(!1)}}),Object(j.jsx)(G,{isActive:t.isTurningRight,onMouseDown:function(){return e.setIsTurningRight(!0)},onTouchStart:function(){return e.setIsTurningRight(!0)},onMouseUp:function(){return e.setIsTurningRight(!1)},onTouchEnd:function(){return e.setIsTurningRight(!1)}})]})})}var V=a.c.div(K||(K=Object(s.a)(["\n  //background: #ff6161;\n  //background: #53FAEB;\n  background-color: black;\n  width: 100%;\n  height: 100%;\n  position: relative;\n"])));var q=function(){return Object(j.jsxs)(V,{children:[Object(j.jsx)(M,{}),Object(j.jsxs)(S,{children:[Object(j.jsx)(x,{}),Object(j.jsx)(Z,{})]})]})};c.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(q,{})}),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.7461df85.chunk.js.map