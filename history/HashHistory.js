import { History } from "./index.js";
export default class HashHistory extends History {
  constructor(router) {
    super(router);
  }
  getCurrentLocation() {
    return window.location.hash && window.location.hash.replace("#", "");
  }
  transitionTo(location) {
    const route = this.router.match(location);
    const { component } = route;
    console.log(component);
  }
}
