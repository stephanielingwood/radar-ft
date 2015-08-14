var superagent = require("superagent");
var chai = require("chai");
var expect = chai.expect;
var should = require("should");

var URL = process.env.URL;
var token = process.env.TOKEN;

// don't run the rest of the tests until we get a response
describe("Index", function () {
  this.timeout(255000);

  it("renders something", retryFunction.bind(null, 10, 500));

  function retryFunction(maxTries, interval, done) {
    superagent.get(URL)
    .end(function (err, res) {
      if (res) {
        (err === null).should.equal(true);
        res.statusCode.should.equal(200);
        done();
      } else if (maxTries > 0) {
        setTimeout(function() {
          retryFunction(maxTries - 1, Math.min(254000, interval * 2), done);
        }, interval);
      } else {
        // no response
        expect(URL, URL + ' is unavailable').to.equal(true);
      }
    });
  }
});

describe("Open issues", function () {
  it("renders open issues info", function (done) {
    superagent.get(URL + "/issues?repo=shippable/support&token=" + token +
      "&days=2&daysEnd=5&state=Open")
    .end(function (err, res) {
      (err === null).should.equal(true);
      res.should.be.json;
      res.text.should.containEql("open");
      res.statusCode.should.equal(200);
      done();
    });
  });
});

describe("Closed issues", function () {
  it("renders closed issues info", function (done) {
    superagent.get(URL + "/issues?repo=shippable/support&token=" + token +
      "&days=2&daysEnd=5&state=Close")
    .end(function (err, res) {
      (err === null).should.equal(true);
      res.should.be.json;
      res.text.should.containEql("close");
      res.statusCode.should.equal(200);
      done();
    });
  });
});

describe("Failed auth", function () {
  it("Should not render issues page, instead main page", function (done) {
    superagent.get(URL + "/issues?repo=shippable/support&token=" +
      "no&days=2&daysEnd=5&state=Open")
    .end(function (err, res) {
      res.text.should.not.containEql("open");
      res.text.should.not.containEql("close");
      done();
    });
  });
});
