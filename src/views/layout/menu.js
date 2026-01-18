export default [

        {
            icon: "mdi-view-dashboard-outline",
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: "mdi-account-multiple",
            label: "Employes",
            path: "/users",
        },
        {
            icon: "mdi-account-multiple",
            label: "Department",
            path: "/departments",
        },
        {
            icon: "mdi-account-multiple",
            label: "Products",
            path: "/products",
        },
        {
            icon: "mdi-account-multiple",
            label: "Lots",
            path: "/lots",
        },
         {
            icon: "mdi-account-multiple",
            label: "Stitching",
            path: "/stitchings",
        },
        {
            icon: "mdi-account-multiple",
            label: "Payments",
            path: "/payments",
        },
        {
            icon: "mdi-account-multiple",
            label: "Reports",
            children: [
                {
                    icon: "mdi-account-multiple",
                    label: "Ledger",
                    path: "/reports/ledger",
                },
            ],
        },
      

];