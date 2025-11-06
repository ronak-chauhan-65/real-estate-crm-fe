import React, { memo } from "react";

const UserRow = memo(({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
  </tr>
));

export default function UsersTable({ users = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => <UserRow key={user.id} user={user} />)
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
