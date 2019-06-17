const { clipboard } = require('electron');

module.exports = function paste(mod) {
	const command = mod.command;
	let enabled = true;

	command.add(['paste', '!paste'], {
        $none() {
            enabled = !enabled;
			command.message('Paste mod '+(enabled ? 'Enabled' : 'Disabled') + '.');
		},
		$default() {
			command.message('Invalid command! see README for the list of valid commands')
		},
		test() {
			if(enabled) {
				command.message(clipboard.readText());
			}
		},
		p() {
			if(enabled) {
				sendMessage(clipboard.readText(),1);
			}
		},
		s() {
			if(enabled) {
				sendMessage(clipboard.readText(),0);
			}
		},
		pn() {
			if(enabled) {
				sendMessage(clipboard.readText(),21);
			}
		},
		c() {
			if(enabled) {
				sendMessage(clipboard.readText(),27);
			}
		},
		i() {
			if(enabled) {
				sendMessage(clipboard.readText(),32);
			}
		},
		in() {
			if(enabled) {
				sendMessage(clipboard.readText(),25);
			}
		},
		w(arg) {
			if(enabled && arg) {
				sendWhisper(clipboard.readText(),arg);
			}
		},
		g() {
			if(enabled) {
				sendMessage(clipboard.readText(),2);
			}
		}
	});

	/* say = 0, party = 1, guild = 2, area = 3, trade = 4, greet = 9,
	* private = 11-18, p-notice = 21, emote = 26, global = 27, r-notice = 25,
	* raid = 32, megaphone = 213, guild-adv = 214 */
	function sendMessage(msg, chan)
	{
		if(msg !== ''){
			mod.toServer('C_CHAT', 1, {
				channel: chan,
				message: msg
			});
		}
	}

	function sendWhisper(msg, target)
	{
		if(isValidName(msg)){
			mod.toServer('C_WHISPER', 1, {
				target: target,
				message: msg
			});
		}
	}

	//incomplete test, but better than nothing
	function isValidName(string) {
		var test = new RegExp('[a-z]+[.]?[a-z]+', 'i');
		return test.test(string);
	}

}
