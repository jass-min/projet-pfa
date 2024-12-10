// Define the DeviceCategory interface
export interface DeviceCategory {
    id: number;   // Primary Key
    categoryName: string; // Name of the category
  }
  
  // Define the Measure interface
  export interface Measure {
    id: number;          // Primary Key
    quantity: number;    // Quantity of the measure
    createdAt: Date;     // Creation timestamp
    updatedAt: Date;     // Last updated timestamp
    device: Device;      // Associated device
    address: Address;    // Associated address
  }
  
  // Define the Address interface
  export interface Address {
    id: number;       // Primary Key
    latitude: number; // Latitude of the address
    longitude: number; // Longitude of the address
    city: string;     // City of the address
    country: string;  // Country of the address
    province: string; // Province of the address
  }
  
  // Define the Device interface
  export interface Device {
    id: number;                   // Primary Key
    deviceName: string;           // Device name
    referenceNumber: string;      // Device reference number
    deviceCategory: DeviceCategory; // Associated category
    measures: Measure[];          // List of associated measures
    createdAt: Date;     // Creation timestamp
    updatedAt: Date;     // Last updated timestamp
  }
  