var UiElement = function(selector, event, callback) {
	let el = document.querySelector(selector);
	if (el) {
		el.addEventListener(event, callback);
	}
};

module.exports = UiElement;
