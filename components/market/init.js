/*
 *  Copyright (c) Codiad & daeks (codiad.com), distributed
 *  as-is and without warranty under the MIT License. See
 *  [root]/license.txt for more. This information must remain intact.
 */

(function(global, $){

    var codiad = global.codiad;

    $(function() {
        codiad.market.init();
    });

    codiad.market = {

        controller: 'components/market/controller.php',
        dialog: 'components/market/dialog.php',

        init: function() {  
        },
        
        //////////////////////////////////////////////////////////////////
        // Open the plugin manager market
        //////////////////////////////////////////////////////////////////
        
        market: function() {
            $('#modal-content form')
                .die('submit'); // Prevent form bubbling
            codiad.modal.load(500, this.dialog + '?action=market');
        },

        //////////////////////////////////////////////////////////////////
        // Open marketplace
        //////////////////////////////////////////////////////////////////

        list: function(type) {
            $('#modal-content form')
                .die('submit'); // Prevent form bubbling
            codiad.modal.load(800, this.dialog + '?action=list&type='+type);
        },
        
        //////////////////////////////////////////////////////////////////
        // Search marketplace
        //////////////////////////////////////////////////////////////////

        search: function(e, query) {
            $('#modal-content form')
                .die('submit'); // Prevent form bubbling
            var key= e.charCode || e.keyCode || e.which;
            if(query != '' && key==13) {
              codiad.modal.load(800, this.dialog + '?action=list&type=undefined&query='+query);
            }
        },
                
        openInBrowser: function(path) {
            window.open(path, '_newtab');
        },
        
        //////////////////////////////////////////////////////////////////
        // Install
        //////////////////////////////////////////////////////////////////

        install: function(page, type, name, repo) {
            var _this = this;
            if(repo != '') {
              $('#modal-content').html('<div id="modal-loading"></div><div align="center">Installing ' + name + '...</div><br>');
              $.get(_this.controller + '?action=install&type=' + type + '&name=' + name + '&repo=' + repo, function(data) {
                  var response = codiad.jsend.parse(data);
                  if (response == 'error') {
                      codiad.message.error(response.message);
                  }
                  _this.list(page);
              });
            } else {
               codiad.message.error('No Repository URL');
            }
        },
        
        //////////////////////////////////////////////////////////////////
        // Remove
        //////////////////////////////////////////////////////////////////

        remove: function(page, type, name) {
            var _this = this;
            $('#modal-content').html('<div id="modal-loading"></div><div align="center">Deleting ' + name + '...</div><br>');
            $.get(_this.controller + '?action=remove&type=' + type + '&name=' + name, function(data) {
                var response = codiad.jsend.parse(data);
                if (response == 'error') {
                    codiad.message.error(response.message);
                }
                _this.list(page);
            });
        },
        
        //////////////////////////////////////////////////////////////////
        // Update
        //////////////////////////////////////////////////////////////////

        update: function(page, type, name) {
            var _this = this;
            $('#modal-content').html('<div id="modal-loading"></div><div align="center">Updating ' + name + '...</div><br>');
            $.get(_this.controller + '?action=update&type=' + type + '&name=' + name, function(data) {
                var response = codiad.jsend.parse(data);
                if (response == 'error') {
                    codiad.message.error(response.message);
                }
                _this.list(page);
            });
        },

        //////////////////////////////////////////////////////////////////
        // Activate
        //////////////////////////////////////////////////////////////////

        activate: function(page, type, name) {
            var _this = this;
            $.get(this.controller + '?action=activate&type=' + type + '&name=' + name, function(data) {
                var response = codiad.jsend.parse(data);
                if (response != 'error') {
                    _this.list(page);
                }
            });
        },

        //////////////////////////////////////////////////////////////////
        // Deactivate
        //////////////////////////////////////////////////////////////////

        deactivate: function(page, type, name) {
            var _this = this;
            $.get(this.controller + '?action=deactivate&type=' + type + '&name=' + name, function(data) {
                var response = codiad.jsend.parse(data);
                if (response != 'error') {
                    _this.list(page);
                }
            });
        }
    };
})(this, jQuery);
