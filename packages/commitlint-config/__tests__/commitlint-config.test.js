'use strict';

const commitlintConfig = require('../lib/index.js');
const assert = require('assert').strict;

// 验证导出的是对象
assert.strictEqual(typeof commitlintConfig, 'object');
assert.notStrictEqual(commitlintConfig, null);

// 验证 parserPreset
assert.strictEqual(commitlintConfig.parserPreset, 'conventional-changelog-conventionalcommits');

// 验证 rules 存在且包含关键规则
const { rules } = commitlintConfig;
assert.strictEqual(typeof rules, 'object');

// 验证关键规则
assert.deepStrictEqual(rules['type-enum'], [2, 'always', ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert']]);
assert.deepStrictEqual(rules['type-empty'], [2, 'never']);
assert.deepStrictEqual(rules['subject-empty'], [2, 'never']);
assert.deepStrictEqual(rules['header-max-length'], [2, 'always', 100]);

console.info('commitlintConfig tests passed');
