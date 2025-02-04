import connectDB from './db';
import Data from '../models/Data';

export async function fetchData(query = {}, options = {}) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch data based on query
    const data = await Data.find(query, null, options);
    
    // Convert MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Fetch single document by ID
export async function fetchDataById(id: string) {
  try {
    await connectDB();
    const data = await Data.findById(id);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    throw error;
  }
}

// Create new document
export async function createData(data: any) {
  try {
    await connectDB();
    const newData = new Data(data);
    await newData.save();
    return JSON.parse(JSON.stringify(newData));
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
}

// Update document
export async function updateData(id: string, data: any) {
  try {
    await connectDB();
    const updatedData = await Data.findByIdAndUpdate(id, data, { new: true });
    return JSON.parse(JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Delete document
export async function deleteData(id: string) {
  try {
    await connectDB();
    await Data.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
} 