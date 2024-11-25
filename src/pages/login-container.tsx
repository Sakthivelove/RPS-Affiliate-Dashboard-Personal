import { SecondaryButton } from "../components/Button";

const LoginContainer = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Rock Tournament Logo */}
            <div className="mb-16 flex justify-center">
                <img
                    src="/RockMainLogo.png"
                    alt="Rock Tournament Logo"
                    className="w-1/4"
                />
            </div>

            {/* Gradient Border Container */}
            <div className="relative rounded-lg p-0.5 w-[50%] bg-gradient-to-r from-[#45F882] to-[#FFBE18]">
                <div className="rounded-lg bg-[#1A1D26] p-16 text-center flex flex-col items-center justify-center">
                    {/* Login with Password Button */}

                    <SecondaryButton listener={() => { }} context={"LOGIN WITH PASSWORD"} />

                    {/* "OR" Text */}
                    <div className="text-[#45F882] font-medium my-4">OR</div>
                    {/* Login with Telegram Button */}

                    <SecondaryButton listener={() => { }} context={"LOGIN WITH TELEGRAM"} />

                </div>
            </div>

            {/* Signup Text */}
            <div className="mt-6">
                <p className="text-[#45F882] cursor-pointer hover:underline text-[1.5rem]">
                    Signup
                </p>
            </div>
        </div>
    );
};

export default LoginContainer;
