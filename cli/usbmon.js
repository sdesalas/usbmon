#!/usr/bin/env node

//
// usbmon.js
//
// Monitor USB devices and restarts a process when changes detected.
//
// Usage:
//
// usbmon node my/target/process.js
//

var usb = require('usb');
var child_process = require('child_process');
var target_process = process.argv[2];
var target_process_args = process.argv.slice(3);
var running_process;
var last;

if (!target_process) {

	console.info('');
	console.info('Usage: usbmon <command>');
	console.info('');
	console.info('where <command> is any cli command for your system');
	console.info('');
	console.info('Examples:');
	console.info('');
	console.info('usbmon ls');
	console.info('usbmon lsusb');
	console.info('usbmon curl -I http://my.domain.com/notify/usb/change?device=6b2e0a8');
	console.info('');

} else {

	console.log(`USBMON: Target process: "${process.argv.slice(2).join(' ')}"`);

	setInterval(monitor, 1000);

} 

function monitor() {
	// Check USB device list
	var latest = JSON.stringify(usb.getDeviceList());
	if (latest !== last) {
		restart();
	}
	last = latest;
}

function restart() {
	console.log(`USBMON: Changes detected\n`);
	// Send kill signat
	if (running_process) {
		running_process.kill('SIGINT');
	}
	// Wait 200ms and spawn new process
	setTimeout(() => {
		running_process = child_process.spawn(target_process, target_process_args);
		running_process.stdout.on('data', data => console.log(`   |${String(data).replace(/\n/g, '\n   |')}`));
		running_process.stderr.on('data', data => console.log(`   |${String(data).replace(/\n/g, '\n   |')}`));
	}, 200);
}

