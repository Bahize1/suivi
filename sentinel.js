/* Faysal Sentinel telemetry bridge — minimal technical telemetry. */
(function () {
  "use strict";
  var cfg = window.FCN_SENTINEL || {};
  var allowed = new Set(["app_started","js_error","unhandled_rejection","network_online","network_offline"]);
  var endpoint = String(cfg.endpoint || "");
  if (cfg.enabled !== true || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/functions\/v1\/sentinel-ingest$/.test(endpoint)) return;
  function uuid() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() :
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0;return(c==="x"?r:(r&3|8)).toString(16);});
  }
  function stored(key) {
    try { var v=localStorage.getItem(key); if(!v){v=uuid();localStorage.setItem(key,v);} return v; }
    catch (_) { return uuid(); }
  }
  var installId=stored("fcn_sentinel_install");
  var sessionId=uuid();
  function optedOut(){try{return localStorage.getItem("fcn_nolog")==="1";}catch(_){return true;}}
  function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return "E"+(h>>>0).toString(16);}
  var offlineAt=null; /* un événement « hors ligne » ne peut pas partir sans réseau : on le garde et on l'envoie au retour de la connexion */
  function send(type, fingerprint, when) {
    if(!allowed.has(type)||optedOut()||!navigator.onLine)return;
    var native=false;
    try{native=!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());}catch(_){}
    var payload={event_type:type,fingerprint:fingerprint,app_version:String(cfg.appVersion||"3.9"),
      platform:native?"android":"web",install_id:installId,session_id:sessionId,occurred_at:when||new Date().toISOString()};
    try{fetch(endpoint,{method:"POST",mode:"cors",keepalive:true,headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}).catch(function(){});}catch(_){}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){send("app_started","app_started");},{once:true});
  else send("app_started","app_started");
  window.addEventListener("error",function(e){send("js_error",hash(String(e.message||"js-error")+"|"+String(e.filename||"").split("/").pop()));});
  window.addEventListener("unhandledrejection",function(e){send("unhandled_rejection",hash(String(e.reason&&e.reason.name||typeof e.reason)));});
  window.addEventListener("offline",function(){offlineAt=new Date().toISOString();});
  window.addEventListener("online",function(){
    if(offlineAt){send("network_offline","network_offline",offlineAt);offlineAt=null;}
    send("network_online","network_online");
  });
})();