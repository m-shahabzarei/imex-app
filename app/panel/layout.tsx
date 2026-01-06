import Header from "@/component/panel/Header";
import Menu from "@/component/panel/Menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-md:flex max-md:items-center">
      <Header />
      <Menu />
      {children}
    </div>
  );
}
