({
    appDir: './',
    baseUrl: './src/js',
    dir: './dist',
    modules: [
        {
            name: 'boot-main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        'utils-form':       'utils/Form',
        'api':                      'api',
        'angular':              'lib/angular/angular',
        'backbone':             'lib/backbone/backbone-relational',
        '_backbone':            'lib/backbone/backbone',
        'text':                     'lib/require/text',
        'underscore':       'lib/underscore/underscore',
        'jquery':               'lib/jquery/jquery'
    },
    shim: {
        'angular'       : {'exports' : 'angular'},
        'backbone'      : {'exports' : 'Backbone', 'deps': ['_backbone'],},
        '_backbone'     : {'deps': ['underscore', 'jquery']},
        'underscore'    : {'exports' : '_'},
        'jquery'            : {'exports' : '$'},
        'angularMocks': {deps:['angular'], 'exports':'angular.mock'}
    },
    priority: [
        "angular"
    ]
})