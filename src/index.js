'use strict';

const { Command, flags } = require('@oclif/command');
const { Reader, Parser } = require('@smartmeter/core');
const { cli } = require('cli-ux');

const kw = 'kw/h';
const hr = {
  lowTariffReceived: {
    title: 'Power consumption (low)',
    unit: kw
  },
  highTariffReceived: {
    title: 'Power consumption (high)',
    unit: kw
  },
  lowTariffDelivered: {
    title: 'Power production (low)',
    unit: kw
  },
  highTariffDelivered: {
    title: 'Power production (high)',
    unit: kw
  },
  consumption: {
    title: 'Current consumption',
    unit: kw
  },
  production: {
    title: 'Current production',
    unit: kw
  },
  gasConsumption: {
    title: 'Gas consumption',
    unit: 'm3'
  }
}

class SmartmeterCliCommand extends Command {
  tabular(time, data) {
    cli.table(Object.keys(data).map(key => ({ key: hr[key][title], value: data[key], unit: hr[key][unit] })), {
      key: {
        header: 'Measurement',
        minWidth: 40
      },
      value: {
        header: 'Value'
        minWidth: 10
      },
      unit: {
        header: ''
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
