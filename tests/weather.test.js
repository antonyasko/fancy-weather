const changeUnit = require('./../modules/changeUnitTemp.js');

test('adds 68° to equal 20°', () => {
  expect(changeUnit.getCelsius('68°')).toBe('20°');
});

test('adds 32° to equal 0°', () => {
  expect(changeUnit.getCelsius('32°')).toBe('0°');
});

test('adds 0° to equal 18°', () => {
  expect(changeUnit.getCelsius('0°')).toBe('-18°');
});

test('adds 41.1° to equal 5°', () => {
  expect(changeUnit.getCelsius('41.1°')).toBe('5°');
});

test('adds 13.7° to equal -10°', () => {
  expect(changeUnit.getCelsius('13.7°')).toBe('-10°');
});

test('adds -5° to equal 23°', () => {
  expect(changeUnit.getFahrenheit('-5°')).toBe('23°');
});

test('adds 0° to equal 32°', () => {
  expect(changeUnit.getFahrenheit('0°')).toBe('32°');
});

test('adds 5.5° to equal 42°', () => {
  expect(changeUnit.getFahrenheit('5.5°')).toBe('42°');
});

test('adds -21.7° to equal -7°', () => {
  expect(changeUnit.getFahrenheit('-21.7°')).toBe('-7°');
});

test('adds 33.3° to equal 92°', () => {
  expect(changeUnit.getFahrenheit('33.3°')).toBe('92°');
});

test('adds 12 to equal 53,6', () => {
  expect(changeUnit.toFahrenheit(12)).toBe(53.60);
});

test('adds 11.5 to equal 52.70', () => {
  expect(changeUnit.toFahrenheit(11.5)).toBe(52.70);
});

test('adds -3.3 to equal 26.06', () => {
  expect(changeUnit.toFahrenheit(-3.3)).toBe(26.06);
});

test('adds -15.2 to equal 4.64', () => {
  expect(changeUnit.toFahrenheit(-15.2)).toBe(4.64);
});

test('adds 27.4 to equal 81.32', () => {
  expect(changeUnit.toFahrenheit(27.4)).toBe(81.32);
});
