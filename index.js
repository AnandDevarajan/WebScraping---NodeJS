const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require(fs);
const json2csv = require("json2csv").Parser;

const phone =
  "https://www.amazon.in/Apple-iPhone-Pro-Max-64GB/dp/B07XVLMZHH/ref=sr_1_2?crid=2XB8OHRIFGY1J&dchild=1&keywords=iphone+11+pro+max+512gb&qid=1593516900&sprefix=iphone+%2Caps%2C364&sr=8-2";

(async () => {
  let phoneData = [];
  const response = await request({
    uri: phone,
    headers: {
      accept: "text/html; charset=utf-8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9,ta;q=0.8",
    },
    gzip: true,
  });
  let $ = cherio.load(response);
  const title = $(
    'div[class="a-section a-spacing-none"]>h1>span'
  ).textContent.trim();
  const rating = $('div[class="a-row"]>span').textContent;
  const review = $(
    'div[class="a-expander-content reviewText review-text-content a-expander-partial-collapse-content"]>span'
  ).textContent;
  const size = $('div[class="a-row a-spacing-micro singleton"]>span')
    .textContent;
  const price = $(
    'div[class="a-section a-spacing-small"]>table[class="a-lineitem"]>tbody>tr>td[class="a-span12"]>span'
  ).textContent;
  phoneData.push({
    title,
    rating,
    review,
    size,
    price,
  });
})();
