import { useState, useLayoutEffect } from "react";

const queries = [
  "(max-width: 47.97em)",
  "(min-width: 47.97em)",
  "(min-width: 63.97em)",
];

const useMactchMedia = () => {
  const mediaQueryLists = queries.map(query => matchMedia(query));

  const getValues = () => mediaQueryLists.map(mq1 => mq1.matches);

  const [ values, setValues ] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach(mq1 => mq1.addEventListener("change", handler));

    return () => mediaQueryLists.forEach(mq1 => mq1.removeEventListener("change", handler));
  });

  return [ "isMobile", "isTablet", "isDesktop" ].reduce((acc, screen, index) => ({
    ...acc,
    [screen]: values[index],
  }), {});
};

export default useMactchMedia;
