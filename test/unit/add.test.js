import add from '../../src/add';
import { createMonthly } from '../../src/monthly';
import { createAccount } from '../../src/accounts';
import { expect } from 'chai';

describe('Add', function() {

  it('returns the add of the monthly docs', function () {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createMonthly('Another Expense', '-34.44', 2);

    const l = add(m, n);
    expect(l).to.have.property('monthly');
    expect(l.monthly).to.have.length(2);
  });


  it('returns the cloned monthly docs', function () {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createMonthly('Another Expense', '-34.44', 2);

    const l = add(m, n);
    m.name = 'Changed Name';
    n.value = '-90.00';

    expect(l).to.have.property('monthly');
    expect(l.monthly[0].name).to.not.equal(m.name);
  });

  it('returns the add of monthly and account docs', function () {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createAccount('My Chase', 'checking', 'JP Morgan Chase');

    const l = add(m, n);
    expect(l).to.have.property('monthly');
    expect(l).to.have.property('accounts');
    expect(l.monthly).to.have.length(1);
    expect(l.accounts).to.have.length(1);
  });

  it('Adding another doc', function () {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createAccount('My Chase', 'checking', 'JP Morgan Chase');

    const l = add(add(m, n), createMonthly('Rent', '-2552.00', 'last'));


    expect(l).to.have.property('monthly');
    expect(l).to.have.property('accounts');
    expect(l.monthly).to.have.length(2);
    expect(l.accounts).to.have.length(1);
  });
});

