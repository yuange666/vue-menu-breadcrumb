module.exports = {
    publicPath: './',
    devServer: {
        proxy: 'http://172.16.181.207:9952'
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#5581E3',
                },
                javascriptEnabled: true
            }
        }
    },
};
