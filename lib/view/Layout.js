"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".layout", this.content = (0, skynode_1.el)(".content"), (0, skynode_1.el)("footer", "Cases By Kate X AI Network")));
    }
    changeParams(params, uri) { }
    scrollToBottom() {
        this.content.domElement.scrollTo(0, 999999);
    }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map