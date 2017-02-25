#!/usr/bin/env node

const path = require('path')

const portableMarkdown = require(path.resolve(__dirname, '..', 'index'))

portableMarkdown({
  entry: process.env.npm_package_config_pmd_entry,
  target: process.env.npm_package_config_pmd_target
})
