const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);


const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

// búa til fall sem les lectures.json af disk. Nota dæmi frá sýnilausn?
async function lesaskra() {
  const skra = await readFile('./lectures.json');

  const json = JSON.parse(skra);

  return json;
}

async function list(req, res) {
  /* todo útfæra */
  // lesa fyrirlestrana inn og birta
  const title = 'Fyrirlestrar';
  const data = await lesaskra(); // Lesaskra skilar json object...
  const { lectures } = data;

  // console.log(lectures);
  res.render('index', { title, lectures });
}

async function lecture(req, res, next) {
  /* todo útfæra */
  const title = 'Fyrirlestur';
  const data = await lesaskra(); // Lesaskra skilar json object...
  const { lectures } = data;

  const slug = req.params.slug; // eslint-disable-line

  res.render('fyrirlestur', { slug, lectures, title });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
