import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    formState: { errors },
  } = useForm({ mode: "onChange" });

  //   const handleSubmit = () => {};

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-10 bg-white rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Admin
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold"
              style={{ color: "#36454F" }}
            >
              ID
            </label>
            <input
              id="id"
              type="text"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            />
            {errors?.id && (
              <div>
                {/* <span className="text-red-500">{errors.id.message}</span> */}
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
            />
            {errors?.password && (
              <div>
                {/* <span className="text-red-500">{errors.password.message}</span> */}
              </div>
            )}
          </div>

          <div className="mt-6 mb-2">
            <button
              className="w-full text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-200"
              style={{ backgroundColor: "#36454F" }}
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
