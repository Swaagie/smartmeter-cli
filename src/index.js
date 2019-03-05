'use strict';

const { Command, flags } = require('@oclif/command');
const { Reader, Parser } = require('@smartmeter/core');

class SmartmeterCliCommand extends Command {
  async run() {
    const { flags } = this.parse(SmartmeterCliCommand);
    const parser = new Parser();
    const reader = new Reader({
      config: flags.config
    });

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
