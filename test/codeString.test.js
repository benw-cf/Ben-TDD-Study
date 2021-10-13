"use strict";
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const fetch = require("node-fetch");
const {
  codeString,
  fontCheck,
  elementCheck,
  elementFunctionCheck,
  fetchFunctionsCheck,
  onFetchObj,
} = require("../src/codeString");

describe("CodeString", () => {
  let fetchStub;
  let onFetchStub;
  let apiLogicStub;
  beforeEach(() => {
    fetchStub = sinon.stub(fetch, "Promise");
    onFetchStub = sinon.stub(onFetchObj, "onFetch");
    apiLogicStub = sinon.stub(fetchFunctionsCheck, "apiLogic");
  });
  afterEach(() => {
    fetchStub.restore();
    onFetchStub.restore();
    apiLogicStub.restore();
  });
  context("Fonts", () => {
    it("should include font-family: apple-system", () => {
      expect(codeString).to.include("apple-system");
    });
    it("should not throw an error if doesn't have apple-system", () => {
      const { appleSystemCheck } = fontCheck;
      const appleSystemTest = appleSystemCheck("apple-system");
      expect(appleSystemTest).to.not.throw;
    });
    it("should include font-family: system-ui", () => {
      expect(codeString).to.include("system-ui");
    });
    it("should not throw an error if doesn't have system-ui", () => {
      const { systemUiCheck } = fontCheck;
      const systemUiTest = systemUiCheck("system-ui");
      expect(systemUiTest).to.not.throw;
    });
    it("should include font-family: BlinkMacSystemFont", () => {
      expect(codeString).to.include("BlinkMacSystemFont");
    });
    it("should not throw an error if doesn't have BlinkMacSystemFont", () => {
      const { blinkMacCheck } = fontCheck;
      const blinkMacTest = blinkMacCheck("BlinkMacSystemFont");
      expect(blinkMacTest).to.not.throw;
    });
    it("should include font-family: Segoe UI", () => {
      expect(codeString).to.include("Segoe UI");
    });
    it("should not throw an error if doesn't have Segoe UI", () => {
      const { segoeUICheck } = fontCheck;
      const segoeUITest = segoeUICheck("Segoe UI");
      expect(segoeUITest).to.not.throw;
    });
    it("should include font-family: Open Sans", () => {
      expect(codeString).to.include("Open Sans");
    });
    it("should not throw an error if doesn't have Open Sans", () => {
      const { openSansCheck } = fontCheck;
      const openSansTest = openSansCheck("Open Sans");
      expect(openSansTest).to.not.throw;
    });
    it("should include font-family: Helvetica Neue", () => {
      expect(codeString).to.include("Helvetica Neue");
    });
    it("should not throw an error if doesn't have Helvetica Neue", () => {
      const { helveticaNeueCheck } = fontCheck;
      const helveticaNeueTest = helveticaNeueCheck("Helvetica Neue");
      expect(helveticaNeueTest).to.not.throw;
    });
    it("should include font-family: Helvetica", () => {
      expect(codeString).to.include("Helvetica,");
    });
    it("should not throw an error if doesn't have Helvetica", () => {
      const { helveticaCheck } = fontCheck;
      const helveticaTest = helveticaCheck("Helvetica,");
      expect(helveticaTest).to.not.throw;
    });
    it("should include font-family: Arial", () => {
      expect(codeString).to.include("Arial");
    });
    it("should not throw an error if doesn't have Arial", () => {
      const { arialCheck } = fontCheck;
      const arialTest = arialCheck("Arial");
      expect(arialTest).to.not.throw;
    });
    it("should include font-family: sans-serif", () => {
      expect(codeString).to.include("sans-serif");
    });
    it("should not throw an error if doesn't have sans-serif", () => {
      const { sansSerifCheck } = fontCheck;
      const sansSerifTest = sansSerifCheck("sans-serif");
      expect(sansSerifTest).to.not.throw;
    });
    it("should not include font-family: serif", () => {
      expect(codeString).to.not.include(" serif");
    });

    it("should throw error if includes font-family: serif", () => {
      const { serifCheck } = fontCheck;
      try {
        serifCheck(" serif");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });
  context("Elements", () => {
    it("should contain one div element", () => {
      expect(codeString).to.include("div");
    });
    it("should throw an error if doesn't contain a div element", () => {
      const { divCheck } = elementCheck;
      try {
        divCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain one h1 element", () => {
      expect(codeString).to.include("h1");
    });
    it("should throw an error if doesn't contain a h1 element", () => {
      const { h1Check } = elementCheck;
      try {
        h1Check(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain h1 element with text 'Example Domain'", () => {
      expect(codeString).to.include("<h1>Example Domain</h1>");
    });
    it("should throw an error if doesn't contain a h1 element with text 'Example Domain'", () => {
      const { h1TextCheck } = elementCheck;
      try {
        h1TextCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain any 'p' elements", () => {
      expect(codeString).to.include("<p>");
    });
    it("should throw an error if doesn't <p> element", () => {
      const { pCheck } = elementCheck;
      try {
        pCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain 1 'a' tag inside 'p' element", () => {
      expect(codeString).to.include("<p><a");
    });
    it("should throw an error if doesn't have 'a' tag inside <p> element", () => {
      const { aTagCheck } = elementCheck;
      try {
        aTagCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain 'a' tag with href to wiki page", () => {
      expect(codeString).to.include(
        "href=https://www.iana.org/domains/example"
      );
    });
    it("should throw an error if doesn't have 'a' tag with href to wiki page ", () => {
      const { wikiCheck } = elementCheck;
      try {
        wikiCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain 'a' tag with text 'More information...'", () => {
      expect(codeString).to.include("More information...</a>");
    });
    it("should throw an error if doesn't have 'a' tag with text 'More information...", () => {
      const { moreInfoCheck } = elementCheck;
      try {
        moreInfoCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain title meta tag: Example Domain", () => {
      expect(codeString).to.include("<title>Example Domain</title>");
    });
    it("should throw an error if doesn't have title meta tag: Example Domain", () => {
      const { titleMetaTagCheck } = elementCheck;
      try {
        titleMetaTagCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should contain device scale=1 meta tag", () => {
      expect(codeString).to.include(
        "<meta name=viewport content=width=device-width, initial-scale=1"
      );
    });
    it("should throw an error if doesn't have device scale=1 meta tag", () => {
      const { deviceMetaTagCheck } = elementCheck;
      try {
        deviceMetaTagCheck(" ");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });
  context("Element Functions", () => {
    it("should have character count = 1114", () => {
      const { characterCount } = elementFunctionCheck;
      const characterCountResult = characterCount(codeString);
      expect(characterCountResult).to.be.a("number");
      expect(characterCountResult).to.be.equal(1114);
    });
    it("should throw error if character count != 1114", () => {
      const { characterCount } = elementFunctionCheck;
      try {
        characterCount("");
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
    it("should have div count = 4", () => {
      const { tagCount } = elementFunctionCheck;
      const tagCountResult = tagCount(codeString, "div");
      expect(tagCountResult).to.be.a("number");
      expect(tagCountResult).to.equal(4);
    });
    it("should have 'p' count = 2", () => {
      const { tagCount } = elementFunctionCheck;
      const tagCountResult = tagCount(codeString, "<p>");
      expect(tagCountResult).to.be.a("number");
      expect(tagCountResult).to.equal(2);
    });
    it("should have 'h1' count = 1", () => {
      const { tagCount } = elementFunctionCheck;
      const tagCountResult = tagCount(codeString, "<h1>");
      expect(tagCountResult).to.be.a("number");
      expect(tagCountResult).to.equal(1);
    });
    it("should have 'a' count = 1", () => {
      const { tagCount } = elementFunctionCheck;
      const tagCountResult = tagCount(codeString, "<a");
      expect(tagCountResult).to.be.a("number");
      expect(tagCountResult).to.equal(1);
    });
    it("should not fail if missing argument", () => {
      const { tagCount } = elementFunctionCheck;
      const tagCountResult = tagCount(codeString);
      expect(tagCountResult).to.be.a("number");
      expect(tagCountResult).to.not.throw;
    });
    it("should not fail if missing arguments", () => {
      const { tagCount } = elementFunctionCheck;
      const tagCountResult = tagCount();
      expect(tagCountResult).to.be.a("number");
      expect(tagCountResult).to.not.throw;
    });
    it("should console.log(missing tags) if tag count is < 5", () => {
      const spy = sinon.spy(elementFunctionCheck, "totalTagCount");
      const { totalTagCount } = elementFunctionCheck;
      totalTagCount(codeString);
      expect(totalTagCount).to.have.been.calledOnce;
      spy.restore();
    });
  });
  context("Fetch Requests", () => {
    context("callApi Function", () => {
      it("should call onFetch from callApi function", () => {
        const { callApi } = fetchFunctionsCheck;
        callApi();
        expect(onFetchStub).to.have.been.calledOnce;
      });
      it("should call onFetch with url: 'https://jsonplaceholder.typicode.com/todos/1'", async () => {
        const { callApi } = fetchFunctionsCheck;
        await callApi();
        expect(onFetchStub).to.have.been.calledWithMatch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
      });
      it("should call apiLogic with 'response' from onFetch(url)", async () => {
        onFetchStub.resolves("response string");
        const { callApi } = fetchFunctionsCheck;
        await callApi();
        expect(apiLogicStub).to.have.been.calledWith("response string");
      });
      it("should return response from apiLogic", async () => {
        apiLogicStub.resolves("response string");
        const { callApi } = fetchFunctionsCheck;
        const response = await callApi();
        expect(response).to.equal("response string");
      });
    });
    context("onFetch Function", () => {
      it("should call fetch once", () => {
        onFetchStub.restore();
        const { onFetch } = onFetchObj;
        onFetch();
        expect(fetchStub).to.have.been.calledOnce;
      });
    });
    context("apiLogic Function", () => {
      it("should be called once from callApi", async () => {
        const { callApi } = fetchFunctionsCheck;
        await callApi();
        expect(apiLogicStub).to.have.been.calledOnce;
      });
      it("should not throw error if status >= 200 && status < 300", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 200, body: "something" });
        } catch (error) {
          expect(error).to.not.be.instanceOf(Error);
        }
      });
      it("should throw error ('Bad Request') if status = 400", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 400 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error ('Unathorized') if status = 401", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 401 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error ('Not Found') if status = 404", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 404 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error ('Payload Too Large') if status = 413", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 413 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error ('Too Many Requests') if status = 429", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 429 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error ('Client Error: Bad Request') if status >= 430 && status < 500", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 439 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error ('Server Error: Please Try Later') if status >= 500", async () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({ status: 500 });
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error 'Network Connection Error' if no status code", () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({});
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
      it("should throw error 'No Content' if page is empty", () => {
        apiLogicStub.restore();
        const { apiLogic } = fetchFunctionsCheck;
        try {
          apiLogic({});
        } catch (error) {
          expect(error).to.be.instanceOf(Error);
        }
      });
    });
  });
});
