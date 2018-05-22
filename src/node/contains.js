import { $Node } from "./index";
import { $Element } from "../element/index";
import { MethodError } from "../errors";

/**
 * Check if element is inside of context
 * @memberof! $Node#
 * @alias $Node#contains
 * @param  {$Node} element element to check
 * @return {Boolean} returns <code>true</code> if success and <code>false</code> otherwise
 * @example
 * DOM.contains(DOM.find("body")); // => true
 * DOM.find("body").contains(DOM); // => false
 */
$Node.prototype.contains = function(element) {
    const node = this["<%= prop() %>"];

    if (!node) return false;

    if (element instanceof $Element) {
        const otherNode = element["<%= prop() %>"];

        if (otherNode === node) return true;
        /* istanbul ignore else */
        if (node.contains) {
            return node.contains(otherNode);
        } else {
            return node.compareDocumentPosition(otherNode) & 16;
        }
    }

    throw new MethodError("contains", arguments);
};