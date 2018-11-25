const axios = require("axios");
const cheerio = require("cheerio");

async function getPromotions() {
  try {
    const urlPrefix = "https://www.hardmob.com.br/";

    const { data } = await axios.get(`${urlPrefix}/forums/407-Promocoes`);

    const $ = cheerio.load(data);

    const products = [];

    $("#threads > li").each(function(i, elem) {
      const el = $(this)
        .children()
        .first()
        .children()
        .first()
        .children()
        .last()
        .children()
        .first()
        .children();
      const name = el.text();
      const href = `${urlPrefix}${el[1].attribs["href"]}`;
      products.push({ name, href });
    });

    return products;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getPromotions
};
