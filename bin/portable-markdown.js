#!/usr/bin/env node

const path = require('path')

const cwd = process.cwd()
const portableMarkdown = require(path.resolve(__dirname, '..', 'index'))

const pckg = require(path.resolve(cwd, 'package.json'))

const options = pckg.config && pckg.config.pmd && pckg.config.pmd.options

portableMarkdown({
  entry: process.env.npm_package_config_pmd_entry,
  target: process.env.npm_package_config_pmd_target
}, options || {})
