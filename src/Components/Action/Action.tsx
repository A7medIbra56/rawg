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
  WrapItem,
  Spinner,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";

import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Action.module.css";
interface DataFetchGames {
  id: number;
  name: string;
  background_image: ImageData;
  to: string;
  slug: string;
  genres: Array;
  short_screenshots: Array;
  metacritic: number;
  parent_platforms: Array;
}

export default function Action() {
  const [dataGamesAction, setDataGamesAction] = useState<DataFetchGames[]>([]);
  const [DataGamesGenres, setDataGamesGenres] = useState<DataFetchGames[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [MouseOver, setMouseOver] = useState<String>("d-none");
  const [MouseOut, setMouseOut] = useState<String>("d-flex");
  const [activeItem, setActiveItem] = useState<Number>();

  const handleItemClick = (index: Number) => {
    setActiveItem(index);
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get("https://api.rawg.io/api/games", {
        params: {
          key: "de893af8a0034c2da3577be32746abc8", // https://api.rawg.io/api/games/3498/youtube
          genres: "action",
        },
      });

      console.log(data.results);
      console.log(data.results);
      setDataGamesAction(data.results);

      const mergedArray = [data.results[0].genres];
      console.log(mergedArray);
      setLoading(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
    }
  };

  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box p="1">
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));

  // Call the function

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      {loading === true ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Spinner color="red.500" className="" size="xl" />
        </div>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {dataGamesAction.map((item, index) => (
            <Link
              key={item.id}
              onMouseOver={() => handleItemClick(index)}
              onMouseOut={() => handleItemClick(index)}
            >
              <Card bg={"hsla(0, 0%, 100%, 0.07)"}>
                <Heading borderRadius={2}>
                  <div>
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        {item.short_screenshots.map((imag, index) => (
                          <li
                            key={index}
                            data-target="#carouselExampleIndicators"
                            data-slide-to={index}
                            className={index === 0 ? "active" : ""}
                          ></li>
                        ))}
                      </ol>
                      <div className="carousel-inner">
                        {item.short_screenshots.map((imag, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                          >
                            <img
                              className="d-block w-100"
                              src={imag.image}
                              alt={`Slide ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
            
                     
                    </div>
                  </div>
                </Heading>
                <CardBody>
                  <div className="d-flex">
                    {item.parent_platforms.map((plat) => (
                      <div className={`mr-auto`} key={plat.platform.id}>
                        {plat.platform.name === "PC" ? (
                          <i
                            className={`fa-brands fa-windows ${Styles.windowsicon}`}
                          ></i>
                        ) : plat.platform.name === "PlayStation" ? (
                          <i
                            className={`fa-brands fa-playstation ${Styles.playstationicon}`}
                          ></i>
                        ) : plat.platform.name === "Xbox" ? (
                          <i
                            className={`fa-brands fa-xbox ${Styles.xboxicon} `}
                          ></i>
                        ) : plat.platform.name === "Apple Macintosh" ? (
                          <i
                            className={`fa-brands fa-apple ${Styles.appleicon} `}
                          ></i>
                        ) : plat.platform.name === "Linux" ? (
                          <i
                            className={`fa-brands fa-linux ${Styles.linuxicon} `}
                          ></i>
                        ) : plat.platform.name === "Android" ? (
                          <i
                            className={`fa-solid fa-mobile-screen ${Styles.androidicon}`}
                          ></i>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                    <Spacer />
                    <div className="">
                      <CircularProgress
                        size="30px"
                        thickness="12px"
                        value={55}
                        color="green"
                      >
                        <CircularProgressLabel color={"white"}>
                          {item.metacritic}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </div>
                  </div>

                  <Text color={"white"} fontSize={"x-large"}>
                    {item.name}
                  </Text>
                </CardBody>
                <CardFooter
                  className={`${index === activeItem ? MouseOut : MouseOver} `}
                >
                  {item.genres.slice(0, 3).map((ganer) => (
                    <Wrap key={ganer.id}>
                      <WrapItem>
                        <Tooltip label={`${ganer.name}`}>
                          <CustomCard>{ganer.name}</CustomCard>
                        </Tooltip>
                      </WrapItem>
                    </Wrap>
                  ))}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
