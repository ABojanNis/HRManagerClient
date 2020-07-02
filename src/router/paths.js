export default [
  {
    path: "/",
    view: "layouts/Empty",
    name: "EmptyLayout",
    meta: { requiresGuest: true },
    children: [
      {
        path: "",
        name: "Sign in",
        view: "Signin"
      }
      // {
      //   path: "/signup",
      //   name: "Sign up",
      //   view: "Signup"
      // }
    ]
  },
  {
    path: "/",
    view: "layouts/Admin",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        view: "Dashboard"
      },
      {
        path: "/skills",
        name: "Skills",
        view: "Skills"
      },
      {
        path: "/experiences",
        name: "Experiences",
        view: "Experiences"
      },
      {
        path: "/worker-statuses",
        name: "WorkerStatuses",
        view: "WorkerStatuses"
      },
      {
        path: "/candidate/:id",
        name: "Candidate",
        view: "Candidate"
      }
    ]
  }
];
