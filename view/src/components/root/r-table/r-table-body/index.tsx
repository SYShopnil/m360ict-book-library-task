import { EDataTestId } from "@src/types/common";
import { IUser } from "@src/types/db/user";

interface RTableHead {
  users: IUser[];
}

export function RTableBody({ users }: RTableHead) {
  return (
    <div data-testid={EDataTestId.RTableBody}>
      {users.map((user, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          } border-b border-gray-300`}
        >
          <div className="w-3/6 text-center">{user.email}</div>
          <div className="w-1/6 text-center">{user.userName}</div>
          <div className="w-1/6 text-center">
            <img
              src={user.profilePicLink}
              alt="Profile Pic"
              className="w-10 h-10 mx-auto rounded-full"
            />
          </div>
          <div className="w-1/6 text-center">{user.userType}</div>
          <div className="w-1/6 text-center">{user.gender}</div>
        </div>
      ))}
    </div>
  );
}
