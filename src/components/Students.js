import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Eye, Edit, Trash, Plus } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    class: '',
    section: '',
    rollNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    parentName: '',
    parentPhone: '',
    bloodGroup: '',
    medicalInfo: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsList);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Error fetching students: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), formData);
      setIsAddModalOpen(false);
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const studentRef = doc(db, "students", selectedStudent.id);
      await updateDoc(studentRef, formData);
      setIsEditModalOpen(false);
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteDoc(doc(db, "students", id));
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student: " + error.message);
      }
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      class: '',
      section: '',
      rollNumber: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      phoneNumber: '',
      email: '',
      parentName: '',
      parentPhone: '',
      bloodGroup: '',
      medicalInfo: ''
    });
    setSelectedStudent(null);
  };

  // Form fields configuration for reuse
  const formFields = [
    { label: 'First Name', name: 'firstName', type: 'text' ,className: "form-control"},
    { label: 'Last Name', name: 'lastName', type: 'text' , className: "form-control"},
    { label: 'Class', name: 'class', type: 'text'  ,className: "form-control-class"},
    { label: 'Section', name: 'section', type: 'text',className: "form-control-sec" },
    { label: 'Roll Number', name: 'rollNumber', type: 'text',className: "form-control-roll" },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' ,className: "form-control-dob"},
    { label: 'Gender', name: 'gender', type: 'select', options: ['male', 'female', 'other'] },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel',className: "form-control-phone" },
    { label: 'Email', name: 'email', type: 'email' , className: "form-control-email"},
    { label: 'Parent Name', name: 'parentName', type: 'text',className: "form-control-pname" },
    { label: 'Parent Phone', name: 'parentPhone', type: 'tel',className: "form-control-pphone" },
    { label: 'Blood Group', name: 'bloodGroup', type: 'select', 
      options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    { label: 'Address', name: 'address', type: 'textarea' },
    { label: 'Medical Information', name: 'medicalInfo', type: 'textarea' }
  ];

  const renderFormField = (field) => (
    <div className={"form-field"} key={field.name}>
      <label className="form-field">
        {field.label}
      </label>
      {field.type === 'select' ? (
        <select
          value={formData[field.name]}
          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
          className= {field.label==="Gender" ? "form-control-gender" : "form-control-blood"}
          required
        >
          <option value="">Select {field.label}</option>
          {field.options.map(option => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          value={formData[field.name]}
          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
          className= {field.label==='Address' ? "text-address" : "text-med"}
          rows="3"
          required={field.name !== 'medicalInfo'}
        />
      ) : (
        <input
          type={field.type}
          value={formData[field.name]}
          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
          className={field.className}
          required
        />
      )}
    </div>
  );

  const renderModal = (isOpen, title, content, onClose) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="student-info">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="button-form-add"
        >
          <Plus size={20} />
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Class</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Section</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Roll Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{student.id.slice(0, 8)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {`${student.firstName} ${student.lastName}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.section}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.rollNumber}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewStudent(student)}
                      className="button-action"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="button-action"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="button-action"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {renderModal(
        isAddModalOpen,
        "Add New Student",
        <form onSubmit={handleSubmit} className="form-add">
          <div className="grid grid-cols-2 gap-4">
            {formFields.map(field => renderFormField(field))}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="button-form"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-form-add"
            >
              Save Student
            </button>
          </div>
        </form>,
        () => setIsAddModalOpen(false)
      )}

      {/* View Student Modal */}
      {renderModal(
        isViewModalOpen,
        "Student Details",
        selectedStudent && (
          <div className="info-container">
            {formFields.map(field => (
              <div key={field.name} className="info-item">
                <label className="font-medium">{field.label}:</label>
                <div className="mt-1">{selectedStudent[field.name]}</div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="button-form"
              >
                Close
              </button>
            </div>
          </div>
        ),
        () => setIsViewModalOpen(false)
      )}

      {/* Edit Student Modal */}
      {renderModal(
        isEditModalOpen,
        "Edit Student",
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {formFields.map(field => renderFormField(field))}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="button-form"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-form-add"
            >
              Update Student
            </button>
          </div>
        </form>,
        () => setIsEditModalOpen(false)
      )}
    </div>
  );
};

export default Students;