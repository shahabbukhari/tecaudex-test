import { GithubUser } from "@/helpers/github";
import { useEffect, useState } from "react";
import TextField from "./TextField";

interface NewUserFormProps {
  onSubmit: (user: GithubUser) => void;
  data?: GithubUser;
  viewOnly?: boolean;
}

const initialState: GithubUser = {
  img: "",
  job_title: "",
  name: "",
  id: 0,
  sex: "",
};

function NewUserForm({ onSubmit, data, viewOnly = false }: NewUserFormProps) {
  const [formData, setFormData] = useState<GithubUser>(initialState);

  console.log(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div>
      <TextField
        label="Full Name"
        value={formData.name}
        name="node_id"
        placeholder="Enter your node id"
        onChange={handleChange}
        disabled={viewOnly}
      />
      <TextField
        label="Job Title"
        value={formData.job_title}
        onChange={handleChange}
        name="type"
        placeholder="Enter your type"
        disabled={viewOnly}
      />
      {!viewOnly && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full
      text-center w-full  
      "
          onClick={handleSubmit}
        >
          Save
        </button>
      )}
    </div>
  );
}

export default NewUserForm;
