// import { Button } from "@chakra-ui/react";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../apis/apis";
// import { logoutUserRequest } from "../../State/User/action";

// const Home = ({ imageUrl }) => {
//   const navigate = useNavigate();
//   const { data: user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!user.token) {
//       navigate("/login");
//     }
//   }, [user]);

//   return (
//     <div
//       className="bg-cover bg-center bg-no-repeat w-full h-screen"
//       style={{ backgroundImage: `url(./bgMain.png)` }}
//     >
//       <div className="flex items-center justify-center h-full  text-2xl sm:text-4xl lg:text-6xl text-center">
//         <Button
//           colorScheme="red"
//           onClick={() => {
//             logoutUser();
//             dispatch(logoutUserRequest());
//             navigate("/login");
//           }}
//         >
//           Log out
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../apis/apis"; 
import { logoutUserRequest } from "../../State/User/action";

const Home = () => {
  const images = [
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
    "http://img.freepik.com/free-icon/user_318-159711.jpg",
  ];

  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col sm:flex-row"
      style={{ backgroundImage: `url(./bgMain.png)` }}
    >
      {/* Fixed Content Section */}
      <div className="flex flex-col items-center justify-center w-full sm:w-2/5 h-2/5 sm:h-full  text-gray-600 p-6">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">
          Welcome, {user?.name || "User"}
        </h1>
        <Button
          colorScheme="red"
          onClick={() => {
            logoutUser();
            dispatch(logoutUserRequest());
            navigate("/login");
          }}
        >
          Log out
        </Button>
      </div>

      {/* Scrollable Image Grid Section */}
      <div className="w-full sm:w-3/5 3/5 sm:h-full overflow-y-scroll  p-6 bg-red-500">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {images?.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={image}
                
                alt={`Image ${index}`}
                className="w-full h-52 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
