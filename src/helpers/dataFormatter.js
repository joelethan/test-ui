import {
  difference,
  forEach,
  isArray,
  isEmpty,
  map,
  orderBy,
  toUpper,
  uniqBy,
} from "lodash";
import moment from "moment";
import { institutionCodes } from "../containers/constants";
import paymentStatuses from "../containers/constants/paymentStatuses";

export const formatDepartments = (departments) => {
  const departmentOptions = [];
  departments.forEach((department) => {
    departmentOptions.push({
      label: department.department_title,
      value: department.id,
    });
  });
  return departmentOptions;
};

export const formatFaculties = (faculties) => {
  const facultiesList = [];
  faculties.forEach((faculty) => {
    facultiesList.push({
      label: `${faculty.faculty_title}`,
      value: faculty.id,
    });
  });
  return facultiesList;
};

export const formatEntryYears = (programme = []) => {
  const entryYearList = [];
  if (!isEmpty(programme.entry_years))
    programme.entry_years.forEach((entryYear) => {
      entryYearList.push({
        label: `${entryYear.entry_year}`,
        value: entryYear.id,
      });
    });
  return entryYearList;
};

export const generalFormatter = (objectsArray, label, value) => {
  const formattedData = [];
  if (!isEmpty(objectsArray)) {
    objectsArray.forEach((programmeType) => {
      formattedData.push({
        label: programmeType[label],
        value: programmeType[value],
      });
    });
    return uniqBy(formattedData, "value");
  }
  return [];
};

export const getMetadataValueName = (
  metadata,
  metadataValueId,
  metadataKey
) => {
  const checkValue = metadata.find(
    (meta) => toUpper(meta.metadata_name) === toUpper(metadataKey)
  );
  if (
    checkValue &&
    toUpper(checkValue.metadata_name) === toUpper(metadataKey)
  ) {
    const findIdName = checkValue.metadataValues?.find(
      (metadataValue) =>
        parseInt(metadataValue.id, 10) === parseInt(metadataValueId, 10)
    );
    return findIdName ? findIdName.metadata_value : null;
  }

  return null;
};

export const formatMetadata = (metadata, fieldName, valueField = null) => {
  const formattedMetadataValues = [];
  metadata.forEach((data) => {
    if (toUpper(data.metadata_name) === toUpper(fieldName)) {
      data.metadataValues.forEach((value) => {
        formattedMetadataValues.push({
          label: value.metadata_value,
          value: valueField ? value[valueField] : value.id,
        });
      });
    }
  });
  return orderBy(formattedMetadataValues, ["label"], "asc");
};

export const getMetadataValueById = (metadata, fieldName, valueId) => {
  const formattedValues = formatMetadata(metadata, fieldName);

  let findValue = null;
  if (!isEmpty(formattedValues) && isArray(formattedValues)) {
    findValue =
      formattedValues.find(
        (value) => parseInt(value.value, 10) === parseInt(valueId, 10)
      )?.label || null;
  }

  return findValue;
};

export const formatSubjectCombs = (subjectCombination) => {
  const formattedResults = subjectCombination.map((data) => {
    const subjectCodes = map(data.subjects, "subject_code");
    const subjects = subjectCodes.join(", ");
    return {
      label: `${data.subject_combination_code} ${
        !isEmpty(subjects) ? `[${subjects}]` : ""
      }`,
      value: data.subject_combination_id,
    };
  });
  return orderBy(formattedResults, ["label"], "asc");
};

export const formatSpecialization = (specializations) => {
  const specializationOptions = [];
  specializations.forEach((specialization) => {
    specializationOptions.push({
      label: `(${specialization.specialization_code}) - ${specialization.specialization_title}`,
      value: specialization.id,
    });
  });
  return specializationOptions;
};

export const formatProgrammes = (programmes) => {
  const formattedOptions = [];
  programmes.forEach((programme) => {
    formattedOptions.push({
      label: `(${toUpper(programme.programme_code)}) - ${toUpper(
        programme.programme_title
      )}`,
      value: programme.id,
    });
  });
  return formattedOptions;
};

export const formatStateInstitutions = (institutions) => {
  const formattedOptions = [];
  institutions.forEach((institution) => {
    formattedOptions.push({
      label: `(${toUpper(institution.code)}) - ${toUpper(institution.name)}`,
      value: institution.id,
    });
  });
  return formattedOptions;
};

