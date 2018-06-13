(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PrismicRichtext", [], factory);
	else if(typeof exports === 'object')
		exports["PrismicRichtext"] = factory();
	else
		root["PrismicRichtext"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.NODE_TYPES = {
    heading1: "heading1",
    heading2: "heading2",
    heading3: "heading3",
    heading4: "heading4",
    heading5: "heading5",
    heading6: "heading6",
    paragraph: "paragraph",
    preformatted: "preformatted",
    strong: "strong",
    em: "em",
    listItem: "list-item",
    oListItem: "o-list-item",
    list: "group-list-item",
    oList: "group-o-list-item",
    image: "image",
    embed: "embed",
    hyperlink: "hyperlink",
    label: "label",
    span: "span"
};
exports.PRIORITIES = (_a = {},
    _a[exports.NODE_TYPES.heading1] = 4,
    _a[exports.NODE_TYPES.heading2] = 4,
    _a[exports.NODE_TYPES.heading3] = 4,
    _a[exports.NODE_TYPES.heading4] = 4,
    _a[exports.NODE_TYPES.heading5] = 4,
    _a[exports.NODE_TYPES.heading6] = 4,
    _a[exports.NODE_TYPES.paragraph] = 3,
    _a[exports.NODE_TYPES.preformatted] = 5,
    _a[exports.NODE_TYPES.strong] = 6,
    _a[exports.NODE_TYPES.em] = 6,
    _a[exports.NODE_TYPES.oList] = 1,
    _a[exports.NODE_TYPES.list] = 1,
    _a[exports.NODE_TYPES.listItem] = 1,
    _a[exports.NODE_TYPES.oListItem] = 1,
    _a[exports.NODE_TYPES.image] = 1,
    _a[exports.NODE_TYPES.embed] = 1,
    _a[exports.NODE_TYPES.hyperlink] = 3,
    _a[exports.NODE_TYPES.label] = 4,
    _a[exports.NODE_TYPES.span] = 7,
    _a);
var _a;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var helpers_1 = __webpack_require__(7);
var uuid_1 = __webpack_require__(2);
var richtext_1 = __webpack_require__(8);
var types_1 = __webpack_require__(0);
var nodes_1 = __webpack_require__(3);
function sortByPriorities(nodes) {
    return nodes.sort(function (nodeA, nodeB) {
        if (nodeA.isParentOf(nodeB)) {
            return -1;
        }
        else if (nodeB.isParentOf(nodeA)) {
            return 1;
        }
        else {
            var result = types_1.PRIORITIES[nodeA.type] - types_1.PRIORITIES[nodeB.type];
            return (result === 0) ? (nodeA.text.length - nodeB.text.length) : result;
        }
    });
}
function sliceNode(text, elected, node) {
    if (node.start < elected.start) {
        return {
            inner: nodes_1.SpanNode.slice(node, elected.start, node.end, text),
            outer: nodes_1.SpanNode.slice(node, node.start, elected.start, text)
        };
    }
    else if (node.end > elected.end) {
        return {
            inner: nodes_1.SpanNode.slice(node, node.start, elected.end, text),
            outer: nodes_1.SpanNode.slice(node, elected.end, node.end, text)
        };
    }
    else {
        return {
            inner: node
        };
    }
}
function partitionGroup(text, group) {
    var partitioned = group.others.reduce(function (_a, node) {
        var innerAcc = _a.inner, outerAcc = _a.outer;
        var slicedNode = sliceNode(text, group.elected, node);
        return {
            inner: innerAcc.concat(slicedNode.inner),
            outer: slicedNode.outer ? outerAcc.concat(slicedNode.outer) : outerAcc
        };
    }, { inner: [], outer: [] });
    var inner = partitioned.inner, outer = partitioned.outer;
    var head = group.elected.setChildren(buildTreeAndFill(text, inner, group.elected.boundaries()));
    return [head].concat(buildTree(text, outer));
}
function groupWith(p, nodes) {
    return nodes.reduce(function (groups, node) {
        var previousGroup = helpers_1.last(groups);
        if (previousGroup) {
            var included = previousGroup.some(function (nodeGroup) { return nodeGroup.isParentOf(node); });
            if (included) {
                return helpers_1.init(groups).concat([previousGroup.concat(node)]);
            }
            else {
                var previousNode = helpers_1.last(previousGroup);
                if (previousNode && p(previousNode, node)) {
                    return helpers_1.init(groups).concat([previousGroup.concat(node)]);
                }
                else {
                    return groups.concat([[node]]);
                }
            }
        }
        else {
            return [[node]];
        }
    }, []);
}
function groupNodes(nodes) {
    var sortByStart = function (nodeA, nodeB) { return nodeA.start - nodeB.start; };
    var sortByEnd = function (nodeA, nodeB) { return nodeA.end - nodeB.end; };
    var sortedNodes = helpers_1.sortWith([sortByStart, sortByEnd], nodes);
    return groupWith(function (nodeA, nodeB) { return nodeA.end >= nodeB.start; }, sortedNodes);
}
function electNode(candidates) {
    if (candidates.length === 0) {
        throw new Error('Unable to elect node on empty list');
    }
    else {
        var _a = sortByPriorities(candidates), elected = _a[0], others = _a.slice(1);
        return { elected: elected, others: others };
    }
}
function fill(text, nodes, boundaries) {
    return nodes.reduce(function (acc, node, index) {
        var result = [];
        var fillStart = index === 0 && node.start > boundaries.lower;
        var fillEnd = index === nodes.length - 1 && boundaries.upper > node.end;
        if (fillStart) {
            var textNode = new nodes_1.TextNode(boundaries.lower, node.start, text.slice(boundaries.lower, node.start));
            result = result.concat(textNode);
        }
        else {
            var previousNode = nodes[index - 1];
            if (previousNode) {
                if (node.start > previousNode.end) {
                    var subtext = text.slice(previousNode.end, node.start);
                    var textNode = new nodes_1.TextNode(previousNode.end, node.start, subtext);
                    result = result.concat(textNode);
                }
            }
        }
        result = result.concat(node);
        if (fillEnd) {
            var textNode = new nodes_1.TextNode(node.end, boundaries.upper, text.slice(node.end, boundaries.upper));
            result = result.concat(textNode);
        }
        return acc.concat(result);
    }, []);
}
function buildTreeAndFill(text, nodes, boundaries) {
    if (nodes.length > 0) {
        var tree = buildTree(text, nodes);
        return fill(text, tree, boundaries);
    }
    else {
        var subtext = text.slice(boundaries.lower, boundaries.upper);
        return [new nodes_1.TextNode(boundaries.lower, boundaries.upper, subtext)];
    }
}
function buildTree(text, nodes) {
    var sortedNodes = helpers_1.sortBy(function (node) { return node.start; }, nodes);
    var groups = groupNodes(sortedNodes);
    var postElection = groups.map(electNode);
    var tree = helpers_1.flatten(postElection.map(function (group) { return partitionGroup(text, group); }));
    return helpers_1.sortBy(function (node) { return node.start; }, tree);
}
function processTextBlock(block) {
    var nodes = block.spans.map(function (span) {
        var text = block.text.slice(span.start, span.end);
        return new nodes_1.SpanNode(span.start, span.end, span.type, text, [], span);
    });
    var boundaries = { lower: 0, upper: block.text.length };
    return buildTreeAndFill(block.text, nodes, boundaries);
}
var Tree = /** @class */ (function () {
    function Tree() {
    }
    Tree.fromRichText = function (richText) {
        return {
            key: uuid_1["default"](),
            children: richText.reduce(function (acc, block, index) {
                if (richtext_1.RichTextBlock.isEmbedBlock(block.type) || richtext_1.RichTextBlock.isImageBlock(block.type)) {
                    return acc.concat(new nodes_1.BlockNode(block.type, block));
                }
                else {
                    var textNodes = processTextBlock(block);
                    var previousBlock = acc[acc.length - 1];
                    if (richtext_1.RichTextBlock.isListItem(block.type) && previousBlock && previousBlock instanceof nodes_1.ListBlockNode) {
                        var listItem = new nodes_1.ListItemBlockNode(block, textNodes);
                        var updatedPreviousBlock = previousBlock.addChild(listItem);
                        return helpers_1.init(acc).concat(updatedPreviousBlock);
                    }
                    else if (richtext_1.RichTextBlock.isOrderedListItem(block.type) && previousBlock && previousBlock instanceof nodes_1.OrderedListBlockNode) {
                        var orderedListItem = new nodes_1.OrderedListItemBlockNode(block, textNodes);
                        var updatedPreviousBlock = previousBlock.addChild(orderedListItem);
                        return helpers_1.init(acc).concat(updatedPreviousBlock);
                    }
                    else if (richtext_1.RichTextBlock.isListItem(block.type)) {
                        var listItem = new nodes_1.ListItemBlockNode(block, textNodes);
                        var list = new nodes_1.ListBlockNode(richtext_1.RichTextBlock.emptyList(), [listItem]);
                        return acc.concat(list);
                    }
                    else if (richtext_1.RichTextBlock.isOrderedListItem(block.type)) {
                        var orderedListItem = new nodes_1.OrderedListItemBlockNode(block, textNodes);
                        var orderedList = new nodes_1.OrderedListBlockNode(richtext_1.RichTextBlock.emptyOrderedList(), [orderedListItem]);
                        return acc.concat(orderedList);
                    }
                    else {
                        return acc.concat(new nodes_1.BlockNode(block.type, block, textNodes));
                    }
                }
            }, [])
        };
    };
    Tree.NODE_TYPES = types_1.NODE_TYPES;
    return Tree;
}());
exports["default"] = Tree;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
exports["default"] = uuid;
;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var uuid_1 = __webpack_require__(2);
var types_1 = __webpack_require__(0);
var Node = /** @class */ (function () {
    function Node(type, element, children) {
        this.key = uuid_1["default"]();
        this.type = type;
        this.element = element;
        this.children = children;
    }
    return Node;
}());
exports.Node = Node;
var SpanNode = /** @class */ (function (_super) {
    __extends(SpanNode, _super);
    function SpanNode(start, end, type, text, children, element) {
        var _this = _super.call(this, type, element, children) || this;
        _this.start = start;
        _this.end = end;
        _this.text = text;
        _this.children = children;
        return _this;
    }
    SpanNode.prototype.boundaries = function () {
        return {
            lower: this.start,
            upper: this.end
        };
    };
    SpanNode.prototype.isParentOf = function (node) {
        return this.start <= node.start && this.end >= node.end;
    };
    SpanNode.prototype.setChildren = function (children) {
        return new SpanNode(this.start, this.end, this.type, this.text, children, this.element);
    };
    SpanNode.slice = function (node, start, end, text) {
        return new SpanNode(start, end, node.type, text.slice(start, end), node.children, node.element);
    };
    return SpanNode;
}(Node));
exports.SpanNode = SpanNode;
var TextNode = /** @class */ (function (_super) {
    __extends(TextNode, _super);
    function TextNode(start, end, text) {
        var _this = this;
        var element = {
            type: types_1.NODE_TYPES.span,
            start: start,
            end: end,
            text: text
        };
        _this = _super.call(this, start, end, types_1.NODE_TYPES.span, text, [], element) || this;
        return _this;
    }
    return TextNode;
}(SpanNode));
exports.TextNode = TextNode;
var BlockNode = /** @class */ (function (_super) {
    __extends(BlockNode, _super);
    function BlockNode(type, block, children) {
        if (children === void 0) { children = []; }
        return _super.call(this, type, block, children) || this;
    }
    return BlockNode;
}(Node));
exports.BlockNode = BlockNode;
var ListItemBlockNode = /** @class */ (function (_super) {
    __extends(ListItemBlockNode, _super);
    function ListItemBlockNode(block, children) {
        return _super.call(this, types_1.NODE_TYPES.listItem, block, children) || this;
    }
    return ListItemBlockNode;
}(BlockNode));
exports.ListItemBlockNode = ListItemBlockNode;
var OrderedListItemBlockNode = /** @class */ (function (_super) {
    __extends(OrderedListItemBlockNode, _super);
    function OrderedListItemBlockNode(block, children) {
        return _super.call(this, types_1.NODE_TYPES.oListItem, block, children) || this;
    }
    return OrderedListItemBlockNode;
}(BlockNode));
exports.OrderedListItemBlockNode = OrderedListItemBlockNode;
var OrderedListBlockNode = /** @class */ (function (_super) {
    __extends(OrderedListBlockNode, _super);
    function OrderedListBlockNode(block, children) {
        return _super.call(this, types_1.NODE_TYPES.oList, block, children) || this;
    }
    OrderedListBlockNode.prototype.addChild = function (node) {
        var children = this.children.concat(node);
        return new OrderedListBlockNode(this.element, children);
    };
    return OrderedListBlockNode;
}(BlockNode));
exports.OrderedListBlockNode = OrderedListBlockNode;
var ListBlockNode = /** @class */ (function (_super) {
    __extends(ListBlockNode, _super);
    function ListBlockNode(block, children) {
        return _super.call(this, types_1.NODE_TYPES.list, block, children) || this;
    }
    ListBlockNode.prototype.addChild = function (node) {
        var children = this.children.concat(node);
        return new ListBlockNode(this.element, children);
    };
    return ListBlockNode;
}(BlockNode));
exports.ListBlockNode = ListBlockNode;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var astext_1 = __webpack_require__(6);
var tree_1 = __webpack_require__(1);
var serialize_1 = __webpack_require__(9);
module.exports = {
    asText: astext_1["default"],
    asTree: tree_1["default"].fromRichText,
    serialize: serialize_1["default"],
    Elements: tree_1["default"].NODE_TYPES
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function asText(richtext, joinString) {
    var join = typeof joinString === 'string' ? joinString : ' ';
    return richtext.map(function (block) { return block.text; }).join(join);
}
exports["default"] = asText;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function flatten(arr) {
    return arr.reduce(function (acc, val) {
        return Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val);
    }, []);
}
exports.flatten = flatten;
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
function init(arr) {
    return arr.slice(0, -1);
}
exports.init = init;
function sortWith(fns, list) {
    return fns.reduce(function (result, fn) { return result.sort(fn); }, list);
}
exports.sortWith = sortWith;
function sortBy(fn, list) {
    return list.slice().sort(fn);
}
exports.sortBy = sortBy;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var types_1 = __webpack_require__(0);
var RichTextBlock = /** @class */ (function () {
    function RichTextBlock(type, text, spans) {
        this.type = type;
        this.text = text;
        this.spans = spans;
    }
    RichTextBlock.isEmbedBlock = function (type) {
        return type === types_1.NODE_TYPES.embed;
    };
    RichTextBlock.isImageBlock = function (type) {
        return type === types_1.NODE_TYPES.image;
    };
    RichTextBlock.isList = function (type) {
        return type === types_1.NODE_TYPES.list;
    };
    RichTextBlock.isOrderedList = function (type) {
        return type === types_1.NODE_TYPES.oList;
    };
    RichTextBlock.isListItem = function (type) {
        return type === types_1.NODE_TYPES.listItem;
    };
    RichTextBlock.isOrderedListItem = function (type) {
        return type === types_1.NODE_TYPES.oListItem;
    };
    RichTextBlock.emptyList = function () {
        return {
            type: types_1.NODE_TYPES.list,
            spans: [],
            text: ''
        };
    };
    RichTextBlock.emptyOrderedList = function () {
        return {
            type: types_1.NODE_TYPES.oList,
            spans: [],
            text: ''
        };
    };
    return RichTextBlock;
}());
exports.RichTextBlock = RichTextBlock;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tree_1 = __webpack_require__(1);
var nodes_1 = __webpack_require__(3);
function fromRichText(richText, serialize, htmlSerializer) {
    var tree = tree_1["default"].fromRichText(richText);
    return tree.children.map(function (node, index) {
        return serializeNode(node, serialize, index, htmlSerializer);
    });
}
function serializeNode(parentNode, serializer, index, htmlSerializer) {
    function step(node, idx) {
        var text = node instanceof nodes_1.SpanNode ? node.text : null;
        var serializedChildren = node.children.reduce(function (acc, node, i) {
            return acc.concat([step(node, i)]);
        }, []);
        var maybeSerialized = htmlSerializer && htmlSerializer(node.type, node.element, text, serializedChildren, idx);
        return maybeSerialized || serializer(node.type, node.element, text, serializedChildren, idx);
    }
    return step(parentNode, index);
}
exports["default"] = fromRichText;


/***/ })
/******/ ]);
});