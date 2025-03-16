(()=>{var e={};e.id=916,e.ids=[916],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},55315:e=>{"use strict";e.exports=require("path")},68621:e=>{"use strict";e.exports=require("punycode")},86624:e=>{"use strict";e.exports=require("querystring")},76162:e=>{"use strict";e.exports=require("stream")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},6162:e=>{"use strict";e.exports=require("worker_threads")},71568:e=>{"use strict";e.exports=require("zlib")},87561:e=>{"use strict";e.exports=require("node:fs")},84492:e=>{"use strict";e.exports=require("node:stream")},72477:e=>{"use strict";e.exports=require("node:stream/web")},46722:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>l,pages:()=>p,routeModule:()=>x,tree:()=>d}),t(8210),t(86323),t(35866);var s=t(23191),a=t(88716),i=t(37922),n=t.n(i),o=t(95231),c={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>o[e]);t.d(r,c);let d=["",{children:["dashboard",{children:["recipes",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8210)),"/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/dashboard/recipes/page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,86323)),"/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/app/dashboard/recipes/page.tsx"],l="/dashboard/recipes/page",u={require:t,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/recipes/page",pathname:"/dashboard/recipes",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},78947:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,79404,23)),Promise.resolve().then(t.bind(t,94379)),Promise.resolve().then(t.bind(t,95285)),Promise.resolve().then(t.bind(t,23582)),Promise.resolve().then(t.bind(t,3594)),Promise.resolve().then(t.bind(t,10143)),Promise.resolve().then(t.bind(t,88456)),Promise.resolve().then(t.bind(t,23511))},23582:(e,r,t)=>{"use strict";t.d(r,{AnimatedLayout:()=>i});var s=t(10326),a=t(32005);function i({children:e}){return s.jsx(a.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,ease:"easeOut"},className:"grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",children:e})}},88456:(e,r,t)=>{"use strict";t.d(r,{ErrorBoundary:()=>a});var s=t(17577);class a extends s.Component{static getDerivedStateFromError(){return{hasError:!0}}render(){return this.state.hasError?this.props.fallback:this.props.children}constructor(...e){super(...e),this.state={hasError:!1}}}},23511:(e,r,t)=>{"use strict";t.d(r,{RecipeCard:()=>o});var s=t(10326),a=t(29752),i=t(38443),n=t(32005);function o({recipe:e}){return s.jsx(n.E.div,{whileHover:{scale:1.02,transition:{duration:.2}},children:(0,s.jsxs)(a.Zb,{className:"hover:shadow-md transition-shadow h-full",children:[(0,s.jsxs)(a.Ol,{children:[s.jsx("div",{className:"flex justify-between items-start",children:s.jsx(a.ll,{className:"text-xl",children:e.name})}),s.jsx("div",{className:"flex gap-2 flex-wrap",children:e.tags?.map(e=>s.jsx(i.C,{variant:"outline",className:"text-xs",children:e},e))})]}),(0,s.jsxs)(a.aY,{className:"space-y-4",children:[s.jsx("div",{className:"grid grid-cols-3 gap-4",children:s.jsx("div",{className:"flex items-center gap-2",children:s.jsx(i.C,{variant:"outline",children:e.diet})})}),s.jsx("div",{className:"border-t pt-4",children:(0,s.jsxs)("div",{className:"grid grid-cols-3 gap-2 text-sm",children:[(0,s.jsxs)("div",{children:[s.jsx("p",{className:"font-medium text-muted-foreground",children:"Protein"}),(0,s.jsxs)("p",{children:[e.protein_g,"g"]})]}),(0,s.jsxs)("div",{children:[s.jsx("p",{className:"font-medium text-muted-foreground",children:"Carbs"}),(0,s.jsxs)("p",{children:[e.carbs_g,"g"]})]}),(0,s.jsxs)("div",{children:[s.jsx("p",{className:"font-medium text-muted-foreground",children:"Fat"}),(0,s.jsxs)("p",{children:[e.fat_g,"g"]})]})]})})]})]})})}},38443:(e,r,t)=>{"use strict";t.d(r,{C:()=>o});var s=t(10326);t(17577);var a=t(28671),i=t(51223);let n=(0,a.j)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function o({className:e,variant:r,...t}){return s.jsx("div",{className:(0,i.cn)(n({variant:r}),e),...t})}},29752:(e,r,t)=>{"use strict";t.d(r,{Ol:()=>o,SZ:()=>d,Zb:()=>n,aY:()=>p,eW:()=>l,ll:()=>c});var s=t(10326),a=t(17577),i=t(51223);let n=a.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...r}));n.displayName="Card";let o=a.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",e),...r}));o.displayName="CardHeader";let c=a.forwardRef(({className:e,...r},t)=>s.jsx("h3",{ref:t,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",e),...r}));c.displayName="CardTitle";let d=a.forwardRef(({className:e,...r},t)=>s.jsx("p",{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",e),...r}));d.displayName="CardDescription";let p=a.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:(0,i.cn)("p-6 pt-0",e),...r}));p.displayName="CardContent";let l=a.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:(0,i.cn)("flex items-center p-6 pt-0",e),...r}));l.displayName="CardFooter"},8210:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>m,dynamic:()=>u,metadata:()=>x});var s=t(19510),a=t(19292),i=t(68570);let n=(0,i.createProxy)(String.raw`/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/components/ui/RecipeCard.tsx#RecipeCard`);var o=t(92812),c=t(71159),d=t(10384),p=t(80102);let l=(0,i.createProxy)(String.raw`/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/components/ui/AnimatedLayout.tsx#AnimatedLayout`),u="force-dynamic",x={title:"Recipes",description:"Recipes for the recipe app."};async function m(){let e=await (0,a.iM)();return(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:s.jsx(d.J,{desktopProfile:s.jsx(p.T,{}),mobileNav:s.jsx(p.T,{})})}),s.jsx("div",{className:"flex-col md:flex",children:(0,s.jsxs)("div",{className:"flex-1 space-y-4 p-8 pt-4",children:[s.jsx("div",{className:"flex items-center justify-between space-y-2",children:s.jsx("h2",{className:"text-3xl font-bold tracking-tight",children:"Recipes"})}),s.jsx(o.S,{fallback:s.jsx("div",{children:"Error loading recipes"}),children:s.jsx(c.Suspense,{children:s.jsx(l,{children:Object.values(e).map(e=>s.jsx(n,{recipe:e},e.name))})})})]})})]})}},19292:(e,r,t)=>{"use strict";t.d(r,{AE:()=>i,OU:()=>o,iM:()=>n});let s=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000/api";async function a(e,r={}){try{let t=await fetch(`${s}${e}`,{...r,headers:{"Content-Type":"application/json",...r.headers}});if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return t.json()}catch(r){throw console.error(`Error fetching ${e}:`,r),r}}async function i(){return a("/ingredients",{next:{revalidate:3600}})}async function n(){return a("/recipes",{next:{revalidate:3600}})}async function o(){try{let e=await fetch(`${s}/meal-plan`,{headers:{"Content-Type":"application/json"},next:{revalidate:0}});if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching meal plan:",e),e}}},92812:(e,r,t)=>{"use strict";t.d(r,{S:()=>s});let s=(0,t(68570).createProxy)(String.raw`/Users/evansmacbook/Projects/Group-20-SmartRecipeApp/recipe-app-frontend/recipe-app/src/components/ui/ErrorBoundary.tsx#ErrorBoundary`)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,830,326,894,52,570,810,5,315,748],()=>t(46722));module.exports=s})();