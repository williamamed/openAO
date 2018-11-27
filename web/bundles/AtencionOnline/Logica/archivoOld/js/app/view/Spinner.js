Ext.define('Registro.view.Spinner', {
    extend: 'Ext.form.field.Spinner',
    alias: 'widget.registrospinner',

    // override onSpinUp (using step isn't neccessary)
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            if(val<90)
                me.setValue((val + me.step));
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
           var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
           if (val <= me.step) {
               me.setValue(0);
           } else {
               if(val>10)
               me.setValue((val - me.step));
           }
        }
    }
});


