const { load } = require("../../lib/store");
export default function handler(req, res) {
  res.json(load().customers);
}
