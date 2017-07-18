# usbmon

Monitor USB devices and restart a process when changes detected.

## Usage:

Rerun a CLI process whenever USB devices change

```sh
$ npm install usbmon -g
+ usbmon@1.0.2

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
