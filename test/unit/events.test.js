import { createEvent  } from '../../src/events';
import { expect } from 'chai';

describe('Events', function() {

  it('returns a simple event doc', function () {
    const m = createEvent(new Date(), 'Rent', '-2552.00');

    expect(m).to.have.property('events');
  });

  it('returns a simple event doc, with other props', function () {
    const m = createEvent(new Date(), 'Rent', '-2552.00', {'destination': 'BoA Savings'});

    expect(m).to.have.property('events');
  });
});

