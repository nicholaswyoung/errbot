var errbot = require('../')
,   expect = require('chai').expect;

describe('#create', function () {
  it('should return an error with the supplied attributes', function () {
    var err = errbot.create(401, 'Bad Field', { errors: 'Bad Field' });
    expect(err.isBot).to.equal(true);
    expect(err.message).to.equal('Bad Field');
    expect(err.code).to.equal(401);
    expect(err.data).to.have.property('errors');
  });
});

describe('#notFound', function () {
  it('should return a 404 Not Found Error', function () {
    var err = errbot.notFound();
    expect(err.code).to.equal(404);
  });
});

describe('#error', function () {
  it('should return a 500 Server Error', function () {
    var err = errbot.error();
    expect(err.code).to.equal(500);
  });
});

describe('#conflict', function () {
  it('should return a 409 Conflict Error', function () {
    var err = errbot.conflict();
    expect(err.code).to.equal(409);
  });
});

describe('#unauthorized', function () {
  it('should return a 401 Unauthorized Error', function () {
    var err = errbot.unauthorized();
    expect(err.code).to.equal(401);
  });
});

describe('#forbidden', function () {
  it('should return a 403 Forbidden Error', function () {
    var err = errbot.forbidden();
    expect(err.code).to.equal(403);
  });
});

describe('Setting a custom error message', function () {
  it('should save and return the custom error', function () {
    var err = errbot.error('Something went wrong.');
    expect(err.message).to.equal('Something went wrong.');
  });
});

describe('Setting custom data', function () {
  it('should return the custom data object', function () {
    var err = errbot.error({ errors: 'Custom Error Object'} );
    expect(err.data).to.have.property('errors');
    expect(err.data.errors).to.equal('Custom Error Object');
  });
});

describe('Setting custom error message and data', function () {
  it('should return both the error message and data', function () {
    var err = errbot.error(
      'Custom Error',
      {
        errors: 'Custom Error Object Data',
        fields: ['title', 'description']
      }
    );

    expect(err.message).to.equal('Custom Error');
    expect(err.data).to.have.property('errors');
    expect(err.data).to.have.property('fields');
  });
});

describe('Wrapping errors', function () {
  describe('when it is an errbot object', function () {
    it('should return the same object', function () {
      var parent, sibling;

      parent = errbot.initialize(404, 'Custom Error Message', {
        title: 'Hello'
      });

      sibling = errbot.wrap(parent);

      expect(sibling).to.equal(parent);
    });
  });

  describe('when it is a generic Error object', function () {
    it('should return a wrapped Error', function () {
      var parent, sibling;

      parent  = new Error();
      sibling = errbot.wrap(parent, 409, 'Custom Error Message', {
        ship: 'Enterprise'
      });

      expect(sibling.code).to.equal(409);
      expect(sibling.message).to.equal('Custom Error Message');
      expect(sibling).to.have.property('data');
      expect(sibling.data.ship).to.equal('Enterprise');
    });
  });
});
