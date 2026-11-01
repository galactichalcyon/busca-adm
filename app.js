const S={t:"all",loc:null,n:20};
const $=s=>document.querySelector(s);
const hav=(a,b,c,d)=>{const R=6371,t=Math.PI/180,x=(c-a)*t,y=(d-b)*t,h=Math.sin(x/2)**2+Math.cos(a*t)*Math.cos(c*t)*Math.sin(y/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const MAXD=150;
function rank(){
 const w={p:+$("#w_price").value,d:S.loc?+$("#w_dist").value:0,e:+$("#w_enade").value};
 const tw=w.p+w.d+w.e;
 return D.filter(x=>S.t==="all"||(S.t==="pub")===(x.p===0)).map(x=>{
  const sp=1-x.p;
  let sd=null,km=null;
  if(S.loc){const c=C[x.m];km=hav(S.loc[0],S.loc[1],c[0],c[1]);sd=Math.max(0,1-km/MAXD)}
  const se=x.e==null?0.5:x.e/5;
  const tot=tw?((w.p*sp)+(w.d*(sd||0))+(w.e*se))/tw:0;
  return{x,sp,sd,se,km,tot};
 }).sort((a,b)=>b.tot-a.tot||(b.x.e??-1)-(a.x.e??-1)||a.x.i.localeCompare(b.x.i,"pt"));
}
const bar=(n,v)=>v==null?"":`<div class="bar">${n}<i><b style="width:${Math.round(v*100)}%"></b></i></div>`;
function render(){
 const r=rank(),el=$("#list");
 el.innerHTML=r.slice(0,S.n).map((o,i)=>{const x=o.x;
  const tags=[`<span class="tag">${x.p?"Privada":"Pública"}</span>`,
   x.e==null?`<span class="tag w">Sem ENADE</span>`:`<span class="tag g">ENADE ${x.e}${x.a?" ("+x.a+")":""}</span>`,
   o.km!=null?`<span class="tag">≈ ${Math.round(o.km)} km</span>`:"",
   x.n!=="Administração"?`<span class="tag">${x.n}</span>`:"",
   x.f?`<span class="tag w">Em supervisão do MEC</span>`:""].join("");
  return `<article class="card"><div class="rk">${i+1}º</div><div><div class="ttl">${esc(x.i)}${x.s?" ("+esc(x.s)+")":""}</div><div class="meta">${esc(x.m)}</div></div><div class="sc">${Math.round(o.tot*100)}%</div><div class="tags">${tags}</div><div class="bars">${bar("Mensalidade",o.sp)}${bar("Distância",o.sd)}${bar("ENADE",o.se)}</div></article>`}).join("");
 $("#more").hidden=r.length<=S.n;
 $("#list").dataset.total=r.length;
}
function setLoc(lat,lng,label){S.loc=[lat,lng];S.n=20;$("#locnote").textContent="Localização: "+label+". A distância usa o centro do município.";render()}
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{S.t=b.dataset.t;S.n=20;document.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));render()});
document.querySelectorAll(".sl input").forEach(i=>{const o=i.nextElementSibling;o.textContent=i.value;i.oninput=()=>{o.textContent=i.value;S.n=20;render()}});
const sel=$("#city");Object.keys(C).sort((a,b)=>a.localeCompare(b,"pt")).forEach(m=>sel.add(new Option(m,m)));
sel.onchange=()=>{if(sel.value){const c=C[sel.value];setLoc(c[0],c[1],sel.value)}};
$("#geo").onclick=()=>{
 if(!navigator.geolocation){$("#locnote").textContent="Seu navegador não permite localização. Escolha a cidade na lista.";return}
 navigator.geolocation.getCurrentPosition(p=>{sel.value="";setLoc(p.coords.latitude,p.coords.longitude,"sua posição atual")},()=>{$("#locnote").textContent="Não foi possível obter a localização. Escolha sua cidade na lista."},{timeout:8000});
};
$("#more").onclick=()=>{S.n+=20;render()};
render();
