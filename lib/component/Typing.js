"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class TypingText extends skynode_1.DomNode {
    constructor(list, id, name, selectable, showingRarity) {
        super(`a.mate-item${list.votedMates.includes(id) === true ? ".off" : ""}`);
    }
}
exports.default = TypingText;
//# sourceMappingURL=Typing.js.map