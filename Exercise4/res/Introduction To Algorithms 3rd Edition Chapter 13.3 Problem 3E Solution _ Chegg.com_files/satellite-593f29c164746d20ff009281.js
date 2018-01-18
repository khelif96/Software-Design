_satellite.pushAsyncScript(function(event, target, $variables){
  var eventID = _satellite.getVar('eventID');
var eventValue = _satellite.getVar('eventValue');
var eventName = _satellite.getVar('eventName');
var eventCallback = _satellite.getVar('eventCallback');

if (eventID.indexOf('sc') === 0 ||
    eventID.indexOf('event') === 0) {

    s.linkTrackVars = '';
    s.linkTrackEvents = '';

    switch (eventID) {
        case 'event15':
            s.list3 = eventValue;
            s.linkTrackVars = s.apl(s.linkTrackVars, 'list3', ",", 2);
            break;
				case 'scAdd':
        case 'event22':
        case 'event51':
						// using a DCR instead b/c of race conditions
        		return false;
            break;
        default:
            break;
    }

    s.events = s.linkTrackEvents = eventID;
    s.eVar71 = eventValue;
    s.linkTrackVars = s.apl(s.linkTrackVars, 'events,eVar71', ",", 2);

    if (eventCallback.length > 0) {
        s.tl(true, 'o', eventName, null, eval(eventCallback));
    } else {
        s.tl(true, 'o', eventName);
    }
  	_satellite.notify('Event Fired: ----- ' + eventName + ':' + eventID);

} else {
    _satellite.notify('Unknown Event not captured: ' + eventID);
}
});