export const formatSHNumber = (number) => {
  let numberString = number?.toString() || '';
  const zerosToAdd = 6 - numberString.length;
  for (let i = 0; i < zerosToAdd; i += 1) {
    numberString = `0${numberString}`;
  }

  return `STH-WF-${numberString}`;
};

export const formatSupportItems = (items) => {
  const formattedOptions = [];
  items.forEach((item) => {
    formattedOptions.push({
      label: toUpper(item.supportItem.metadata_value),
      value: item.support_item_id,
    });
  });
  return formattedOptions;
};

export const formatStudyClasses = (items) => {
  const formattedOptions = [];
  items.forEach((item) => {
    formattedOptions.push({
      label: toUpper(item.studyLevel.metadata_value),
      value: item.study_level_id,
    });
  });
  return formattedOptions;
};

export const formatCycleOptions = (cycles) => {
  const formattedOptions = [];
  cycles?.forEach((cycle) => {
    formattedOptions.push({
      label: toUpper(cycle.paymentCycle.metadata_value),
      value: cycle.id,
    });
  });
  return formattedOptions;
};

export const formatProgrammeVersions = (programmeVersions) => {
  const formattedOptions = [];
  programmeVersions.forEach((version) => {
    formattedOptions.push({
      label: version.version_title,
      value: version.id,
    });
  });
  return formattedOptions;
};

export const objectifyStringArray = (stringArray) => {
  const formattedOptions = [];
  stringArray.forEach((str) => {
    const obj = { value: str, label: str };
    formattedOptions.push(obj);
  });
  return formattedOptions;
};

// get Support Item by MetaData id
export const getContextItemById = (contextItemArray, itemId, instId) => {
  return (
    contextItemArray.find((item) => {
      return (
        parseInt(item.support_item_id, 10) === parseInt(itemId, 10) &&
        parseInt(item.institution_id, 10) === parseInt(instId, 10)
      );
    })?.supportItem?.metadata_value || "----"
  );
};

export const removeEmptyOrNullObject = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] &&
        typeof obj[k] === "object" &&
        removeEmptyOrNullObject(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};

export const searchStringInArrayObject = (data, fields, valueToSearch) => {
  const searchedValue = [];
  if (typeof fields === "string") {
    data.forEach((datum) => {
      const search = toUpper(datum[fields]).includes(
        toUpper(valueToSearch.trim())
      );
      if (search === true) searchedValue.push(datum);
    });
  } else {
    fields.forEach((field) => {
      data.forEach((datum) => {
        const search = toUpper(datum[field]).includes(
          toUpper(valueToSearch.trim())
        );
        if (search === true) searchedValue.push(datum);
      });
    });
  }
  return searchedValue;
};

export const getObjectValues = (objectData) => {
  const data = {};

  forEach(Object.keys(objectData), (objectKey) => {
    if (
      !isEmpty(objectData[objectKey]) &&
      typeof objectData[objectKey] === "object"
    ) {
      if (Array.isArray(objectData[objectKey])) {
        data[objectKey] = objectData[objectKey].map((object) => {
          if (typeof object === "object") {
            if (Array.isArray(object)) {
              return getObjectValues(object);
            }
            return object.value;
          }
          return object;
        });
      } else if (typeof objectData[objectKey] === "object") {
        const objectKeys = Object.keys(objectData[objectKey]);

        if (difference(objectKeys, ["label", "value"]) > 0) {
          data[objectKey] = objectData[objectKey];
        } else {
          data[objectKey] = objectData[objectKey].value;
        }
      }
    } else data[objectKey] = objectData[objectKey];
  });

  return data;
};

export const searchStringInArrayCounter = (data, valueToSearch) => {
  let searchedValue = 0;
  data.forEach((datum) => {
    const search = toUpper(datum).includes(toUpper(valueToSearch));
    if (search === true) searchedValue += 1;
  });
  return searchedValue;
};

