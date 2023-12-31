const axios = require("axios");
const cheerio = require("cheerio");

exports.fetchDistance = ({ postcode }) => {
  const url = `https://www.nhs.uk/service-search/find-a-dentist/results/${postcode}?Location=${postcode}&Latitude=&Longitude=&DentistAcceptingAdults=true`;

  return axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const dentists = [];

      $("#distance_0", html).each(function () {
        const item = $(this).text();
        dentists.push({ item });
      });

      $("#address_0", html).each(function () {
        const item = $(this).text();
        dentists.push({ item });
      });

      if (dentists.length === 0) {
        return Promise.resolve({ error: `Cannot find ${postcode}` });
      }

      let first, second;
      if (dentists[0].item !== undefined) first = dentists[0].item;
      if (dentists[1].item !== undefined) second = dentists[1].item;

      return [first, second];
    })
    .catch((err) => console.log(err));
};
