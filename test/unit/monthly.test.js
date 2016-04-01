import { createMonthly  } from '../../src/monthly';
import { expect } from 'chai';

describe('Monthly', function() {

  it('returns a simple monthly doc', function () {
    const m = createMonthly('Expense Name', '-100.00', 1);

    expect(m).to.have.property('monthly');
    expect(m.monthly).to.have.length(1);
    expect(m.monthly[0]).to.have.property('name');
    expect(m.monthly[0]).to.have.property('value');
    expect(m.monthly[0]).to.have.property('day');
  });

  it('returns a simple monthly doc, with more properties', function () {
    const m = createMonthly(
      'Expense Name',
      '-100.00',
      1,
      {taxIncluded: false, tags: ['Tag1', 'Tag2'], span: 12}
    );

    expect(m).to.have.property('monthly');
    expect(m.monthly).to.have.length(1);
    expect(m.monthly[0]).to.have.property('name');
    expect(m.monthly[0]).to.have.property('value');
    expect(m.monthly[0]).to.have.property('day');
    expect(m.monthly[0]).to.have.property('taxIncluded');
    expect(m.monthly[0]).to.have.property('tags');
    expect(m.monthly[0]).to.have.property('span');
  });
});

