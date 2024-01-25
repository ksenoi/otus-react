import React from "react";
import { PropsWithChildren, useEffect, memo, useState } from "react";

export const Item = memo(({ children }: PropsWithChildren) => {
//  const [state, setState] = useState(inital);

  // useEffect(() => {
  //   console.log("mount item: ", children);

  //   return () => console.log("unmount item: ", children);
  // }, []);

  useEffect(() => {
    console.log("update item: ", children);
  });

  return <li style={{ fontSize: "24px" }}>{children}</li>;
});