import Header from "@/component/panel/Header";
import Menu from "@/component/panel/Menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Menu />
      {children}
    </div>
  );
}
