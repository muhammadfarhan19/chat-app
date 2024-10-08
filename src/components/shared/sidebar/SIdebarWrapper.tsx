import React from "react";
import DesktopNav from "./Nav/DesktopNav";
import MobileNav from "./Nav/MobileNav";

type Props = React.PropsWithChildren<{}>;

export default function SidebarWrapper({ children }: Props) {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-4 lg:flex-row">
      <MobileNav />
      <DesktopNav />
      <main className="h-[calc(100%-80px)] w-full flex gap-4 lg:h-full">
        {children}
      </main>
    </div>
  );
}
