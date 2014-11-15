/* jshint unused: false */

// globals
export var WINDOW = window;
export var DOCUMENT = WINDOW.document;
export var HTML = DOCUMENT.documentElement;

var userAgent = WINDOW.navigator.userAgent;
var jscriptVersion = window.ScriptEngineMajorVersion;

// feature checks
export var JSCRIPT_VERSION = jscriptVersion && jscriptVersion();
export var LEGACY_ANDROID = ~userAgent.indexOf("Android") && userAgent.indexOf("Chrome") < 0;
export var WEBKIT_PREFIX = WINDOW.WebKitAnimationEvent ? "-webkit-" : "";
export var CUSTOM_EVENT_TYPE = "dataavailable";
