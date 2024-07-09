/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
    const navigate = useNavigate()
  const { signIn, loading, setLoading } =
    useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
    
        try {
          setLoading(true)
          // 1. sign in user
          await signIn(email, password)
          navigate('/dashboard')
          toast.success('Signup Successful')
        } catch (err) {
          console.log(err)
          toast.error(err.message)
          setLoading(false)
        }
      }

    return (
        <div className="lg:min-h-screen py-6 flex md:p-0 p-8 flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="md:block hidden absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-xl rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
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
                <div className="relative">
                <button
                      disabled={loading}
                      type="submit"
                      className="bg-[#21CFEC] w-full rounded-md py-3 text-white"
                    >
                      {loading ? (
                        <ImSpinner9 className="text-2xl animate-spin m-auto" />
                      ) : (
                        "Login"
                      )}
                    </button>
                </div>
                </form>
                <p className="">
                Don't have an account? <a className="text-[#21d0ec] hover:underline" href="/signup">Signup</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    );
};

export default Login;