// Config
require.config({
    baseUrl: 'js',

    paths: {
        jquery      : '../bower_components/jquery/dist/jquery',
        bootstrap   : '../bower_components/bootstrap/dist/js/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['index']);