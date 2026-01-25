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






import { cookies } from "next/headers";
import NewLayout from "./newLayout";
import ReactQueryProvider from "@/providers/ReactQuery";

export default async function PanelLayout({
  children,
}: {

  children: React.ReactNode;
}) {

  const cookieStorage = await cookies()
  const accessCookie =  cookieStorage.get("access")
  console.log(accessCookie)

  return (
    <NewLayout>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NewLayout>
  );
}
