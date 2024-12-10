import Container from "../components/form/FormContainer";
import { Field } from "../components/form/FormFields";
import { LoginFields } from "../constants";

const Login: React.FC = () => {
    return (
        <div
            className="flex h-screen"
        >
            {/* Container on the right */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#1A1D26CC] m-[1%]">
                <h1 className="font-Rajdhani text-[#45F882] capitalize text-[2.5rem] font-semibold mb-[1rem]">Affiliate Login</h1>
                {/* Container component for the form */}
                <Container
                    fields={LoginFields as Field[]}
                    buttons={[
                        { image: 'green', text: 'Login', onClick: () => alert('Save Clicked') }
                    ]}
                />
            </div>
        </div>
    );
};


export default Login;