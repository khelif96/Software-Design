_satellite.pushAsyncScript(function(event, target, $variables){
  function loadSeaUrchin(){
(function(s,e,a,r,c,h){s[r]=s[r]||function()
{(s[r].q=s[r].q||[]).push(arguments)}
;
s[r].l=1*new Date();c=e.createElement(a);h=e.getElementsByTagName(a)[0];
c.src='https://d2hygut8deko74.cloudfront.net/magnify.js';
c.async=1;h.parentNode.insertBefore(c,h);})(window,document,'script','seaurchinIO');
seaurchinIO('init', 1437605197631);
//SeaUrchin identify start
var uuid = _satellite.getVar('cheggUserUUID'),
uvn = _satellite.getVar('uvn');
seaurchinIO('identify',
{ chegg_user_id: uuid, chegg_uvn: uvn }
);
//SeaUrchin identify end
};
loadSeaUrchin();
});
