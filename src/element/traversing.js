import _ from "../util/index";
import { MethodError } from "../errors";
import { $Element } from "../types";
import SelectorMatcher from "../util/selectormatcher";

var makeMethod = (methodName, propertyName, all) => function(selector) {
        if (selector && typeof selector !== "string") throw new MethodError(methodName);

        var matcher = SelectorMatcher(selector),
            nodes = all ? [] : null,
            it = this[0];

        for (it = it && it[propertyName]; it; it = it[propertyName]) {
            if (it.nodeType === 1 && (!matcher || matcher(it))) {
                if (!all) break;

                nodes.push(it);
            }
        }

        return all ? _.map.call(nodes, $Element) : $Element(it);
    };

_.assign($Element.prototype, {
    /**
     * Find next sibling element filtered by optional selector
     * @memberof! $Element#
     * @alias $Element#next
     * @param {String} [selector] css selector
     * @return {$Element} matched element wrapper
     * @function
     * @example
     * var div = DOM.create("div>a+b+i"); // <div><a></a><b></b><i></i></div>
     * var link = div.child(0);           // <a>
     * link.next();                       // <b>
     * link.next("i");                    // <i>
     */
    next: makeMethod("next", "nextSibling"),

    /**
     * Find previous sibling element filtered by optional selector
     * @memberof! $Element#
     * @alias $Element#prev
     * @param {String} [selector] css selector
     * @return {$Element} matched element wrapper
     * @function
     * @example
     * var div = DOM.create("div>b+i+a"); // <div><b></b><i></i><a></a></div>
     * var link = div.child(-1);          // <a>
     * link.prev();                       // <i>
     * link.prev("b");                    // <b>
     */
    prev: makeMethod("prev", "previousSibling"),

    /**
     * Find all next sibling elements filtered by optional selector
     * @memberof! $Element#
     * @alias $Element#nextAll
     * @param {String} [selector] css selector
     * @return {Array.<$Element>} an array of all matched element wrappers
     * @function
     * @example
     * var div = DOM.create("div>a+i+b+i"); // <div><a></a><i></i><b></b><i></i></div>
     * var link = DOM.child(0);             // <a>
     * link.nextAll();                      // [<i>, <b>, <i>]
     * link.nextAll("i");                   // [<i>, <i>]
     */
    nextAll: makeMethod("nextAll", "nextSibling", true),

    /**
     * Find all previous sibling elements filtered by optional selector
     * @memberof! $Element#
     * @alias $Element#prevAll
     * @param {String} [selector] css selector
     * @return {Array.<$Element>} an array of all matched element wrappers
     * @function
     * @example
     * var div = DOM.create("div>a+i+b+i"); // <div><i></i><b></b><i></i><a></a></div>
     * var link = DOM.child(-1);            // <a>
     * link.prevAll();                      // [<i>, <b>, <i>]
     * link.prevAll("b");                   // [<b>]
     */
    prevAll: makeMethod("prevAll", "previousSibling", true),

    /**
     * Find parent element filtered by optional selector
     * @memberof! $Element#
     * @alias $Element#parent
     * @param {String} [selector] css selector
     * @return {$Element} matched element wrapper
     * @function
     * @example
     * var div = DOM.create("div.foo>div.bar>a"); // <div class="foo"><div class="bar"><a></a></div></div>
     * var link = div.find("a");                  // <a>
     * link.parent();                             // <div class="bar">
     * link.parent(".foo");                       // <div class="foo">
     */
    parent: makeMethod("parent", "parentNode")
});
