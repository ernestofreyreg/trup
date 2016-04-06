import add from '../../src/add';
import { createMonthly } from '../../src/monthly';
import { createAccount } from '../../src/accounts';
import { createEvent } from '../../src/events';
import { expect } from 'chai';

describe('Add', function() {

  it('returns the add of the monthly docs', function() {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createMonthly('Another Expense', '-34.44', 2);

    const l = add(m, n);
    expect(l).to.have.property('monthly');
    expect(l.monthly).to.have.length(2);
  });


  it('returns the cloned monthly docs', function() {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createMonthly('Another Expense', '-34.44', 2);

    const l = add(m, n);
    m.name = 'Changed Name';
    n.value = '-90.00';

    expect(l).to.have.property('monthly');
    expect(l.monthly[0].name).to.not.equal(m.name);
  });

  it('returns the add of monthly and account docs', function() {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createAccount('My Chase', 'checking', 'JP Morgan Chase');

    const l = add(m, n);
    expect(l).to.have.property('monthly');
    expect(l).to.have.property('accounts');
    expect(l.monthly).to.have.length(1);
    expect(l.accounts).to.have.length(1);
  });

  it('Adding another doc', function() {
    const m = createMonthly('Expense Name', '-100.00', 1);
    const n = createAccount('My Chase', 'checking', 'JP Morgan Chase');
    const l = add(add(m, n), createMonthly('Rent', '-2552.00', 'last'));

    expect(l).to.have.property('monthly');
    expect(l).to.have.property('accounts');
    expect(l.monthly).to.have.length(2);
    expect(l.accounts).to.have.length(1);
  });

  it('Adding events, different months', function() {
    const m = createEvent(new Date(2016, 3, 31), 'Rent', '-2552.00');
    const n = createEvent(new Date(2016, 2, 31), 'Rent', '-2139.00');
    const l = add(m, n);

    expect(l).to.have.property('events').to.have.property('2016');
  });

  it('Adding events, different day', function() {
    const m = createEvent(new Date(2016, 3, 30), 'Rent', '-2552.00');
    const n = createEvent(new Date(2016, 3, 21), 'Car loan', '-535.00');
    const l = add(m, n);

    expect(l)
      .to.have.property('events')
      .to.have.property('2016')
      .to.have.property('4')
      .to.have.property('30');

    expect(l)
      .to.have.property('events')
      .to.have.property('2016')
      .to.have.property('4')
      .to.have.property('21');
  });

  it('Adding events, same day', function() {
    const m = createEvent(new Date(2016, 3, 21), 'Car Insurance', '-187.00');
    const n = createEvent(new Date(2016, 3, 21), 'Car loan', '-311.00');
    const l = add(m, n);

    expect(l)
      .to.have.property('events')
      .to.have.property('2016')
      .to.have.property('4')
      .to.have.property('21')
      .to.have.length(2);

  });
});

