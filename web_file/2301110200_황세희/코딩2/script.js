
$(function() {
  var data = [
    {
      action: 'type',
      strings: ["2024... Korea Polytechnics..."],
      output: '<span class="gray">Seoul Jungsu Campus...</span><br>&nbsp;',
      
      postDelay: 1000
    },
  { 
    action: 'type',
    strings: ["Produced by... Hwang Sehee"],
    output: 'Graduation_work...<br><br>',
    postDelay: 1000
  },
  { 
    action: 'type',
    strings: ["Please just for a minute...", 'Press any key to Start'],
    postDelay: 2000
  }
  
];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html(''); 
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('	&#60;div&#62; ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}