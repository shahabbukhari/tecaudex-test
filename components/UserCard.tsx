import { GithubUser } from "@/helpers/github";
import Image from "next/image";
import Avatar, { genConfig } from "react-nice-avatar";

interface UserCardProps extends GithubUser {
  onView: (id: number) => void;
}

function UserCard({ id, name, job_title, img, sex, onView }: UserCardProps) {
  const config = genConfig({
    // @ts-ignore
    sex: sex,
    seed: name,
  });

  return (
    <div
      className="p-7 flex justify-between group relative rounded-lg hover:bg-slate-50 bg-white cursor-pointer transition-all ease-in-out delay-50"
      onClick={() => onView(id)}
    >
      <div className="flex gap-3 items-center justify-start">
        <div className="flex justify-center">
          <Avatar
            {...config}
            className="
          w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300
          "
          />
        </div>
        <div className="">
          <h2 className="text-2xl capitalize font-semibold ">{name}</h2>
          <p className="text-sm text-gray-600">{job_title}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
