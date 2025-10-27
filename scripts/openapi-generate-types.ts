import fs from 'fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const BLOB = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Blob')); // `Blob`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()); // `null`

const ast = await openapiTS('http://localhost:4000/api-json', {
  transform(schemaObject) {
    if (schemaObject.format === 'binary') {
      return schemaObject.nullable ? ts.factory.createUnionTypeNode([BLOB, NULL]) : BLOB;
    }
  },
});

const output = astToString(ast);
await fs.writeFile('./src/api/schema.d.ts', output);
