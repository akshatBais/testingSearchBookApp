const express = require('express');
const axios = require("axios");
const cors = require("cors");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

const server = express();

server.listen(3001);


console.log("server is on and listening on port 3001");

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use('/getDetails',(req,res)=> {
  console.log("getting info about one book");
  console.log(req.query.q);
  let result2 = '';
  axios.get('https://www.goodreads.com/search/index.xml?key=LsvXe6tyOcFzGePEMDiw&q='+ req.query.q)
  .then(resp=> {
    parser.parseString(resp.data, function(err, result) {
      console.log(result);
        result2 = result;
    });
res.send(result2);
  });

});

server.get('/getBooks', (req,res)=> {
  console.log("getting all the books");
  console.log(req.query.q);
  let result2 = '';
  axios.get('https://www.goodreads.com/search/index.xml?key=LsvXe6tyOcFzGePEMDiw&q='+ req.query.q)
  .then(resp=> {
      parser.parseString(resp.data, function(err, result) {
        result2 = result.GoodreadsResponse.search[0].results[0];
        console.log(result2);
        res.send(result2);
      });

    });

});
