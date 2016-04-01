import R from 'ramda';

export const createMonthly = function(name, value, day, otherProps) {
  return {
    "monthly": [
      otherProps && R.merge(otherProps, {name, value, day}) || {name, value, day}
    ]
  };
};
