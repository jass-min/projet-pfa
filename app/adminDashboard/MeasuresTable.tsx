"use client";
import React, { useState, useEffect } from "react";
import { Measure } from "./types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getMeasures,
  addMeasure,
  deleteMeasure as deleteMeasureAPI,
  updateMeasure,
} from "@/app/adminDashboard/api/apiMeasure";
import { MeasureRow } from "./measure";

const MeasuresTable: React.FC = () => {
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [setEditedMeasure, setEditingMeasure] =
    useState<Partial<Measure> | null>(null); // State for editing a measure
  const [isLoading, setIsLoading] = useState(false); // Loading state for the Add measure button
  const [newMeasure, setNewMeasure] = useState<Partial<Measure>>({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [currentMeasure, setCurrentMeasure] = useState<Partial<Measure> | null>(
    null
  ); // For editing a measure

  // Fetch measures from backend
  useEffect(() => {
    const fetchMeasures = async () => {
      try {
        const data = await getMeasures(); // Use reusable API utility
        setMeasures(data);
      } catch (error) {
        console.error("Error fetching measures:", error);
      }
    };
    fetchMeasures();
  }, []);

  // function add measure
  const handleAddMeasure = async (newMeasure: Partial<Measure>) => {
    const quantity = newMeasure.quantity ?? 0; // Utiliser 0 si `quantity` est `undefined`

    setIsLoading(true);
    try {
      const measure = await addMeasure({ quantity }); // Passer directement la valeur de `quantity`
      setMeasures((prev: any) => [...prev, measure]);
      setNewMeasure({ quantity: 0 });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding measure:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete measure by ID
  const deleteMeasure = async (id: number) => {
    try {
      await deleteMeasureAPI(id); // Use reusable API utility for deletion
      setMeasures((prev) => prev.filter((measure) => measure.id !== id)); // Update measures state
    } catch (error) {
      console.error("Error deleting measure:", error);
    }
  };

  //update measure funtion
  const handleUpdateMeasure = async (
    id: number,
    updatedMeasure: { quantity: number }
  ) => {
    if (!updatedMeasure.quantity) {
      alert("Please provide a valid measure value");
      return;
    }

    try {
      const updated = await updateMeasure(id, updatedMeasure); // Use API utility
      setMeasures((prev) =>
        prev.map((measure) =>
          measure.id === id ? { ...measure, ...updated } : measure
        )
      );
      setEditingMeasure(null); // Close edit mode
    } catch (error) {
      console.error("Error updating measure:", error);
    }
  };

  const handleDeleteMeasure = (id: number) => {
    deleteMeasure(id);
  };
  const TypographyH2: React.FC = () => (
    <h2 className="text-3xl font-semibold tracking-tight">Measures Table</h2>
  );

  return (
    <div className="p-4">
      <TypographyH2 />
      {/* Button to open Add Device modal (pop-up) */}
      <Button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Measure
      </Button>

      {/* Modal for adding new measure */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-card p-5 rounded-lg shadow-lg max-w-sm w-full z-50">
            <h2 className="text-xl font-bold mb-4 text-primary-foreground">
              Add New Measure
            </h2>
            <input
              className="border border-input p-2 rounded mb-4 w-full bg-card-foreground text-primary-foreground"
              type="number"
              placeholder="Measure value"
              value={newMeasure.quantity || ""}
              onChange={(e) =>
                setNewMeasure({
                  ...newMeasure,
                  quantity: parseInt(e.target.value),
                })
              }
            />
            <div className="flex justify-end">
              <Button
                onClick={() => handleAddMeasure(newMeasure)}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
              >
                {isLoading ? "Adding..." : "Add Measure"}
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

      {/* Table for displaying measures */}
      <Card>
        <CardHeader>
          <CardTitle>Measures Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Device Name</TableHead>
                <TableHead>Address (City)</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Map over the measures and create a row for each measure */}
              {measures.map((measure) => (
                <MeasureRow
                  key={measure.id}
                  measure={measure}
                  onDelete={handleDeleteMeasure}
                  onEdit={() => setEditingMeasure(measure)}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeasuresTable;
