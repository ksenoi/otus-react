import React, { PropsWithChildren } from "react";

export const List = ({ children }: PropsWithChildren) => {
  return <ul>{children}</ul>;
};