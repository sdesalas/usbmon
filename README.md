# usbmon

CLI monitoring of USB devices. Reruns a process when USB devices updated.

## Installation:

```sh
$ npm install usbmon -g
```

## Usage:

Rerun a CLI process whenever USB devices change

```sh
$ usbmon

Usage: usbmon <command>

where <command> is any cli command for your system

Examples:

usbmon ls
usbmon lsusb
usbmon curl -I http://my.domain.com/notify/usb/change?device=6b2e0a8
```

Note that `usbmon` uses the `libudev` behind the scenes. In Ubuntu linux you might need to install it:

```
sudo apt-get install build-essential libudev-dev
```
