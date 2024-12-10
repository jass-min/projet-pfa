import { Device } from "../types";
import { fetchData, postData, deleteData, updateData } from "./apiClient";

export const getDevices = async () => {
  return await fetchData("devices");
};

export const addDevice = async (device: { deviceName: string; referenceNumber: string }): Promise<Device> => {
  const response = await postData("devices", device);
  return response; // Ensure response is of type Device
};


export const deleteDevice = async (id: number) => {
  return await deleteData(`devices/${id}`);
};


export const updateDevice = async (id: number, updatedDevice: { deviceName: string; referenceNumber: string }) => {
  return await updateData(`devices/${id}`, updatedDevice);
};
