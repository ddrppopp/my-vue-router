import Vue from 'vue'
function guard(event) {
  const path = event.target.dataset.current;
  Vue.defineReactive(path);
  event.preventDefault();
}
export default {
  functional: true,
  props: {
    to: {
      type: [String, Object],
      require: true,
    },
  },
  methods: {
    jump() {},
  },
  render(h, context) {
    console.log(context);
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
