extern crate clap;
extern crate wasm_bindgen;

use clap::{Arg, App};
use wasm_bindgen::prelude::*;

fn main() {
  let matches = App::new("Smartmeter")
    .version("1.0")
    .author("Martijn Swaagman <info@martijnswaagman.nl>")
    .about("Read and parse smartmeter serialport output")
    .arg(Arg::with_name("port")
      .short("p")
      .long("port")
      .value_name("port")
      .help("Read from targetted serial port, defaults to `/dev/ttyUSB0`")
      .takes_value(true))
    .arg(Arg::with_name("type")
      .short("t")
      .long("type")
      .value_name("type")
      .help("Set type of smartmeter, defaults to `4.2`")
      .takes_value(true))
    .arg(Arg::with_name("raw")
      .short("r")
      .long("raw")
      .help("Print raw values without parsing"))
    .get_matches();
}
