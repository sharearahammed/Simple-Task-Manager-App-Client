import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const Signup = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, loading, setLoading, logOut } =
    useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const userInfo = {
      name,
      email,
      role,
    };
    console.log(userInfo);
    setError("");
    // validation
    if (password.length < 6) {
      setError("Password should be 6 charecters or longer");
      return;
    }
    const pattern = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
    if (!pattern.test(password)) {
      setError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      toast.error(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }
    const emailpattern = /^[a-z][^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailpattern.test(email)) {
      setError("Invalid email format.");
      toast.error("Invalid email format.");
      return;
    }

    try {
      setLoading(true);
      //   save user in db
      await axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          console.log("-----------------------", res);
          toast.success("User Create Successfully!");
        }
      });
      //2. User Registration
      const result = await createUser(email, password);
      console.log(result);
      // 3. Save username and photo in firebase
      await updateUserProfile(name);
      logOut();
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="lg:min-h-screen md:p-0 p-8 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="md:block hidden absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-xl rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                  <div className="relative mb-4">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#21D0EC]"
                      placeholder="Your Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Your Name
                    </label>
                  </div>
                  <div className="relative mb-4">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#21D0EC]"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative mb-4">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#21D0EC]"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative mb-4">
                    <select
                      name="role"
                      className="focus:outline-[#21CFEC] p-1 rounded-md w-full"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                  <div className="relative">
                    <button
                      disabled={loading}
                      type="submit"
                      className="bg-[#21CFEC] w-full rounded-md py-3 text-white"
                    >
                      {loading ? (
                        <ImSpinner9 className="text-2xl animate-spin m-auto" />
                      ) : (
                        "Create"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
