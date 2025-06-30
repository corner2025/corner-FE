import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = async ({ id, password }: FormData) => {
    const body = {
      id,
      password,
    };
    try {
      const response = await axiosInstance.post("/admin/login", body);
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("Login successful");
      reset();
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message || error.message);
      } else {
        console.error(error);
      }
    }
  };

  const userId = {
    required: "ID is required",
  };

  const userPassword = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-10 bg-white rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Admin
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="id"
              className="text-sm font-semibold"
              style={{ color: "#36454F" }}
            >
              ID
            </label>
            <input
              id="id"
              type="text"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("id", userId)}
            />
            {errors?.id && (
              <div>
                <span className="text-red-500">
                  {errors.id.message as string}
                </span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold"
              style={{ color: "#36454F" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span className="text-red-500">
                  {errors.password.message as string}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 mb-2">
            <button
              className="w-full text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-200"
              style={{ backgroundColor: "#36454F" }}
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
