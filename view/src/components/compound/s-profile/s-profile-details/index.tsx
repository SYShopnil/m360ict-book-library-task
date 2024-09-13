import { IUser } from "@src/types/db/user";

interface ISProfileDetails
  extends Pick<IUser, "bio" | "birthdate" | "email" | "id" | "name"> {}

export function SProfileDetails({
  email,
  bio,
  birthdate,
  id: author_id,
  name,
}: ISProfileDetails) {
  return (
    <>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>Author Id:</span>{" "}
        {author_id}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>UserName:</span> {name}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>Birth Date:</span>{" "}
        {new Date(birthdate).toISOString().split("T")[0]}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>Bio:</span> {bio}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>Email: </span>
        {email}
      </p>
    </>
  );
}
