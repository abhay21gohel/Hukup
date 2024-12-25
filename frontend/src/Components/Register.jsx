import {
  Button,
  Box,
  Center,
  Heading,
  Avatar,
  Image,
  SimpleGrid,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useToast,
  Text,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaCamera, FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { SingleDatepicker } from "chakra-dayzed-datepicker";
import {
  createCompleteUser,
  createPartialUser,
  getGenders,
  getInterests,
} from "../../apis/apis";
import { useNavigate } from "react-router-dom";
import { fetchUserSuccess } from "../../State/User/action";

const Register = ({ setNewUser, newUser }) => {
  const [completed, setCompleted] = React.useState(false);
  const [genders, setGenders] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [interests, setInterests] = useState();
  const [hereFor, setHereFor] = useState([
    { _id: 1, name: "Chat" },
    { _id: 2, name: "Make new friends" },
    { _id: 3, name: "Dating" },
  ]);

  const toast = useToast();
  let button = null;

  const {
    phoneNumber = null,
    countryCode = null,
    longitude = null,
    latitude = null,
    name,
    username,
    dob,
    interests: i,
    gender,
  } = useSelector((state) => state?.user?.data || {});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [date, setDate] = useState(new Date());
  const [showConfirm, setShowConfirm] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: name,
    username: username,
    longitude,
    latitude,
    img: "http://img.freepik.com/free-icon/user_318-159711.jpg",
    dob: dob,
    phoneNumber,
    countryCode,
    gender: "",
    interests: [],
    hereFor: [
      { _id: 1, name: "Chat" },
      { _id: 2, name: "Make new friends" },
      { _id: 3, name: "Dating" },
    ],
  });
  const [tab, setTab] = useState(false);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = format(selectedDate, "dd-MM-yyyy"); // Format the date as "yyyy-MM-dd"

    setUserDetails({ ...userDetails, dob: selectedDate }); // Store formatted date

    // Update the button text with the formatted date
    const button = document.getElementById("popover-trigger-ok");
    if (button) {
      button.innerText = `${formattedDate}`; // Display formatted date on button
    }
  };
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data } = await createPartialUser({
        name: userDetails.name,
        username: userDetails.username,
        dob: userDetails.dob,
        phoneNumber,
        countryCode,
        longitude,
        latitude,
      });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data?.data));
        dispatch(fetchUserSuccess(data?.data));

        setTab(true);
      } else {
        toast({
          title: "Can not register",
          status: "error",
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Can not register",
        status: "error",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const { data } = await createCompleteUser({
        ...userDetails,
        interests: JSON.stringify(userDetails?.interests),
        hereFor: [],
      });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data?.data));
        dispatch(fetchUserSuccess(data?.data));
        toast({
          title: `Welcome ${data?.data?.name}`,
          status: "success",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Can not register",
          status: "error",
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Can not register",
        status: "error",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    let pics = file;
    // setLoading(true);

    if (pics === undefined) {
      toast({
        title: "Please select an Image.",
        status: "warning",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
      // setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append(
        "upload_preset",
        import.meta.env.VITE_cloudinaryUploadPresent
      );
      data.append("cloud_name", import.meta.env.VITE_cloudinaryCloudName);

      fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_cloudinaryCloudName
        }/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setUserDetails({ ...userDetails, img: data.url.toString() });

          toast({
            title: "Image Uploaded.",
            description: "We've uploaded your Image.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
          // setLoading(false);
        })
        .catch((err) => {
          // setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      // setLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Update the userDetails state based on the checkbox change
    setUserDetails((prevState) => {
      const updatedInterests = checked
        ? [...prevState.interests, value] // If checked, add the value to the array
        : prevState.interests.filter((item) => item !== value); // If unchecked, remove the value from the array

      return {
        ...prevState,
        interests: updatedInterests,
      };
    });
  };

  const handleHereFor = (e) => {
    const { value, checked } = e.target;

    setUserDetails((prevState) => {
      const updatedInterests = checked
        ? [...prevState.hereFor, value] // If checked, add the value to the array
        : prevState.hereFor.filter((item) => item !== value); // If unchecked, remove the value from the array

      return {
        ...prevState,
        hereFor: updatedInterests,
      };
    });
  };

  useEffect(() => {
    button = document.getElementById("popover-trigger-ok");
    if (button) {
      if (userDetails.dob) {
        button.innerText = format(userDetails.dob, "dd-MM-yyyy");
      } else {
        button.innerText = "Choose your birthday";
      }

      button.style.backgroundColor = "#E5A4B5";
      button.style.color = "#E53865";
      button.style.border = "none";
      button.style.padding = "10px 20px";
      button.style.fontSize = "0.875rem";
      button.style.borderRadius = "0.375rem";
      button.style.cursor = "pointer";

      button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#F25E8E";
        button.style.color = "white";
      });

      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#E5A4B5"; // Reset to original pink
        button.style.color = "#E53865"; // Reset text color
      });
    }
    if (tab) {
      async function getData() {
        const { data: gendersdata } = await getGenders();
        const { data: interestsdata } = await getInterests();

        setGenders(gendersdata.data);

        setInterests(interestsdata?.data);
      }
      getData();
    }
  }, [tab]);
  useEffect(() => {
    
    if (
      userDetails?.name != "" &&
      userDetails?.username != "" &&
      userDetails?.dob != "" 
     
    ) {
      if (userDetails?.gender != "" && userDetails?.interests.length >= 1) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
      setShowConfirm(true);
    } else {
      setShowConfirm(false);
    }
  }, [userDetails]);
  useEffect(() => {
    
    if (user.name && user.username && user.dob) {
      setTab(true);
    }
  }, [user]);

  return (
    <Box
      minHeight="100vh" // Minimum height is full viewport height
      width="100%" // Full width
      backgroundImage="url('./bgProfile.png')" // Replace with your image URL
      backgroundSize="cover" // Ensures the image covers the entire area
      backgroundPosition="center" // Centers the image
      backgroundRepeat="no-repeat" // Prevents image tiling
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      px={[4, 8, 16]} // Responsive horizontal padding (mobile, tablet, desktop)
    >
      <span
        className="absolute top-4 md:top-5 left-2 md:left-5  text-xl cursor-pointer  hover:text-[#F25E8E] "
        onClick={() => {
          if (tab) {
            setTab(false);
          } else {
            setNewUser(false);
          }
        }}
      >
        <FaChevronLeft />
      </span>

      <Center
        p="2"
        position="absolute"
        top={{ base: "1", md: "3" }}
        left="50%"
        transform="translateX(-50%)"
      >
        <Heading size="lg">Profile details</Heading>
      </Center>
      {/* tab ! karvanu chhe */}
      {!tab ? (
        <Box
          // bg="whiteAlpha.900" // Semi-transparent white background
          p={[4, 6, 8]} // Responsive padding for the content box
          borderRadius="md" // Rounded corners
          textAlign="center" // Center the text inside the box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          position={"relative"}
        >
          <Box
            position="relative"
            boxSize={{ base: "75px", md: "100px" }}
            cursor={"pointer"}
          >
            {/* Main Profile Image */}
            <label htmlFor="imageInput">
              <Image
                cursor={"pointer"}
                boxSize="100%"
                borderRadius="3xl"
                src={userDetails?.img || "./user.png"}
                alt="Profile Image"
              />

              {/* Overlay Icon */}
              <Box
                position="absolute"
                bottom="0"
                right="0"
                boxSize="25px"
                bg="pink.dark"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="md"
                cursor={"pointer"}
              >
                <FaCamera size="14px" color="white" />
              </Box>
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Box>

          <SimpleGrid columns={[1, null, 2]} gap={"5"} my={"5"}>
            <FormControl variant="floating" id="name" isRequired>
              <Input
                borderColor={"pink.light"}
                borderWidth={"3px"}
                _hover={{ borderColor: "pink.dark" }}
                _active={{ borderColor: "pink.dark" }}
                _focusVisible={{ borderColor: "pink.mid" }}
                placeholder=" "
                onChange={(e) => {
                  setUserDetails({ ...userDetails, name: e.target.value });
                }}
                value={userDetails.name}
              />
              <FormLabel fontSize={"sm"} color={"pink.mid"}>
                Full name
              </FormLabel>
            </FormControl>
            <FormControl variant="floating" id="username" isRequired>
              <Input
                borderColor={"pink.light"}
                borderWidth={"3px"}
                _hover={{ borderColor: "pink.dark" }}
                _active={{ borderColor: "pink.dark" }}
                _focusVisible={{ borderColor: "pink.mid" }}
                placeholder=" "
                onChange={(e) => {
                  setUserDetails({ ...userDetails, username: e.target.value });
                }}
                value={userDetails.username}
              />
              <FormLabel fontSize={"sm"} color={"pink.mid"}>
                Username
              </FormLabel>
            </FormControl>
          </SimpleGrid>
          <SingleDatepicker
            id="ok"
            propsConfigs={{
              dateNavBtnProps: {
                colorScheme: "pink",
                variant: "solid",
              },

              dayOfMonthBtnProps: {
                defaultBtnProps: {
                  borderColor: "red.300",
                  _hover: {
                    background: "pink.400",
                  },
                },
                isInRangeBtnProps: {
                  color: "yellow",
                },
                selectedBtnProps: {
                  background: "pink.200",
                  color: "white",
                },
                todayBtnProps: {
                  background: "pink.mid",
                  color: "white",
                },
              },

              popoverCompProps: {
                popoverContentProps: {
                  background: "white",
                  color: "black",
                },
              },
              calendarPanelProps: {
                wrapperProps: {
                  borderColor: "green",
                },
                contentProps: {
                  borderWidth: 0,
                },
                headerProps: {
                  padding: "5px",
                },
                dividerProps: {
                  display: "none",
                },
              },
              weekdayLabelProps: {
                fontWeight: "normal",
              },
              dateHeadingProps: {
                fontWeight: "semibold",
              },
            }}
            name="date-input"
            date={date}
            onDateChange={handleDateChange}
          />

          {showConfirm && (
            <button
              type="button"
              className="ml-auto mt-16 place-items-end w-32 text-white font-medium rounded-3xl text-sm px-6 py-3 text-center mb-2 bg-[#F25E8E] hover:bg-[#F47B9E] focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 tracking-[0.1em] "
              onClick={() => {
                handleConfirm();
              }}
            >
              Confirm
            </button>
          )}
        </Box>
      ) : (
        <Box
          p={[4, 6, 8]} // Responsive padding for the content box
          textAlign="center" // Center the text inside the box
        >
          <Box
            fontSize={["lg", "xl", "2xl"]}
            fontWeight="bold"
            mt={8}
            mb={4}
            display={"flex"}
            flexDir={"column"}
            gap={"4"}
            position={"relative"}
          >
            <Center display={"flex"} flexDir={"column"} gap={"3"}>
              <Text fontSize={"lg"} color={"gray"}>
                Select you gender
              </Text>
              <RadioGroup
                onChange={(e) => {
                  setUserDetails({ ...userDetails, gender: e });
                }}
                value={userDetails.gender}
              >
                <Flex wrap="wrap" justify="space-around" align="center" gap="2">
                  {genders?.map((e) => (
                    <Box
                      key={e._id}
                      w={{ base: "50%", sm: "33.33%", md: "20%" }}
                    >
                      <Radio
                        bg={"white"}
                        borderColor={"pink.dark"}
                        colorScheme="pink"
                        value={e._id}
                      >
                        {e.name}
                      </Radio>
                    </Box>
                  ))}
                </Flex>
              </RadioGroup>
            </Center>
            <Center display={"flex"} flexDir={"column"} gap={"3"}>
              <Text fontSize={"lg"} color={"gray"}>
                Your Interest in
              </Text>
              <Flex wrap="wrap" justify="space-around" align="center" gap="4">
                {interests?.map((e) => (
                  <Box
                    key={e._id}
                    w={{ base: "45%", sm: "33.33%", md: "20%" }}
                    paddingX="2"
                    paddingY="1.5"
                    borderRadius="3xl"
                    cursor="pointer"
                    bg={
                      userDetails?.interests.includes(e._id)
                        ? "pink.mid"
                        : "gray.100"
                    }
                    border="2px solid"
                    borderColor={"pink.mid"}
                    _hover={{
                      bg: userDetails?.interests.includes(e._id)
                        ? "pink.dark"
                        : "pink.mid",
                    }}
                    onClick={() =>
                      handleCheckboxChange({
                        target: {
                          value: e._id,
                          checked: !userDetails?.interests.includes(e._id),
                        },
                      })
                    }
                  >
                    <Text
                      color={
                        userDetails?.interests.includes(e._id)
                          ? "white"
                          : "black"
                      }
                      fontSize={"lg"}
                    >
                      {e.name}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Center>
            <Center display={"flex"} flexDir={"column"} gap={"3"}>
              <Text fontSize={"lg"} color={"gray"}>
                You are here for
              </Text>
              <Flex
                wrap="wrap"
                justify="space-around"
                align="center"
                gap={{ base: 2, md: 3 }}
              >
                {hereFor?.map((e) => (
                  <Box
                    key={e._id}
                    // w={{ base: "50%", sm: "33.33%", md: "20%" }}
                    // w={"full"}
                    paddingX="2"
                    paddingY="1.5"
                    borderRadius="3xl"
                    cursor="pointer"
                    bg={
                      userDetails?.hereFor.includes(e._id)
                        ? "pink.mid"
                        : "gray.100"
                    }
                    border="2px solid"
                    borderColor={"pink.mid"}
                    _hover={{
                      bg: userDetails?.hereFor.includes(e._id)
                        ? "pink.dark"
                        : "pink.mid",
                    }}
                    onClick={() =>
                      handleHereFor({
                        target: {
                          value: e._id,
                          checked: !userDetails?.hereFor.includes(e._id),
                        },
                      })
                    }
                  >
                    <Text
                      color={
                        userDetails?.hereFor.includes(e._id) ? "white" : "black"
                      }
                      fontSize={"lg"}
                    >
                      {e.name}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Center>
            {completed && (
              <button
                disabled={loading}
                type="button"
                className=" mt-5 ml-auto  place-items-end w-32 text-white font-medium rounded-3xl text-sm px-6 py-3 text-center mb-2 bg-[#F25E8E] hover:bg-[#F47B9E] focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 tracking-[0.1em] "
                onClick={() => {
                  handleCreateUser();
                }}
              >
                {`Finish-->`}
              </button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Register;
