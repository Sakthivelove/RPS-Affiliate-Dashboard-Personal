import React,{ useState } from "react";
import CreateTournamentInput from "../components/CreateTournamentInput";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import {  Dialog, DialogBody, } from "@material-tailwind/react"


interface DialogIF{
    isOpen: boolean,
    handleOpen: () => void,
}
const DialogBox: React.FC<DialogIF> = ({isOpen, handleOpen}) => {

    return(
            <Dialog className="bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[50px] md:rounded-[100px] h-[40vh] md:h-[60vh] p-[1px]" color={undefined} open={isOpen} handler={handleOpen}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="w-full h-full bg-[#1A1D26] rounded-[50px] md:rounded-[100px]">
                <DialogBody className="w-full h-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                   <div className="flex flex-col h-full justify-center items-center">
                        <div className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]">
                            <img src="/createTournament/created_tournament.png" alt="" className="w-full h-full object-cover" />

                        </div>
                        <div className="text-center">
                            <h1 className="capitalize text-[#45F882] rajdhani-bold text-[1.5rem] md:text-[2.5rem]">Congratulations</h1>
                            <p className="text-[#969EB2] rajdhani-bold text-[1rem] md:text-[2rem] mt-[0.5rem] md:mt-[1rem]">Affiliate tournament has created successfully</p>
                        </div>
                   </div>
                </DialogBody>
            </div>
            
        </Dialog>
    );
};




const CreateNewAffiliateTournamant : React.FC = () => {



     //dialog box state
     const [isOpen, setIsOpen] = useState<boolean>(false);
     const handleOpen = () => setIsOpen(!isOpen);
 
 
    //  input states
     const [_tournamentName, setTournamentName] = useState<string | null>(null);
     const [_pricePool, setPricePool] = useState<number | null>(null);
     const [_date, setData] = useState<string | null>(null);
     const [_time, setTime] = useState<string | null>(null);
     const [_fee, setFee] = useState<number | null>(null);
 
 
     //input callback functions
     const handleTournamentName = (value: string) => setTournamentName(value);
     const handlePricePool = (value: string) => setPricePool(parseInt(value));
     const handleDate = (value: string) => setData(value);
     const handleTime = (value: string) => setTime(value);
     const handleFee = (value: string) => setFee(parseInt(value));
 
 
 
 
 
 
     return(
         <div className="w-full min-h-[100vh] h-full bg-[#0B0D13] py-[20px] px-[10px] md:py-[75px] md:px-[60px]">
             <section className="">
                 {/* upload file section */}
                 <div className="">
                     <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[4rem] lg::text-[6rem] rajdhani-bold">create new Affiliate tournament</h1>
                 </div>
                 <div className="w-full h-[15rem] lg:h-[20rem] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[1.5rem] p-[0.1rem]">
                     <div className="bg-[#0B0D13]  rounded-[1.5rem] w-full h-full">
                     <div className="flex items-center justify-center w-full h-full">
                         <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-[1.5rem] cursor-pointer bg-[#1A1D26]">
                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
                             <img src="/createTournament/file_upload.png" alt="" className="h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem]" />
                             <p className="text-center text-white rajdhani-bold text-[1rem] md:text-[1.875rem]">100*100 <span className="text-[#45F882]">Below 1 MB</span></p>
                             </div>
                             <input id="dropzone-file" type="file" className="hidden" />
                         </label>
                     </div> 
                     </div>
                 </div>
             </section>
 
             <section className="bg-[#1A1D26] w-full p-[3.125px] rounded-[1.5rem] mt-[2rem]">
                 {/* form section */}
                 <div className="p-[1.125rem]">
                     <form className="">
                         <div className="mb-[2.75rem]">
                             <CreateTournamentInput inputLabel={"tournament name"} isRequired={true} placeHolder={"Rock Tournament"} type={"text"} callback={handleTournamentName}/>
                         </div>
                         <div className="mb-[2.75rem]">
                             <CreateTournamentInput inputLabel={"price pool"} isRequired={true} placeHolder={"Fixed Price Pool"} type={"text"} callback={handlePricePool}/>
                         </div>
                         <div className="mb-[2.75rem]">
                             <CreateTournamentInput inputLabel={"Tournament Date"} isRequired={true} placeHolder={"DD / MM / YYYY"} type={"text"} callback={handleDate}/>
                         </div>
                         <div className="mb-[2.75rem]">
                             <CreateTournamentInput inputLabel={"Tournament Time"} isRequired={true} placeHolder={"00:00:00"} type={"text"} callback={handleTime}/>
                         </div>
                         <div className="mb-[2.75rem]">
                             <CreateTournamentInput inputLabel={"tournament fee"} isRequired={true} placeHolder={"$0.00"} type={"text"} callback={handleFee}/>
                         </div>
 
                         <div className="flex gap-[1rem] flex-col md:flex-row items-center justify-center">
                             <SecondaryButton context={"reset"} listener={() => {}}/>
                             <PrimaryButton context={"create tournament"} listener={() => {setIsOpen(true)}}/>
                         </div>
                     </form>
                 </div>
             </section>
             <section className="">
                 {/* dialog section */}
                 <DialogBox isOpen={isOpen} handleOpen={handleOpen}/>
                
             </section>  
         </div>
     );
};



export default CreateNewAffiliateTournamant;