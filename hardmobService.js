// Just run `node extractor.js`

const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const fs = require("fs");

async function getPromotions() {
  try {
    const { data } = await axios.get(
      "https://www.hardmob.com.br/forums/407-Promocoes"
    );

    const $ = cheerio.load(data);

    const products = [];
    const urlPrefix = "https://www.hardmob.com.br/";

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
      //   console.log("###");
      //   console.log("###", `${urlPrefix}${el[1].attribs["href"]}`);
      products.push({ name, href });
    });

    console.log("products", products);
    return products;

    // $("#produtos > tbody > tr").each(function(i, elem) {
    //   const code = $(this)
    //     .children()
    //     .eq(0)
    //     .first()
    //     .text()
    //     .trim();
    //   const name = $(this)
    //     .children()
    //     .eq(1)
    //     .first()
    //     .text()
    //     .trim();
    //   const group = $(this)
    //     .children()
    //     .eq(2)
    //     .first()
    //     .text()
    //     .trim();
    //   codes.push({
    //     code,
    //     name,
    //     group
    //   });
    // });
    // return codes;
  } catch (error) {
    console.error(error);
  }
}

// getPromotions();
module.exports = {
  getPromotions
};
