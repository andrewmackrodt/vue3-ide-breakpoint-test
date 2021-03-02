const CompilerSfc = require('@vue/compiler-sfc')
const parse = CompilerSfc.parse
CompilerSfc.parse = (source, options) => {
    return parse(source, Object.assign({ pad: true }, options))
}

module.exports = {
    configureWebpack: {
        output: {
            devtoolModuleFilenameTemplate: info => {
                if (info.allLoaders === '') {
                    // when allLoaders is an empty string the file is the original source
                    // file and will be prefixed with src:// to provide separation from
                    // modules transpiled via webpack
                    const filenameParts = ['src://']
                    if (info.namespace) {
                        filenameParts.push(info.namespace + '/')
                    }
                    filenameParts.push(info.resourcePath.replace(/^\.\//, ''))
                    return filenameParts.join('')
                } else {
                    // otherwise we have a webpack module
                    const filenameParts = ['webpack://']
                    if (info.namespace) {
                        filenameParts.push(info.namespace + '/')
                    }
                    filenameParts.push(info.resourcePath.replace(/^\.\//, ''))
                    const isVueScript = info.resourcePath.match(/\.vue$/) &&
                        info.query.match(/\btype=script\b/) &&
                        ! info.allLoaders.match(/\bts-loader\b/)
                    if ( ! isVueScript) {
                        filenameParts.push('?' + info.hash)
                    }
                    return filenameParts.join('')
                }
            },
        }
    }
}
