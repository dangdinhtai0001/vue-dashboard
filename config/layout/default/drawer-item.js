export default [
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard",
    to: "/dashboard"
  },
  // ------------------------------------------------- administrator -------------------------------------------------
  {
    title: "Administrator",
    icon: "mdi-shield-account",
    to: "/administrator",
    children: [
      {
        title: "User",
        icon: "mdi-account-group",
        to: "/administrator/user"
      },
      {
        title: "Permission",
        icon: "mdi-account-lock",
        to: "/administrator/permission"
      }
    ]
  }
  // ------------------------------------------------- administrator -------------------------------------------------
];
