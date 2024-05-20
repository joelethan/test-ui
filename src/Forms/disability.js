import { map } from "lodash";

const disabilityForm = (disabilityMetadata) => [
  {
    label: "TYPE OF DISABILITY",
    name: "disability_details",
    type: "select",
    options: map(disabilityMetadata, (data) => ({
      label: data.metadata_value,
      value: data.metadata_value,
    })),
    rules: [
      {
        required: true,
        message: "Disability type is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export default disabilityForm;
