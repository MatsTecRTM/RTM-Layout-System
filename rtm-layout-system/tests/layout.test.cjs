const { test } = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
require('../../../tests/load-typescript.cjs')(require('typescript'));
const { default: FooterBar } = require('../src/components/layout/FooterBar.tsx');
const { lightTheme, darkTheme, getColors } = require('../src/theme/rtmTheme.ts');

test('light/dark themes keep the correct palette and distinct text colors', () => {
  assert.equal(lightTheme.palette.mode, 'light');
  assert.equal(darkTheme.palette.mode, 'dark');
  assert.notEqual(getColors(lightTheme).textPrimary, getColors(darkTheme).textPrimary);
});

test('footer renders configured legal links and version; null disables legal links', () => {
  const html = renderToStaticMarkup(React.createElement(FooterBar, {
    impressumPath: '/legal', datasecurityPath: '/privacy', version: 'test-1', copyrightText: 'Synthetic test',
  }));
  assert.match(html, /<footer/);
  assert.match(html, /href="\/legal"/);
  assert.match(html, /href="\/privacy"/);
  assert.ok(html.includes('test-1'));
  const hidden = renderToStaticMarkup(React.createElement(FooterBar, { impressumPath: null, datasecurityPath: null }));
  assert.doesNotMatch(hidden, /href=/);
});
