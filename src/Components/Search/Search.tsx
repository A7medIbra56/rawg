import {
  SimpleGrid,
  Card,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Image,
  Button,
  Badge,
  WrapItem,
  Spinner,
  Spacer,
} from "@chakra-ui/react";
import { BsColumnsGap } from "react-icons/bs";
import { LuRows } from "react-icons/lu";

import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Styles from "./Search.module.css";

/*typeScript Api Array All*/
interface DataFetchGames {
  id: number;
  name: string;
  released: string;
  background_image: ImageData;
  to: string;
  slug: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  added: number;
  short_screenshots: [
    {
      id: number;
      image: ImageData;
    }
  ];
  metacritic: number;
  parent_platforms: [
    {
      platform: {
        id: number;
        name: string;
      };
    }
  ];
}

export default function Search() {
  const [dataGamesAction, setDataGamesAction] = useState<DataFetchGames[]>([]); //set data API action
  const [loading, setLoading] = useState<Boolean>(false); // set loading
  const [MouseOver, setMouseOver] = useState<String>("d-none"); //control Show or hide CardFooter
  const [MouseOut, setMouseOut] = useState<String>("d-flex"); //control Show or hide CardFooter
  const [switchColumns, setSwitchColumns] = useState<string>("true"); // set setSwitchColumns
  const [activeItem, setActiveItem] = useState<Number>();
  const [activeIndex, setActiveIndex] = useState<Number>(0);

  let querySearch = useParams();
  // handleItemClick
  const handleItemClick = (index?: Number) => {
    setActiveItem(index);
  };
  // call fetchGames to fetch API games
  const fetchGames = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get("https://api.rawg.io/api/games", {
        params: {
          key: "de893af8a0034c2da3577be32746abc8",
          search: querySearch.query,
        },
      });

      console.log(querySearch.query);
      setDataGamesAction(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // handleSlideChange slide Image
  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  // Call the function
  useEffect(() => {
    fetchGames();
  }, [querySearch]);

  return (
    <>
      {/* is loading start  */}
      {loading === true ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Spinner color="red.500" className="" size="xl" />
        </div>
      ) : (
        /* is loading end  */
        <>
          {/* control button Switch Display Columns */}
          <WrapItem className={`${Styles.Display} `}>
            <Text marginTop={3} fontSize={"sm"} color={"hsla(0,0%,90%,.8)"}>
              Display options:
            </Text>
            <Button
              background={`hsla(0,0%,100%,.2)`}
              paddingLeft={1}
              onClick={() => setSwitchColumns("false")}
              margin={2}
              color={"hsla(0,0%,90%,.8)"}
              _hover={{
                bg: "white",
                color: "black",
              }}
              rightIcon={<LuRows fontSize={"30px"} />}
            />
            <Button
              background={`hsla(0,0%,100%,.2)`}
              paddingLeft={1}
              onClick={() => setSwitchColumns("true")}
              margin={2}
              color={"hsla(0,0%,90%,.8)"}
              _hover={{
                bg: "white",
                color: "black",
              }}
              _active={{
                background: "white",
              }}
              rightIcon={<BsColumnsGap fontSize={"30px"} />}
            />
          </WrapItem>
          {/* control button Switch Display Columns */}
          <SimpleGrid
            spacing={4}
            /*  templateColumns="repeat(auto-fill, minmax(300px, 1fr))" */
            templateColumns={
              switchColumns === "false"
                ? ""
                : "repeat(auto-fill, minmax(300px, 1fr))"
            }
            padding={switchColumns === "false" ? 5 : 0}
            width={switchColumns === "false" ? "70%" : ""}
            height={switchColumns === "false" ? "40%" : ""}
            margin={switchColumns === "false" ? "auto" : ""}
            /* {
              switchColumns === "true" ?( templateColumns="repeat(auto-fill, minmax(50%, 1fr))"
              padding={5}
              width={"50%"}
              margin={"auto"}) : ''
             } */
          >
            {dataGamesAction.map((item, index) => (
              <Link
                to={`/detailsGames/${item.id}`}
                style={{ textDecoration: "none" }}
                key={item.id}
                className={`${Styles.link}`}
                onMouseOver={() => handleItemClick(index)}
                onMouseOut={() => handleItemClick()}
              >
                <Card bg={"rgb(30, 30, 30)"} className={`${Styles.card}`}>
                  <Heading
                    className={`${Styles.Heading} `}
                    margin={0}
                    borderRadius={2}
                  >
                    <Image
                      src={`${item.background_image}`}
                      alt=".."
                      borderRadius={5}
                      className={`${
                        index === activeItem ? MouseOver : MouseOut
                      } ${Styles.ImageCard}`}
                    />
                  </Heading>
                  <Heading
                    margin={0}
                    className={`${
                      index === activeItem ? MouseOut : MouseOver
                    } ${Styles.Heading} `}
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
                                  borderRadius={5}
                                  className={`${Styles.zIndex}  ${Styles.ImageCard}`}
                                  src={`${imag.image}`}
                                  alt={`${index + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Heading>
                  <CardBody className={`${Styles.CardBody}`}>
                    <div className={`d-flex`}>
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
                          {item.metacritic === null ? 0 : item.metacritic}
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
