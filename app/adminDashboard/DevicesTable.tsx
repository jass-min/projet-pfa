"use client";
import React, { useState, useEffect } from 'react';
import { Device } from "./types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getDevices, addDevice, deleteDevice, updateDevice } from "@/app/adminDashboard/api/apiDevice";
import { DeviceRow } from "./device";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';


const DevicesTable: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]); // State to hold the list of devices
  const [isLoading, setIsLoading] = useState(false); // Loading state for the Add Device button
  const [newDevice, setNewDevice] = useState<Partial<Device>>({}); // State for a new device being added
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [currentDevice, setCurrentDevice] = useState<Partial<Device> | null>(null);



  // Fetch devices from the backend 
  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, []); // Empty array makes it run only once



  // Function to add a new device
  const handleAddDevice = async (newDevice: { deviceName: string; referenceNumber: string }) => {
    if (!newDevice.deviceName || !newDevice.referenceNumber) {
      alert("Please fill in both the device name and reference number");
      return;
    }
    setIsLoading(true);
    try {
      const device: Device = await addDevice(newDevice); // Expecting a complete Device object
      setDevices((prev) => [...prev, device]); // Add the new device to the state
      setNewDevice({}); // Clear the form
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error adding device:", error);
      alert("Failed to add the device. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  // Function to delete a device by ID
  const deleteDeviceFromTable = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteDevice(id); // Call deleteDevice directly
      setDevices((prev) => prev.filter((device) => device.id !== id)); // Update state to remove the deleted device
    } catch (error) {
      console.error("Error deleting device:", error);
    } finally {
      setIsLoading(false);
    }
  };


  //funtion to update Measure
  const handleUpdateDevice = async (id: number, updatedDevice: { deviceName: string, referenceNumber: string }) => {
    if (!updatedDevice.deviceName || !updatedDevice.referenceNumber) {
      alert("Please provide valid device name and reference number.");
      return;
    }

    try {
      const updated = await updateDevice(id, updatedDevice); // Call API
      setDevices((prev) =>
        prev.map((device) => (device.id === id ? { ...device, ...updated } : device))
      );
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const handleEditDevice = (device: Device) => {
    setCurrentDevice(device);
  };


  const saveUpdatedDevice = async () => {
    if (currentDevice && currentDevice.id) {
      try {
        await handleUpdateDevice(currentDevice.id, {
          deviceName: currentDevice.deviceName!,
          referenceNumber: currentDevice.referenceNumber!,
        });
        setDevices((prev) =>
          prev.map((device) =>
            device.id === currentDevice.id ? { ...device, ...currentDevice } : device
          )
        );
        setCurrentDevice(null); // Close the modal
      } catch (error) {
        console.error("Error updating device:", error);
        alert("Failed to update the device.");
      }
    }
  };



  const TypographyH2: React.FC = () => (
    <h2 className="text-3xl font-semibold tracking-tight">
      Devices Table
    </h2>
  );

  return (
    <div className="p-4">
      <TypographyH2 />
      {/* Button to open Add Device modal (pop-up) */}
      <Button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Device
      </Button>

      {/* Modal for adding a new device */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-card p-5 rounded-lg shadow-lg max-w-sm w-full z-50">
            <h2 className="text-xl font-bold mb-4 text-primary-foreground">Add New Device</h2>
            <input
              className="border border-input p-2 rounded mb-4 w-full bg-card-foreground text-primary-foreground"
              type="text"
              placeholder="Device Name"
              value={newDevice.deviceName || ""}
              onChange={(e) => setNewDevice({ ...newDevice, deviceName: e.target.value })}
            />
            <input
              className="border border-input p-2 rounded mb-4 w-full bg-card-foreground text-primary-foreground"
              type="text"
              placeholder="Reference Number"
              value={newDevice.referenceNumber || ""}
              onChange={(e) => setNewDevice({ ...newDevice, referenceNumber: e.target.value })}
            />
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (newDevice.deviceName && newDevice.referenceNumber) {
                    handleAddDevice({
                      deviceName: newDevice.deviceName,
                      referenceNumber: newDevice.referenceNumber,
                    });
                  } else {
                    alert("Please fill in both the device name and reference number");
                  }
                }}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
              >
                {isLoading ? "Adding..." : "Add Device"}
              </Button>
            </div>
            <button
              className="mt-4 text-red-500 hover:underline"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Table to display the list of devices */}
      <Card>
        <CardHeader>
          <CardTitle>Devices Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Device Name</TableHead>
                <TableHead>Reference Number</TableHead>
                <TableHead>Device Category</TableHead>
                <TableHead>Measure Value</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Map over the devices and create a row for each device */}
              {devices.map((device) => (
                <DeviceRow
                  key={device.id}
                  device={device}
                  onDelete={deleteDeviceFromTable}
                  onEdit={handleUpdateDevice} // Pass the update handler here
                />
              ))}

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default DevicesTable; // Export the DevicesTable component
