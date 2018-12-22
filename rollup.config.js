import { main, module, devDependencies, name, version, license, author } from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

const external = Object.keys(devDependencies);

const comment = `/**
 * ===============================
 * ${name} v${version}
 * Copyright (c) ${new Date().getFullYear()} ${typeof author === "object" ? author.name : author}
 * @license ${license}
 * ===============================
 **/\n`;

export default {
  input: 'src/main.js',
  output: [
    // file: 'dist/bundle.js',
    // format: 'umd'
    { 
      file: main, 
      format: 'umd', 
      sourcemap: true, 
      name: 'postmessage-channel', 
      banner: comment,
    },
		{ file: module, format: 'es', sourcemap: true }
  ],
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    // uglify(),
   ],
  external,
};