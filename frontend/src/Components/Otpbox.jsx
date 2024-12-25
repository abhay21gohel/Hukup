import {
  Center,
  Flex,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { verifyOtp } from "../../apis/apis";
import { useNavigate } from "react-router-dom";
import { fetchUserSuccess, setUserPhoneNumber } from "../../State/User/action";
import { useDispatch } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import Register from "./Register";

const Otpbox = ({
  phoneNumber,
  countryCode,
  show,
  setShow,
  newUser,
  setNewUser,
}) => {
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (otp.length == 6) {
      handleOtpSubmit();
    }
  }, [otp]);

  const handleOtpSubmit = async (e) => {
    try {
      const { data } = await verifyOtp({ phoneNumber, countryCode, otp });

      if (data?.success) {
        toast({
          description: "Otp verified",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
        localStorage.setItem("user", JSON.stringify(data?.data));

        if (data?.data?.token) {
          await dispatch(fetchUserSuccess(data?.data));

          navigate("/");
        } else {
          await dispatch(setUserPhoneNumber(data?.data));
          setNewUser(true);
        }
      }
      setOtp("");
    } catch (error) {
      toast({
        description: "Enter Valid otp",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
      });
    }
  };
  const phone =
    phoneNumber.slice(0, -4).replace(/\d/g, "*") + phoneNumber.slice(-4);
  return (
    <>
      <div className=" relative  p-12 my-auto md:w-1/2  flex flex-col gap-3 items-center justify-center md:min-h-screen  rounded-l-md">
        {show && (
          <span
            className="absolute top-4 md:top-5 left-2 md:left-5  text-xl cursor-pointer  hover:text-[#F25E8E] "
            onClick={() => {
              setShow(!show);
            }}
          >
            <FaChevronLeft />
          </span>
        )}
        <Center mx="auto" textAlign={"center"} placeItems={"center"}>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            mx={{ base: "auto", xl: "28" }}
          >
            A text message with a verification code was just sent to (+
            {countryCode}) {phone}
          </Text>
        </Center>
        <Center mx={"auto"} my={"2"} color={"gray.700"}>
          <Text>Enter your verification code</Text>
        </Center>
        <HStack mx={"auto"} placeItems={"center"}>
          <PinInput
            placeholder="0"
            size={{ base: "md", md: "lg" }}
            variant={"filled"}
            onChange={(e) => {
              setOtp(e);
            }}
          >
            <PinInputField
              textColor={"white"}
              fontWeight={"bold"}
              bgColor={"pink.dark"}
              _focus={{ borderColor: "pink.dark", bgColor: "pink.dark" }}
              _hover={{ bgColor: "pink.light" }}
              _invalid={{ bgColor: "pink.dark" }}
              _placeholder={{ color: "gray.200", opacity: 1 }}
            />
            <PinInputField
              textColor={"white"}
              fontWeight={"bold"}
              bgColor={"pink.dark"}
              _focus={{ borderColor: "pink.dark", bgColor: "pink.dark" }}
              _hover={{ bgColor: "pink.light" }}
              _invalid={{ bgColor: "pink.dark" }}
              _placeholder={{ color: "gray.200", opacity: 1 }}
            />
            <PinInputField
              textColor={"white"}
              fontWeight={"bold"}
              bgColor={"pink.dark"}
              _focus={{ borderColor: "pink.dark", bgColor: "pink.dark" }}
              _hover={{ bgColor: "pink.light" }}
              _invalid={{ bgColor: "pink.dark" }}
              _placeholder={{ color: "gray.200", opacity: 1 }}
            />
            <PinInputField
              textColor={"white"}
              fontWeight={"bold"}
              bgColor={"pink.dark"}
              _focus={{ borderColor: "pink.dark", bgColor: "pink.dark" }}
              _hover={{ bgColor: "pink.light" }}
              _invalid={{ bgColor: "pink.dark" }}
              _placeholder={{ color: "gray.200", opacity: 1 }}
            />
            <PinInputField
              textColor={"white"}
              fontWeight={"bold"}
              bgColor={"pink.dark"}
              _focus={{ borderColor: "pink.dark", bgColor: "pink.dark" }}
              _hover={{ bgColor: "pink.light" }}
              _invalid={{ bgColor: "pink.dark" }}
              _placeholder={{ color: "gray.200", opacity: 1 }}
            />
            <PinInputField
              textColor={"white"}
              fontWeight={"bold"}
              bgColor={"pink.dark"}
              _focus={{ borderColor: "pink.dark", bgColor: "pink.dark" }}
              _hover={{ bgColor: "pink.light" }}
              _invalid={{ bgColor: "pink.dark" }}
              _placeholder={{ color: "gray.200", opacity: 1 }}
            />
          </PinInput>
        </HStack>
        <Flex
          justifyContent="flex-end"
          w={{ base: "full", md: "90%" }}
          mt={{ base: "4", md: "10" }}
        >
          <Text fontWeight={"bold"}>
            <Link color="pink.dark" href="#">
              Re-send Code
            </Link>
          </Text>
        </Flex>
      </div>
    </>
  );
};

export default Otpbox;
