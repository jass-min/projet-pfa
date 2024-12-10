import { Device } from "./types";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from '@/components/ui/table';
import { useState } from "react";

interface DeviceProps {
    device: Device;
    onEdit: (id: number, updatedDevice: { deviceName: string; referenceNumber: string }) => void;
    onDelete: (id: number) => void;
}

export function DeviceRow({ device, onEdit, onDelete }: DeviceProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedDevice, setEditedDevice] = useState({
        deviceName: device.deviceName,
        referenceNumber: device.referenceNumber,
    });

    const handleSave = () => {
        // Pass both the device id and the updated device details
        onEdit(device.id, editedDevice); // Corrected: Pass device.id and editedDevice object
        setIsModalOpen(false); // Close modal
    };
    return (
        <>
            <TableRow>
                <TableCell className="hidden sm:table-cell">
                    {device.id}
                </TableCell>
                <TableCell className="font-medium">{device.deviceName}</TableCell>
                <TableCell className="font-medium">{device.referenceNumber}</TableCell>
                <TableCell className="font-medium">{device.deviceCategory.categoryName}</TableCell>
                <TableCell className="font-medium">{device.measures.length}</TableCell>
                <TableCell className="font-medium">{new Date(device.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{device.updatedAt ? new Date(device.updatedAt).toLocaleDateString() : '-'}</TableCell>

                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(device.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            {/* Modal for editing device */}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Device</h2>
                        <input
                            className="border border-gray-300 p-2 rounded mb-4 w-full"
                            type="text"
                            placeholder="Device Name"
                            value={editedDevice.deviceName || ""}
                            onChange={(e) =>
                                setEditedDevice({ ...editedDevice, deviceName: e.target.value })
                            }
                        />
                        <input
                            className="border border-gray-300 p-2 rounded mb-4 w-full"
                            type="text"
                            placeholder="Reference Number"
                            value={editedDevice.referenceNumber || ""}
                            onChange={(e) =>
                                setEditedDevice({ ...editedDevice, referenceNumber: e.target.value })
                            }
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

