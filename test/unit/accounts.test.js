import { createAccount  } from '../../src/accounts';
import { expect } from 'chai';

describe('Accounts', function() {

  it('returns a simple account doc', function () {
    const m = createAccount('My Account', 'checking', 'JP Morgan Chase');

    expect(m).to.have.property('accounts');
    expect(m.accounts).to.have.length(1);
    expect(m.accounts[0]).to.have.property('name');
    expect(m.accounts[0]).to.have.property('type');
    expect(m.accounts[0]).to.have.property('bank');
  });

  it('returns a simple account doc, with more properties', function () {
    const m = createAccount(
      'My Account',
      'credit',
      1,
      {apr: "23.99", limit: "1500.00"}
    );

    expect(m).to.have.property('accounts');
    expect(m.accounts).to.have.length(1);
    expect(m.accounts[0]).to.have.property('name');
    expect(m.accounts[0]).to.have.property('type');
    expect(m.accounts[0]).to.have.property('bank');
    expect(m.accounts[0]).to.have.property('apr');
    expect(m.accounts[0]).to.have.property('limit');
  });
});

