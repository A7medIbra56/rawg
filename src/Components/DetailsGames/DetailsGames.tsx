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
  Image,
  Box,
  Tag,
  Wrap,
  Button,
  Badge,
  WrapItem,
  Spinner,
  Spacer,
  Tooltip,
  Flex,
} from "@chakra-ui/react";

import Styles from "./DetailsGames.module.css";

export default function DetailsGames() {
  interface DataFetchGames {
    id: number;
    name: string;
    background_image: ImageData;
    to: string;
    slug: string;
    description: String;
    added: number;
    alternative_names: Array;
    publishers: Array;
    genres: Array;
    short_screenshots: Array;
    metacritic: number;
    parent_platforms: Array;
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
      <Box
        backgroundImage={`url(${dataGamesAction.background_image})`}
        className={Styles.bgDetailsGames}
      >
        <div className={`${Styles.bgDetailsGamesItem}`} >
        {dataGamesAction.parent_platforms?.map((plat) => (
          <div className={` ${Styles.colorIcon}`} key={plat.platform.id}>
            {plat.platform.name === "PC" ? (
              <i className={`fa-brands fa-windows ${Styles.windowsicon}`}></i>
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
        </div>
       
      </Box>
    </>
  );
}
