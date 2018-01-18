_satellite.pushAsyncScript(function(event, target, $variables){
  setTimeout(function()
{ 
  var a = document.createElement("script"); 
  var b = document.getElementsByTagName("script")[0]; 
  		a.src = document.location.protocol + "//script.crazyegg.com/pages/scripts/0031/6279.js?" + Math.floor(new Date().getTime() / 3600000); 
  		a.async = true; 
  		a.type = "text/javascript"; 
  		b.parentNode.insertBefore(a, b); 
  		console.log('Crazy Egg'); 
}, 1);
});
