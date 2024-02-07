import React from "react";
import { PropsWithChildren, useEffect, memo, useState } from "react";

export const Item = memo(({ children }: PropsWithChildren) => {

  useEffect(() => {
    console.log("update item: ", children);
  });

  return <li style={{ fontSize: "24px" }}>{children}</li>;
});