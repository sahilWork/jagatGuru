import React, { useEffect, useState } from 'react';
import apiCall from '../../apiCalls';
import AddUserModal from '../../components/AddUserModal';
import BookForm from '../../components/BooksForm';
import BookTable from '../../common/BookTable';
import { BooksUserTypeWithId } from '../../utils/types';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<BooksUserTypeWithId[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BooksUserTypeWithId | null>(
    null,
  );

  // useEffect(() => {
  //   fetchBookData();
  // }, []);

  // const fetchBookData = async () => {
  //   try {
  //     const response = await apiCall.getuserList('Books User');
  //     if (response) {
  //       setData(response);
  //     }
  //   } catch (error) {
  //     console.log(error, 'fetch book data error');
  //   }
  // };

  const handleModalOpen = () => {
    setEditingBook(null); // Reset form for adding a new book
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (formData: BooksUserTypeWithId) => {
    // Handle adding or editing book logic here
    if (editingBook) {
      // Update existing book logic
    } else {
      // Add new book logic
    }
    // fetchBookData(); // Refresh the book data after submitting
    handleModalClose();
  };

  return (
    <>
      <div className="flex justify-end my-4">
        <button
          type="button"
          onClick={handleModalOpen}
          className="rounded-lg py-2 px-6 text-white bg-primary hover:bg-primary-dark transition-all duration-200 ease-in-out"
        >
          Add New Book User
        </button>
      </div>

      <BookTable
        onEdit={() => {}}
        onDelete={() => {}}
        data={data}
        fetchData={()=>{}}
      />
      {isModalOpen && (
        <AddUserModal onClose={handleModalClose}>
          <BookForm bookData={editingBook} onSubmit={handleFormSubmit} />
        </AddUserModal>
      )}
    </>
  );
};

export default Dashboard;
