it('adds 1 + 2 to equal 3', () => {
  const sum = require('../sum')['default'];
  expect(sum(1, 2)).toBe(3);
});
