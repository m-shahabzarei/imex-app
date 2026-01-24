// import NewLayout from "./newLayout";
// import ReactQueryProvider from "@/providers/ReactQuery";

// export default function Layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="debug-screens">
//       <NewLayout>
//         <ReactQueryProvider>{children}</ReactQueryProvider>
//       </NewLayout>
//     </div>
//   );
// }






import NewLayout from "./newLayout";
import ReactQueryProvider from "@/providers/ReactQuery";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NewLayout>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NewLayout>
  );
}
