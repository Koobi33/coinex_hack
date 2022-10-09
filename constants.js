import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1313161555, 53, 52],
});

export const CONTRACT_ADDRESS = "0x684F7B6A8a6160f78D7D214578ADD553765209D8";
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
