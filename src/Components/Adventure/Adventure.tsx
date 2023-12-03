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
import "../../App.css"
import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Adventure.module.css";
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

export default function Adventure() {
  const [dataGamesAction, setDataGamesAction] = useState<DataFetchGames[]>([]);
  const [DataGamesGenres, setDataGamesGenres] = useState<DataFetchGames[]>([]);
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
          genres: "adventure",
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

  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box p="1">
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));
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
          <h1 className="H1Heder">Adventure Games</h1>
          <p className={`textHeder`}>
            An adventure game is a genre in which the player performs as a
            protagonist. It is usually supported by puzzle-solving, gathering
            items, dialogues, and intervening goals. Adventure focus on story,
            many of them are designed for a single player. Colossal Cave
            Adventure is known as the first of the genre, released in 1976. They
            rocketed in the 1980s; later it led to the appearance of independent
            video game developers. The Walking Dead by TellTale Games is
            considered as the game which renewed the whole genre. It has a
            revolutionary mechanics which change the gameplay as the players
            make their choices. These games are still favorite among the users;
            independent developers start crowd-funding companies to raise money;
            the genre is celebrated on practically any platform.
          </p>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {dataGamesAction.map((item, index) => (
              <Link
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
                      <div
                        id={`carouselExampleIndicators_${item.id}`}
                        className="carousel slide "
                        data-ride="carousel"
                      >
                        <ol className="carousel-indicators">
                          {item.short_screenshots.map((imag, index) => (
                            <li
                              key={imag.id}
                              data-target={`#carouselExampleIndicators_${item.id}`}
                              data-slide-to={index}
                              onClick={() => handleSlideChange(index)}
                            ></li>
                          ))}
                        </ol>
                        <div className="carousel-inner">
                          {item.short_screenshots.map((imag, index) => (
                            <div
                              key={index}
                              className={`carousel-item  ${
                                index === 0 ? "active" : ""
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
