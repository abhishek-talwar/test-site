const fs = require("fs");
const path = require("path");

const DATA = path.join(process.cwd(), "data", "db.json");

function load() {
  return JSON.parse(fs.readFileSync(DATA, "utf8"));
}

function save(db) {
  fs.writeFileSync(DATA, JSON.stringify(db, null, 2));
}

function mutate(fn) {
  const db = load();
  const result = fn(db);
  save(db);
  return result === undefined ? db : result;
}

module.exports = { load, save, mutate };
