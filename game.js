const DATA = [
  {name:"Beef", g:49.89, d:1.12,
   fact:"Beef from beef herds emits about 50 kg of CO2e for every 100 g of protein. That's nearly 9 times poultry and about 190 times nuts. Its protein is excellent, but no other source here comes close on emissions."},
  {name:"Cheese", g:10.82, d:1.10,
   fact:"Cheese emits more per gram of protein than pork and nearly twice as much as chicken, because it takes a lot of milk, and therefore a lot of cows, to make a little cheese."},
  {name:"Pork", g:7.61, d:1.10,
   fact:"Pork emits about 7.6 kg CO2e per 100 g of protein: far below beef, but still close to 4 times tofu."},
  {name:"Chicken", g:5.70, d:1.08,
   fact:"Chicken is one of the lower-emission meats at 5.7 kg CO2e per 100 g of protein, with complete, highly digestible protein."},
  {name:"Eggs", g:4.21, d:1.13,
   fact:"Eggs are the lowest-emission animal protein here, and they have one of the highest protein quality scores of anything on the list."},
  {name:"Tofu", g:1.98, d:0.91,
   fact:"Tofu emits about one twenty-fifth as much as beef per gram of protein, and soy protein scores close to complete on quality (91)."},
  {name:"Peas", g:0.44, d:0.73,
   fact:"Peas emit about 110 times less than beef per gram of protein. Their protein is incomplete on its own (73), mainly low in one amino acid, methionine, which grains supply."},
  {name:"Nuts", g:0.26, d:0.40,
   fact:"Nuts have the lowest emissions on the list, partly because nut trees store carbon. But their protein quality is the lowest here too (40), so they drop fast when you care about protein."}
];
const ICONS = {
  Beef:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.5 11c0-4.5 4.5-7 9-6.3 4.6.7 8.4 3.4 7.9 7.6-.5 4.4-5 7.4-9.6 6.9C6.6 18.8 3.5 15.4 3.5 11z" fill="#F3DCCF"/><path d="M5 11c0-3.7 3.8-5.6 7.6-5 3.9.6 7 2.8 6.6 6.2-.4 3.6-4.2 6-8 5.6C7.6 17.4 5 14.6 5 11z" fill="#B5473A"/><path d="M8 9.5c2 .5 3 2 5.5 1.5M9 14c1.5-.8 3.5-.6 5 .4" stroke="#D9766A" stroke-width="1" fill="none" stroke-linecap="round"/><circle cx="15" cy="11.5" r="2" fill="#F7EEE4"/></svg>',
  Cheese:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.5 16.5L20.5 8.5v10h-18z" fill="#E9AE2E"/><path d="M2.5 16.5L20.5 8.5 14 5.5z" fill="#F8D777"/><circle cx="8" cy="16" r="1.4" fill="#C98E1C"/><circle cx="14" cy="13.5" r="1.8" fill="#C98E1C"/><circle cx="17.5" cy="16.5" r="1.1" fill="#C98E1C"/></svg>',
  Pork:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 6l2.5 4L4 9.5zM19 6l-2.5 4L20 9.5z" fill="#D97C88"/><circle cx="12" cy="13" r="8" fill="#F0A3AC"/><ellipse cx="12" cy="15" rx="4.2" ry="3" fill="#E07F8C"/><ellipse cx="10.4" cy="15" rx=".9" ry="1.3" fill="#8A3B47"/><ellipse cx="13.6" cy="15" rx=".9" ry="1.3" fill="#8A3B47"/><circle cx="9" cy="10.5" r=".9" fill="#5A2A31"/><circle cx="15" cy="10.5" r=".9" fill="#5A2A31"/></svg>',
  Chicken:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 14.5L5.5 20" stroke="#F4EADF" stroke-width="2.6" stroke-linecap="round"/><circle cx="4.6" cy="19.2" r="1.7" fill="#F4EADF"/><circle cx="6.2" cy="20.9" r="1.7" fill="#F4EADF"/><ellipse cx="14.5" cy="9.5" rx="6.5" ry="5.2" transform="rotate(-40 14.5 9.5)" fill="#C77A33"/><path d="M12 7.5c1.5-1.5 3.5-2 5-1.5" stroke="#E3A35E" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>',
  Eggs:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 12.5c-1.5-4 2-8 6-7.5 2-2 6.5-1 7.5 2 3 1.5 3 6.5 0 8.5-.5 3.5-5 5-8 3.5-3.5 1-7-2.5-5.5-6.5z" fill="#FBF7EE" stroke="#B9A889" stroke-width="1"/><circle cx="12.5" cy="11.5" r="3.6" fill="#F2B21F"/><circle cx="11.4" cy="10.4" r="1" fill="#F9D772"/></svg>',
  Tofu:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9l8-4 8 4-8 4z" fill="#FBF5E6" stroke="#B9A889" stroke-width="1" stroke-linejoin="round"/><path d="M4 9v7.5l8 4V13z" fill="#EADFC4" stroke="#B9A889" stroke-width="1" stroke-linejoin="round"/><path d="M20 9v7.5l-8 4V13z" fill="#DCCFAF" stroke="#B9A889" stroke-width="1" stroke-linejoin="round"/></svg>',
  Peas:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.5 15c3-6 12-10 19-8-1.5 6.5-11 11-19 8z" fill="#4F8A35"/><circle cx="8" cy="13.2" r="2.3" fill="#9BCB5B"/><circle cx="12.6" cy="11.4" r="2.4" fill="#9BCB5B"/><circle cx="17" cy="9.6" r="2.2" fill="#9BCB5B"/><path d="M21.5 7l1-2" stroke="#4F8A35" stroke-width="1.4" stroke-linecap="round"/></svg>',
  Nuts:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.5c4 3 6.5 7 6.5 11a6.5 6.5 0 0 1-13 0c0-4 2.5-8 6.5-11z" fill="#A86B3C"/><path d="M10 8.5c-.7 2-.8 4-.3 6M13.5 7.5c.6 2.5.7 5 .1 7.5M11.8 16.5v2" stroke="#7E4C26" stroke-width="1" fill="none" stroke-linecap="round"/></svg>'
};
const ICON_URL = Object.fromEntries(Object.entries(ICONS).map(([k,v])=>[k,"data:image/svg+xml,"+encodeURIComponent(v)]));
const icon = n => `<img class="ico" src="${ICON_URL[n]}" alt="" aria-hidden="true">`;
const gMin = Math.min(...DATA.map(x=>x.g)), gMax = Math.max(...DATA.map(x=>x.g));
const Q = d => Math.min(d,1);
const E = g => Math.max(1 - Math.log(g/gMin)/Math.log(gMax/gMin), 0.02);
const score = (x,w) => 100*Math.pow(Q(x.d),w)*Math.pow(E(x.g),1-w);
const ranked = w => DATA.map(x=>({...x,s:score(x,w)})).sort((a,b)=>b.s-a.s);

