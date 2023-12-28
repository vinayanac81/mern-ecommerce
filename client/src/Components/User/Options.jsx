import { useEffect, useState } from "react";

export const Options = ({ slides }) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setcurrentIndex(
        currentIndex === slides.length - 1 ? 0 : currentIndex + 1
      );
    }, 10000);
  }, [currentIndex]);
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };
  const gotToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };
  const handleIndex = (index) => {
    console.log(index);
    setcurrentIndex(index);
  };
  return (
    <div style={{ height: "100%", position: "relative" }}>
      {/* <div
        onClick={goToPrevious}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0,-50%)",
          left: "10px",
          zIndex: 1,
          cursor: "pointer",
        }}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          data-slot="icon"
          class="w-10 h-10"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div
        onClick={gotToNext}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0,-50%)",
          right: "10px",
          zIndex: 1,
          cursor: "pointer",
        }}
        className=""
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          data-slot="icon"
          class="w-10 h-10"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
            clip-rule="evenodd"
          />
        </svg>
      </div> */}
      <div
        className=" flex flex-col bg-gray-400 justify-center items-center text-white"
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          backgroundPosition: "center",
        }}
      >
        <span className="text-8xl">{slides[currentIndex].url}</span>
        <h2 className="font-bold text-md text-white">{slides[currentIndex].main}</h2>
        <h2 className="font-bold text-sm text-white">
        {slides[currentIndex].sub}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              style={{
                margin: "10px 5px",
                cursor: "pointer",
                fontSize: "90px",
              }}
              onClick={() => handleIndex(index)}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: `${
                    currentIndex === index ? "gray" : "black"
                  }`,
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
