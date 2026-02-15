export type RouteConfig = {
  path: string;
  type: "root" | "child";
  title?: string;
};

export const ROUTES: RouteConfig[] = [
  // child pages
  { path: "/panel/book/tariffs", type: "child", title: "تعرفه ها" },
  { path: "/panel/book/rules", type: "child", title: "مقررات و آیین نامه ها" },
  { path: "/panel/book/zamem", type: "child", title: "ضمائم" },

  { path: "/panel/home/mentors", type: "child", title: "مشاوره" },
  { path: "/panel/home/exhibition", type: "child", title: "نمایشگاه های تجاری" },
  { path: "/panel/home/report", type: "child", title: "اطلاعات تجاری" },
  { path: "/panel/home/ryzen", type: "child", title: "رایزن اقتصادی" },

  { path: "/panel/profile/myTariffs", type: "child", title: "تعرفه های نشان شده" },
  { path: "/panel/profile/myMentor", type: "child", title: "مشاوره های من" },

  // root pages
  { path: "/panel/home", type: "root" },
  { path: "/panel/book", type: "root" },
  { path: "/panel/profile", type: "root" },
  { path: "/panel/blog", type: "root" },
  { path: "/panel/course", type: "root" },
];

