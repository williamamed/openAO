Ext.define('Registro.view.SpinnerTermino', {
    extend: 'Ext.form.field.Spinner',
    alias: 'widget.terminospinner',

    // override onSpinUp (using step isn't neccessary)
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            if(val<30)
                me.setValue((val + me.step));
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
           var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
           
               if(val>1)
               me.setValue((val - me.step));
           
        }
    }
});


