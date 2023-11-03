import { GithubUser } from "@/helpers/github";
import Image from "next/image";
import Edit from "./SvgIcons/Edit";
import Delete from "./SvgIcons/Delete";
import Eye from "./SvgIcons/Eye";

interface UserCardProps extends GithubUser {
  onView: (id: number) => void;
}

function UserCard({
  avatar_url,
  id,
  login,
  node_id,
  type,
  onView,
}: UserCardProps) {
  return (
    <div
      className="p-7 flex justify-between group relative rounded-lg hover:bg-slate-50 bg-white cursor-pointer transition-all ease-in-out delay-50"
      onClick={() => onView(id)}
    >
      <div className="flex gap-3 items-center justify-start">
        <div className="flex justify-center">
          <Image
            width={50}
            height={50}
            src={avatar_url}
            alt="Profile Picture"
            className="w-30 h-30 rounded-full"
            onError={(e) => {
              e.currentTarget.src = "images/dummyImage.png";
            }}
          />
        </div>
        <div className="">
          <h2 className="text-2xl capitalize font-semibold ">{login}</h2>
          <p className="text-sm text-gray-600">User ID: {id}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
