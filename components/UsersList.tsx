"use client";

import React, { useEffect, useMemo, useState } from "react";
import UserCard from "./UserCard";
import { GithubUser } from "@/helpers/github";
import NewUserModal from "./NewUserModal";
import userData from "../mock/user_data.json";
import ButtonGroup from "./ButtonGroup";

function UsersList() {
  const [users, setUsers] = useState<GithubUser[]>(userData);
  const [userModal, setUserModal] = useState({
    open: false,
    user: {} as GithubUser,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [viewOnly, setViewOnly] = useState(false);

  const closeModal = () => {
    setUserModal({
      open: false,
      user: {} as GithubUser,
    });
  };

  const openModal = (user: GithubUser) => {
    setUserModal({
      open: true,
      user,
    });
  };

  const onSave = (user: GithubUser) => {
    if (user.id) {
      const index = users.findIndex((u) => u.id === user.id);
      users[index] = user;
      setUsers([...users]);
    } else {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
    }
    closeModal();
  };

  const onDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const onEdit = (id: number) => {
    const user = users.find((user) => user.id === id);
    setViewOnly(false);
    if (user) {
      openModal(user);
    }
  };

  const onView = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      openModal(user);
      setViewOnly(true);
    }
  };
  let searchTimeout: NodeJS.Timeout;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      setSearchTerm(searchTerm);
    }, 400);
  };

  const userCards = useMemo(() => {
    return users
      .splice(0, 6)
      .filter((user) => {
        if (!searchTerm) return true;
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
      .map((user) => <UserCard {...user} key={user.id} onView={onView} />);
  }, [users, searchTerm]);

  return (
    <div className="px-3 md:lg:xl:px-40 py-20">
      <section className="mb-10 pb-10">
        <div className="flex justify-between items-center mb-5 pb-2 border-b border-b-primary">
          <h1 className="text-3xl font-bold ">Releases</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 rounded md:grid-cols-2 lg:xl:grid-cols-3 ">
          {[1, 2, 3].map((item, index) => (
            <div
              className="p-7 flex justify-between group relative rounded-lg border border-gray-50 hover:bg-slate-50 shadow cursor-pointer transition-all ease-in-out delay-50 w-max-[300px]"
              key={index}
            >
              <p>Version 1.0.0 - 1st Jan 2021</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-10 pb-10">
        <div className="flex justify-between items-center mb-5 pb-2 border-b border-b-primary">
          <h1 className="text-3xl font-bold ">In Progress</h1>

          <div
            className="
            flex items-center justify-center flex-6
          "
          >
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              onChange={handleSearch}
            />

            <button className="bg-primary text-white px-3 py-2 rounded-md ml-3 min-w-[150px]">
              Add New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded md:grid-cols-2 lg:xl:grid-cols-3 ">
          {userCards}
        </div>
      </section>

      <section className="mb-10 pb-10">
        <div className="flex justify-between items-center mb-5 pb-2 border-b border-b-primary">
          <h1 className="text-3xl font-bold ">Ideas</h1>

          <ButtonGroup list={["New", "Updated", "Voted"]} />
        </div>

        <div className="grid grid-cols-1 gap-4 rounded md:grid-cols-2 lg:xl:grid-cols-3 ">
          {userCards}
        </div>
      </section>

      <NewUserModal
        open={userModal.open}
        onClose={closeModal}
        onSave={onSave}
        data={userModal.user}
        title={
          userModal.user.id
            ? (viewOnly && "View User") || "Edit User"
            : "Add New User"
        }
        viewOnly={viewOnly}
      />
    </div>
  );
}

export default UsersList;
