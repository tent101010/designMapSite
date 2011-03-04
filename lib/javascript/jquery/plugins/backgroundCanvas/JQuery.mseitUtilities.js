/* Copyright 2008 by MSE-iT / Thomas Maierhofer www.maierhofer.de
 * Licenced under: LGPL http://www.gnu.org/licenses/lgpl.html
 *
 */

(function($) {
$.fn.reverseOrder = function() {
	return this.each(function() {
		$(this).prependTo( $(this).parent() );
	});
};
})(jQuery);

jQuery.fn.reverse = function() {
  return this.pushStack(this.get().reverse(), arguments);
};

jQuery.fn.sort = function() {
  return this.pushStack( [].sort.apply( this, arguments ), []);
};
