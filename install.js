let _Vue;
function guard(event) {
  const path = event.target.dataset.current;
  window.location.hash = path;
  event.preventDefault();
}
const MyRouterLink = {
  functional: true,
  props: {
    to: {
      type: [String, Object],
      require: true,
    },
  },
  render(h, context) {
    return h(
      "a",
      {
        attrs: { href: context.props.to, "data-current": context.props.to },
        on: { click: guard },
      },
      context.slots().default
    );
  },
};
const MyRouterView = {
  functional: true,
  props: {},
  render(h, context) {
    // const routerMatch = context.parent.$router.routes.find((route) => {
    //   return route.path === context.parent.$router.currentPath;
    // });
    const routerMatch = context.parent.$router.match(context.parent.$router.currentPath);
    const component = (routerMatch && routerMatch.component) || "div";
    return h(component);
  },
};
export default function install(Vue) {
  if (_Vue == Vue) {
    return;
  }
  _Vue = Vue;
  Vue.mixin({
    created() {
      let app = this;
      if (app.$options.router) {
        app._routerRoot = app;
        app._router = app.$options.router;
        _Vue.prototype.$router = app._router;
      } else {
        if (app.$parent && app.$parent._routerRoot) {
          app._routerRoot = app.$parent._routerRoot;
          app._router = app._routerRoot._router;
        }
      }
      app._router.init();
    },
  });
  _Vue.component("myrouter-link", MyRouterLink);
  _Vue.component("myrouter-view", MyRouterView);
}
