const axios = require("axios");
const https = require('https');

const api = axios.create({
  baseURL: "https://paysuite.co.mz/api/request",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

module.exports = api;
