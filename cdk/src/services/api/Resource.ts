export const Resources: any = [
  {
    name: "health",
    methods: ["GET"],
  },
  {
    name: "users",
    methods: ["GET"],
  },
  {
    name: "user",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    child: [
      {
        name: "signup",
        methods: ["POST"],
      },
      {
        name: "signin",
        methods: ["POST"],
      },
      {
        name: "signout",
        methods: ["POST"],
      },
      {
        name: "updateMyPassword",
        methods: ["PATCH"],
      },
      {
        name: "updateMe",
        methods: ["PATCH"],
      },
    ],
  },
];
