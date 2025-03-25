type Id = string | number;

export type Route = {
  path: string | ((id: Id) => string);
  title: string;
};

export const ROUTE = {
  HOME: {
    root: { path: "/", title: "Home" },
    humanresource: {
      root: { path: "/people-management", title: "People Management" },
      create: { path: "/people-management/create", title: "Create People" },
      detail: {
        path: (id: Id) => `/people-management/${id}`,
        title: "People Detail",
      },
      edit: {
        path: (id: Id) => `/people-management/${id}/edit`,
        title: "Edit People",
      },
    },
    profile: { path: "/profile", title: "My Profile" },
    trainingcenter: {
      root: {
        path: "/training-center-management",
        title: "Training Center",
      },
      create: {
        path: "/training-center-management/create",
        title: "Create Training Center",
      },
      detail: {
        path: (id: Id) => `/training-center-management/${id}`,
        title: "Center Detail",
      },
      edit: {
        path: (id: Id) => `/training-center-management/${id}/edit`,
        title: "Edit Center",
      },
    },
    team: {
      root: {
        path: "/team-management",
        title: "Team Management",
      },
      create: {
        path: "/team-management/create",
        title: "Create Team",
      },
      detail: {
        path: (id: Id) => `/team-management/${id}`,
        title: "Team Detail",
      },
      edit: {
        path: (id: Id) => `/team-management/${id}/edit`,
        title: "Edit Team",
      },
    },
    student: {
      root: {
        path: "/student-management",
        title: "Student-management",
      },
      create: {
        path: "/student-management/create",
        title: "Create Student",
      },
      detail: {
        path: (id: Id) => `/student-management/${id}`,
        title: "Student Detail",
      },
      edit: {
        path: (id: Id) => `/student-management/${id}/edit`,
        title: "Edit Student",
      },
    },
  },
};
