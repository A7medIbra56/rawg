"use client";
import {
  SimpleGrid,
  Card,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Image,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface DataFetchGames {
  id: number;
  name: string;
  background_image: ImageData;
  to: string;
}

export default function Action() {
  const [dataGamesAction, setDataGamesAction] = useState<DataFetchGames[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

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
      setDataGamesAction(data.results);
      setLoading(false);
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
      {loading === true ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Spinner color="red.500" className="" size="xl" />
        </div>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {dataGamesAction.map((item) => (
            <Link key={item.id}>
              <Card bg={"hsla(0, 0%, 100%, 0.07)"}>
                <Heading borderRadius={2}>
                  <Image
                    objectFit="cover"
                    borderTopRadius={"xl"}
                    src={`${item.background_image}`}
                    alt="Dan Abramov"
                  />
                </Heading>

                <CardBody>
                  <Text color={"white"} fontSize={"x-large"}>
                    {item.name}
                  </Text>
                </CardBody>
                <CardFooter>
                  <Button>View here</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
