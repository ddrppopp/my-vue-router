import install from "./install.js";
import createMatch from "./createMatch.js";
import { HashHistory } from "./history/index.js";
import Vue from "vue";
class Router {
  constructor(options) {
    const { routes, mode = "hash" } = options;
    this.routes = routes;
    this.mode = mode;
    this.app = null;
    this.matcher = createMatch(this.routes);
    const intional  = (window.location.hash && window.location.hash.slice(1)) || '/';
    Vue.util.defineReactive(this, "currentPath", intional);

    //history
    switch (this.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new HTML5History(this);
        break;
      case "abstract":
        this.history = new AbstractHistory(this);
        break;
      default:
        console.warn("UNinvalid mode!");
        break;
    }
  }
  init() {
    const history = this.history;
    if (history instanceof HashHistory || history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation());
    }
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash.slice(1);
    });
  }
  match(location) {
    return this.matcher.match(location);
  }
}
Router.install = install;
Router.getCurrentPath = function getCurrentPath() {
  return window.location.hash;
};
export default Router;
