import React from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Card,
  Heading,
  CardBody,
  CardFooter,
  Text,
  HStack,
  Image,
  Box,
  Tag,
  Wrap,
  Button,
  Badge,
  WrapItem,
  Spinner,
  Spacer,
  Grid,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { FcEmptyFilter } from "react-icons/fc";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";

import Styles from "./DetailsGames.module.css";

export default function DetailsGames() {
  interface DataFetchGames {
    id: number;
    name: string;
    background_image: ImageData;
    background_image_additional: ImageData;
    to: string;
    slug: string;
    description_raw: String;
    added: number;
    alternative_names: Array;
    publishers: Array;
    genres: Array;
    stores: Array;
    short_screenshots: Array;
    metacritic: number;
    parent_platforms: Array;
    platforms: Array;
    ratings: Array;
  }

  const { id } = useParams();
  const [dataGamesAction, setDataGamesAction] = useState<DataFetchGames>({});
  const fetchGames = async () => {
    /*  setLoading(true); */
    try {
      const { data } = await Axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: {
          key: "de893af8a0034c2da3577be32746abc8",
          genres: "action",
        },
      });

      console.log(data);
      setDataGamesAction(data);
      /*    setLoading(false); */
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
  };
  // Call the function

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <Box
        backgroundImage={`url(${dataGamesAction.background_image})`}
        backgroundSize="cover"
        height="90vh"
        position={"absolute"}
        top={0}
        bottom={0}
        left={0}
        right={0}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderRadius="md" // يمكنك تعيين حدة الزاوية حسب الحاجة
        boxShadow="lg" // إضافة ظل لتحسين المظهر
      >
        <Flex
          height="100%"
          background="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))"
          boxShadow="0px 100px 100px -5px rgba(0, 0, 0, 1)" // Adjust the values as needed
        >
          {/* Your content goes here */}
        </Flex>
      </Box>

      <Grid
        className={Styles.bgDetailsGames}
        templateColumns={["1fr", "repeat(2, 1fr)"]}
      >
        <Box padding={4} className={`${Styles.bgDetailsGamesItem}`}>
          <Breadcrumb color={"white"} fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <Link className={`${Styles.linkBread}`} to={"/action"}>
                {" "}
                HOME
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
          
                <Link className={`${Styles.linkBread}`} to={"/action"}>
                  {" "}
                  GAMES
                </Link>
            
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              < >
                  {" "}
                  {dataGamesAction.name}
                </>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex>
            <div className={`${Styles.dataBarth}`}>
              {dataGamesAction.updated}
            </div>
            {dataGamesAction.parent_platforms?.map((plat) => (
              <div className={` ${Styles.colorIcon}`} key={plat.platform.id}>
                {plat.platform.name === "PC" ? (
                  <i
                    className={`fa-brands fa-windows ${Styles.windowsicon}`}
                  ></i>
                ) : plat.platform.name === "PlayStation" ? (
                  <i
                    className={`fa-brands fa-playstation ${Styles.playstationicon}`}
                  ></i>
                ) : plat.platform.name === "Xbox" ? (
                  <i className={`fa-brands fa-xbox ${Styles.xboxicon} `}></i>
                ) : plat.platform.name === "Apple Macintosh" ? (
                  <i className={`fa-brands fa-apple ${Styles.appleicon} `}></i>
                ) : plat.platform.name === "Linux" ? (
                  <i className={`fa-brands fa-linux ${Styles.linuxicon} `}></i>
                ) : plat.platform.name === "Android" ? (
                  <i
                    className={`fa-solid fa-mobile-screen ${Styles.androidicon}`}
                  ></i>
                ) : (
                  ""
                )}
              </div>
            ))}
          </Flex>
          <Text fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
            {dataGamesAction.name}
          </Text>
          <Flex className="progress" style={{ height: "50px" }}>
            {dataGamesAction.ratings?.map((item, index) => (
              <div
                key={index}
                className={`progress-bar ${
                  item.title === "exceptional"
                    ? Styles.progressGreen
                    : item.title === "recommended"
                    ? Styles.progressGradient
                    : item.title === "meh"
                    ? Styles.progressOreg
                    : item.title === "skip"
                    ? Styles.progressRead
                    : ""
                }`}
                role="progressbar"
                style={{ width: `${item.percent}%` }}
                aria-valuemax="100"
              >
                <FcEmptyFilter
                  className={`fa-solid fa-circle-exclamation ${Styles.exclamation}`}
                />
              </div>
            ))}
          </Flex>

          <List color={"white"} padding={5}>
            <Flex>
              {dataGamesAction.ratings?.map((rat) => (
                <ListItem key={rat.id} className={`${Styles.ListItem}`}>
                  {rat.title === "exceptional" ? (
                    <i
                      className={`fa-solid fa-circle  ${Styles.circleGreen}`}
                    ></i>
                  ) : rat.title === "recommended" ? (
                    <i
                      className={`fa-solid fa-circle ${Styles.circleMove}`}
                    ></i>
                  ) : rat.title === "meh" ? (
                    <i
                      className={`fa-solid fa-circle  ${Styles.circleOrg}`}
                    ></i>
                  ) : rat.title === "skip" ? (
                    <i
                      className={`fa-solid fa-circle  ${Styles.circleRead}`}
                    ></i>
                  ) : (
                    ""
                  )}
                  <span className={`${Styles.RatTitle}`}>
                    {rat.title} <strong>{rat.count}</strong>
                  </span>
                </ListItem>
              ))}
            </Flex>
          </List>
          <Text p={2} fontSize={"xl"} color={"hsla(0,0%,90%,.8)"}>
            About
          </Text>
          <Text p={3} fontSize={"sm"} color={"hsla(0,0%,90%,.8)"}>
            {dataGamesAction.description_raw}
          </Text>
        </Box>
        <Box padding={3} className={`${Styles.bgDetailsGamesItem}`}>
          <Image
            height="auto"
            maxWidth="90%"
            minHeight="100"
            src={`${dataGamesAction.background_image_additional}`}
            alt="000"
          />
          <Text p={3} fontSize={"xl"} color={"hsla(0,0%,90%,.8)"}>
            Where to buy
          </Text>
          <Wrap spacing={3} marginTop={5}>
            {dataGamesAction.stores?.map((storeOne) => (
              <WrapItem key={storeOne.store.id}>
                {storeOne.store.name === "Steam" ? (
                  <Button
                    background={`hsla(0,0%,100%,.2)`}
                    color={"hsla(0,0%,90%,.8)"}
                    _hover={{
                      bg: "white",
                      color: "black",
                    }}
                    rightIcon={<FaSteam />}
                  >
                    {storeOne.store.name}
                  </Button>
                ) : storeOne.store.name === "Epic Games" ? (
                  <Button
                    background={`hsla(0,0%,100%,.2)`}
                    color={"hsla(0,0%,90%,.8)"}
                    _hover={{
                      bg: "white",
                      color: "black",
                    }}
                    rightIcon={<SiEpicgames />}
                  >
                    {storeOne.store.name}
                  </Button>
                ) : storeOne.store.name === "PlayStation Store" ? (
                  <Button
                    background={`hsla(0,0%,100%,.2)`}
                    color={"hsla(0,0%,90%,.8)"}
                    _hover={{
                      bg: "white",
                      color: "black",
                    }}
                    rightIcon={<FaPlaystation />}
                  >
                    {storeOne.store.name}
                  </Button>
                ) : storeOne.store.name === "Xbox Store" ? (
                  <Button
                    background={`hsla(0,0%,100%,.2)`}
                    color={"hsla(0,0%,90%,.8)"}
                    _hover={{
                      bg: "white",
                      color: "black",
                    }}
                    rightIcon={<FaXbox />}
                  >
                    {storeOne.store.name}
                  </Button>
                ) : (
                  ""
                )}
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Grid>
    </>
  );
}
