import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/asyncp.js',
    dest: 'dist/dist/asyncp.min.js',
    format: 'iife',
    sourceMap: true,
    moduleName: 'asyncp',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['es2015-rollup'],
            plugins: [
                [
                    'babel-plugin-transform-builtin-extend',
                    {
                        globals: ['Error', 'Array'],
                        approximate: true
                    }
                ],
                'add-module-exports'
            ]
        }),
        uglify(),
    ],
};
