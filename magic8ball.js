
$('document').ready(function() {
    var count     = 0;
    var answer    = $('#answer');
    var container = $('#answer_container');
    var answers   = [
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes - definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        'Reply hazy, try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        "Don't count on it",
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ];
    
    // uncomment below for testing the display of each phrase
     /*window.setInterval(function(){
         $(answer).text(answers[++count % answers.length]);
         //$(answer).text(answers[Math.floor(Math.random()*answers.length)]);
     }, 500)*/
    
    var opacity = 1;
    var force   = 0
    
    window.addEventListener('devicemotion', function (e) {
        var a = e.rotationRate.alpha;
        var b = e.rotationRate.beta;
        var g = e.rotationRate.gamma;
        var t = (Math.abs(a) + Math.abs(b) + Math.abs(g)) / e.interval;
        if(t < 1000) return;
        
        force -= (t / 500000);
        
        log(t);
        
        
    }, false);
    
    window.setInterval(function(){
        if(1 == opacity && force == 0) return;
        
        const buoyancy = 0.001; // the positive up force constantly applied
        const bottom  = -0.5;   // going beyond 0 gives it some depth to disappear into for a bit
        
        force   += buoyancy;
        opacity += force;
        
        if(opacity <= bottom)
        {
            opacity = bottom;
            if(force < 0)
                force = (force / 10) + buoyancy;
            $(answer).text(answers[Math.floor(Math.random()*answers.length)]);
        }
        if(opacity >= 1)
        {
            opacity = 1;
            force = (force > 0.06) ? -(force / 2) : 0; // bounce on hit at top
        }
        
        //log("force: " + force + "; opacity: " + opacity);

        /* //Tried playing with zoom, but it doesn't seem to be worth it - too many visual glitches
        var zoom = 0.95 + (opacity * 0.05);
        var left = 267 + ((4/3) * (489 - (489 * zoom)));
        var top  = 232 + ((4/3) * (304 - (304 * zoom))); */
        
        $(container).css({
            opacity:opacity/*,
            zoom: zoom,
            left: left,
            top: top*/
        });
    }, 33)
    
    
    function log(t){ return;
        logs = $('#log div');
        if(logs.length > 20) $(logs[0]).remove();

        $('#log').append($('<div>').text((++count) + ": " + t));
    }
});