import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  Link,
  Image,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import Otpbox from "../Components/Otpbox";
import { requestOtp } from "../../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUser,
  fetchUserSuccess,
  setUserPhoneNumber,
} from "../../State/User/action";
import Register from "../Components/Register";
const Login = () => {
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const handlePhoneChange = (e, value) => {
    let splitedNuber = e?.replace(value?.dialCode, "");

    setCountryCode(value?.dialCode);
    setCountry(value);
    setPhoneNumber(splitedNuber);
  };

  const handleSubmit = async () => {
    try {
      const length = country?.format?.split("").filter((c) => c == ".").length;

      if (length - country?.dialCode?.length != phoneNumber.length) {
        toast({
          description: "Enter valid Mobile number",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
      } else {
        setLoading(true);

        const { data } = await requestOtp({
          phoneNumber,
          countryCode: country?.dialCode,
        });

        if (data?.success) {
          toast({
            description: "Otp sent.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
          });
          setShow(!show);
        } else {
          toast({
            description: "Can not send OTP.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
          });
        }
        setLoading(false);
      }
    } catch (error) {
      toast({
        description: "Can not send OTP.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
      });
    }
  };

  useEffect(() => {
    async function handlePhoneNumber(ph, cc) {
      await dispatch(setUserPhoneNumber({ phoneNumber: ph, countryCode: cc }));
    }
   

    if (user?.token) {
      navigate("/");
    } else if (user?.phoneNumber && user?.countryCode) {
      setNewUser(true);
      setShow(true);
    }
  }, [user]);

  // useEffect(() => {
  //   async function handleDispatch(phone, country) {
  //     await dispatch(
  //       setUserPhoneNumber({
  //         phoneNumber: phone,
  //         countryCode: country,
  //       })
  //     );
  //   }
  //   if (user?.phoneNumber && user?.countryCode && !user?.token) {
  //     handleDispatch(user?.phoneNumber, user?.countryCode);
  //     setNewUser(true);
  //   }
  // }, []);

  return (
    <>
      {!newUser ? (
        <section className=" overflow-hidden">
          <div className=" relative h-screen mx-auto flex justify-center items-center">
            <div className="flex flex-wrap w-full ">
              {show ? (
                <Otpbox
                  newUser={newUser}
                  setNewUser={setNewUser}
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  show={show}
                  setShow={setShow}
                />
              ) : (
                <div className="relative p-12 my-auto md:w-1/2 flex flex-col gap-3 justify-center md:min-h-screen  bg-white rounded-l-md">
                  <Flex
                    mx={"auto"}
                    flexDirection={"column"}
                    gap={"3"}
                    placeItems={"center"}
                  >
                    <Heading fontSize={"4xl"} fontWeight={"bold"}>
                      LOGIN
                    </Heading>
                    <Text fontSize={"lg"}>
                      Lorem ipsum dolor sit amet consectetur adipisicing.{" "}
                    </Text>
                  </Flex>
                  <Flex
                    mx={"auto"}
                    flexDirection={"column"}
                    gap={"3"}
                    placeItems={"center"}
                  >
                    <PhoneInput
                      country={"in"}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        width: "100%",
                        height: "45px",
                        fontSize: "16px",
                        border: "3px solid #F25E8E",
                        borderRadius: "8px",
                        paddingInline: "75px",
                        outline: "none",
                      }}
                      buttonStyle={{
                        padding: "10px",
                        border: "3px solid #F25E8E",
                        borderRadius: "8px 0 0 8px",
                        backgroundColor: "white",
                      }}
                      dropdownStyle={{
                        marginTop: "20px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <button
                      type="button"
                      className="relative w-64 text-white font-medium rounded-3xl text-xs px-6 py-3 text-center mb-2 bg-[#F25E8E] hover:bg-[#F47B9E] focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 tracking-[0.1em] "
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Let's start
                      <span className="absolute text-lg right-3">
                        <FaChevronRight />
                      </span>
                    </button>
                  </Flex>
                  <Flex mx={"auto"} gap={"3"} placeItems={"center"}>
                    <Link color={"gray"} href="">
                      Terms of use
                    </Link>
                    <Link color={"gray"} href="">
                      Privacy Policy
                    </Link>
                  </Flex>
                </div>
              )}

              <div
                className=" relative p-12 md:w-1/2 flex flex-col items-center bg-[#F25E8E] rounded-r-md bg-cover bg-center "
                style={{ backgroundImage: "url(./Rectangle.png)" }}
              >
                <Image src="./Avatar.png" className="max-w-full h-auto" />
                <Image
                  // pb="4"
                  src="./icon.png"
                  className="max-w-full h-auto absolute bottom-5"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <Register newUser={newUser} setNewUser={setNewUser} />
        </>
      )}
    </>
  );
};

export default Login;
