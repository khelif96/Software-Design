_satellite.pushAsyncScript(function(event, target, $variables){
  // custom js
if(C.global.hasHwhSubscription) {
    console.log('** Feedbackify_Widget **');
    var fby = fby || [];
    (function () {
        var f = document.createElement('script'); 
        f.type = 'text/javascript';
        f.async = true;
        f.src = '//cdn.feedbackify.com/f.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(f, s);

        // Chegg owned code
        var divStyle = "position: fixed; top: 470px; right: 0px!important; margin-top: -50px!important; background-color: #FE7A20; width: 36px; height: 100px;",
            linkStyle = "width: 36px; background: url(https://cdn.feedbackify.com/img/classic/tab.png) !important; height: 100px; position: fixed !important; z-index: 10000;";
        
        $('.chg-content').append('<div class="feedback-widget" style="'+divStyle+'"><a href="#" style="'+linkStyle+'" onclick="fby.push([\'showForm\', \'8017\']);return false;"></a></div>');
    })();
}

});
