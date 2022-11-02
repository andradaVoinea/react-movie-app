import { useEffect, useRef } from "react";

//montat -> demontat -> montat
const useEffectOnce = (cb, dependencies) => {
  const countCalls = useRef(0);

  useEffect(() => {
    //console.log("ue-1")
    if (countCalls.current === 0) {
      cb();
      //console.log("if => useEffect-1", countCalls.current);
      countCalls.current = 1;
    }
    //return () => { console.log("component will unmount") }
  }, []);

  useEffect(() => {
    //console.log("ue-2")
    if (countCalls.current > 2) {
      //console.log("if => useEffect-2", countCalls.current);
      cb();
    }
    countCalls.current++;//3
    if(countCalls.current === 10)countCalls.current = 3;
  }, [...dependencies]);
};

export { useEffectOnce };