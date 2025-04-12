const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./use/1-node-farm/modules/replaceTemplate");
// file start
// // //synchrnous way
// // const textIn = fs.readFileSync(
// //   "./use/1-node-farm/final/txt/input.txt",
// //   "utf-8"
// // );
// // console.log(textIn);

// // const textout = `this is what we know about me : ${textIn}.\nCreated on ${Date.now()}`;
// // fs.writeFileSync("./use/1-node-farm/final/txt/output.txt", textout);
// // console.log("seccesfull!");

// //unsync way
// fs.readFile("./use/1-node-farm/final/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("error");
//   fs.readFile(
//     "./use/1-node-farm/final/txt/read-this.txt",
//     "utf-8",
//     (err, data2) => {
//       console.log(data2);
//       fs.readFile(
//         "./use/1-node-farm/final/txt/append.txt",
//         "utf-8",
//         (err, data3) => {
//           console.log(data3);
//           fs.writeFile(
//             "./use/1-node-farm/final/txt/final.txt",
//             `${data2}\n${data3}`,
//             "utf-8",
//             (err) => {}
//           );
//           console.log("done");
//         }
//       );
//     }
//   );
// });
// console.log("will read file");
// file end //

//server

const tempOverview = fs.readFileSync(
  `${__dirname}/use/1-node-farm/starter/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/use/1-node-farm/starter/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/use/1-node-farm/starter/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(
  `${__dirname}/use/1-node-farm/final/dev-data/data.json`,
  "utf-8"
);

const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName), { lower: true });
console.log(slugs);
console.log(slugify("fresh-avacados", { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview-page

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardshtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%cards%}", cardshtml);

    res.end(output);
    //product page
  } else if (pathname === "/product") {
    console.log(query);
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    //error

    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening");
});
