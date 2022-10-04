import { InjectedConnector } from "@web3-react/injected-connector";

export const IMG_URL =
  "https://public.bnbstatic.com/static/academy/uploads-original/4a6a408967a0498d86713273d0c034c1.png";

export const courses = [
  {
    id: "3",
    title: "How to invest in crypto and buy death star?",
    description:
      "Wanna become dark loard but don’t have enough resourses? Check this course...",
    difficulty: 4,
    value: 50,
    img: '/1.png',
  },
  {
    difficulty: 2,
    id: "0",
    title: "Lightsaber mastery",
    description: "Watch this course and earn new skills",
    img: '/2.png',
    value: 15,
  },
  {
    difficulty: 2,
    id: "1",
    title: "Future crypto economy",
    description:
      "Learn ideas, methods, and institutions that permit crypto human society to manage risks",
    img: '/3.png',
    value: 20,
  },
  {
    difficulty: 2,
    id: "3",
    title: "How to incentivize your jedi",
    description:
      "Human resources in Jedi Order. Their values and philosophy",
    img: '/1.png',
    value: 20,
  },

];

export const injected = new InjectedConnector({
  supportedChainIds: [97],
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
