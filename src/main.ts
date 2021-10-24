import { BodyNode } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import Home from "./view/Home";
import Layout from "./view/Layout";
import MyCase from "./view/MyCase";
import SampleCase from "./view/SampleCase";

(async () => {

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
    SkyRouter.route("samplecase", SampleCase);
    SkyRouter.route("mycase", MyCase);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }

    if (window.innerWidth > 1280) {
        BodyNode.style({
            zoom: window.innerWidth / 1280,
        });
    }
})();