// UserList.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddUser from "./AddUser";
import SearchUser from "./SearchUser";
import EditUser from "./EditUser";
import FilterUser from "./FilterUser";
import { User } from "../types/userType";
import {
  addUser,
  editUser,
  deleteUser,
  searchUsers,
  filterUsersByDate,
} from "../controllers/UserControllers";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const UserList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const updateUserList = () => {
      const filteredUsers = filterUsersByDate(startDate, endDate);
      const searchedUsers = searchUsers(query);
      const combinedUsers = filteredUsers.filter((user) =>
        searchedUsers.some((searchedUser) => searchedUser.id === user.id)
      );
      setUsers(combinedUsers);
    };
    updateUserList();
  }, [query, startDate, endDate]);

  useEffect(() => {
    const params: Record<string, string> = { query, page: page.toString() };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    setSearchParams(params);
  }, [query, page, startDate, endDate]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleAddUser = (user: User) => {
    try {
      addUser(user);
      setShowAddModal(false);
      setUsers((prev) => [...prev, user]);
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  const handleEditUser = (user: User) => {
    try {
      editUser(user);
      setEditingUser(null);
      setUsers((prev) =>
        prev.map((existingUser) =>
          existingUser.id === user.id ? user : existingUser
        )
      );
    } catch (error) {
      console.error("Failed to edit user", error);
    }
  };

  const handleDeleteUser = (id: number) => {
    try {
      deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleDateFilter = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(users.length / 5);
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginatedUsers = users.slice((page - 1) * 5, page * 5);
  const totalPages = Math.ceil(users.length / 5);

  return (
    <div className="p-4">
      {showAddModal && (
        <AddUser
          isModal={true}
          setModal={() => setShowAddModal(false)}
          onAddUser={handleAddUser}
        />
      )}

      {editingUser && (
        <EditUser
          isModal={true}
          setModal={() => setEditingUser(null)}
          user={editingUser}
          onEditUser={handleEditUser}
        />
      )}

      <div className="flex flex-wrap items-center gap-4 justify-between mb-4">
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => setShowAddModal(true)}
        >
          Add User
        </button>
        <FilterUser onApplyFilter={handleDateFilter} />
      </div>

      <SearchUser query={query} onSearch={handleSearch} />

      {paginatedUsers.length ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Book Title</th>
                <th className="border border-gray-300 p-2">Load Date</th>
                <th className="border border-gray-300 p-2">Return Date</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 p-2">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.address}</td>
                  <td className="border border-gray-300 p-2">{user.phone}</td>
                  <td className="border border-gray-300 p-2">
                    {user.bookTitle}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.loadDate}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.returnDate}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              <button
                className="px-4 py-2 bg-red-500 text-white font-bold rounded disabled:bg-red-300 disabled:cursor-not-allowed"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
              >
                <FaArrowLeft />
              </button>
              <div className="px-4 py-2 bg-gray-300 rounded">{page}</div>
              <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center h-96 flex items-center justify-center mt-4">
          <p className="text-gray-500">Data Not Found</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
