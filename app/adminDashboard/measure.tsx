import { Measure } from "./types";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from '@/components/ui/table';
import { useState } from "react";

interface MeasureRowProps {
    measure: Measure;
    onEdit: (id: number, updatedMeasure: { quantity: number }) => void;
    onDelete: (id: number) => void;
  }


export function MeasureRow({ measure, onEdit, onDelete }: MeasureProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedMeasure, setEditedMeasure] = useState({
        value: measure.id,
        description: measure.quantity,
    });

    const handleSave = () => {
        onEdit(measure.id, editedMeasure); // Pass updated measure to parent component
        setIsModalOpen(false); // Close modal after save
    };

    return (
      <>
        <TableRow>
          <TableCell className="hidden sm:table-cell">
            {measure.id}
          </TableCell>
          <TableCell className="font-medium">{measure.quantity}</TableCell>
          <TableCell className="font-medium">{measure.device.deviceName}</TableCell>
          <TableCell className="font-medium">{measure.address.city}</TableCell>
          <TableCell className="font-medium">{new Date(measure.createdAt).toLocaleDateString()}</TableCell>
          <TableCell className="font-medium">{measure.updatedAt ? new Date(measure.updatedAt).toLocaleDateString() : "-"}</TableCell>
  
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
                <DropdownMenuItem onClick={() => onDelete(measure.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
  
        {/* Modal for editing measure */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Edit Measure</h2>
              <input
                className="border border-gray-300 p-2 rounded mb-4 w-full"
                type="number"
                placeholder="Quantity"
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(Number(e.target.value))}
              />
              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Save
                </Button>
                <Button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }