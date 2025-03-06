type Id = string | number;
export const ROUTE = {
  HOME: {
    root: { path: "/home", title: "Home" },
    humanresource: {
      root: { path: "/human-resource", title: "Human Resource" },
      create: { path: "/human-resource/create", title: "Create User" },
    },
    coachmanagement: {
      root: {
        path: "/human-resource/coach-management",
        title: "Coach Management",
      },
    },
    managermanagement: {
      root: {
        path: "/human-resource/manager-management",
        title: "Manager Management",
      },
    },
    studentmanagement: {
      root: {
        path: "/human-resource/student-management",
        title: "Student Management",
      },
    },
    teammanagement: {
      root: {
        path: "/human-resource/team-management",
        title: "Team Management",
      },
    },
  },
};
