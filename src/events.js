import R from 'ramda';

export const createEvent = function(date, name, amount, otherProps) {
  return {
    "events": {
      [String(date.getFullYear())]: {
        [String(date.getMonth() + 1)]: {
          [String(date.getDate())]: [
            otherProps && R.merge(otherProps, {name, amount}) || {name, amount}
          ]
        }
      }
    }
  };
};
