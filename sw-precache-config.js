module.exports = {
    staticFileGlobs: [
        'build/static/css/**.css',   
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    handleFetch: false,
    importScripts: (['./service-worker-upload.js']),
    // runtimeCaching: [{
    //     urlPattern: /this\\.is\\.a\\.regex/,
    //     handler: 'networkFirst'
    // }]
}