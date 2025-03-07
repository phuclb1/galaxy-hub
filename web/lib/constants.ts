type Id = string | number;

export type Route = {
  path: string | ((id: Id) => string);
  title: string;
};

export const ROUTE = {
  HOME: {
    root: { path: "/", title: "Home" },
    humanresource: {
      root: { path: "/user-management", title: "User Management" },
      create: { path: "/user-management/create", title: "Create User" },
      detail: {
        path: (id: Id) => `/user-management/${id}`,
        title: "User Detail",
      },
      edit: {
        path: (id: Id) => `/user-management/${id}/edit`,
        title: "Edit User",
      },
    },
    profile: { path: "/profile", title: "My Profile" },
  },
};
