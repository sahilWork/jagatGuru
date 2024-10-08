import React from 'react';
import {BooksUserTypeWithId } from '../../utils/types'; // Assuming you have defined a type for book data

interface BookTableProps {
  data: BooksUserTypeWithId[];
  fetchData: () => void;
  onEdit: (book: BooksUserTypeWithId) => void; // Pass the book data to the edit form
  onDelete: (id: string) => void; // Function to handle delete
}

const BookTable: React.FC<BookTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Pincode</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="py-2 px-4">{book.name}</td>
                <td className="py-2 px-4">{book.email}</td>
                <td className="py-2 px-4">{book.phone}</td>
                <td className="py-2 px-4">{book.pincode}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                No Books User found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
