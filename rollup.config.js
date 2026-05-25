import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  // 1. seastack.ts 빌드 (ESM, CJS, UMD)
  {
    input: 'src/seastack.ts',
    output: [
      {
        file: 'dist/esm/seastack.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/cjs/seastack.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/umd/seastack.js',
        format: 'umd',
        name: 'Seastack',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types'
      })
    ]
  },
  // 2. seastack-onload.ts 빌드 (ESM, CJS, UMD)
  {
    input: 'src/seastack-onload.ts',
    output: [
      {
        file: 'dist/esm/seastack-onload.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/cjs/seastack-onload.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/umd/seastack-onload.js',
        format: 'umd',
        name: 'SeastackOnload',
        sourcemap: true,
        globals(id) {
          if (id.includes('seastack')) return 'Seastack';
        }
      }
    ],
    external: ['./seastack', './seastack.ts'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types'
      })
    ]
  }
];
