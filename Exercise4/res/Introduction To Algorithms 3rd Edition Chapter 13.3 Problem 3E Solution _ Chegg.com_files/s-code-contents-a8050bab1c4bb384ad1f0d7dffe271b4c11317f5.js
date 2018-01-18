/*********** Begin Chegg.com AppMeasurement code file ************/
/*
 code version - update this date whenever making changes to this file 
*/
var s_code_version = "CH|v20170724";
/*
 logic below looks at several elements to decide where to send data inside Analytics
*/
/* determine DTM staging/production environment and app/web platform*/
var s = new AppMeasurement();

var env = _satellite.settings.isStaging === true ? 'stage' : 'prod';
var isApp = isInNativeApp() === true ? 'app' : 'web';
if(isApp == "app") {
  s.account = env == "stage" ? 'cheggnativeappdev' : 'cheggnativeappprod';
}
else{
  s.account = env == "prod" ? 'cheggincglobal' : 'cheggincdev';
}
s_account = s.account;  // hack to fix some issues with legacy implementation

function isInNativeApp() {
    if ((!!window.KERMIT_PARAMS && window.KERMIT_PARAMS.is_in_app)||(typeof C !== "undefined"&&typeof C.Kermit!== "undefined"&&typeof C.Kermit.shell !== "undefined")) {
        return true;
    } else {
        try {
            if (!!parent.KERMIT_PARAMS && parent.KERMIT_PARAMS.is_in_app) {
                return true;
            }
        }
        catch (e) {
            // do nothing
     	}
        return false;
    }
}
/*
 put any global config information and variables here
*/
/* turn on use of plugins */
s.usePlugins = true;

/* general config */
s.linkTrackVars="eVar3,eVar4,eVar5,eVar7,eVar11,eVar12,eVar39,eVar49,prop5,prop6,prop7,prop11,prop20,prop32,prop75"
s.linkTrackEvents="None"
s.fpCookieDomainPeriods = "2"
s.currencyCode="USD"

/* Time Parting Plugin Config, for daylight savings time */
s._tpDST = {
    2015:'3/8,11/1',
    2016:'3/13,11/6',
    2017:'3/12,11/5',
    2018:'3/11,11/4',
    2019:'3/10,11/3'}
 
/* performance tracking config */
s.pte = 'event401,event402,event403,event404,event405,event406,event407,event408,event409,event410';
s.ptc = false;

//ClickTale Integration Start
function clickTaleGetUID_PID() {
    if (document.cookie.indexOf("WRUID") > -1 && document.cookie.indexOf("WRIgnore=true") == -1) {
        var ca = document.cookie.split(';');
        var PID = 0, UID = 0;
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf("CT_Data") > -1) PID = c.substring(c.indexOf("apv_")).split("_")[1];
            if (
              ((document.cookie.match(/WRUID/g) || []).length == 1 && c.indexOf("WRUID") > -1) ||
              (c.indexOf("WRUID") > -1 && (document.cookie.match(/WRUID/g) || []).length > 1 && c.indexOf("WRUID=") == -1)
            )
                UID = c.split("=")[1];
        }
        return (UID == 0 || PID == 0) ? null : (UID + "." + PID);
    }
    else
        return null;
}
var clickTaleValues = clickTaleGetUID_PID();
if (clickTaleValues != null) {
    s.eVar78 = clickTaleValues;
}
//ClickTale Integration End

/*
 s_doPlugins Start
 put code in the below function to execute on every server call
*/
function s_doPlugins(s) {
    // marketing campaigns
    if(!s.campaign){	
        s._utm_source=s.Util.getQueryParam('utm_source');
        s._utm_medium=s.Util.getQueryParam('utm_medium');
        s._utm_content=s.Util.getQueryParam('utm_content');
        s._utm_campaign=s.Util.getQueryParam('utm_campaign');
        s.campaign=s._utm_source + "|" + s._utm_medium + "|" + s._utm_content + "|" + s._utm_campaign;
        if(s.campaign === "|||"){s.campaign = ""};
    }

  	/* track internal campaigns */
    s._internalCampaign = s.Util.getQueryParam('intcid');
    if (s._internalCampaign && s._internalCampaign.length > 0) {
        s.eVar33 = s._internalCampaign;
    }

    /* put visitor ID in prop20 for debugging purposes */
    s.prop20="D=mid";

    /* page depth for conversion events	*/
    s.eVar37="+1";

    /* header-based variables */
    s.pageUrl=document.location.href;
    if(s.pageUrl.indexOf("?")>0){
        s.pageUrl=s.pageUrl.split("?");
    } else {
        s.pageUrl=s.pageUrl.split("#");
    }
    s.prop7=s.pageUrl[0];
    s.prop6=s.pageUrl[1] ? s.pageUrl[1] : '';
    s.eVar5="D=c7";
    s.eVar4="D=c6";
	
    /* copy page name to eVar */
    if(!s.eVar7)
    s.eVar7 = s.pageName ? s.pageName : '';
	
	/* previous page name */
    s.eVar6=s.getPreviousValue(s.pageName,'gpv_v6','');

	/* Page Title */
    if(!s.prop22){s.prop22 = document.title;}
    if(s.prop22){s.eVar55="D=c22";}

    /* time parting */
    var tpA = s.getTimeParting('n','-8'); /* "-8" = pacific time */
    tpA = tpA.split('|');
    s.eVar12=tpA[0] + "/" + tpA[1] + "/" + tpA[2] + " " + tpA[3]; /* time stamp to help with debugging order information */

    /* clicked element tracking */
    s.hbx_lt = "auto";
    s.setupLinkTrack(",,prop13,","hbx_lt");

	/* performance timing */
	s.performanceTiming();

    /* audience manager segment */
    s.list1=s.getAamSegments('aamsc','aam_sc');

    /* List of Chegg Experiments from exp cookie */
    s.list2=decodeURIComponent(s.c_r('exp'));

    /* AppMeasurement code version */
    s.prop75=s_code_version + "|" + s.version;
    try { /* try/catch statements in case DTM or visitor API information isn't available on page load */
      s.prop75 += "|" + s.visitor.version;
    } catch(e) {
        s.prop75+="|No MCID API";}
    try {
        s.prop75+="|" + _satellite.buildDate;
    } catch(e) {
        s.prop75+="|No DTM Build Date";}
    try {
        var idState = s.visitor.isClientSideMarketingCloudVisitorID();
        if (idState == null) {
            s.prop75+="|Existing ID";
        } else {
            s.prop75+= idState ? "|Client Side ID" : "|Server Side ID";
        }
    } catch(e) {
        s.prop75+="|Unknown ID state";}
      
    /*  NATIVE TO WEB VIEW VISITOR ID TRACKING */
    if (s.Util.getQueryParam("appvi")) {
        s.new_vi_date=new Date;
        s.new_vi_date.setFullYear(s.new_vi_date.getFullYear() + 5);
        s.c_w("app_vi",s.Util.getQueryParam("appvi"),s.new_vi_date);
        s.visitorID=s.c_r("app_vi");
        s.visitor.setAnalyticsVisitorID(s.c_r("app_vi"));
    }
    else if (s.c_r("app_vi")) {
        s.visitorID=s.c_r("app_vi");
        s.visitor.setAnalyticsVisitorID(s.c_r("app_vi"));
    }

    /* Audience Manager */
    s.AudienceManagement.setup({
        "partner": "chegginc",
        "containerNSID": 0,
        "uuidCookie": {
            "name":"aam_uuid",
            "days":30 }
    });
    
     // BU Visit Metrics
    if (typeof digitalData.page != "undefined" &&
        typeof digitalData.page.category != "undefined" &&
        typeof digitalData.page.category.subCategory2 != "undefined") {

        /* identify 1st page view to vertical per visitor */
        var pageBU = digitalData.page.category.subCategory2;
        var buFirstVisit = s.c_r("buFirstVisit");

        var firstBuPattern = new RegExp('(^|,){1}' + pageBU + '($|,){1}');
        s.linkTrackVars = s.apl(s.linkTrackVars, "eVar83,prop39", ",", 2);

        if (typeof buFirstVisit == 'undefined' ||
            firstBuPattern.test(buFirstVisit) === false) {

            // set adobe vars
            s.linkTrackVars = s.apl(s.linkTrackVars, "events", ",", 2);
            s.linkTrackEvents = s.apl(s.linkTrackEvents, "event6", ',', 2);
            s.events = s.apl(s.events, "event6", ",", 2);
            s.eVar83 = s.prop39 = pageBU + "|new";

            // update cookie
            buFirstVisit = s.apl(buFirstVisit, pageBU, ",", 2);
            s._vertExp = new Date();
            s._vertExp.setFullYear(s._vertExp.getFullYear() + 5);
            s.c_w("buFirstVisit", buFirstVisit, s._vertExp);
        } else {
            s.eVar83 = s.prop39 = pageBU + "|repeat";
        }

        /* capture entries to bu per visit */
        var buVisited = s.c_r("buVisited");
        if (typeof buVisited == 'undefined' || buVisited.indexOf(pageBU) == -1) {

            s.linkTrackVars = s.apl(s.linkTrackVars, "events", ",", 2);
            s.linkTrackEvents = s.apl(s.linkTrackEvents, "event74", ',', 2);
            s.events = s.apl(s.events, "event74", ",", 2);

            buVisited = s.apl(buVisited, pageBU, ",", 2);
            s.c_w("buVisited", buVisited);
        }
    } // end bu visit metrics
} /* s_doPlugins End */

