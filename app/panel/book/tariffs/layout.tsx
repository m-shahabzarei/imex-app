// // app/dashboard/settings/layout.tsx

// import Header from "@/component/panel/layout/Header";
// import { ReactNode } from "react";

// interface I{
//   children : ReactNode
// }

// export default function Layout({ children } : I) {
//   return (
//     <div className="md:h-screen w-full ">
//       <div className="md:hidden">
//         <Header />
//       </div>
//     {children}
//     </div>
//   )
// }




export default function TariffDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
