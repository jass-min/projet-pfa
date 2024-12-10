import { fetchData, postData, deleteData, updateData } from "./apiClient";

export const getMeasures = async () => {
  return await fetchData("measures");
};


export const addMeasure = async (measure: { quantity: number }) => {
  return await postData("measures", measure);
};

export const deleteMeasure = async (id: number) => {
  return await deleteData(`measures/${id}`);
};

export const updateMeasure = async (id: number, updatedMeasure: { quantity: number }) => {
  return await updateData(`measures/${id}`, updatedMeasure);
};