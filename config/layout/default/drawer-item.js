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
  },
  // ------------------------------------------------- administrator -------------------------------------------------
  {
    title: "Document",
    icon: "mdi-file-document-multiple",
    to: "/showcase/document",
  },
  {
    title: "Guide",
    icon: "mdi-notebook-check",
    to: "/showcase/guide",
  },
  {
    title: "Icon",
    icon: "mdi-information",
    to: "/showcase/icon",
  },
  {
    title: "Component",
    icon: "mdi-shape",
    to: "/showcase/component",
  }
];