export const formatResultSubjects = (studentResult) => {
  let resultSubjects = studentResult.subjects;

  if (isArray(resultSubjects)) {
    resultSubjects = resultSubjects.map((subject) => {
      const defaultResult = subject.result;

      let score = Number(defaultResult);

      if (Number.isNaN(score)) {
        switch (toUpper(defaultResult)) {
          case "O":
            score = { interpretation: 1, result: defaultResult };
            break;
          case "E":
            score = { interpretation: 2, result: defaultResult };
            break;
          case "D":
            score = { interpretation: 3, result: defaultResult };
            break;
          case "C":
            score = { interpretation: 4, result: defaultResult };
            break;
          case "B":
            score = { interpretation: 5, result: defaultResult };
            break;
          case "A":
            score = { interpretation: 6, result: defaultResult };
            break;
          case "F":
            score = { interpretation: 9, result: defaultResult };
            break;

          case "D1":
            score = { interpretation: 1, result: defaultResult };
            break;
          case "D2":
            score = { interpretation: 2, result: defaultResult };
            break;
          case "C3":
            score = { interpretation: 3, result: defaultResult };
            break;
          case "C4":
            score = { interpretation: 4, result: defaultResult };
            break;
          case "C5":
            score = { interpretation: 5, result: defaultResult };
            break;
          case "C6":
            score = { interpretation: 6, result: defaultResult };
            break;
          case "P7":
            score = { interpretation: 7, result: defaultResult };
            break;
          case "P8":
            score = { interpretation: 8, result: defaultResult };
            break;
          case "X":
            score = { interpretation: 0, result: defaultResult };
            break;

          default:
            score = { interpretation: 0, result: defaultResult };
            break;
        }
      } else {
        switch (score) {
          case 1:
            score = { interpretation: defaultResult, result: "D1" };
            break;
          case 2:
            score = { interpretation: defaultResult, result: "D2" };
            break;
          case 3:
            score = { interpretation: defaultResult, result: "C3" };
            break;
          case 4:
            score = { interpretation: defaultResult, result: "C4" };
            break;
          case 5:
            score = { interpretation: defaultResult, result: "C5" };
            break;
          case 6:
            score = { interpretation: defaultResult, result: "C6" };
            break;
          case 7:
            score = { interpretation: defaultResult, result: "P7" };
            break;
          case 8:
            score = { interpretation: defaultResult, result: "P8" };
            break;
          case 9:
            score = { interpretation: defaultResult, result: "F9" };
            break;

          default:
            score = { interpretation: 0, result: defaultResult };
            break;
        }
      }

      return Object.assign(subject, score);
    });
  }

  return Object.assign(studentResult, { subjects: resultSubjects });
};

export const getPaymentStatus = (status) => {
  const findStatus = paymentStatuses.find(
    (paymentStatus) => paymentStatus.key === status
  );
  if (!findStatus) {
    return "PENDING";
  }
  return findStatus.meaning;
};

export const formatDate = (dateValue) => {
  return moment(dateValue).format("LL");
};

export const formatInstitutionsCode = (str) => {
  const [code, acadYr] = str.slice(1, -1).split(",");
  return `${toUpper(
    institutionCodes.find((item) => item.code === code)?.name || ""
  )}, ${acadYr}`;
};

export const formatInstitutionsName = (str) => {
  return `${toUpper(institutionCodes.find((item) => item.code === str)?.name)}`;
};

export const sumBeneficiaryPayments = (userObj) => {
  // Filter allocations for the specific user
  const userAllocations = userObj.allocations;

  // Initialize total amount
  let totalAmount = 0;

  // Iterate through allocations
  userAllocations.forEach((allocation) => {
    // Iterate through payments in each allocation
    allocation.payments.forEach((payment) => {
      // Add the amount to the total
      totalAmount += payment.amount_paid;
    });
  });
  return totalAmount;
};

export const hasPermission = (userPermissions, allowedPermissions) => {
  return allowedPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

export const currentFinancialYear = (today) => {
  const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed, so we add 1 to get the actual month.

  // If the current month is greater than or equal to July (7),
  // then we are in the current financial year, which starts on July 1st of the current calendar year.
  if (currentMonth >= 7) {
    return `${today.getFullYear()}/${today.getFullYear() + 1}`;
  }
  // Otherwise, we are in the financial year of the previous calendar year.
  return `${today.getFullYear() - 1}-${today.getFullYear()}`;
};

export const arrayAlphabeticalOrder = (arr1, arr2) => {
  // Custom sorting function
  arr1.sort((a, b) => {
    // Get the first characters of both strings
    const charA = a.charAt(0).toLowerCase();
    const charB = b.charAt(0).toLowerCase();

    // Check if either charA or charB is in arr2
    const indexA = arr2.indexOf(charA);
    const indexB = arr2.indexOf(charB);

    // If both characters are in arr2, sort them based on their indices
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only charA is in arr2, it should come before charB
    if (indexA !== -1) {
      return -1;
    }
    // If only charB is in arr2, it should come after charA
    if (indexB !== -1) {
      return 1;
    }
    // If neither charA nor charB are in arr2, maintain the alphabetical order

    // Fallback to alphabetical order
    return a.localeCompare(b);
  });

  return arr1;
};
