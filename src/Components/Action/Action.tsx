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
  added: number;
  genres: Array;
  short_screenshots: Array;
  metacritic: number;
  parent_platforms: Array;
}

export default function Action() {
  const [dataGamesAction, setDataGamesAction] = useState<DataFetchGames[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [MouseOver, setMouseOver] = useState<String>("d-none");
  const [MouseOut, setMouseOut] = useState<String>("d-flex");
  const [activeItem, setActiveItem] = useState<Number>();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index?: Number) => {
    setActiveItem(index);
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get("https://api.rawg.io/api/games", {
        params: {
          key: "de893af8a0034c2da3577be32746abc8",
          genres: "action",
        },
      });

      console.log(data.results);
      setDataGamesAction(data.results);
      setLoading(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
    }
  };

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };
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
        <>
          <h1 className="H1Heder">Action Games</h1>
          <p className={`textHeder`}>
            The action game is a genre that includes fights, puzzles, and
            strategies emphasizing coordination and reaction. It includes a
            large variety of sub-genres like fighting, beat 'em ups, shooters,
            survivals, mazes, and platforms; sometimes even multiplayer online
            battles and real-time strategies. Usually, the player performs as
            the protagonist with its unique abilities; some games add power-ups
            along the way. The character aims to complete levels, collect items,
            avoid obstacles, and battle against antagonists. It's necessary to
            avoid severe injuries during fights; if the health bar goes low, the
            player loses. Some games have an unbeatable number of enemies, and
            the only goal is to maximize score and survive for as long as
            possible. There might be a boss enemy who appears at the last level;
            he has unique abilities and a longer health bar. Pong is one of the
            first action games, released in 1972; the latest include
            Battlefield, Assasin's Creed, Fortnite and Dark Souls.
          </p>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {dataGamesAction.map((item, index) => (
              <Link
              to={`/detailsGames/${item.id}`}
                style={{ textDecoration: "none" }}
                key={item.id}
                onMouseOver={() => handleItemClick(index)}
                onMouseOut={() => handleItemClick()}
              >
                <Card
                  bg={"hsla(0, 0%, 100%, 0.07)"}
                  className={`${Styles.card}`}
                >
                  <Heading margin={0} borderRadius={2}>
                    <Image
                      src={`${item.background_image}`}
                      alt=".."
                      borderRadius={5}
                      className={`${
                        index === activeItem ? MouseOver : MouseOut
                      } w=100 `}
                    />
                  </Heading>
                  <Heading
                    margin={0}
                    className={`${
                      index === activeItem ? MouseOut : MouseOver
                    } `}
                  >
                    <div>
                      <div>
                        <div
                          id={`carouselExampleIndicators_${item.id}`}
                          className="carousel slide"
                          data-ride="carousel"
                        >
                          <ol className="carousel-indicators">
                            {item.short_screenshots.map((imag, index) => (
                              <li
                                key={imag.id}
                                data-target={`#carouselExampleIndicators_${item.id}`}
                                onMouseEnter={() => handleSlideChange(index)} // Change the photo on hover
                              ></li>
                            ))}
                          </ol>
                          <div className="carousel-inner">
                            {item.short_screenshots.map((imag, index) => (
                              <div
                                key={index}
                                className={`carousel-item  ${
                                  index === activeIndex ? "active" : ""
                                }`}
                              >
                                <Image
                                  className="w-100"
                                  borderRadius={5}
                                  src={imag.image}
                                  alt={` ${index + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Heading>
                  <CardBody>
                    <div className="d-flex">
                      {item.parent_platforms.map((plat) => (
                        <div
                          className={` ${Styles.colorIcon}`}
                          key={plat.platform.id}
                        >
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
                      <div className={`${Styles.badge}`}>
                        <span className={`${Styles.TextNumber}`}>
                          {item.metacritic}
                        </span>
                      </div>
                    </div>

                    <Text className={`${Styles.title}`}>
                      {item.name}{" "}
                      <i
                        className={`${
                          item.metacritic >= 90
                            ? `fa-solid fa-thumbs-up text-warning`
                            : `fa-solid fa-heart text-danger`
                        }`}
                      ></i>
                    </Text>
                    <div className="d-flex">
                      <Badge
                        p={`3px`}
                        borderRadius={5}
                        color={"white"}
                        background={`rgb(55, 55, 55)`}
                        _hover={{
                          bg: "white",
                          color: "black",
                        }}
                      >
                        <i className="fa-solid fa-plus p-1"></i>

                        <span className="p-1">{item.added}</span>
                      </Badge>
                      <Badge
                        className={`${
                          index === activeItem ? MouseOut : MouseOver
                        } `}
                        borderRadius={5}
                        marginLeft={2}
                        fontSize={10}
                        color={"white"}
                        background={`rgb(55, 55, 55)`}
                        _hover={{
                          bg: "white",
                          color: "black",
                        }}
                      >
                        <i className="fa-solid fa-gift p-2"></i>
                      </Badge>
                    </div>
                  </CardBody>
                  <CardFooter className={`${Styles.cardFooter}`}>
                    <div className="d-flex">
                      <Text
                        color={"white"}
                        opacity={0.5}
                        fontSize={"x-small"}
                        marginLeft={2}
                      >
                        Release date :
                      </Text>
                      <Spacer />
                      <Text color={"white"} fontSize={"x-small"} marginLeft={1}>
                        {item.released}
                      </Text>
                    </div>
                    <div className="d-flex">
                      <Text
                        color={"white"}
                        opacity={0.5}
                        fontSize={"x-small"}
                        marginLeft={2}
                      >
                        Genres :
                      </Text>
                      <Spacer />
                      {item.genres.slice(0, 3).map((ganer) => (
                        <Text
                          key={ganer.id}
                          color={"white"}
                          fontSize={"x-small"}
                          marginLeft={1}
                        >
                          {ganer.name}
                        </Text>
                      ))}
                    </div>
                    <div className="gap-2 ">
                      <button className={`${Styles.btn}  w-100`} type="button">
                        <span className="m-4">Show more like this</span>
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
}
