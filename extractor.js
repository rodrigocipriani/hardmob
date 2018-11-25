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

getPromotions();

// function getDetail(numero) {
//   const call = axios({
//     method: "POST",
//     headers: { "content-type": "application/x-www-form-urlencoded" },
//     data: qs.stringify({
//       numero
//     }),
//     url: "http://www.nware.com.br/tbca/tbca/model/itemProdutoMedDAO.php"
//   });
//   return call
//     .then(({ data }) => {
//       const details = [];
//       const $ = cheerio.load(data);
//       $("#itproduto > tbody > tr").each(function(i, elem) {
//         const component = $(this)
//           .children()
//           .eq(0)
//           .first()
//           .text()
//           .trim();
//         const unit = $(this)
//           .children()
//           .eq(1)
//           .first()
//           .text()
//           .trim();
//         const valueBy100g = $(this)
//           .children()
//           .eq(2)
//           .first()
//           .text()
//           .trim();
//         const fullSponSoup25 = $(this)
//           .children()
//           .eq(3)
//           .first()
//           .text()
//           .trim();
//         details.push({
//           component,
//           unit,
//           valueBy100g,
//           fullSponSoup25
//         });
//       });
//       return details;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

// function saveJson(json) {
//   const text = JSON.stringify(json);
//   fs.writeFile("db.json", text, "utf8", err => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("File has been created");
//   });
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }

// const mergeDetails = async products => {
//   const dbJson = [];
//   await asyncForEach(products, async product => {
//     // await sleep(50);
//     const details = await getDetail(product.code);
//     const productWithDetails = { ...product, details };
//     dbJson.push(productWithDetails);
//     console.log(product.code);
//     // console.log("product", productWithDetails);
//   });
//   console.log("Done");
//   console.log("extract completed");
//   return dbJson;
// };

// async function extractAndSaveOnDisk() {
//   const products = await getProducts();
//   saveJson(mergeDetails(products));
//   console.log("saved on disk");
// }

// extractAndSaveOnDisk();
