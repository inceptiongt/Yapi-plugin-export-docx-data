const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
/* eslint-disable-next-line */
const yapi = require('yapi.js');
// const data = require('./api.json')

const fs = require('fs');
const path = require('path');
const parser = require('./parser.js');

// Load the docx file as a binary

function toDocx(data) {
  const content = fs
    .readFileSync(path.resolve(yapi.WEBROOT_SERVER, '../', 'input.docx'), 'binary');

  const zip = new JSZip(content);

  const doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setOptions({ linebreaks: true, parser });

  // set the templateVariables
  doc.setData(JSON.parse(data));

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    // The error thrown here contains additional information
    // when logged with JSON.stringify (it contains a property object).
    throw error;
  }

  const buf = doc.getZip()
    .generate({ type: 'nodebuffer' });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  // fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
  return buf;
}
module.exports = toDocx;