// set timestamp only if reporting app
if (document.location.href.indexOf('is_in_app') != -1) {
    s.timestamp=Math.round((new Date()).getTime()/1000);
}

s.doPlugins=s_doPlugins;


/*
  put modules and plugin functions here to be referenced elsewhere in the code file
*/
/*
  Gets the AAM segments out of a cookie. Requires replace (repl) */
s.getAamSegments=new Function("a","b",""
+"var s=this;var c=s.c_r(a);if(c){c=s.repl(c,b+'=','');}ret"
+"urn c");
/*
  Plugin: setupLinkTrack v3.15AM */
s.setupLinkTrack=new Function("vl","c","e",""
+"var s=this;var cv=s.c_r(c);if(vl){var vla=vl.split(',');}if(cv!='')"
+"{var cva=s.split(cv,'^^');if(cva[1]!=''){for(x in vla){s[vla[x]]=cv"
+"a[x];if(e){s.events=s.apl(s.events,e,',',2);}}}}s.c_w(c,'',0);if(ty"
+"peof s.linkObject!='undefined'&&s.hbx_lt!='manual'){s.lta=[];if(typ"
+"eof s.pageName!='undefined')s.lta[0]=s.pageName;if(typeof s.linkObj"
+"ect!=null){slo=s.linkObject;if(s.linkObject!=0){if(s.linkObject.get"
+"Attribute('name')!=null){var b=s.linkObject.getAttribute('name');if"
+"(b.indexOf('&lpos=')>-1){s.lta[3]=b.match('\&lpos\=([^\&]*)')[1];}i"
+"f(b.indexOf('&lid=')>-1){s.lta[1]=b.match('\&lid\=([^\&]*)')[1];}}}"
+"if(typeof s.lta[1]=='undefined'){if(s.linkName!=0){s.lta[1]=s.linkN"
+"ame;}else if(s.linkObject!=0){if(s.cleanStr(s.linkObject.innerHTML)"
+".length>0){s.lta[1]=s.cleanStr(s.linkObject.innerHTML);}else if(s.l"
+"inkObject.innerHTML.indexOf('<img')>-1){s.lta[1]=s.linkObject.inner"
+"HTML.match('alt=\"([^\"]*)')[1];if(!s.lta[1]){s.lta[1]=s.linkObject.i"
+"nnerHTML.match('src=\"([^\"]*)')[1]}}else{s.lta[1]=s.linkObject.inner"
+"HTML;}}}try{if(typeof s.trackLinkModule(s.linkObject)!='undefined')"
+"{s.lta[3]=s.trackLinkModule(s.linkObject);}}catch(e){}if(s.lta[1]!="
+"null&&typeof s.lta[1]!='undefined'){if(typeof s.pageName!='undefine"
+"d')s.lta[0]=s.pageName;s.lta[2]=s.pageName+' | '+s.lta[1];}}if(s.li"
+"nkType!=0){for(var x=0;x<vla.length;x++){s[vla[x]]=s.cleanStr(s.lta"
+"[x]);if(e){s.events=s.apl(s.events,e,',',2);s.linkTrackVars=s.apl(s"
+".linkTrackVars,'events',',',2);}}s.linkTrackVars=s.apl(s.linkTrackV"
+"ars,vl,',',2);}else{if(s.lta[1]){var tcv='';for(var x=0;x<s.lta.len"
+"gth;x++){tcv+=s.cleanStr(s.lta[x])+'^^'}s.c_w(c,tcv)}}s.lta=null;}");
s.cleanStr = function(a){
    if(typeof a != 'undefined'){
        if(typeof a == "string"){
            a = a.replace(/<\/?[^>]+(>|$)/g, '');
            a = a.replace(/^\s+|\s+$/g,'');
            a = a.replace(/[\u2018\u2019\u201A]/g, "\'");
            return a;
        }
    }
}
/*
  Plugin: getTimeParting 3.4a - modified to return date stamp */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z)); dd=d.getDate();mm = d.getMonth()+1;yyyy = d.getFullYear();H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(mm+'|'+dd+'|'+yyyy+'|'+tm+'|'+D);}");
/*
  Plugin: getTimeToComplete, v2.0 (minified) */
s.getTimeToComplete=function(e,t,o,i){var n,a,l,r,s,c,f=this,m=5,T=new Date,u=86400,d=3600,g=60,h=i?"undefined"!=typeof _satellite.notify?_satellite.notify:console.log:function(e){};if(e=e?e.toLowerCase():"start",t=t?t:"gttc",o=o?o:0,h("--- getTimeToComplete ---"),"object"==typeof f.Util)s=f.Util.cookieWrite,c=f.Util.cookieRead;else{if("undefined"==typeof f.c_w)return void h('		Unable to read the getTimeToComplete cookie "'+t+'"');s=function(e,t,o){return f.c_w(e,t,o)},c=function(e){return f.c_r(e)}}if(r=c(t),h("		action (v) = "+e),h("		cookieName (cn) = "+t),h("		cookieValue (cv) = "+r),h("		expiration (e) = "+o),"start"===e){if(!r)return void s(t,T.getTime(),o?new Date(T.getTime()+864e5*o):0);h('		The getTimeToComplete cookie already exists. To fix the problem, call the "stop" action to delete the cookie, then call "start" again')}if("stop"===e){if(r)return e=Math.round((T.getTime()-r)/1e3),e>u?(n=u,a="days"):e>d?(n=d,a="hours"):e>g?(m=2,n=g,a="minutes"):(n=1,a="seconds"),h(["		v is "+e," r is "+m," u is "+n].join(",")),e=e*m/n,l=Math.round(e)/m+" "+a,0===l.indexOf("1 ")&&(l=l.substring(0,l.length-1)),s(t,"",new Date(T.getTime()-r)),h("		TimeToComplete = "+l),l;h('		The getTimeToComplete cookie does not exist. To fix the problem, call the "start" action first, then call "stop" again.')}};
/*
  Plugin: getPreviousValue v1.0 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
  Plugin: getValOnce_v1.1 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");
/*
  Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
  Plugin Utility: apl v1.1 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");
/*
  Utility Function: split v1.5 (JS 1.0 compatible) */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
  Cookie Combining Utility v.5 */                   
