import { InjectedConnector } from "@web3-react/injected-connector";

export const IMG_URL =
  "https://public.bnbstatic.com/static/academy/uploads-original/4a6a408967a0498d86713273d0c034c1.png";

export const courses = [
  {
    id: "1",
    title: "Graphic Design Specialization",
    description:
      "Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.",
    difficulty: 4,
    value: 50,
    img: '/1.png',
    grade: 'Intermediate',
    duration: '1-3 weeks',
    lessons: [
      {
        id: 0,
        text: "Lesson 1. Fundamental skills needed to be a graphic designer",
      },
      {
        id: 1,
        text: "Lesson 2. Communicating through image-making and typography",
      },
      {
        id: 2,
        text: "Lesson 3. Complete a capstone project to add to your professional portfolio",
      },
      {
        id: 3,
        text: "Lesson 4. Motion graphics, and editorial design",
      },
      {
        id: 4,
        text: "Final project",
      },
    ],
    aboutSpec:
      "Graphic design is all around us, in a myriad of forms, both on screen and in print, yet it is always made up of images and words to create a communication goal. This four-course sequence exposes students to the fundamental skills required to make sophisticated graphic design: process, historical context, and communication through image-making and typography. The sequence is completed by a capstone project that applies the skills of each course and peer feedback in a finished branding project suitable for a professional portfolio. The goal of this specialization is to equip learners with a set of transferable formal and conceptual tools for “making and communicating” in the field of graphic design. This core skill set will equip learners for formal studies in graphic design, and a starting point for further work in interface design, motion graphics, and editorial design.",
    toPass: [
      {
        id: 0,
        text: "Watch all lessons",
      },
      {
        id: 1,
        text: "80% success of Final project",
      },
    ],
    skills: [
      "Visual Communication",
      "Graphic Design",
      "Design Theory",
      "Creativity",
      "Graphics",
      "Color Theory",
      " Adobe Indesign",
      "Typography",
    ],
  },
  {
    id: "2",
    title: "UX Design Professional Certificate",
    description:
      "Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.",
    grade: 'Intermediate',
    duration: '1-3 weeks',
  },
  {
    id: "3",
    title: "UI / UX Design Specialization",
    description:
      "Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.",
    grade: 'Intermediate',
    duration: '1-3 weeks',
  },
  {
    id: "4",
    title: "Innovation Through Design: Think, Make, Break, Repeat",
    description:
      "Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.",
    grade: 'Beginner',
    duration: '3 days',
  },
  {
    id: "5",
    title: "User Interface Design",
    description:
        "Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.",
    grade: 'Beginner',
    duration: '3-5 month',
  },
  {
    id: "6",
    title: "Fundamentals of Graphic Design",
    description:
        "Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.",
    grade: 'Beginner',
    duration: '3-5 month',
  },

];

export const topUsers = [
  {
    id: 0,
    name: "Gorillaz Club",
    level: "138 lvl",
  },
  {
    id: 1,
    name: "Ugly Cats",
    level: "137 lvl",
  },
  {
    id: 2,
    name: "Crypto Zombies",
    level: "136 lvl",
  },
  {
    id: 3,
    name: "Gorillaz Club",
    level: "130 lvl",
  },
  {
    id: 4,
    name: "Ugly Cats",
    level: "128 lvl",
  },
  {
    id: 5,
    name: "Crypto Zombies",
    level: "124 lvl",
  },
];

export const injected = new InjectedConnector({
  supportedChainIds: [97, 53, 52],
});

export const CONTRACT_ADDRESS = "0x26c3813863242b5693397c7328D9392C175B9448";
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_courseId",
        type: "uint256",
      },
    ],
    name: "addCourseToMyList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "becomeRewier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feelCourseList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registrationOnEducationPlatform",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_courseId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_result",
        type: "bool",
      },
    ],
    name: "setAsChecked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_courseId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_comment",
        type: "string",
      },
    ],
    name: "submitCourse",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "courses",
    outputs: [
      {
        internalType: "uint256",
        name: "courseId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "img",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMyRegisteredCourses",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "courseId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "userId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isSubmitted",
            type: "bool",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isChecked",
            type: "bool",
          },
        ],
        internalType: "struct EducationPlatform2.UserToCourse[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAvailForRewier",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "courseId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "userId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isSubmitted",
            type: "bool",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isChecked",
            type: "bool",
          },
        ],
        internalType: "struct EducationPlatform2.UserToCourse[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCoursesLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getSpecificCourseById",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "courseId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "difficulty",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "img",
            type: "string",
          },
        ],
        internalType: "struct EducationPlatform2.Course",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isRewier",
            type: "bool",
          },
        ],
        internalType: "struct EducationPlatform2.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserCoursesLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "testGetFirstCourse",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "address",
        name: "userId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isRewier",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const NODE_URL =
  "https://thrumming-cold-shape.bsc-testnet.discover.quiknode.pro/123af45b2f5392023c5ec093606bce6b0241dff5/";

export const PROFILE_AVATAR_URL =
  "https://static.wikia.nocookie.net/starwarsjedifallenorder/images/c/ca/Stormtroopers.png";
