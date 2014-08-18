import _ from "../helpers";
import { MethodError } from "../errors";
import { $Element } from "../types";
import HOOK from "../util/stylehooks";

/**
 * CSS properties accessor for an element
 * @memberof! $Element#
 * @alias $Element#css
 * @param  {String|Object}   name    style property name or key/value object
 * @param  {String|Function} [value] style property value or function that returns it
 * @return {String|$Element} property value or reference to this
 */
$Element.prototype.css = function(name, value) {
    var len = arguments.length,
        node = this[0],
        nameType = typeof name,
        style, hook, computed, appendCssText;

    if (len === 1 && (nameType === "string" || _.isArray(name))) {
        if (node) {
            style = node.style;

            value = (nameType === "string" ? [name] : name).reduce((memo, name) => {
                hook = HOOK.get[name];
                value = hook ? hook(style) : style[name];

                if (!computed && !value) {
                    style = _.computeStyle(node);
                    value = hook ? hook(style) : style[name];

                    computed = true;
                }

                memo[name] = value;

                return memo;
            }, {});
        }

        return node && nameType === "string" ? value[name] : value;
    }

    if (node) {
        style = node.style;
        appendCssText = (key, value) => {
            var hook = HOOK.set[key];

            if (typeof value === "function") value = value(this);

            if (value == null) value = "";

            if (hook) {
                hook(style, value);
            } else {
                style[key] = typeof value === "number" ? value + "px" : value.toString();
            }
        };

        if (len === 1 && name && nameType === "object") {
            _.keys(name).forEach((key) => { appendCssText(key, name[key]) });
        } else if (len === 2 && nameType === "string") {
            appendCssText(name, value);
        } else {
            throw new MethodError("style");
        }
    }

    return this;
};