if(!s.__ccucr){
    s.c_rr = s.c_r;
    s.__ccucr = true;
    function c_r(k){
        var s = this, d = new Date, v = s.c_rr(k), c = s.c_rspers(), i, m, e;
        if(v) return v; k = s.escape ? s.escape(k) : encodeURIComponent(k);
        i = c.indexOf(' ' + k + '='); c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i);
        e = i < 0 ? i : c.indexOf(';', i); m = m > 0 ? m : e;
        v = i < 0 ? '' : s.unescape ? s.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        return v;
    }
    function c_rspers(){
        var s = this, cv = s.c_rr("s_pers"), date = new Date().getTime(), expd = null, cvarr = [], vcv = "";
        if(!cv) return vcv; cvarr = cv.split(";"); for(var i = 0, l = cvarr.length; i < l; i++)  { expd = cvarr[i].match(/\|([0-9]+)$/);
        if(expd && parseInt(expd[1]) >= date) { vcv += cvarr[i] + ";"; } } return vcv;
    }
    s.c_rspers = c_rspers;
    s.c_r = s.cookieRead = c_r;
}
if(!s.__ccucw){
    s.c_wr = s.c_w;
    s.__ccucw = true;
    function c_w(k, v, e){
        var s = this, d = new Date, ht = 0, pn = 's_pers', sn = 's_sess', pc = 0, sc = 0, pv, sv, c, i, t, f;
        d.setTime(d.getTime() - 60000); if(s.c_rr(k)) s.c_wr(k, '', d); k = s.escape ? s.escape(k) : encodeURIComponent(k);
        pv = s.c_rspers(); i = pv.indexOf(' ' + k + '='); if(i > -1) { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; }
        sv = s.c_rr(sn); i = sv.indexOf(' ' + k + '='); if(i > -1) { sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
        sc = 1; } d = new Date; if(e) { if(e == 1) e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
        if(e.getTime() > d.getTime()) {  pv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + '|' + e.getTime() + ';';
        pc = 1; } } else { sv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + ';';
        sc = 1; } sv = sv.replace(/%00/g, ''); pv = pv.replace(/%00/g, ''); if(sc) s.c_wr(sn, sv, 0);
        if(pc) { t = pv; while(t && t.indexOf(';') != -1) { var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
        t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht; } d.setTime(ht); s.c_wr(pn, pv, d); }
        return v == s.c_r(s.unescape ? s.unescape(k) : decodeURIComponent(k));
    }
    s.c_w = s.cookieWrite = c_w;
}

/*
  Utility: AppMeasurement Compatibility v1.1
  Define deprecated H-code s properties and methods used by legacy plugins */
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");
/*
  Plugin Utility: Replace v1.0 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/* Plugin: Performance Timing Tracking - 0.11 BETA */
s.performanceTiming=new Function("v",""
+"var s=this;if(v)s.ptv=v;if(typeof performance!='undefined'){if(perf"
+"ormance.timing.loadEventEnd==0){s.pi=setInterval(function(){s.perfo"
+"rmanceWrite()},250);}if(!s.ptc||s.linkType=='e'){s.performanceRead("
+");}else{s.rfe();s[s.ptv]='';}}");
s.performanceWrite=new Function("",""
+"var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi)"
+";try{if(s.c_r('s_ptc')==''&&performance.timing.loadEventEnd>0){try{"
+"var pt=performance.timing;var pta='';pta=s.performanceCheck(pt.fetc"
+"hStart,pt.navigationStart);pta+='^^'+s.performanceCheck(pt.domainLo"
+"okupStart,pt.fetchStart);pta+='^^'+s.performanceCheck(pt.domainLook"
+"upEnd,pt.domainLookupStart);pta+='^^'+s.performanceCheck(pt.connect"
+"End,pt.connectStart);pta+='^^'+s.performanceCheck(pt.responseStart,"
+"pt.connectEnd);pta+='^^'+s.performanceCheck(pt.responseEnd,pt.respo"
+"nseStart);pta+='^^'+s.performanceCheck(pt.loadEventStart,pt.domLoad"
+"ing);pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.loadEventStart"
+");pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.navigationStart);"
+"s.c_w('s_ptc',pta);if(sessionStorage&&navigator.cookieEnabled&&s.pt"
+"v!='undefined'){var pe=performance.getEntries();var tempPe='';for(v"
+"ar i=0;i<pe.length;i++){tempPe+='!';tempPe+=pe[i].name.indexOf('?')"
+">-1?pe[i].name.split('?')[0]:pe[i].name;tempPe+='|'+(Math.round(pe["
+"i].startTime)/1000).toFixed(1)+'|'+(Math.round(pe[i].duration)/1000"
+").toFixed(1)+'|'+pe[i].initiatorType;}sessionStorage.setItem('s_pec"
+"',tempPe);}}catch(err){return;}}}catch(err){return;}");
s.performanceCheck=new Function("a","b",""
+"if(a>=0&&b>=0){if((a-b)<60000&&((a-b)>=0)){return((a-b)/1000).toFix"
+"ed(2);}else{return 600;}}");
s.performanceRead=new Function("",""
+"var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi)"
+";var cv=s.c_r('s_ptc');if(s.pte){var ela=s.pte.split(',');}if(cv!='"
+"'){var cva=s.split(cv,'^^');if(cva[1]!=''){for(var x=0;x<(ela.lengt"
+"h-1);x++){s.events=s.apl(s.events,ela[x]+'='+cva[x],',',2);}}s.even"
+"ts=s.apl(s.events,ela[ela.length-1],',',2);}s.linkTrackEvents=s.apl"
+"(s.linkTrackEvents,s.pte,',',2);s.c_w('s_ptc','',0);if(sessionStora"
+"ge&&navigator.cookieEnabled&&s.ptv!='undefined'){s[s.ptv]=sessionSt"
+"orage.getItem('s_pec');sessionStorage.setItem('s_pec','',0);}else{s"
+"[s.ptv]='sessionStorage Unavailable';}s.ptc=true;");
/* Remove from Events 0.1 - Performance Specific, 
removes all performance events from s.events once being tracked. */
s.rfe=new Function("",""
+"var s=this;var ea=s.split(s.events,',');var pta=s.split(s.pte,',');"
+"try{for(x in pta){s.events=s.rfl(s.events,pta[x]);s.contextData['ev"
+"ents']=s.events;}}catch(e){return;}");
/* Plugin Utility - RFL (remove from list) 1.0*/
s.rfl=new Function("l","v","d1","d2","ku",""
+"var s=this,R=new Array(),C='',d1=!d1?',':d1,d2=!d2?',':d2,ku=!ku?0:"
+"1;if(!l)return'';L=l.split(d1);for(i=0;i<L.length;i++){if(L[i].inde"
+"xOf(':')>-1){C=L[i].split(':');C[1]=C[0]+':'+C[1];L[i]=C[0];}if(L[i"
+"].indexOf('=')>-1){C=L[i].split('=');C[1]=C[0]+'='+C[1];L[i]=C[0];}"
+"if(L[i]!=v&&C)R.push(C[1]);else if(L[i]!=v)R.push(L[i]);else if(L[i"
+"]==v&&ku){ku=0;if(C)R.push(C[1]);else R.push(L[i]);}C='';}return s."
+"join(R,{delim:d2})");

/* 
  WARNING: Changing any of the below variables will cause drastic changes to how
  your visitor data is collected.  
  Changes should only be made when instructed to do so by your Adobe Consultant.
*/
s.trackingServer=s.trackingServer ? s.trackingServer : "adobetp.chegg.com";
s.trackingServerSecure=s.trackingServerSecure ? s.trackingServerSecure : "adobetps.chegg.com";

/************************** CORE APPMEASUREMENT CODE *****************************
 This is the core code that powers Analytics. Don't make changes.
 *********************************************************************************/
 
