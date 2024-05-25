import * as React from "react";

export default function Loader() {
  return (
    <>
      <div className="loader">
        <div>
          <svg
            className="color-changing-box"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 180 40"
            width="140px"
            height="150px"
          >
            <circle cx="40" cy="50" r="15">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2s"
                values="50;120;50;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4s"
              ></animate>
            </circle>
            <circle cx="100" cy="50" r="15">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2s"
                values="50;120;50;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2s"
              ></animate>
            </circle>
            <circle cx="160" cy="50" r="15">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2s"
                values="50;120;50;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0s"
              ></animate>
            </circle>
          </svg>
        </div>
        <p className="loader-text">Sometimes it takes longer</p>{" "}
      </div>
    </>
  );
}
