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
    
    
    onDelete: function() {
        Raptor.msg.confirm('Deleting the file', 'You will delete this files, are you shure?', this.deleteFile);
    },
    deleteFile: function(resp) {
        if (resp === 'no')
            return;
        var me = UIR.getController('Editor.OnlineEditor');
        
        var files=[];
        $('.file-table input:checked').each(function(){
            files.push($(this).next().data('route'));
        })
        if(files.length==0)
            return Raptor.msg.error('Seleccione los archivos a eliminar !!')
        var wait = Raptor.msg.wait('Deleting the file');
        $.post(Raptor.getFront() + '/raptor/onlineeditor/deletefile', {file: files}, function(data) {
            me.getCancel().tab('show');
            Raptor.msg.show(data.cod, data.msg);
            window.location.reload();
            wait.destroy()
        });
    },
    create: function() {
        if (this.getCreateField().val()) {
            var me = this;
            var wait = Raptor.msg.wait('Creating the file');
            $.post(Raptor.getFront() + '/raptor/onlineeditor/createfile', {file: this.getCreateField().val(), directory: $('[uir-app="Editor"]').data('route')}, function(data) {
                Raptor.msg.show(data.cod, data.msg);
                me.getCreateField().val('');
                window.location.reload();
                wait.destroy();
            });
        } else
            Raptor.msg.info('Please specified a filename')

    },
    createDir: function() {
        if (this.getCreateField().val()) {
            var me = this;
            var wait = Raptor.msg.wait('Creating the directory');
            $.post(Raptor.getFront() + '/raptor/onlineeditor/createdir', {file: this.getCreateField().val(), directory: $('[uir-app="Editor"]').data('route')}, function(data) {
                Raptor.msg.show(data.cod, data.msg);
                me.getCreateField().val('');
                window.location.reload();
                wait.destroy();
            });
        } else
            Raptor.msg.info('Please specified a filename')

    },
    main: function() {

        var me = this;
        $('[data-toggle="tooltip"]').tooltip()
       
    }
}).Run(function() {
    this.addEvents({
        '#main-producto .adding': {
            click: this.onAdd
        },
        '#save': {
            click: this.save
        },
        '#create': {
            click: this.create
        },
        '#create-dir': {
            click: this.createDir
        },
        '#delete': {
            click: this.onDelete
        }
    });
    this.main();
    Raptor.getLanguage = function() {
        return 'en';
    }
})
