export const hasAccessPermissions = (userPermissions, accessPermissions) => {
  for (let i = 0; i < userPermissions.length; i += 1) {
    if (
      accessPermissions.includes(
        userPermissions.map((item) => item?.permission?.metadata_value)[i]
      )
    ) {
      return false;
    }
  }
  return true;
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
