import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";

const Modal = () => {
    const { dispatch } = useWeatherContext();
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: "TOGGLE_MODAL" });
        }, 5000);
    }, [dispatch]);

    return (
        <section className="absolute bg-[#00000083] w-screen h-screen flex justify-center items-center z-20">
            <div className="bg-white w-11/12 max-w-[500px] h-[250px] rounded-lg p-[1.5rem]">
                <button
                    onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
                    className="block ml-auto w-[40px] h-[40px] bg-gray-300 text-black rounded-full shadow-xl"
                >
                    <AiOutlineClose className="inline-block text-lg" />
                </button>
                <div className="text-center">
                    <AiOutlineCheck className="inline-block text-[3.5rem] md:text-[4.5rem] text-green-700" />
                    <p className="text-lg text-black font-semibold">
                        Your location has been saved successfully
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Modal;