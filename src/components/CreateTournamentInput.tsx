import React from "react";


interface createTournamentInputIF {
    inputLabel: string,
    isRequired: boolean,
    placeHolder: string,
    type: string,
    callback: (value: string) => void,
};




const CreateTournamentInput : React.FC<createTournamentInputIF> = ({inputLabel, isRequired, placeHolder, type, callback}) => {

    const hadleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        callback(event.target.value);
    };

    return(
        <div className="">
            <h1 className="capitalize text-[#45F882] poppins-regular text-[1.5rem]">{`${inputLabel} ${isRequired ? "*" : ""}`}</h1>
            <input onChange={(event) => hadleChange(event)} type={type} className="bg-[#0F1C23] text-[1.2rem] border-[1px] border-[#969EB280] w-full py-[16px] px-[12px] rounded-[1rem] mt-[10px] text-[#969EB2] focus:outline-none " placeholder={placeHolder} />
        </div>
    )
};



export default CreateTournamentInput;