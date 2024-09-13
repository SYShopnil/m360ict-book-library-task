export interface IMenuItem {
  url: string;
  title: DashboardMenuItem;
  isActive: boolean;
  // access: string[];
}

export enum DashboardMenuItem {
  Profile = "Profile",
  Authors = "Authors",
  Books = "Books",
}
export const menuItems: IMenuItem[] = [
  {
    url: "/dashboard/profile",
    title: DashboardMenuItem.Profile,
    isActive: false,
    // access: ["admin", "user"],
  },
  {
    url: "/dashboard/authors",
    title: DashboardMenuItem.Authors,
    isActive: false,
    // access: ["admin"],
  },
  {
    url: "/dashboard/books",
    title: DashboardMenuItem.Books,
    isActive: false,
    // access: ["admin", "user"],
  },
];
