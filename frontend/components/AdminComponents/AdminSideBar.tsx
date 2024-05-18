import { SetStateAction } from "react";
import { VscCircleLargeFilled } from "react-icons/vsc";

const StaffSideBar = ({ tabs, setSection, section }: { tabs: string[], setSection: React.Dispatch<SetStateAction<number>>, section: number }) => {
    let sectionList = tabs.map((tab, index) => {
        return <div style={{ backgroundColor: section == index ? "#111827" : "black" }} onClick={() => setSection(index)} className='p-2 flex items-center justify-between cursor-pointer rounded-full font-semibold text-opacity-70 text-orange-200 hover:bg-gray-900 hover:shadow-lg hover:transition duration-150 ease-linear'>
            {tab} {section == index && <VscCircleLargeFilled className="text-orange-200 text-opacity-70" />}
        </div>
    })
    return (
        <div className='bg-black my-auto rounded-br-3xl rounded-tr-3xl w-48 h-[50%]'>
            <div className="mt-2 rounded-lg flex-col font-black-500 space-y-4 justify-center">
                {sectionList}
            </div>
        </div>
    )
}
export default StaffSideBar