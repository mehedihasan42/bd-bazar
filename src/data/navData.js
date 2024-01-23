const commonNavData =[
    {
        path:"/",
        title:"Home"
    },
    {
        path:"/about",
        title:"About"
    },
    {
        path:"/products",
        title:"Products"
    }
];

export const afterLoginNavData =[
    ...commonNavData,
    {
        path:"/dashboard",
        title:"Dashboard"
    },
];

export const beforeLoginNavData =[
    ...commonNavData,
   {
    path:"/login",
    title:"Login"
   },
   {
    path:"/signup",
    title:"Signup"
   }
]