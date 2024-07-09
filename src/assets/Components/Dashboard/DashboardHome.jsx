import useAuth from "../../Hook/useAuth";

const DashboardHome = () => {
    const {user} = useAuth();
    return (
        <>
        <div className="pt-16 pl-10 min-h-screen rounded-none bg-no-repeat bg-cover flex justify-center items-center">
            <h1 className="text-6xl font-bold">Welcome {user?.displayName}</h1>

        </div>
        </>
    );
};

export default DashboardHome;
