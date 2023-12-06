import React from "react";
import { useParams } from "react-router-dom";
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



  // Call the function

  useEffect(() => {
    fetchGames();

  }, []);

  return (
    <>
      <Breadcrumb color={"white"} fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            opacity={0.5}
            _hover={{
              opacity: 1,
              color: "white",
            }}
            href="#"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink
            opacity={0.5}
            _hover={{
              opacity: 1,
              color: "white",
            }}
            href="#"
          >
            About
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{dataGamesAction.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Grid
        backgroundImage={`url(${dataGamesAction.background_image})`}
        className={Styles.bgDetailsGames}
        templateColumns={["1fr", "repeat(2, 1fr)"]}
      >
        <Box padding={3} className={`${Styles.bgDetailsGamesItem}`}>
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
          <div className="progress" style={{ height: "40px" }}>
            <div
              className={`progress-bar ${Styles.progressGreen}`}
              role="progressbar"
              style={{ width: `${51.87}%` }}
              aria-valuemax="100"
            >
              <i
                className={`fa-solid fa-circle-exclamation ${Styles.exclamation}`}
              ></i>
            </div>
            <div
              className={`progress-bar ${Styles.progressGradient} `}
              role="progressbar"
              style={{ width: `${27.43}%` }}
              aria-valuemax="100"
            >
              <i
                className={`fa-solid fa-thumbs-up text-warning ${Styles.thumbs} `}
              ></i>
            </div>
            <div
              className={`progress-bar text-warning ${Styles.progressOreg} `}
              role="progressbar"
              style={{ width: `${10.44}%` }}
              aria-valuemax="100"
            >
              <i
                className={`fa-solid fa-face-meh text-warning ${Styles.thumbs}`}
              ></i>
            </div>
            <div
              className={`progress-bar ${Styles.progressRead} `}
              role="progressbar"
              style={{ width: `${10.25}%` }}
              aria-valuemax="100"
            >
              <i
                className={`fa-regular fa-face-grin-tongue-squint ${Styles.exclamation}`}
              ></i>
            </div>
          </div>
          <List color={"white"} padding={5}>
            <Flex>
              {dataGamesAction.ratings?.map((rat) => (
                <ListItem key={rat.id} className={`${Styles.ListItem}`}>
                  {rat.title === "exceptional" ? (
                    <i
                      className={`fa-solid fa-circle   ${Styles.circleGreen}`}
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
                  <span className="">
                    {" "}
                    {rat.title} <strong>{rat.count}</strong>{" "}
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
          <img
            className="w-100"
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
