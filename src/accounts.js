import R from 'ramda';

export const createAccount = function(name, type, bank, otherProps) {
  return {
    "accounts": [
      otherProps && R.merge(otherProps, {name, type, bank}) || {name, type, bank}
    ]
  };
};
