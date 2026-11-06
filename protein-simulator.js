/* Standalone protein simulation. Existing info.js remains unchanged. */
(() => {
  "use strict";
  // Factors: kg CO2e per 100 g protein. Four from supplied prototype;
  // other four are approximate demonstration proxies pending data verification.
  const sources = [
    {id:"beef",name:"Beef",base:20,factor:49.889668},
    {id:"cheese",name:"Dairy",base:15,factor:10.82},
    {id:"pork",name:"Pork",base:10,factor:7.61},
    {id:"chicken",name:"Chicken",base:20,factor:5.698614},
    {id:"eggs",name:"Eggs",base:10,factor:4.208724},
    {id:"tofu",name:"Tofu",base:10,factor:1.98},
    {id:"peas",name:"Legumes",base:10,factor:0.836058},
    {id:"nuts",name:"Nuts",base:5,factor:0.26}
  ];
  const $ = id => document.getElementById(id);
  const daily = (grams,factor) => grams * factor / 100;
  const fmt = n => n.toFixed(2);
  const baseline = sources.reduce((sum,s)=>sum+daily(s.base,s.factor),0);
  const values = Object.fromEntries(sources.map(s=>[s.id,s.base]));
  function update(){
    let total=0,protein=0;
    const mix=$("sim-mix");mix.replaceChildren();
    sources.forEach(s=>{
      const grams=values[s.id],before=daily(s.base,s.factor),after=daily(grams,s.factor);
      total+=after;protein+=grams;
      $("sim-value-"+s.id).textContent=String(grams);
      $("sim-before-"+s.id).textContent=fmt(before)+" kg";
      $("sim-after-"+s.id).textContent=fmt(after)+" kg";
      $("sim-fill-"+s.id).style.width=Math.min(100,after/Math.max(before,after,0.001)*100)+"%";
      const delta=$("sim-delta-"+s.id),diff=after-before;
      delta.textContent=Math.abs(diff)<0.000001?"No change from baseline":`${diff>0?"+":"−"}${fmt(Math.abs(diff))} kg CO₂e/day vs baseline`;
      delta.className="sim-delta"+(diff>0?" positive":diff<0?" negative":"");
      const row=document.createElement("div");row.className="sim-mix-row";
      const name=document.createElement("span");name.textContent=s.name;
      const track=document.createElement("div");track.className="sim-mix-track";
      const fill=document.createElement("span");fill.className="sim-mix-fill";
      fill.style.width=(protein?0:0)+"%";track.append(fill);
      const output=document.createElement("output");output.textContent=grams+" g";
      row.append(name,track,output);mix.append(row);
    });
    [...mix.children].forEach((row,i)=>row.querySelector(".sim-mix-fill").style.width=(protein?values[sources[i].id]/protein*100:0)+"%");
    $("sim-baseline-emissions").textContent=fmt(baseline);
    $("sim-current-emissions").textContent=fmt(total);
    $("sim-total-protein").textContent=protein+" g";
    $("sim-total-fill").style.width=Math.min(100,total/Math.max(baseline,total,0.001)*100)+"%";
    $("sim-total-scale").textContent=`Baseline ${fmt(baseline)} kg CO₂e/day`;
    const delta=$("sim-total-delta"),diff=total-baseline;
    delta.textContent=Math.abs(diff)<0.000001?"No change from the example baseline":`${diff>0?"+":"−"}${fmt(Math.abs(diff))} kg CO₂e/day (${Math.abs(diff/baseline*100).toFixed(1)}% ${diff>0?"higher":"lower"})`;
    delta.className="sim-delta"+(diff>0?" positive":diff<0?" negative":"");
  }
  sources.forEach(s=>{
    const slider=$("sim-slider-"+s.id);slider.value=s.base;
    slider.addEventListener("input",()=>{values[s.id]=Number(slider.value);update();});
  });
  $("sim-reset").addEventListener("click",()=>{
    sources.forEach(s=>{values[s.id]=s.base;$("sim-slider-"+s.id).value=s.base;});update();
  });
  update();
})();
