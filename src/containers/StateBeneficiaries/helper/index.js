/* eslint-disable no-prototype-builtins */
export const mergeArraysByID = (objects) => {
  const mergedObjects = {};
  objects.forEach((object) => {
    const { id } = object;

    if (mergedObjects.hasOwnProperty(id)) {
      mergedObjects[id].allocations = mergedObjects[id].allocations.concat(
        object.allocations
      );
    } else {
      mergedObjects[id] = { ...object };
    }
  });
  const mergedArray = Object.values(mergedObjects);

  return mergedArray;
};

export const test = () => {
  return null;
};