const $ = id => document.getElementById(id);
const st = {w:0.5, picks:[], pool:[]};
const pct = v => Math.round(v*100)+"%";
const show = id => { ["s1","s2","s3"].forEach(s=>$(s).hidden = s!==id); window.scrollTo({top:0,behavior:"smooth"}); };
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
function scoreColor(s){
  const cs=getComputedStyle(document.documentElement);
  return `hsl(${(30+s/100*115).toFixed(0)} ${cs.getPropertyValue("--score-s").trim()} ${cs.getPropertyValue("--score-l").trim()})`;
}

/* step 1 */
function syncW(){ const w=1-$("w").value/100; st.w=w; $("pq").textContent=pct(w); $("pe").textContent=pct(1-w);
  $("w").setAttribute("aria-valuetext",`${pct(w)} protein quality, ${pct(1-w)} planet`); }
$("w").addEventListener("input",syncW);
$("lock").addEventListener("click",()=>{
  st.picks=[]; st.pool=shuffle(DATA.map(x=>x.name));
  $("mypri").innerHTML=`Your priorities: <b class="q">${pct(st.w)} protein quality</b> | <b class="e">${pct(1-st.w)} planet</b>`;
  renderRank(); show("s2");
});

/* step 2 */
function renderRank(){
  const left = st.pool.filter(n=>!st.picks.includes(n));
  $("pool").innerHTML = left.length ? "" : `<span class="pool-empty">All placed. Ready to reveal.</span>`;
  left.forEach(n=>{ const b=document.createElement("button"); b.className="chip"; b.innerHTML=icon(n)+n;
    b.setAttribute("aria-label",`Place ${n} at number ${st.picks.length+1}`);
    b.onclick=()=>{ st.picks.push(n); renderRank(); const nx=$("pool").querySelector("button"); if(nx) nx.focus(); else $("submit").focus(); };
    $("pool").appendChild(b); });
  $("slots").innerHTML="";
  DATA.forEach((_,i)=>{
    const li=document.createElement("li"); li.className="slot";
    const n=st.picks[i];
    li.innerHTML=`<span class="num">${i+1}</span>`;
    if(n){ const d=document.createElement("div"); d.className="filled";
      const last = i===st.picks.length-1;
      d.innerHTML=`<span class="nm">${icon(n)}${n}</span><span class="ctrls"><button class="ctrl" data-a="up" ${i===0?"disabled":""} aria-label="Move ${n} up">Up</button><button class="ctrl" data-a="down" ${last?"disabled":""} aria-label="Move ${n} down">Down</button><button class="ctrl" data-a="rm" aria-label="Remove ${n}">Remove</button></span>`;
      d.querySelectorAll(".ctrl").forEach(btn=>btn.onclick=()=>{
        const a=btn.dataset.a; let j=i;
        if(a==="up"){ [st.picks[i-1],st.picks[i]]=[st.picks[i],st.picks[i-1]]; j=i-1; }
        else if(a==="down"){ [st.picks[i+1],st.picks[i]]=[st.picks[i],st.picks[i+1]]; j=i+1; }
        else { st.picks.splice(i,1); }
        renderRank();
        if(a!=="rm"){ const row=$("slots").children[j]; const t=row.querySelector(`.ctrl[data-a="${a}"]:not([disabled])`)||row.querySelector(".ctrl:not([disabled])"); if(t) t.focus(); }
      });
      li.appendChild(d); }
    else { const d=document.createElement("div"); d.className="fill"; d.textContent=i===st.picks.length?"Next pick goes here":""; li.appendChild(d); }
    $("slots").appendChild(li);
  });
  $("submit").disabled = st.picks.length!==DATA.length;
}
$("clear").onclick=()=>{ st.picks=[]; renderRank(); };
$("back").onclick=()=>show("s1");
$("submit").onclick=()=>{ reveal(); show("s3"); };

