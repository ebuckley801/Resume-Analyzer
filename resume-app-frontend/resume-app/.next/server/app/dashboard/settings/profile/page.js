(()=>{var e={};e.id=698,e.ids=[698],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},55315:e=>{"use strict";e.exports=require("path")},68621:e=>{"use strict";e.exports=require("punycode")},86624:e=>{"use strict";e.exports=require("querystring")},76162:e=>{"use strict";e.exports=require("stream")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},6162:e=>{"use strict";e.exports=require("worker_threads")},71568:e=>{"use strict";e.exports=require("zlib")},87561:e=>{"use strict";e.exports=require("node:fs")},84492:e=>{"use strict";e.exports=require("node:stream")},72477:e=>{"use strict";e.exports=require("node:stream/web")},43055:(e,r,s)=>{"use strict";s.r(r),s.d(r,{GlobalError:()=>o.a,__next_app__:()=>u,originalPathname:()=>d,pages:()=>p,routeModule:()=>m,tree:()=>c}),s(71960),s(91287),s(86323),s(35866);var t=s(23191),a=s(88716),i=s(37922),o=s.n(i),n=s(95231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(r,l);let c=["",{children:["dashboard",{children:["settings",{children:["profile",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,71960)),"/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/dashboard/settings/profile/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,91287)),"/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/dashboard/settings/layout.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,86323)),"/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/dashboard/settings/profile/page.tsx"],d="/dashboard/settings/profile/page",u={require:s,loadChunk:()=>Promise.resolve()},m=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/settings/profile/page",pathname:"/dashboard/settings/profile",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},20410:(e,r,s)=>{Promise.resolve().then(s.t.bind(s,79404,23)),Promise.resolve().then(s.bind(s,94379)),Promise.resolve().then(s.bind(s,95285)),Promise.resolve().then(s.bind(s,44128)),Promise.resolve().then(s.bind(s,3594)),Promise.resolve().then(s.bind(s,10143)),Promise.resolve().then(s.bind(s,72427))},31841:(e,r,s)=>{Promise.resolve().then(s.bind(s,3594)),Promise.resolve().then(s.bind(s,44794)),Promise.resolve().then(s.bind(s,72427))},44128:(e,r,s)=>{"use strict";s.d(r,{SidebarNav:()=>l});var t=s(10326),a=s(90434),i=s(35047),o=s(51223),n=s(91664);function l({className:e,items:r,...s}){let l=(0,i.usePathname)();return t.jsx("nav",{className:(0,o.cn)("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto",e),...s,children:r.map(e=>t.jsx(a.default,{href:e.href,className:(0,o.cn)((0,n.d)({variant:"ghost"}),l===e.href?"bg-muted hover:bg-muted":"hover:bg-transparent hover:underline","justify-start"),children:e.title},e.href))})}},44794:(e,r,s)=>{"use strict";s.d(r,{Label:()=>c});var t=s(10326),a=s(17577),i=s(34478),o=s(28671),n=s(51223);let l=(0,o.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef(({className:e,...r},s)=>t.jsx(i.f,{ref:s,className:(0,n.cn)(l(),e),...r}));c.displayName=i.f.displayName},72427:(e,r,s)=>{"use strict";s.d(r,{Separator:()=>p});var t=s(10326),a=s(17577),i=s(45226),o="horizontal",n=["horizontal","vertical"],l=a.forwardRef((e,r)=>{let{decorative:s,orientation:a=o,...l}=e,c=n.includes(a)?a:o;return(0,t.jsx)(i.WV.div,{"data-orientation":c,...s?{role:"none"}:{"aria-orientation":"vertical"===c?c:void 0,role:"separator"},...l,ref:r})});l.displayName="Separator";var c=s(51223);let p=a.forwardRef(({className:e,orientation:r="horizontal",decorative:s=!0,...a},i)=>t.jsx(l,{ref:i,decorative:s,orientation:r,className:(0,c.cn)("shrink-0 bg-border","horizontal"===r?"h-[1px] w-full":"h-full w-[1px]",e),...a}));p.displayName=l.displayName},91287:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>p,metadata:()=>l});var t=s(19510),a=s(98266);let i=(0,s(68570).createProxy)(String.raw`/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/dashboard/settings/components/sidebar-nav.tsx#SidebarNav`);var o=s(10384),n=s(80102);let l={title:"Settings",description:""},c=[{title:"Profile",href:"/dashboard/settings/profile"},{title:"Account",href:"/dashboard/settings/account"}];function p({children:e}){return(0,t.jsxs)(t.Fragment,{children:[t.jsx(o.J,{desktopProfile:t.jsx(n.T,{}),mobileNav:t.jsx(n.T,{})}),(0,t.jsxs)("div",{className:" space-y-4 p-8 pb-16 ",children:[(0,t.jsxs)("div",{className:"space-y-0.5",children:[t.jsx("h2",{className:"text-3xl font-bold tracking-tight",children:"Settings"}),t.jsx("p",{className:"text-muted-foreground",children:"Manage your account settings and set e-mail preferences."})]}),t.jsx(a.Z,{className:"my-6"}),(0,t.jsxs)("div",{className:"flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0",children:[t.jsx("aside",{className:"-mx-4 lg:w-1/5",children:t.jsx(i,{items:c})}),t.jsx("div",{className:"flex-1 lg:max-w-2xl",children:e})]})]})]})}},71960:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>d,dynamic:()=>p});var t=s(19510),a=s(55116),i=s(93804);let o=(0,s(68570).createProxy)(String.raw`/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/components/ui/label.tsx#Label`);var n=s(98266),l=s(57910);async function c(){let e=await (0,l.is)(),r=`${e?.firstName.charAt(0)}${e?.lastName.charAt(0)}`;return t.jsx("div",{className:"space-y-6",children:(0,t.jsxs)(i.Zb,{children:[(0,t.jsxs)(i.Ol,{children:[t.jsx("h3",{className:"text-lg font-medium",children:"Profile"}),t.jsx("div",{className:"py-3",children:t.jsx(a.qE,{className:"h-20 w-20 text-2xl",children:t.jsx(a.Q5,{children:r})})})]}),(0,t.jsxs)(i.aY,{children:[t.jsx(n.Z,{}),t.jsx("div",{children:(0,t.jsxs)("div",{className:"grid w-full items-center gap-4",children:[(0,t.jsxs)("div",{className:"flex flex-col pt-5 space-y-1.5",children:[t.jsx(o,{children:"Name"}),t.jsx("p",{className:"font-light",children:e?.firstName+" "+e?.lastName})]}),(0,t.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[t.jsx(o,{children:"Email"}),t.jsx("p",{className:"font-light",children:e?.email})]})]})})]})]})})}let p="force-dynamic";function d(){return t.jsx(c,{})}},93804:(e,r,s)=>{"use strict";s.d(r,{Ol:()=>n,Zb:()=>o,aY:()=>l});var t=s(19510),a=s(71159),i=s(40644);let o=a.forwardRef(({className:e,...r},s)=>t.jsx("div",{ref:s,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...r}));o.displayName="Card";let n=a.forwardRef(({className:e,...r},s)=>t.jsx("div",{ref:s,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",e),...r}));n.displayName="CardHeader",a.forwardRef(({className:e,...r},s)=>t.jsx("h3",{ref:s,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",e),...r})).displayName="CardTitle",a.forwardRef(({className:e,...r},s)=>t.jsx("p",{ref:s,className:(0,i.cn)("text-sm text-muted-foreground",e),...r})).displayName="CardDescription";let l=a.forwardRef(({className:e,...r},s)=>t.jsx("div",{ref:s,className:(0,i.cn)("p-6 pt-0",e),...r}));l.displayName="CardContent",a.forwardRef(({className:e,...r},s)=>t.jsx("div",{ref:s,className:(0,i.cn)("flex items-center p-6 pt-0",e),...r})).displayName="CardFooter"},98266:(e,r,s)=>{"use strict";s.d(r,{Z:()=>t});let t=(0,s(68570).createProxy)(String.raw`/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/components/ui/separator.tsx#Separator`)},34478:(e,r,s)=>{"use strict";s.d(r,{f:()=>n});var t=s(17577),a=s(45226),i=s(10326),o=t.forwardRef((e,r)=>(0,i.jsx)(a.WV.label,{...e,ref:r,onMouseDown:r=>{r.target.closest("button, input, select, textarea")||(e.onMouseDown?.(r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));o.displayName="Label";var n=o}};var r=require("../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[948,830,326,894,52,570,810,315,748],()=>s(43055));module.exports=t})();