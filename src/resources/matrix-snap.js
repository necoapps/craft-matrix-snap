(function(window) {
	if (!window.Craft || !window.jQuery) return;

	Craft.MatrixSnapPlugin = {
		checkMode: function() {
			// is revision mode (Craft 3, 4) active?
			if ($('input[name="revisionId"], input[value="elements/revert"]').length) {
				return;
			};

			Craft.MatrixSnapPlugin.init();
		},

		init: function() {
			$('.matrixblock').addClass('is-faux-collapsed'); // gets removed in collapseAll().

			Craft.MatrixSnapPlugin.attachClickEvents();

			setTimeout(function() {
				Craft.MatrixSnapPlugin.collapseAll();
			}, 200);
		},

		attachClickEvents: function() {
			$('body').on('click', '.matrixblock .titlebar', function() {
				var $matrixblock = $(this).closest('.matrixblock');

				Craft.MatrixSnapPlugin.deselectCheckboxes($matrixblock);
				
				if ($matrixblock.is('.velocity-animating')) return;

				Craft.MatrixSnapPlugin.toggle($matrixblock);
			});
		},

		deselectCheckboxes: function($matrixblock) {
			$matrixblock.closest('.blocks').data('select').deselectAll();
		},

		toggle: function($matrixblock) {
			var $actionMenu = $matrixblock.data('block').$actionMenu,
				action = 'expand';

			if (!$matrixblock.is('.collapsed')) {
				action = 'collapse';
			};

			var $actionLink = $('a[data-action="' + action + '"]', $actionMenu);
			$actionLink.click();
		},

		collapseAll: function() {
			$('.matrixblock').each(function() {
				var $matrixblock = $(this),
					$actionMenu = $matrixblock.data('block').$actionMenu,
					$collapseLink = $('a[data-action="collapse"]', $actionMenu);

				$collapseLink.click();

				setTimeout(function() {
					$matrixblock.removeClass('is-faux-collapsed');
				}, 200);
			});
		}
	};

	Craft.MatrixSnapPlugin.checkMode();
})(window);