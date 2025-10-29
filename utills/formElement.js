export const toolboxItems = [
  {
    type: "text",
    label: "Text Input",
    placeholder: "enter your name",
    value: "",
    isRequired: false,
    style:{
        label:"block text-sm font-medium text-gray-700",
        input:"mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400",
        button:"absolute -right-2 -top-2 text-red-500"
    }
  },
  {
    type: "textarea",
    label: "TextArea Input",
    placeholder: "enter your address",
    value: "",
    isRequired: false,
    style:{
        label:"block text-sm font-medium text-gray-700",
        input:"mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400",
        button:"absolute -right-2 -top-2 text-red-500"
    }
  },
  {
    type: "dropdown",
    label: "Dropdown",
    options: ["option1", "option2", "option3"],
    value: "",
    isRequired: false,
    style:{
        label:"block text-sm font-medium text-gray-700",
        input:"mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400",
        button:"absolute -right-2 -top-2 text-red-500"
    }
  },
  {
    type: "radio",
    label: "Radio Buttons",
    options: ["option1", "option2", "option3"],
    value: "",
    isRequired: false,
    style:{
        label:"block text-sm font-medium text-gray-700",
        input:"form-radio h-4 w-4 text-blue-500",
        button:"absolute -right-2 -top-2 text-red-500",
        option_label:"inline-flex items-center gap-2",
        span:"text-gray-700"
    }
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    value: "",
    isRequired: false,
    style:{
        label:"block text-sm font-medium text-gray-700",
        input:"form-radio h-4 w-4 text-blue-500",
        button:"absolute -right-2 -top-2 text-red-500",
        option_label:"inline-flex items-center mr-3",
        span:"ml-1 text-sm text-gray-700"
    }
  },
  {
    type:"button",
    label:"Button",
    value:"Submit",
    style:{
       
        button:"absolute -right-2 -top-2 text-red-500",
        submit_button:"bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
    }

  }
];
