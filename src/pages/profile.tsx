import React from "react";
import Sidebar from "../components/layout/SideBar"; // Adjust the import path as needed
import Container from "../components/form/FormContainer";
import { Field } from "../components/form/FormFields";
import { ProfileFields } from "../constants";

const Profile: React.FC = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Container on the right */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#1A1D26CC] m-[1%]">
                <h1 className="font-Rajdhani text-[#45F882] capitalize text-[1.5rem] font-semibold mb-[1rem]">
                    Profile
                </h1>
                {/* Container component for the form */}
                <Container
                    fields={ProfileFields as Field[]}
                    buttons={[
                        { image: 'green', text: 'Save', onClick: () => alert('Save Clicked') },
                        { image: 'yellow', text: 'Reset', onClick: () => alert('Reset Clicked') },
                    ]}
                />
            </div>
        </div>
    );
};

export default Profile;
