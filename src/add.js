import R from 'ramda';

const mergeEvents = function(level, e1, e2) {
  if (level > 3) {
    return R.concat(e1, e2);
  }

  if (level >= 1 && level <= 3) {
    const result = {};

    Object.keys(e1).forEach((k) => {
      if (!e2[k]) {
        result[k] = e1[k];
      }

      if (e2[k]) {
        result[k] = mergeEvents(level + 1, e1[k], e2[k]);
      }
    });


    Object.keys(e2).forEach((k) => {
      if (!e1[k]) {
        result[k] = e2[k];
      }
    });

    return result;
  }
};

export default function(m1, m2) {
  let result = {};

  // Monthly
  if (m1.monthly || m2.monthly) {
    result.monthly = R.concat(
      m1.monthly && R.clone(m1.monthly) || [],
      m2.monthly && R.clone(m2.monthly) || []
    );
  }

  // Accounts
  if (m1.accounts || m2.accounts) {
    result.accounts = R.concat(
      m1.accounts && R.clone(m1.accounts) || [],
      m2.accounts && R.clone(m2.accounts) || []
    );
  }

  // Events
  if (m1.events || m2.events) {
    result.events = mergeEvents(1, m1.events || {}, m2.events || {});
  }

  return result;
};