/* step 3 */
function reveal(){
  const actual = ranked(st.w).map(x=>x.name);
  const diffs = DATA.map(x=>({name:x.name, you:st.picks.indexOf(x.name), real:actual.indexOf(x.name)}));
  const exact = diffs.filter(d=>d.you===d.real).length;
  const avg = diffs.reduce((a,d)=>a+Math.abs(d.you-d.real),0)/diffs.length;
  $("exact").textContent = `${exact} / ${DATA.length}`;
  $("miss").textContent = avg.toFixed(1);
  $("verdict").textContent = exact===DATA.length ? "Perfect. You nailed every spot." :
    avg<=1 ? "Very close. You know your proteins." :
    avg<=2 ? "Not bad, but a few surprises in there." : "Our scoring might surprise you.";

  const worst = [...diffs].sort((a,b)=>Math.abs(b.you-b.real)-Math.abs(a.you-a.real))[0];
  const wd = DATA.find(x=>x.name===worst.name);
  if(worst.you===worst.real){
    $("shockKicker").textContent="Did you know?";
    $("shockFact").textContent=DATA[0].fact;
  } else {
    $("shockKicker").textContent=`Biggest surprise: you ranked ${worst.name} #${worst.you+1}. Our scoring puts it at #${worst.real+1}.`;
    $("shockFact").textContent=wd.fact;
  }
  drawSlope(diffs);
  $("w2").value = Math.round((1-st.w)*100); renderLive();
}

function drawSlope(diffs){
  const rowH=42, top=36, H=top+DATA.length*rowH, W=600, xL=230, xR=370;
  let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<text class="hdr" x="${xL}" y="16" text-anchor="end">Your guess</text><text class="hdr" x="${xR}" y="16">Our scoring</text>`;
  const y=i=>top+i*rowH+rowH/2;
  const cs=getComputedStyle(document.documentElement);
  diffs.forEach(d=>{
    const off=Math.abs(d.you-d.real);
    const col = off===0 ? cs.getPropertyValue("--good").trim() : off===1 ? cs.getPropertyValue("--close").trim() : cs.getPropertyValue("--bad").trim();
    const sw = 3;
    s+=`<line x1="${xL+12}" y1="${y(d.you)}" x2="${xR-12}" y2="${y(d.real)}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
    s+=`<circle cx="${xL+12}" cy="${y(d.you)}" r="5" fill="${col}"/><circle cx="${xR-12}" cy="${y(d.real)}" r="5" fill="${col}"/>`;
  });
  st.picks.forEach((n,i)=>{ s+=`<text class="rk" x="24" y="${y(i)+5}">${i+1}</text><text x="${xL-4}" y="${y(i)+5}" text-anchor="end">${n}</text>`; });
  ranked(st.w).forEach((x,i)=>{ s+=`<text x="${xR+4}" y="${y(i)+5}">${x.name}</text><text class="rk" x="${W-24}" y="${y(i)+5}" text-anchor="end">${i+1}</text>`; });
  s+=`</svg>`;
  $("slope").outerHTML = s.replace("<svg ",`<svg id="slope" class="slope" role="img" aria-label="Your ranking compared with the real ranking" `);
}

function renderLive(){
  const w=1-$("w2").value/100;
  $("lq").textContent=pct(w); $("le").textContent=pct(1-w);
  $("w2").setAttribute("aria-valuetext",`${pct(w)} protein quality, ${pct(1-w)} planet`);
  $("live").innerHTML = ranked(w).map((x,i)=>`<li><span class="n">${i+1}</span><span class="nm">${x.name}</span><span class="bar"><i style="width:${x.s.toFixed(1)}%;background-image:url('${ICON_URL[x.name]}')"></i></span><span class="s">${Math.round(x.s)}</span></li>`).join("");
  $("eq").innerHTML = `Score = 100 x <i>Q</i><sup class="wq">${w.toFixed(1)}</sup> x <i>E</i><sup class="we">${(1-w).toFixed(1)}</sup>`;
}
$("w2").addEventListener("input",renderLive);
$("again").onclick=()=>{ $("w").value=50; syncW(); show("s1"); };
syncW();
