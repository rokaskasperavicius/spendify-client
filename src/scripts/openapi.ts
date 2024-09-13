import 'dotenv/config'
import fs from 'node:fs'
import openapiTS, { astToString, c } from 'openapi-typescript'

// import ts from 'typescript'

const INPUT = `${process.env.VITE_API_BASE_URL}/openapi.yaml`
const OUTPUT = process.argv[2]

// This creates an absolute cwd path from the given relative path
const CWD = new URL(`file://${process.cwd()}/`)
const ABSOLUTE_PATH = new URL(OUTPUT, CWD)

// const DATE = ts.factory.createTypeReferenceNode(
//   ts.factory.createIdentifier('Date'),
// ) // `Date`

// const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()) // `null`

// https://openapi-ts.dev/node#example-date-types
const ast = await openapiTS(INPUT, {
  enum: true,

  // Right now cannot convert date-time to Date because RTK complains about serialization
  // transform(schemaObject) {
  //   if (schemaObject.format === 'date-time') {
  //     return schemaObject.nullable
  //       ? ts.factory.createUnionTypeNode([DATE, NULL])
  //       : DATE
  //   }
  // },
})

fs.writeFile(ABSOLUTE_PATH, astToString(ast), () => {
  console.log(`🚀 ${c.green(`${INPUT} → ${c.bold(ABSOLUTE_PATH.pathname)}`)}`)
})
