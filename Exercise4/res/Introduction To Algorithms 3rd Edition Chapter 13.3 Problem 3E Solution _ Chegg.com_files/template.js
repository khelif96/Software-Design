var oc=oc||{};oc.components=oc.components||{},oc.components["3ce7b883b04da6fc501d6446ca0fda956c1e0083"]={1:function(e,n,t,a,r){var o,l,i=null!=n?n:{},c=t.helperMissing,s="function";return'  <div id="'+e.escapeExpression((l=null!=(l=t.server_render_id||(null!=n?n.server_render_id:n))?l:c,typeof l===s?l.call(i,{name:"server_render_id",hash:{},data:r}):l))+'">'+(null!=(l=null!=(l=t.server_render||(null!=n?n.server_render:n))?l:c,o=typeof l===s?l.call(i,{name:"server_render",hash:{},data:r}):l)?o:"")+"</div>\n"},compiler:[7,">= 4.0.0"],main:function(e,n,t,a,r){var o,l,i=null!=n?n:{},c=t.helperMissing,s="function",d=e.escapeExpression;return"\n"+(null!=(o=t["if"].call(i,null!=n?n.server_render:n,{name:"if",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r}))?o:"")+'\n<script>\n window.lightningjs||function(e){function r(r,o){var d="1";return o&&(o+=(/\\?/.test(o)?"&":"?")+"lv="+d),e[r]||function(){var d=window,c=document,u=r,p=c.location.protocol,v="load",f=0;!function(){function r(){m.P(v),m.w=1,e[u]("_load")}e[u]=function(){function r(){return r.id=c,e[u].apply(r,arguments)}var a=arguments,o=this,c=++f,p=o&&o!=d?o.id||0:0;return(m.s=m.s||[]).push([c,p,a]),r.then=function(e,a,o){var d=m.fh[c]=m.fh[c]||[],u=m.eh[c]=m.eh[c]||[],p=m.ph[c]=m.ph[c]||[];return e&&d.push(e),a&&u.push(a),o&&p.push(o),r},r};var m=e[u]._={};m.fh={},m.eh={},m.ph={},m.l=o?o.replace(/^\\/\\//,("https:"==p?p:"http:")+"//"):o,m.p={0:+new Date},m.P=function(e){m.p[e]=new Date-m.p[0]},m.w&&r(),d.addEventListener?d.addEventListener(v,r,!1):d.attachEvent("on"+v,r);var w=function(){function e(){return["<head></head><",r,\' onload="var d=\',P,";d.getElementsByTagName(\'head\')[0].",p,"(d.",v,"(\'script\')).",f,"=\'",m.l,"\'\\"></",r,">"].join("")}var r="body",o=c[r];if(!o)return setTimeout(w,100);m.P(1);var d,p="appendChild",v="createElement",f="src",y=c[v]("div"),E=y[p](c[v]("div")),C=c[v]("iframe"),P="document",B="domain",T="contentWindow";y.style.visibility="hidden",y.style.height="0px",o.insertBefore(y,o.firstChild).id=a+"-"+u,C.frameBorder="0",C.id=a+"-frame-"+u,/MSIE[ ]+6/.test(navigator.userAgent)&&(C[f]="javascript:false"),C.allowTransparency="true",E[p](C);try{C[T][P].open()}catch(b){m[B]=c[B],d="javascript:var d="+P+".open();d.domain=\'"+c.domain+"\';",C[f]=d+"void(0);"}try{var D=C[T][P];D.write(e()),D.close()}catch(L){C[f]=d+\'d.write("\'+e().replace(/"/g,String.fromCharCode(92)+\'"\')+\'");d.close();\'}m.P(2)};m.l&&w()}()}(),e[r].lv=d,e[r]}var a="lightningjs",lightningjs=window[a]=r(a);lightningjs.require=r,lightningjs.modules=e}({});\n  (function() {\n    var CheggTutors = CheggTutors || {};\n    var tutor_list = \'\';\n    CheggTutors.tutorList = window.lightningjs.require(\'tutor_list\', \''+d((l=null!=(l=t.path||(null!=n?n.path:n))?l:c,typeof l===s?l.call(i,{name:"path",hash:{},data:r}):l))+"dist/app.js');\n    /**\n     * Right now it will get it only by id. If not it will default to added the\n     * react element to the body. This is for the local OC test registry preview\n     * this devs don't need to run a local webserver to test.\n     * @type {Node}\n     */\n    var element = document.getElementById('"+d((l=null!=(l=t.server_render_id||(null!=n?n.server_render_id:n))?l:c,typeof l===s?l.call(i,{name:"server_render_id",hash:{},data:r}):l))+"');\n    if (!element) {\n      element =  document.createElement(\"div\");\n      var body = document.getElementsByTagName('body');\n      body[0].appendChild(element);\n    }\n\n    /**\n     * Lets load the quick-chat component in earlier stage to avoid response latency\n     * Load the component only if:\n     * - quickMatch module is not loaded in DOM already\n     * - context parameter 'action.launch_quick_chat' is passed to load the quick-chat\n     */\n    if (!window.lightningjs.modules.quickMatch && '"+d((l=null!=(l=t.launch_quick_chat||(null!=n?n.launch_quick_chat:n))?l:c,typeof l===s?l.call(i,{name:"launch_quick_chat",hash:{},data:r}):l))+"'=== 'true') {\n      var quick_chat_container =  document.createElement(\"div\");\n      quick_chat_container.innerHTML = '<oc-component href=\""+d((l=null!=(l=t.quick_chat_oc_url||(null!=n?n.quick_chat_oc_url:n))?l:c,typeof l===s?l.call(i,{name:"quick_chat_oc_url",hash:{},data:r}):l))+"\"></oc-component>';\n      var body = document.getElementsByTagName('body');\n      body[0].appendChild(quick_chat_container);\n    }\n\n    /**\n     * Just a another check to see if there is data and that the data will\n     * parse.\n     */\n    if ('"+d((l=null!=(l=t.has_data||(null!=n?n.has_data:n))?l:c,typeof l===s?l.call(i,{name:"has_data",hash:{},data:r}):l))+"' === 'true') {\n        try {\n          tutor_list = JSON.parse('"+(null!=(l=null!=(l=t.tutor_list||(null!=n?n.tutor_list:n))?l:c,o=typeof l===s?l.call(i,{name:"tutor_list",hash:{},data:r}):l)?o:"")+"');\n        } catch (e) {\n          console.log(e);\n        }\n    }\n    /**\n     * The users of the OC can fill in TutorListConfig on their page. The\n     * server_config and tutorListConfig will be merged in tutorList.\n     * @type {Object}\n     */\n    var tutorListConfig = window.TutorListConfig || {};\n\n     CheggTutors.tutorList(\"render\",{element: element,\n                                     CSS_URL: '"+d((l=null!=(l=t.path||(null!=n?n.path:n))?l:c,typeof l===s?l.call(i,{name:"path",hash:{},data:r}):l))+"dist/app-app.css',\n                                     tutor_list: tutor_list,\n                                     subject_id: "+(null!=(l=null!=(l=t.subject_id||(null!=n?n.subject_id:n))?l:c,o=typeof l===s?l.call(i,{name:"subject_id",hash:{},data:r}):l)?o:"")+",\n                                     config: tutorListConfig,\n                                     server_config: "+(null!=(l=null!=(l=t.server_config||(null!=n?n.server_config:n))?l:c,o=typeof l===s?l.call(i,{name:"server_config",hash:{},data:r}):l)?o:"")+",\n                                     qc_asset: "+(null!=(l=null!=(l=t.qc_asset||(null!=n?n.qc_asset:n))?l:c,o=typeof l===s?l.call(i,{name:"qc_asset",hash:{},data:r}):l)?o:"")+"\n                                   });\n  })();\n</script>\n"},useData:!0};