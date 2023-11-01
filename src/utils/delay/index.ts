import debounce from "lodash.debounce";

// задержка для success
const delay = (arg: JSX.Element, arg2: (ar: "") => void) => {
  const DELAY = 3000;
  const deb = debounce((set: typeof arg2) => set(""), DELAY);
  deb(arg2);
  return arg;
};

export default delay;
