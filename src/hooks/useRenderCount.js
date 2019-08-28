import { useRef } from "react";

export const useRenderCount = (name) => {
  const renderCount = useRef(1)
  console.log(name + " : " + renderCount.current++)
}