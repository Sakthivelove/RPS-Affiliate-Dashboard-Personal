import React from "react";


interface ButtonPropsIF {
    context: string,
    listener: () => void
};




const PrimaryButton :  React.FC<ButtonPropsIF> = ({ context, listener }) => {



    return(
        <div onClick={listener} className="relative w-fit cursor-pointer">
            <img src="/affiliatePanel/button_bg_primary.png" alt="" className="" />
            <div className="absolute top-0 w-full h-full flex items-center justify-center">
                <h1 className="capitalize text-[1rem] rajdhani-bold">{context}</h1>

            </div>
            
        </div>
    );
};



const SecondaryButton : React.FC<ButtonPropsIF> = ({context, listener}) =>{


    return(
        <div onClick={listener} className="relative w-fit cursor-pointer">
            <img src="/affiliatePanel/button_bg_secondary.png" alt="" className="" />
            <div className="absolute top-0 w-full h-full flex items-center justify-center">
                <h1 className="capitalize text-[1rem] rajdhani-bold">{context}</h1>

            </div>
            
        </div>  
    );
};


export { PrimaryButton, SecondaryButton };
