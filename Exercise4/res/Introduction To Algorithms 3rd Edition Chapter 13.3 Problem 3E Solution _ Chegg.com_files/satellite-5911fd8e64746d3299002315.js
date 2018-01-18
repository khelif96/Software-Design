_satellite.pushAsyncScript(function(event, target, $variables){
  if (typeof $  !== 'undefined' && !window.KERMIT_PARAMS || (window.KERMIT_PARAMS && !window.KERMIT_PARAMS.is_in_app)) {

var google_tag_params =
{ 
  pagetype: _satellite.getVar('GA Page Type'), 
  prodtype: _satellite.getVar('GA Prod Type'),
  prodid: _satellite.getVar('pageNameDetailed'),
  prodvalue: _satellite.getVar('GA Page Value'),
  prodqty: _satellite.getVar('GA Prod QTY'),
  schoolid: _satellite.getVar('GA School ID'),
  schoolname: _satellite.getVar('GA School Name'),
  solutionid: _satellite.getVar('pageNameDetailed'),
  questionid: _satellite.getVar('pageNameDetailed'),
  solutionsubject: _satellite.getVar('Solutions Subsubject'),
  qasubject: _satellite.getVar('parentSubject'),
  booksubject: _satellite.getVar('parentSubject'),
  booksubsubject: _satellite.getVar('subSubject'),
  booksubsubsubject: _satellite.getVar('subSubSubject'), 
  visitorsplit: _satellite.getVar('Tag Group')
};

console.log('google_tag_params: ', google_tag_params);
var google_conversion_id = 1064495637;
var google_conversion_label = "cNecCJvJhwIQldTL-wM";
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;


var js = document.createElement("img");

js.type = "text/javascript";
js.src = "//googleads.g.doubleclick.net/pagead/viewthroughconversion/1064495637/?value=0&label=cNecCJvJhwIQldTL-wM&guid=ON&script=0&data=questionid%3D" + _satellite.getVar('parentSubject');
document.body.appendChild(js);

}


});
