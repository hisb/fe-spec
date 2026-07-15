const assert = require('assert');
const path = require('path');

let stylelint;
const configFile = path.join(__dirname, '../lib/stylelint-config.js');

beforeAll(async () => {
  // stylelint v17 是纯 ESM 模块（ .mjs ），不能直接用 require() 。
  stylelint = (await import('stylelint')).default;
});

describe('stylelintConfig', () => {
  const lint = async (file) => {
    const { errored, results } = await stylelint.lint({
      files: [path.join(__dirname, file)],
      configFile,
      fix: false
    });
    if (errored && results.length > 0) {
      const warnings = results.filter(item => item.errored || item.warnings.length > 0);
      if (warnings.length > 0) {
        assert.fail(
          warnings
            .map(r => r.warnings.map(w =>
              `  ${r.source}:${w.line}:${w.column}  ${w.rule}  ${w.text}`
            ).join('\n'))
            .join('\n')
        );
      }
      assert.ok(warnings.length === 0);
    }
  };

  it('test css', async () => {
    await lint('test.css');
  });

  it('test scss', async () => {
    await lint('test.scss');
  });

  it('test module', async () => {
    await lint('css-module.scss');
  });
});
