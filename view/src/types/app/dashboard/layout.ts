export interface IMenuItem {
  url: string;
  title: DashboardMenuItem;
  isActive: boolean;
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
  },
  {
    url: "/dashboard/authors",
    title: DashboardMenuItem.Authors,
    isActive: false,
  },
  {
    url: "/dashboard/books",
    title: DashboardMenuItem.Books,
    isActive: false,
  },
];
