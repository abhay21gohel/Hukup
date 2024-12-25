import "./App.css";
import Login from "./Pages/Login";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setUserLocation } from "../State/User/action";
import Error from "./Pages/Error";
import Navbar from "./Components/Navbar";
import ProtectedContent from "./Components/ProtectedContent";
import { Button, Center, Heading, Icon } from "@chakra-ui/react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { initFlowbite } from "flowbite";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.user);
  const [locationError, setLocationError] = useState(false);
  const options = {
    enableHighAccuracy: true,
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          console.log(permissionStatus);

          if (permissionStatus.state === "denied") {
            setLocationError(true);

            // window.location.href = "app-settings:location";
          } else {
            setLocationError(false);

            navigator.geolocation.getCurrentPosition(
              (data) => {
                dispatch(
                  setUserLocation({
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                  })
                );
                setLocationError(false);
              },
              (err) => {
                setLocationError(true);
              },
              options
            );
          }
        })
        .catch((error) => {
          setLocationError(true);
        });
    } else {
      setLocationError(true);
      // alert("Geolocation is not supported in your browser.");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      await dispatch(fetchUser(userData));
    };

    if (userData) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      {!locationError ? (
        <div className="relative">
          {user?.token && <Navbar />}
          <Routes>
            {user && (
              <>
                <Route path="/" element={<Home />} />
              </>
            )}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/login" element={<ProtectedContent />} /> */}

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      ) : (
        <>
          <div className=" h-screen ">
            <Center
              h="full"
              display={"flex"}
              flexDir={"column"}
              justifyItems={"center"}
              rowGap={"10"}
              mx={"auto"}
              alignItems={"center"}
              alignContent={"center"}
            >
              <span className="text-8xl">
                {" "}
                <FaLocationCrosshairs />
              </span>
              <Heading textAlign={"center"}>
                Please grant location access
              </Heading>
            </Center>
          </div>
        </>
      )}
    </>
  );
}

export default App;
