UIR.Controller('Editor.OnlineEditor', {
    elements: [{
            ref: '.file-table',
            name: 'table'
        }, {
            ref: '#list',
            name: 'tabList'
        }, {
            ref: '#edit',
            name: 'tabEdit'
        }, {
            ref: '#editor-field',
            name: 'editor'
        }, {
            ref: '#preview',
            name: 'preview'
        }, {
            ref: '#cancel',
            name: 'cancel'
        }, {
            ref: '#create-field',
            name: 'createField'
        }],
    save: function() {
        var me = this;
        var wait = Raptor.msg.wait('Saving the file');
        $.post('savefile', {file: $('body').data('file'), content: me.editor.getValue()}, function(data) {

            Raptor.msg.show(data.cod, data.msg);
            wait.destroy()
        });
    },
    main: function() {
//       this.getTable().TableUIR(this.tableOptions);
//       this.getTable().on('loaded',this.onLoadList);
        var me = this;
        ace.require("ace/ext/language_tools");
        var editor = ace.edit("editor-field");
        editor.setTheme("ace/theme/twilight");
        editor.session.setMode("ace/mode/javascript");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: false
        });
        this.editor = editor;
        editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
            exec: function(editor) {
                me.save();
            },
            readOnly: false // false if this command should not apply in readOnly mode
        });
    },
}).Run(function() {
    this.addEvents({
        '#main-producto .adding': {
            click: this.onAdd
        },
        '#save': {
            click: this.save
        }
    });
    this.main();
    Raptor.getLanguage = function() {
        return 'en';
    }
})
