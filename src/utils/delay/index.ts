import debounce from "lodash.debounce";

// задержка для success
const delay = (arg: JSX.Element, arg2: (ar: "") => void) => {
  const deb = debounce((set: typeof arg2) => set(""), 3000)
  deb(arg2);
  return arg;
};

export default delay;
