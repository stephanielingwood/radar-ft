var BASE_URL = process.env.WWW_URL;
var API_TOKEN = process.env.TOKEN;

describe('Github Radar App', function () {
  var tokenForm = element(by.model('accessToken'));
  var openButton = element(by.id('openButton'));
  var closeButton = element(by.id('closeButton'));
  var alertError = element(by.css('.alert-danger'));
  var alertInfo = element(by.css('.alert-info'));
  var mainPanel = element(by.css('.panel-body'));
  var openPanel = element(by.id('openPanel'));
  var closePanel = element(by.id('closePanel'));
  var backButtons = element.all(by.id('Back'));
  var backButton = backButtons.filter(function (elem) {
    return elem.isDisplayed();
  });
  beforeEach(function () {
    browser.get(BASE_URL);
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Issue Timeline');
  });

  it('should not have invalid date', function () {
    expect(alertInfo.getText())
      .not.toContain('Invalid Date');
  });

  it('should require access token', function () {
    openButton.click();
    expect(alertError.getText())
      .toContain('Please give your access token');
  });

  it('should connect to api but require a proper token', function () {
    tokenForm.sendKeys('abc');
    closeButton.click();
    expect(alertError.getText())
      .toContain('Please check your access token');
  });

  it('should render open issues and go back', function () {
    tokenForm.sendKeys(API_TOKEN);
    openButton.click();
    expect(openPanel.getText())
      .toContain('Open issues');
    backButton.click();
    expect(mainPanel.getText())
      .toContain('Github Issue Radar');
  });

  it('should render closed issues and go back', function () {
    tokenForm.sendKeys(API_TOKEN);
    closeButton.click();
    expect(closePanel.getText())
      .toContain('Closed issues');
    backButton.click();
    expect(mainPanel.getText())
      .toContain('Github Issue Radar');
  });
});
