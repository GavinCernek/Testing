const root = document.getElementById('root');
const btn = document.getElementById('btn');

class Test {
	root;
	trigger;
	fetch;

	constructor(root, trigger, fetch) {
		this.root = root;
		this.trigger = trigger;
		this.fetch = fetch;
	}

	async update() {
		try {
			const res = await this.fetch();
			this.root.innerHTML = res;
		} catch (error) {
			console.error(error);
		}
	}
}

const test = new Test(root, btn, async () => {
	try {
		const res = await fetch('/html');

		const reader = res.body.getReader();
		const stream = await reader.read();

		const html = new TextDecoder().decode(stream.value);
		return html;
	} catch (error) {
		console.error(error);
	}
});

test.trigger.addEventListener('click', async () => test.update());
