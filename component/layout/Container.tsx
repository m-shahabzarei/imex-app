import React from "react";

interface ContainerI {
  children: React.ReactNode;
}

function Container({ children }: ContainerI) {
  return <div className=" w-[83%]">{children}</div>;
}

export default Container;