s.loadModule("AudienceManagement");
/*
  Audience Manager AppMeasurement code v2.2.0
  This is the AAM code that powers Audience Manager. Don't make changes.
*/
function AppMeasurement_Module_AudienceManagement(d){var a=this;a.s=d;var b=window;b.s_c_in||(b.s_c_il=[],b.s_c_in=0);a._il=b.s_c_il;a._in=b.s_c_in;a._il[a._in]=a;b.s_c_in++;a._c="s_m";a.setup=function(c){b.DIL&&c&&(c.disableDefaultRequest=!0,c.disableScriptAttachment=!0,c.disableCORS=!0,c.secureDataCollection=!1,a.instance=b.DIL.create(c),a.tools=b.DIL.tools)};a.isReady=function(){return a.instance?!0:!1};a.getEventCallConfigParams=function(){return a.instance&&a.instance.api&&a.instance.api.getEventCallConfigParams?
a.instance.api.getEventCallConfigParams():{}};a.passData=function(b){a.instance&&a.instance.api&&a.instance.api.passData&&a.instance.api.passData(b)}}
"function"!==typeof window.DIL&&(window.DIL=function(a,c){var e=[],b,h;a!==Object(a)&&(a={});var g,k,q,m,r,n,x,E,t,A,L,B,C,F;g=a.partner;k=a.containerNSID;q=!!a.disableDestinationPublishingIframe;m=a.iframeAkamaiHTTPS;r=a.mappings;n=a.uuidCookie;x=!0===a.enableErrorReporting;E=a.visitorService;t=a.declaredId;A=!0===a.removeFinishedScriptsAndCallbacks;L=!0===a.delayAllUntilWindowLoad;B=!0===a.disableIDSyncs;C="undefined"===typeof a.secureDataCollection||!0===a.secureDataCollection;F=!0===a.useCORSOnly;
var M,N,I,G,O,P,Q,R;M=!0===a.disableScriptAttachment;N=!0===a.disableDefaultRequest;I=a.afterResultForDefaultRequest;G=a.dpIframeSrc;O=!0===a.testCORS;P=!0===a.useJSONPOnly;Q=a.visitorConstructor;R=!0===a.disableCORS;x&&DIL.errorModule.activate();var T=!0===window._dil_unit_tests;(b=c)&&e.push(b+"");if(!g||"string"!==typeof g)return b="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:b,filename:"dil.js"}),Error(b);b="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";
if(k||"number"===typeof k)k=parseInt(k,10),!isNaN(k)&&0<=k&&(b="");b&&(k=0,e.push(b),b="");h=DIL.getDil(g,k);if(h instanceof DIL&&h.api.getPartner()===g&&h.api.getContainerNSID()===k)return h;if(this instanceof DIL)DIL.registerDil(this,g,k);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+g+" and containerNSID = "+k);var y={IS_HTTPS:C||"https:"===document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC",
MILLIS_PER_DAY:864E5,DIL_COOKIE_NAME:"AAMC_"+encodeURIComponent(g)+"_"+k,FIRST_PARTY_SYNCS:"AMSYNCS",FIRST_PARTY_SYNCS_ON_PAGE:"AMSYNCSOP"},J={stuffed:{}},v={},p={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],
num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:k+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,VisitorAPI:null,instance:null,releaseType:"no VisitorAPI",isOptedOut:!0,isOptedOutCallbackCalled:!1,admsProcessingStarted:!1,process:function(d){try{if(!this.admsProcessingStarted){this.admsProcessingStarted=
!0;var l=this,s,f,a,b;if("function"===typeof d&&"function"===typeof d.getInstance){if(E===Object(E)&&(s=E.namespace)&&"string"===typeof s)f=d.getInstance(s,{idSyncContainerID:k});else{this.releaseType="no namespace";this.releaseRequests();return}if(f===Object(f)&&f instanceof d&&"function"===typeof f.isAllowed&&"function"===typeof f.getMarketingCloudVisitorID&&"function"===typeof f.getCustomerIDs&&"function"===typeof f.isOptedOut){this.VisitorAPI=d;if(!f.isAllowed()){this.releaseType="VisitorAPI not allowed";
this.releaseRequests();return}this.instance=f;a=function(d){"VisitorAPI"!==l.releaseType&&(l.mid=d,l.releaseType="VisitorAPI",l.releaseRequests())};b=f.getMarketingCloudVisitorID(a);if("string"===typeof b&&b.length){a(b);return}setTimeout(function(){"VisitorAPI"!==l.releaseType&&(l.releaseType="timeout",l.releaseRequests())},this.getLoadTimeout());return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(e){this.releaseRequests()}},releaseRequests:function(){this.calledBack=
!0;p.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var d=w.isPopulatedString,l=this.getMarketingCloudVisitorID();d(this.mid)&&this.mid===l||(this.mid=l);return d(this.mid)?"d_mid="+this.mid+"&":""},getCustomerIDs:function(){return this.instance?this.instance.getCustomerIDs():null},getCustomerIDsQueryString:function(d){if(d===Object(d)){var l="",s=[],f=[],a,b;for(a in d)d.hasOwnProperty(a)&&
(f[0]=a,b=d[a],b===Object(b)&&(f[1]=b.id||"",f[2]=b.authState||0,s.push(f),f=[]));if(f=s.length)for(d=0;d<f;d++)l+="&d_cid_ic="+u.encodeAndBuildRequest(s[d],"%01");return l}return""},getIsOptedOut:function(){this.instance?this.instance.isOptedOut([this,this.isOptedOutCallback],this.VisitorAPI.OptOut.GLOBAL,!0):(this.isOptedOut=!1,this.isOptedOutCallbackCalled=!0)},isOptedOutCallback:function(d){this.isOptedOut=d;this.isOptedOutCallbackCalled=!0;p.registerRequest()},getLoadTimeout:function(){var d=
this.instance;if(d){if("function"===typeof d.getLoadTimeout)return d.getLoadTimeout();if("undefined"!==typeof d.loadTimeout)return d.loadTimeout}return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(d,l){var s=w.isPopulatedString,f=encodeURIComponent;if(d===Object(d)&&s(l)){var a=d.dpid,b=d.dpuuid,e=null;if(s(a)&&s(b)){e=f(a)+"$"+f(b);if(!0===this.declaredIdCombos[e])return"setDeclaredId: combo exists for type '"+
l+"'";this.declaredIdCombos[e]=!0;this.declaredId[l]={dpid:a,dpuuid:b};return"setDeclaredId: succeeded for type '"+l+"'"}}return"setDeclaredId: failed for type '"+l+"'"},getDeclaredIdQueryString:function(){var d=this.declaredId.request,l=this.declaredId.init,a=encodeURIComponent,f="";null!==d?f="&d_dpid="+a(d.dpid)+"&d_dpuuid="+a(d.dpuuid):null!==l&&(f="&d_dpid="+a(l.dpid)+"&d_dpuuid="+a(l.dpuuid));return f}},registerRequest:function(d){var l=this.firingQueue;d===Object(d)&&l.push(d);this.firing||
!l.length||L&&!DIL.windowLoaded||(this.adms.isOptedOutCallbackCalled||this.adms.getIsOptedOut(),this.adms.calledBack&&!this.adms.isOptedOut&&this.adms.isOptedOutCallbackCalled&&(this.adms.isOptedOutCallbackCalled=!1,d=l.shift(),d.src=d.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),w.isPopulatedString(d.corsPostData)&&(d.corsPostData=d.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),D.fireRequest(d),this.firstRequestHasFired||
"script"!==d.tag&&"cors"!==d.tag||(this.firstRequestHasFired=!0)))},processVisitorAPI:function(){this.adms.process(Q||window.Visitor)},requestRemoval:function(d){if(!A)return"removeFinishedScriptsAndCallbacks is not boolean true";var l=this.toRemove,a,f;d===Object(d)&&(a=d.script,f=d.callbackName,(a===Object(a)&&"SCRIPT"===a.nodeName||"no script created"===a)&&"string"===typeof f&&f.length&&l.push(d));if(this.readyToRemove&&l.length){f=l.shift();a=f.script;f=f.callbackName;"no script created"!==a?
(d=a.src,a.parentNode.removeChild(a)):d=a;window[f]=null;try{delete window[f]}catch(b){}this.removed.push({scriptSrc:d,callbackName:f});DIL.variables.scriptsRemoved.push(d);DIL.variables.callbacksRemoved.push(f);return this.requestRemoval()}return"requestRemoval() processed"}};h=function(){var d="http://fast.",l="?d_nsid="+k+"#"+encodeURIComponent(document.location.href);if("string"===typeof G&&G.length)return G+l;y.IS_HTTPS&&(d=!0===m?"https://fast.":"https://");return d+g+".demdex.net/dest5.html"+
l};var z={THROTTLE_START:3E4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:"destination_publishing_iframe_"+g+"_"+k,url:h(),onPagePixels:[],iframeHost:null,getIframeHost:function(d){if("string"===typeof d){var l=d.split("/");if(3<=l.length)return l[0]+"//"+l[2];e.push("getIframeHost: url is malformed: "+d);return d}},iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:y.POST_MESSAGE_ENABLED?15:100,ibsDeleted:[],jsonWaiting:[],jsonProcessed:[],
canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,newIframeCreated:null,iframeIdChanged:!1,originalIframeHasLoadedAlready:null,attachIframe:function(){function d(){f=document.createElement("iframe");f.sandbox="allow-scripts allow-same-origin";f.title="Adobe ID Syncing iFrame";f.id=a.id;f.style.cssText="display: none; width: 0; height: 0;";f.src=a.url;a.newIframeCreated=!0;l();document.body.appendChild(f)}function l(){u.addListener(f,"load",function(){f.className="aamIframeLoaded";
a.iframeHasLoaded=!0;a.requestToProcess()})}var a=this,f=document.getElementById(this.id);f?"IFRAME"!==f.nodeName?(this.id+="_2",this.iframeIdChanged=!0,d()):(this.newIframeCreated=!1,"aamIframeLoaded"!==f.className?(this.originalIframeHasLoadedAlready=!1,l()):(this.iframeHasLoaded=this.originalIframeHasLoadedAlready=!0,this.iframe=f,this.requestToProcess())):d();this.iframe=f},requestToProcess:function(d,l){var a=this;d&&!w.isEmptyObject(d)&&this.jsonWaiting.push([d,l]);if((this.receivedThirdPartyCookiesNotification||
!y.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var f=this.jsonWaiting.shift();this.process(f[0],f[1]);this.requestToProcess()}this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){a.messageSendingInterval=y.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},processSyncOnPage:function(d){var l,a,f;if((l=d.ibs)&&l instanceof Array&&(a=l.length))for(d=
0;d<a;d++)f=l[d],f.syncOnPage&&this.checkFirstPartyCookie(f,"","syncOnPage")},process:function(d,l){var a=encodeURIComponent,f,b,e,c,g,h;l===Object(l)&&(h=u.encodeAndBuildRequest(["",l.dpid||"",l.dpuuid||""],","));if((f=d.dests)&&f instanceof Array&&(b=f.length))for(e=0;e<b;e++)c=f[e],g=[a("dests"),a(c.id||""),a(c.y||""),a(c.c||"")],this.addMessage(g.join("|"));if((f=d.ibs)&&f instanceof Array&&(b=f.length))for(e=0;e<b;e++)c=f[e],g=[a("ibs"),a(c.id||""),a(c.tag||""),u.encodeAndBuildRequest(c.url||
[],","),a(c.ttl||""),"",h,c.fireURLSync?"true":"false"],c.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(g.join("|")):c.fireURLSync&&this.checkFirstPartyCookie(c,g.join("|")));if((f=d.dpcalls)&&f instanceof Array&&(b=f.length))for(e=0;e<b;e++)c=f[e],g=c.callback||{},g=[g.obj||"",g.fn||"",g.key||"",g.tag||"",g.url||""],g=[a("dpm"),a(c.id||""),a(c.tag||""),u.encodeAndBuildRequest(c.url||[],","),a(c.ttl||""),u.encodeAndBuildRequest(g,","),h],this.addMessage(g.join("|"));this.jsonProcessed.push(d)},
checkFirstPartyCookie:function(d,a,s){var f=(s="syncOnPage"===s?!0:!1)?y.FIRST_PARTY_SYNCS_ON_PAGE:y.FIRST_PARTY_SYNCS,b=this.getOnPageSyncData(f),c=!1,e=!1,g=Math.ceil((new Date).getTime()/y.MILLIS_PER_DAY);b?(b=b.split("*"),e=this.pruneSyncData(b,d.id,g),c=e.dataPresent,e=e.dataValid,c&&e||this.fireSync(s,d,a,b,f,g)):(b=[],this.fireSync(s,d,a,b,f,g))},getOnPageSyncData:function(d){var a=p.adms.instance;return a&&"function"===typeof a.idSyncGetOnPageSyncInfo?a.idSyncGetOnPageSyncInfo():u.getDilCookieField(d)},
pruneSyncData:function(d,a,b){var f=!1,e=!1,c,g,h;if(d instanceof Array)for(g=0;g<d.length;g++)c=d[g],h=parseInt(c.split("-")[1],10),c.match("^"+a+"-")?(f=!0,b<h?e=!0:(d.splice(g,1),g--)):b>=h&&(d.splice(g,1),g--);return{dataPresent:f,dataValid:e}},manageSyncsSize:function(d){if(d.join("*").length>this.MAX_SYNCS_LENGTH)for(d.sort(function(d,a){return parseInt(d.split("-")[1],10)-parseInt(a.split("-")[1],10)});d.join("*").length>this.MAX_SYNCS_LENGTH;)d.shift()},fireSync:function(d,a,b,f,e,c){function g(d,
a,l,f){return function(){h.onPagePixels[d]=null;var b=h.getOnPageSyncData(l),e=[];if(b){var b=b.split("*"),c,s,g;c=0;for(s=b.length;c<s;c++)g=b[c],g.match("^"+a.id+"-")||e.push(g)}h.setSyncTrackingData(e,a,l,f)}}var h=this;if(d){if("img"===a.tag){d=a.url;b=y.IS_HTTPS?"https:":"http:";var k,n,t;f=0;for(k=d.length;f<k;f++){n=d[f];t=/^\/\//.test(n);var p=new Image;u.addListener(p,"load",g(this.onPagePixels.length,a,e,c));p.src=(t?b:"")+n;this.onPagePixels.push(p)}}}else this.addMessage(b),this.setSyncTrackingData(f,
a,e,c)},addMessage:function(d){var a=encodeURIComponent,a=x?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+d)},setSyncTrackingData:function(d,a,b,f){d.push(a.id+"-"+(f+Math.ceil(a.ttl/60/24)));this.manageSyncsSize(d);u.setDilCookieField(b,d.join("*"))},sendMessages:function(){var d=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){d.sendMessages()},this.messageSendingInterval)):
this.sendingMessages=!1},receiveMessage:function(d){var a=/^---destpub-to-parent---/;"string"===typeof d&&a.test(d)&&(a=d.replace(a,"").split("|"),"canSetThirdPartyCookies"===a[0]&&(this.canSetThirdPartyCookies="true"===a[1]?!0:!1,this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(d))}},K={traits:function(d){w.isValidPdata(d)&&(v.sids instanceof Array||(v.sids=[]),u.extendArray(v.sids,d));return this},pixels:function(d){w.isValidPdata(d)&&(v.pdata instanceof
Array||(v.pdata=[]),u.extendArray(v.pdata,d));return this},logs:function(d){w.isValidLogdata(d)&&(v.logdata!==Object(v.logdata)&&(v.logdata={}),u.extendObject(v.logdata,d));return this},customQueryParams:function(d){w.isEmptyObject(d)||u.extendObject(v,d,p.reservedKeys);return this},signals:function(d,a){var b,f=d;if(!w.isEmptyObject(f)){if(a&&"string"===typeof a)for(b in f={},d)d.hasOwnProperty(b)&&(f[a+b]=d[b]);u.extendObject(v,f,p.reservedKeys)}return this},declaredId:function(d){p.declaredId.setDeclaredId(d,
"request");return this},result:function(d){"function"===typeof d&&(v.callback=d);return this},afterResult:function(d){"function"===typeof d&&(v.postCallbackFn=d);return this},useImageRequest:function(){v.useImageRequest=!0;return this},clearData:function(){v={};return this},submit:function(){D.submitRequest(v);v={};return this},getPartner:function(){return g},getContainerNSID:function(){return k},getEventLog:function(){return e},getState:function(){var d={},l={};u.extendObject(d,p,{callbackPrefix:!0,
useJSONP:!0,registerRequest:!0});u.extendObject(l,z,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{initConfig:a,pendingRequest:v,otherRequestInfo:d,destinationPublishingInfo:l}},idSync:function(d){if(B)return"Error: id syncs have been disabled";if(d!==Object(d)||"string"!==typeof d.dpid||!d.dpid.length)return"Error: config or config.dpid is empty";if("string"!==typeof d.url||!d.url.length)return"Error: config.url is empty";var a=d.url,b=d.minutesToLive,f=encodeURIComponent,
c,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"===typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";c=u.encodeAndBuildRequest(["",d.dpid,d.dpuuid||""],",");d=["ibs",f(d.dpid),"img",f(a),b,"",c];z.addMessage(d.join("|"));p.firstRequestHasFired&&z.requestToProcess();return"Successfully queued"},aamIdSync:function(d){if(B)return"Error: id syncs have been disabled";if(d!==Object(d)||"string"!==typeof d.dpuuid||!d.dpuuid.length)return"Error: config or config.dpuuid is empty";
d.url="//dpm.demdex.net/ibs:dpid="+d.dpid+"&dpuuid="+d.dpuuid;return this.idSync(d)},passData:function(d){if(w.isEmptyObject(d))return"Error: json is empty or not an object";z.ibsDeleted.push(d.ibs);delete d.ibs;D.defaultCallback(d);return d},getPlatformParams:function(){return p.platformParams},getEventCallConfigParams:function(){var d=p,a=d.modStatsParams,b=d.platformParams,f;if(!a){a={};for(f in b)b.hasOwnProperty(f)&&!d.nonModStatsParams[f]&&(a[f.replace(/^d_/,"")]=b[f]);d.modStatsParams=a}return a}},
D={corsMetadata:function(){var d="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?d="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?d="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:d,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===
this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(d){p.registerRequest(D.createQueuedRequest(d));return!0},createQueuedRequest:function(d){var a=p,b,f=d.callback,c="img",e;if(!w.isEmptyObject(r)){var g,h,n;for(g in r)r.hasOwnProperty(g)&&(h=r[g],null!=h&&""!==h&&g in d&&!(h in d||h in p.reservedKeys)&&(n=d[g],null!=n&&""!==n&&(d[h]=n)))}w.isValidPdata(d.sids)||(d.sids=[]);w.isValidPdata(d.pdata)||(d.pdata=[]);w.isValidLogdata(d.logdata)||(d.logdata={});
d.logdataArray=u.convertObjectToKeyValuePairs(d.logdata,"=",!0);d.logdataArray.push("_ts="+(new Date).getTime());"function"!==typeof f&&(f=this.defaultCallback);a.useJSONP=!0!==d.useImageRequest;a.useJSONP&&(c="script",b=a.callbackPrefix+"_"+k+"_"+(new Date).getTime());a=this.makeRequestSrcData(d,b);P&&!F||!(e=this.getCORSInstance())||(c="cors");return{tag:c,src:a.src,corsSrc:a.corsSrc,internalCallbackName:b,callbackFn:f,postCallbackFn:d.postCallbackFn,useImageRequest:!!d.useImageRequest,requestData:d,
corsInstance:e,corsPostData:a.corsPostData}},defaultCallback:function(d,a){z.processSyncOnPage(d);var b,f,c,e,g,h,k,t,x;if((b=d.stuff)&&b instanceof Array&&(f=b.length))for(c=0;c<f;c++)if((e=b[c])&&e===Object(e)){g=e.cn;h=e.cv;k=e.ttl;if("undefined"===typeof k||""===k)k=Math.floor(u.getMaxCookieExpiresInMinutes()/60/24);t=e.dmn||"."+document.domain.replace(/^www\./,"");x=e.type;g&&(h||"number"===typeof h)&&("var"!==x&&(k=parseInt(k,10))&&!isNaN(k)&&u.setCookie(g,h,1440*k,"/",t,!1),J.stuffed[g]=h)}b=
d.uuid;w.isPopulatedString(b)&&!w.isEmptyObject(n)&&(f=n.path,"string"===typeof f&&f.length||(f="/"),c=parseInt(n.days,10),isNaN(c)&&(c=100),u.setCookie(n.name||"aam_did",b,1440*c,f,n.domain||"."+document.domain.replace(/^www\./,""),!0===n.secure));q||p.abortRequests||z.requestToProcess(d,a)},makeRequestSrcData:function(d,a){d.sids=w.removeEmptyArrayValues(d.sids||[]);d.pdata=w.removeEmptyArrayValues(d.pdata||[]);var b=p,f=b.platformParams,c=u.encodeAndBuildRequest(d.sids,","),e=u.encodeAndBuildRequest(d.pdata,
","),h=(d.logdataArray||[]).join("&");delete d.logdataArray;var n=y.IS_HTTPS?"https://":"http://",t=b.declaredId.getDeclaredIdQueryString(),x=b.adms.instance?b.adms.getCustomerIDsQueryString(b.adms.getCustomerIDs()):"",m;m=[];var r,q,v,A;for(r in d)if(!(r in b.reservedKeys)&&d.hasOwnProperty(r))if(q=d[r],r=encodeURIComponent(r),q instanceof Array)for(v=0,A=q.length;v<A;v++)m.push(r+"="+encodeURIComponent(q[v]));else m.push(r+"="+encodeURIComponent(q));m=m.length?"&"+m.join("&"):"";c="d_nsid="+f.d_nsid+
t+x+(c.length?"&d_sid="+c:"")+(e.length?"&d_px="+e:"")+(h.length?"&d_ld="+encodeURIComponent(h):"");f="&d_rtbd="+f.d_rtbd+"&d_jsonv="+f.d_jsonv+"&d_dst="+f.d_dst;n=n+g+".demdex.net/event";e=b=n+"?"+c+(b.useJSONP?f+"&d_cb="+(a||""):"")+m;2048<b.length&&(b=b.substring(0,2048).substring(0,b.lastIndexOf("&")));return{corsSrc:n+"?"+(O?"testcors=1&d_nsid="+k+"&":"")+"_ts="+(new Date).getTime(),src:b,originalSrc:e,corsPostData:c+f+m,isDeclaredIdCall:""!==t}},fireRequest:function(d){if("img"===d.tag)this.fireImage(d);
else{var a=p.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"===d.tag?this.fireScript(d,a):"cors"===d.tag&&this.fireCORS(d,a)}},fireImage:function(d){var a=p,c,f;a.abortRequests||(a.firing=!0,c=new Image(0,0),a.sent.push(d),c.onload=function(){a.firing=!1;a.fired.push(d);a.num_of_img_responses++;a.registerRequest()},f=function(f){b="imgAbortOrErrorHandler received the event of type "+f.type;e.push(b);a.abortRequests=!0;a.firing=!1;a.errored.push(d);
a.num_of_img_errors++;a.registerRequest()},c.addEventListener?(c.addEventListener("error",f,!1),c.addEventListener("abort",f,!1)):c.attachEvent&&(c.attachEvent("onerror",f),c.attachEvent("onabort",f)),c.src=d.src)},fireScript:function(d,a){var c=this,f=p,h,k,n=d.src,t=d.postCallbackFn,m="function"===typeof t,r=d.internalCallbackName;f.abortRequests||(f.firing=!0,window[r]=function(c){try{c!==Object(c)&&(c={});B&&(z.ibsDeleted.push(c.ibs),delete c.ibs);var h=d.callbackFn;f.firing=!1;f.fired.push(d);
f.num_of_jsonp_responses++;h(c,a);m&&t(c,a)}catch(s){s.message="DIL jsonp callback caught error with message "+s.message;b=s.message;e.push(b);s.filename=s.filename||"dil.js";s.partner=g;DIL.errorModule.handleError(s);try{h({error:s.name+"|"+s.message},a),m&&t({error:s.name+"|"+s.message},a)}catch(n){}}finally{f.requestRemoval({script:k,callbackName:r}),f.registerRequest()}},M||F?(f.firing=!1,f.requestRemoval({script:"no script created",callbackName:r})):(k=document.createElement("script"),k.addEventListener&&
k.addEventListener("error",function(a){f.requestRemoval({script:k,callbackName:r});b="jsonp script tag error listener received the event of type "+a.type+" with src "+n;c.handleScriptError(b,d)},!1),k.type="text/javascript",k.src=n,h=DIL.variables.scriptNodeList[0],h.parentNode.insertBefore(k,h)),f.sent.push(d),f.declaredId.declaredId.request=null)},fireCORS:function(d,a){var c=this,f=p,h=this.corsMetadata.corsType,k=d.corsSrc,n=d.corsInstance,t=d.corsPostData,r=d.postCallbackFn,m="function"===typeof r;
if(!f.abortRequests&&!R){f.firing=!0;try{n.open("post",k,!0),"XMLHttpRequest"===h&&(n.withCredentials=!0,n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){if(4===this.readyState&&200===this.status)a:{var h;try{if(h=JSON.parse(this.responseText),h!==Object(h)){c.handleCORSError(d,a,"Response is not JSON");break a}}catch(k){c.handleCORSError(d,a,"Error parsing response as JSON");break a}B&&(z.ibsDeleted.push(h.ibs),delete h.ibs);try{var n=d.callbackFn;
f.firing=!1;f.fired.push(d);f.num_of_cors_responses++;n(h,a);m&&r(h,a)}catch(t){t.message="DIL handleCORSResponse caught error with message "+t.message;b=t.message;e.push(b);t.filename=t.filename||"dil.js";t.partner=g;DIL.errorModule.handleError(t);try{n({error:t.name+"|"+t.message},a),m&&r({error:t.name+"|"+t.message},a)}catch(x){}}finally{f.registerRequest()}}}),n.onerror=function(){c.handleCORSError(d,a,"onerror")},n.ontimeout=function(){c.handleCORSError(d,a,"ontimeout")},n.send(t)}catch(x){this.handleCORSError(d,
a,"try-catch")}f.sent.push(d);f.declaredId.declaredId.request=null}},handleCORSError:function(d,a,b){p.num_of_cors_errors++;p.corsErrorSources.push(b);"ontimeout"===b||F||(d.tag="script",this.fireScript(d,a))},handleScriptError:function(d,a){p.num_of_jsonp_errors++;this.handleRequestError(d,a)},handleRequestError:function(d,a){var b=p;e.push(d);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.registerRequest()}},w={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?
!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,f,e=[],b=0;b<c;b++)f=a[b],"undefined"!==typeof f&&null!==f&&""!==f&&e.push(f);return e},isPopulatedString:function(a){return"string"===typeof a&&a.length}},u={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"===
typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"===typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var f=[],e,g;b||(b="=");for(e in a)a.hasOwnProperty(e)&&(g=a[e],"undefined"!==typeof g&&null!==g&&""!==g&&f.push(e+b+(c?encodeURIComponent(g):g)));return f},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===
a||null===a)throw new TypeError;var c=Object(a),f=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=Array(f),g=0;g<f;g++)g in c&&(e[g]=b.call(b,c[g],g,c));return e},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),f=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],g=0;g<f;g++)if(g in c){var h=c[g];b.call(b,h,g,c)&&e.push(h)}return e}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),
c,f,e;c=0;for(f=b.length;c<f;c++){for(e=b[c];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,c,f,e,g){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(f?";path="+f:"")+(e?";domain="+e:"")+(g?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,
b),!0):!1},extendObject:function(a,b,c){var f;if(a===Object(a)&&b===Object(b)){for(f in b)!b.hasOwnProperty(f)||!w.isEmptyObject(c)&&f in c||(a[f]=b[f]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60},getCookieField:function(a,b){var c=this.getCookie(a),f=decodeURIComponent;if("string"===typeof c){var c=c.split("|"),e,g;e=0;for(g=c.length-1;e<g;e++)if(f(c[e])===b)return f(c[e+1])}return null},getDilCookieField:function(a){return this.getCookieField(y.DIL_COOKIE_NAME,
a)},setCookieField:function(a,b,c){var e=this.getCookie(a),g=!1,h=encodeURIComponent;b=h(b);c=h(c);if("string"===typeof e){var e=e.split("|"),k,h=0;for(k=e.length-1;h<k;h++)if(e[h]===b){e[h+1]=c;g=!0;break}g||(h=e.length,e[h]=b,e[h+1]=c)}else e=[b,c];this.setCookie(a,e.join("|"),this.getMaxCookieExpiresInMinutes(),"/",this.getDomain(),!1)},setDilCookieField:function(a,b){return this.setCookieField(y.DIL_COOKIE_NAME,a,b)},getDomain:function(a){!a&&window.location&&(a=window.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a=
"";else{var b=a.split("."),c=b.length-1,e=c-1;1<c&&2>=b[c].length&&(2===b[c-1].length||0>",DOMAIN_2_CHAR_EXCEPTIONS,".indexOf(","+b[c]+","))&&e--;if(0<e)for(a="";c>=e;)a=b[c]+(a?".":"")+a,c--}return a}};"error"===g&&0===k&&u.addListener(window,"load",function(){DIL.windowLoaded=!0});var S=!1,H=function(){S||(S=!0,p.registerRequest(),U(),q||p.abortRequests||z.attachIframe(),p.readyToRemove=!0,p.requestRemoval())},U=function(){q||setTimeout(function(){N||p.firstRequestHasFired||("function"===typeof I?
K.afterResult(I).submit():K.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)};C=document;"error"!==g&&(DIL.windowLoaded?H():"complete"!==C.readyState&&"loaded"!==C.readyState?u.addListener(window,"load",function(){DIL.windowLoaded=!0;H()}):(DIL.windowLoaded=!0,H()));if("error"!==g)try{DIL.xd.receiveMessage(function(a){z.receiveMessage(a.data)},z.getIframeHost(z.url))}catch(V){}p.declaredId.setDeclaredId(t,"init");p.processVisitorAPI();this.api=K;this.getStuffedVariable=function(a){var b=J.stuffed[a];
b||"number"===typeof b||(b=u.getCookie(a))||"number"===typeof b||(b="");return b};this.validators=w;this.helpers=u;this.constants=y;this.log=e;T&&(this.pendingRequest=v,this.requestController=p,this.setDestinationPublishingUrl=h,this.destinationPublishing=z,this.requestProcs=D,this.variables=J,this.callWindowLoadFunctions=H)},function(){var a=document,c;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",c=function(){a.removeEventListener("DOMContentLoaded",
c,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var c;if(a===Object(a))for(c in a)a.hasOwnProperty(c)&&(this[c]=a[c])},DIL.extendStaticPropertiesAndMethods({version:"6.9",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoad:function(a){this.windowLoaded="function"===typeof a?!!a():"boolean"===typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(c){throw Error("Error in attempt to create DIL instance with DIL.create(): "+
c.message);}},registerDil:function(a,c,e){c=c+"$"+e;c in this.dils||(this.dils[c]=a)},getDil:function(a,c){var e;"string"!==typeof a&&(a="");c||(c=0);e=a+"$"+c;return e in this.dils?this.dils[e]:Error("The DIL instance with partner = "+a+" and containerNSID = "+c+" was not found")},dexGetQSVars:function(a,c,e){c=this.getDil(c,e);return c instanceof this?c.getStuffedVariable(a):""},xd:{postMessage:function(a,c,e){var b=1;c&&(window.postMessage?e.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):
c&&(e.location=c.replace(/#.*$/,"")+"#"+ +new Date+b++ +"&"+a))},receiveMessage:function(a,c){var e;try{if(window.postMessage)if(a&&(e=function(b){if("string"===typeof c&&b.origin!==c||"[object Function]"===Object.prototype.toString.call(c)&&!1===c(b.origin))return!1;a(b)}),window.addEventListener)window[a?"addEventListener":"removeEventListener"]("message",e,!1);else window[a?"attachEvent":"detachEvent"]("onmessage",e)}catch(b){}}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,
disableDestinationPublishingIframe:!0}),c={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},e=!1;return{activate:function(){e=!0},handleError:function(b){if(!e)return"DIL error module has not been activated";b!==Object(b)&&(b={});var h=b.name?(b.name+"").toLowerCase():"",g=[];b={name:h,filename:b.filename?b.filename+"":"",partner:b.partner?b.partner+"":
"no_partner",site:b.site?b.site+"":document.location.href,message:b.message?b.message+"":""};g.push(h in c?c[h]:c.noerrortypedefined);a.api.pixels(g).logs(b).useImageRequest().submit();return"DIL error report sent"},pixelMap:c}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,c,e){var b="";c=c||"Error caught in DIL module/submodule: ";a===Object(a)?b=c+(a.message||"err has no message"):(b=c+"err is not a valid object",a={});a.message=b;e instanceof DIL&&(a.partner=e.api.getPartner());
DIL.errorModule.handleError(a);return this.errorMessage=b}}});
DIL.tools.getSearchReferrer=function(a,c){var e=DIL.getDil("error"),b=DIL.tools.decomposeURI(a||document.referrer),h="",g="",k={queryParam:"q"};return(h=e.helpers.filter([c===Object(c)?c:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!b.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:b.hostname,keywords:(e.helpers.extendObject(k,h),g=k.queryPattern?
(h=(""+b.search).match(k.queryPattern))?h[1]:"":b.uriParams[k.queryParam],decodeURIComponent(g||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var c=DIL.getDil("error"),e=document.createElement("a");e.href=a||document.referrer;return{hash:e.hash,host:e.host.split(":").shift(),hostname:e.hostname,href:e.href,pathname:e.pathname.replace(/^\//,""),protocol:e.protocol,search:e.search,uriParams:function(a,e){c.helpers.map(e.split("&"),function(c){c=c.split("=");a[c.shift()]=c.shift()});return a}({},e.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},c=document.getElementsByTagName("meta"),e,b,h,g,k;e=0;for(h=arguments.length;e<h;e++)if(g=arguments[e],null!==g)for(b=0;b<c.length;b++)if(k=c[b],k.name===g){a[g]=k.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,e,b){try{var h=this,g={name:"DIL Site Catalyst Module Error"},k=function(a){g.message=a;DIL.errorModule.handleError(g);return a};this.options=b===Object(b)?b:{};this.dil=null;if(c instanceof DIL)this.dil=c;else return k("dilInstance is not a valid instance of DIL");g.partner=c.api.getPartner();if(a!==Object(a))return k("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
function(a){var b="function"===typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return k("m is not an object");b.trackVars=h.constructTrackVars(e);b.d=0;b.s=a;b._t=function(){var a,b,c=","+this.trackVars+",",e=this.s,g,r=[];g=[];var m={},q=!1;if(e!==Object(e))return k("Error in m._t function: s is not an object");if(this.d){if("function"===typeof e.foreachVar)e.foreachVar(function(a,b){"undefined"!==typeof b&&(m[a]=b,q=!0)},this.trackVars);else{if(!(e.va_t instanceof Array))return k("Error in m._t function: s.va_t is not an array");
if(e.lightProfileID)(a=e.lightTrackVars)&&(a=","+a+","+e.vl_mr+",");else if(e.pe||e.linkType)a=e.linkTrackVars,e.pe&&(b=e.pe.substring(0,1).toUpperCase()+e.pe.substring(1),e[b]&&(a=e[b].trackVars)),a&&(a=","+a+","+e.vl_l+","+e.vl_l2+",");if(a){b=0;for(r=a.split(",");b<r.length;b++)0<=c.indexOf(","+r[b]+",")&&g.push(r[b]);g.length&&(c=","+g.join(",")+",")}g=0;for(b=e.va_t.length;g<b;g++)a=e.va_t[g],0<=c.indexOf(","+a+",")&&"undefined"!==typeof e[a]&&null!==e[a]&&""!==e[a]&&(m[a]=e[a],q=!0)}h.includeContextData(e,
m).store_populated&&(q=!0);q&&this.d.api.signals(m,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=c;return g.message?g.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(q){return this.handle(q,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var c=[],e,b,h,g,k;if(a===Object(a)){e=a.names;if(e instanceof Array&&(h=e.length))for(b=0;b<h;b++)g=e[b],"string"===typeof g&&g.length&&c.push(g);a=a.iteratedNames;if(a instanceof Array&&
(h=a.length))for(b=0;b<h;b++)if(e=a[b],e===Object(e)&&(g=e.name,k=parseInt(e.maxIndex,10),"string"===typeof g&&g.length&&!isNaN(k)&&0<=k))for(e=0;e<=k;e++)c.push(g+e);if(c.length)return c.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(a,c){var e={},b=!1;if(a.contextData===Object(a.contextData)){var h=a.contextData,g=this.options.replaceContextDataPeriodsWith,
k=this.options.filterFromContextVariables,q={},m,r,n,x;"string"===typeof g&&g.length||(g="_");if(k instanceof Array)for(m=0,r=k.length;m<r;m++)n=k[m],this.dil.validators.isPopulatedString(n)&&(q[n]=!0);for(x in h)!h.hasOwnProperty(x)||q[x]||!(k=h[x])&&"number"!==typeof k||(x=("contextData."+x).replace(/\./g,g),c[x]=k,b=!0)}e.store_populated=b;return e}};
DIL.modules.GA={submitUniversalAnalytics:function(a,c,e){try{var b=a.getAll()[0],h=b[e||"b"].data.keys;a={};var g,k,q,m;g=0;for(k=h.length;g<k;g++)q=h[g],m=b.get(q),"undefined"===typeof m||"function"===typeof m||m===Object(m)||/^_/.test(q)||/^&/.test(q)||(a[q]=m);c.api.signals(a,"c_").submit();return a}catch(r){return"Caught error with message: "+r.message}},dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,
signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,e){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var b={name:"DIL GA Module Error"},h="";c instanceof DIL?(this.dil=c,b.partner=this.dil.api.getPartner()):(h="dilInstance is not a valid instance of DIL",b.message=h,DIL.errorModule.handleError(b));a instanceof Array&&a.length?this.arr=a:(h="gaArray is not an array or is empty",b.message=h,DIL.errorModule.handleError(b));
this.tv=this.constructTrackVars(e);this.errorMessage=h}catch(g){this.handle(g,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var c=[],e,b,h,g;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){h=this.defaultTrackVars;g={};e=0;for(b=h.length;e<b;e++)g[h[e]]=!0;this.defaultTrackVarsObj=g}else g=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(b=a.length))for(e=0;e<b;e++)h=a[e],"string"===typeof h&&
h.length&&h in g&&c.push(h);if(c.length)return c}return this.defaultTrackVars},constructGAObj:function(a){var c={};a=a instanceof Array?a:this.arr;var e,b,h,g;e=0;for(b=a.length;e<b;e++)h=a[e],h instanceof Array&&h.length&&(h=[],g=a[e],h instanceof Array&&g instanceof Array&&Array.prototype.push.apply(h,g),g=h.shift(),"string"===typeof g&&g.length&&(c[g]instanceof Array||(c[g]=[]),c[g].push(h)));return c},addToSignals:function(a,c){if("string"!==typeof a||""===a||null==c||""===c)return!1;this.signals[a]instanceof
Array||(this.signals[a]=[]);this.signals[a].push(c);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),c={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c){"string"===typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,e,g,h){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",e);this.addToSignals("c_itemPrice",g);this.addToSignals("c_itemQuantity",
h)},_addTrans:function(a,b,c,e,g,h,k,m){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",e);this.addToSignals("c_transShipping",g);this.addToSignals("c_transCity",h);this.addToSignals("c_transState",k);this.addToSignals("c_transCountry",m)},_trackSocial:function(a,b,c,e){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",
e)}},e=this.tv,b,h,g,k,q,m;b=0;for(h=e.length;b<h;b++)if(g=e[b],a.hasOwnProperty(g)&&c.hasOwnProperty(g)&&(m=a[g],m instanceof Array))for(k=0,q=m.length;k<q;k++)c[g].apply(this,m[k])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",
this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,c,e){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(c)?c:"aam_ga",this.delimiter=this.v(e)?e:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(b){this.handle(b,
"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var c,e,b,h,g,k;k=!1;var q=1;if(a===Object(a)&&(c=a.stuff)&&c instanceof Array&&(e=c.length))for(a=0;a<e;a++)if((b=c[a])&&b===Object(b)&&(h=b.cn,g=b.cv,h===this.cookieName&&this.v(g))){k=!0;break}if(k){c=g.split(this.delimiter);"undefined"===typeof window._gaq&&(window._gaq=[]);b=window._gaq;a=0;for(e=c.length;a<e&&!(k=c[a].split("="),g=k[0],k=k[1],this.v(g)&&this.v(k)&&b.push(["_setCustomVar",
q++,g,k,1]),q>this.LIMIT);a++);this.errorMessage=1<q?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"===typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(c){a.process(c)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(c){return this.handle(c,"DIL.modules.GA.Stuffer.submit() caught error with message ",
this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,c,e){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=e===Object(e)?e:{};e={name:"DIL Peer39 Module Error"};var b=[],h="";this.isSecurePageButNotEnabled(document.location.protocol)&&(h="Module has not been enabled for a secure page",b.push(h),e.message=h,DIL.errorModule.handleError(e));c instanceof
DIL?(this.dil=c,e.partner=this.dil.api.getPartner()):(h="dilInstance is not a valid instance of DIL",b.push(h),e.message=h,DIL.errorModule.handleError(e));"string"===typeof a&&a.length?this.aid=a:(h="aid is not a string or is empty",b.push(h),e.message=h,DIL.errorModule.handleError(e));this.errorMessage=b.join("\n")}catch(g){this.handle(g,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"===a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,c=this.constructScript(),e=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(c){}finally{a.calledBack=!0,"function"===typeof a.optionals.afterResult&&a.optionals.afterResult()}};e.parentNode.insertBefore(c,e);this.scriptsSent.push(c);return"Request sent to Peer39"},processData:function(a){var c,e,b,h,g={},k=
!1;this.returnedData.push(a);if(a instanceof Array)for(c=0,e=a.length;c<e;c++)b=a[c].split("="),h=b[0],b=b[1],h&&isFinite(b)&&!isNaN(parseInt(b,10))&&(g[h]instanceof Array||(g[h]=[]),g[h].push(b),k=!0);return{hasSignals:k,signals:g}},constructScript:function(){var a=document.createElement("script"),c=this.optionals,e=c.scriptId,b=c.scriptSrc,c=c.scriptParams;a.id="string"===typeof e&&e.length?e:"peer39ScriptLoader";a.type="text/javascript";"string"===typeof b&&b.length?a.src=b:(a.src=document.location.protocol+
"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"===typeof c&&c.length&&(a.src+="?"+c));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.2.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.2.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();