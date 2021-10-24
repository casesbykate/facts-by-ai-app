"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
const MyCase_1 = __importDefault(require("./view/MyCase"));
const SampleCase_1 = __importDefault(require("./view/SampleCase"));
(async () => {
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("samplecase", SampleCase_1.default);
    skyrouter_1.SkyRouter.route("mycase", MyCase_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map