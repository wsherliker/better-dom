import _ from "../util/index";
import { MethodError } from "../errors";
import { $Element } from "../types";
import PROP from "../util/accessorhooks";

/**
 * Get property or attribute value by name
 * @memberof! $Element#
 * @alias $Element#get
 * @param  {String|Array} [name] property or attribute name or array of names
 * @return {Object} a property or attribute value
 * @example
 * link.get("title");       // => property title
 * link.get("data-custom"); // => custom attribute data-custom
 * link.get();              // => link's innerHTML
 * link.get("_prop");       // => private property _prop
 */
$Element.prototype.get = function(name) {
    var data = this._,
        node = this[0],
        hook = PROP.get[name],
        nameType = typeof name,
        key, value;

    if (!node) return;

    if (hook) return hook(node, name);

    if (nameType === "string") {
        if (name[0] === "_") {
            key = name.substr(1);

            if (key in data) {
                value = data[key];
            } else {
                // convert from camel case to dash-separated value
                key = key.replace(/[A-Z]/g, (l) => "-" + l.toLowerCase());
                value = node.getAttribute("data-" + key);

                if (value != null) {
                    // try to recognize and parse  object notation syntax
                    if (value[0] === "{" && value[value.length - 1] === "}") {
                        try {
                            value = JSON.parse(value);
                        } catch (err) { }
                    }

                    data[key] = value;
                }
            }

            return value;
        }

        return name in node ? node[name] : node.getAttribute(name);
    } else if (_.isArray(name)) {
        return name.reduce((r, key) => { return r[key] = this.get(key), r }, {});
    } else {
        throw new MethodError("get");
    }
};
