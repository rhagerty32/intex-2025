if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),l={module:{uri:t},exports:o,require:d};s[t]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"0a70c875de8ac8752b50dc55111c526b"},{url:"assets/index-BRsgN_Rx.css",revision:null},{url:"assets/index-xE298XsM.js",revision:null},{url:"index.html",revision:"df8b3c78f0efd6bba5fc79c5e39d04e3"},{url:"registerSW.js",revision:"0b2dbd6003eea8cb2bba25725191b349"},{url:"manifest.webmanifest",revision:"9aeee882daf2072cb8670464d777d829"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
