/* npm install jquery.terminal */
;(function ( $, window, document, undefined ) {

    var pluginName = 'terminal',
        _search = '.waxed-terminal',
        _api = [],
        defaults = {
            propertyName: "value"
        },
        inited = false
        ;

    function Instance(pluggable,element,dd){
      var that = this;
      this.pluggable = pluggable;
      this.element = element;
      this.o = element;
      this.t = pluginName;
      this.dd = dd;
      this.name = '';
      this.cfg = {
      };
      this.terminal = null;

      this.invalidate = function(RECORD){

      },

      this.setRecord = function(RECORD){
        if (typeof that.dd.name == 'undefined') return;
        var rec = that.pluggable.getvar(that.dd.name, RECORD);

        if (typeof rec != 'object') { return; };
        
        if ((typeof rec.clear == 'boolean')&&(rec.clear)) { 
          this.terminal.clear();
        };
        if ((typeof rec.clear_buffer == 'boolean')&&(rec.clear_buffer)) { 
          this.terminal.clear_buffer();
        };
        if ((typeof rec.purge == 'boolean')&&(rec.purge)) { 
          this.terminal.purge();
        };

        if (typeof rec.command == 'string') { 
          this.terminal.set_command(rec.command);
        }; 
        if (typeof rec.login == 'string') { 
          //this.terminal.login([function(user, password, callback), boolean]);      
        };
        if (typeof rec.read == 'string') { 
          this.terminal.read(rec.read,that.sendValue,null);      
        };
        if (typeof rec.response == 'string') { 
          //$(this.element).terminal().echo(rec.response);
          this.terminal.echo(rec.response);
        };
        if ((typeof rec.response == 'object')&&(rec.response instanceof Array)) { 
          for (var i=0;i<rec.response.length;i++) this.terminal.echo(rec.response[i]);
        };
        if (typeof rec.error == 'string') { 
          this.terminal.error(rec.error);
        };
        if ((typeof rec.error == 'object')&&(rec.error instanceof Array)) { 
          for (var i=0;i<rec.error.length;i++) this.terminal.error(rec.error[i]);
        };


        if ((typeof rec.resume == 'boolean')&&(rec.resume)) { 
          this.terminal.resume();
        }
        
      },

      this.sendValue = function(value) {
        var data = {
          'action': that.dd.action,
          'command': 'userdata',
          'value': value
        };
        //console.log('PARSED: ', $.terminal.parse_command(command));
        //that.terminal.pause();
        return that.pluggable.sendData(data, that.dd.url);
      },
      
      this.request = function(command) {
        var data = {
          'action': that.dd.action,
          'command': command
        };
        //console.log('PARSED: ', $.terminal.parse_command(command));
        that.terminal.pause();
        return that.pluggable.sendData(data, that.dd.url);
        
      },

      this.free = function() {

      },

      this.init=function() {
        var opts = {
            greetings: 'Server Interpreter',
            name: 'js_demo',
            height: $(that.element).height(),
            width: $(that.element).width(),
            prompt: 'xxx> ',
            keymap: {
              'CTRL+C': function() {
                //console.log('CTRL+C');
                that.request('INTERRUPT');
              }
              
            }
        };
        if ((typeof that.dd.prompt == 'string')&&(that.dd.prompt)) opts.prompt = that.dd.prompt;
        if ((typeof that.dd.greetings == 'string')&&(that.dd.greetings)) opts.greetings = that.dd.greetings;
        if ((typeof that.dd.name == 'string')&&(that.dd.name)) opts.name = that.dd.name;

        this.terminal = $(this.element).terminal(function(command) {
            if (command !== '') {
                
                var result = that.request(command);
                if (result != undefined) {
                    this.echo(String(result));
                }
            }
        }, opts);
        $('body').keydown(function(event) {
          if (event.ctrlKey) { 
            //console.log("Hey! Ctrl+["+event.keyCode+"] event captured!");
            //event.preventDefault(); 
          }
          if(event.ctrlKey && event.keyCode == 67) { 
            //console.log("Hey! Ctrl+C event captured!");
            event.preventDefault(); 
            that.request('INTERRUPT');
          }
        });

        inited = true;
      },
      this._init_();
    }

    $.waxxx(pluginName, _search, Instance, _api);


})( jQuery, window, document );
/*--*/
//# sourceURL: /js/jam/boilerplate/plugin.js
