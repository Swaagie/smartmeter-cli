'use strict';

const { Command, flags } = require('@oclif/command');
const { Reader, Parser } = require('@smartmeter/core');
const { cli } = require('cli-ux');

class SmartmeterCliCommand extends Command {
  tabular(time, data) {
    cli.table(Object.keys(data).map(key => ({ value: data[key], key })), {
      key: {
        header: 'Measurement',
        minWidth: 25
      },
      value : {
        header: 'Value'
      }
    });

    this.log('\n');
  }

  async run() {
    const { flags } = this.parse(SmartmeterCliCommand);
    const parser = new Parser();
    const reader = new Reader({
      config: flags.config
    });

    parser.on('parsed', this.tabular.bind(this));

    reader
      .on('error', console.error)
      .on('signal', parser.parse.bind(parser))
      .open();
  }
}

SmartmeterCliCommand.description = 'Parse and read enengy smartmeter in home.';

SmartmeterCliCommand.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  config: flags.string({
    char: 'c',
    description: 'JSON configuration to use',
    parse: path => require(path)
  })
};

module.exports = SmartmeterCliCommand;
