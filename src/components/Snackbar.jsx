import { FiCheckCircle, FiX } from "react-icons/fi"

export default function Snackbar({ text, close }) {
    return (
        <div className="fixed flex items-center px-12 py-2 rounded bottom-12 left-4 bg-[#397F68] text-white">
            <FiCheckCircle size="22" className="mr-4" />
            { text }
            <FiX className="ml-8 cursor-pointer" onClick={() => close()} />
        </div>
    )
}