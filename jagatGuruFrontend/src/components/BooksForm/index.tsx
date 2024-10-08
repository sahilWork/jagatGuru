import { useState, useEffect } from 'react';
import { BooksUserType } from '../../utils/types'; // Adjust this to your book user type

interface BookFormProps {
  userData?: BooksUserType; // This prop will be used to edit existing user data
  onSubmit: (formData: BooksUserType) => void;
}

const BookUserForm: React.FC<BookFormProps> = ({ userData, onSubmit }) => {
  const [formData, setFormData] = useState<BooksUserType>({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    address:'',
    role: 'Books User',
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        {userData ? 'Edit User' : 'Add User'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter user name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter user email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter user phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter user address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="Enter user pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-lg py-4 text-white bg-primary hover:bg-primary-dark transition-all duration-200 ease-in-out"
        >
          {userData ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default BookUserForm;

