Ext.define('Registro.view.CategoriaField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.categoriafield',

    // override onTriggerClick
    setValue:function(value, doSelect){
        this.store= Ext.data.StoreManager.lookup(this.store);
        
        var record=this.store.getNodeById(value);
        // console.debug('setvalue',record)
        if(record){
            this.record=record;
            this.setRawValue(record.get('text'));
        }else{
            this.setRawValue("");
        }
    },
    onTriggerClick: function() {
        this.viewW = Ext.widget('categoriawindow');
        this.viewW.on('selectednode',this.onSelect,this);
        if(this.record){
            this.viewW.down('treepanel').getSelectionModel().select([this.record]);
        }
        
    },
    onSelect:function(record){
        
        this.record=record;
        this.setRawValue(record.get('text'));
    //   console.debug('onselect',record)
        this.viewW.close();
        
    },
    getSubmitValue:function(){
        
        // if(this.pureValue)
        //     return this.pureValue;
        if(this.record)
           return this.record.get('id');
       else
           return "";
    }
});


