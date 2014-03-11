define(function(require, exports, module){

	var Dispatcher = require('dispatcher');

	var Controller = {

		aborted: false,

		abort: function() {
			this.aborted = true;
		},

		execute: function(method, args, special) {

			if(special !== null) {
				if(special) {
					this.beforeSpecial();
				} else {
					this.before();
				}
			}

			if(!this.aborted) {
				this[method].apply(this, args);
			}

			if(special !== null && !this.aborted) {
				if(special) {
					this.afterSpecial();
				} else {
					this.after();
				}
			}
		},

		before: function() {},

		beforeSpecial: function() {},

		after: function() {},

		afterSpecial: function() {},

		renderView: function(view, region, options) {
			var viewPath = '../application/views/' + view;
			Dispatcher.renderView(viewPath, region, options);
		}
	};

	module.exports = {
		extend: function() {
			return _.extend(Controller, arguments[0]);
		}
	};
});