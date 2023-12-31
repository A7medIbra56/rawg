import React from "react";
import styles from "./Nav.module.css";
import download from "../../imga/download.png";
import download1 from "../../imga/download (1).png";
import download2 from "../../imga/download (2).png";
import download3 from "../../imga/download (3).png";
import download4 from "../../imga/download (4).png";
import download5 from "../../imga/download (5).png";
import download6 from "../../imga/download (6).png";
import download7 from "../../imga/download (7).png";
import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Input,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  InputGroup,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { FiTrendingUp, FiMenu } from "react-icons/fi";
import { MdLastPage, MdSkipNext, MdNewReleases } from "react-icons/md";
import { IconType } from "react-icons";
import { useState } from "react";
import Strategy from "../Strategy/Strategy.tsx";
import Sports from "../Sports/Sports.tsx";
import Action from "../Action/Action.tsx";
import Adventure from "../Adventure/Adventure.tsx";
import Puzzle from "../Puzzle/Puzzle.tsx";
import Racing from "../Racing/Racing.tsx";
import RPG from "../RPG/RPG.tsx";
import Shooter from "../Shooter/Shooter.tsx";
import DetailsGames from "../DetailsGames/DetailsGames.tsx";
import Search from "../Search/Search.tsx";
import Games from "../Games/Games.tsx";
import Home from "../Home/Home.tsx";
import Lastdays from "../Lastdays/Lastdays.tsx";
import Thisweek from "../../Components/Thisweek/Thisweek.tsx";
import Nextweek from "../../Components/Nextweek/Nextweek.tsx";
import Releasecalendar from "../Releasecalendar/Releasecalendar.tsx";

interface LinkItemProps {
  name: string;
  icon: IconType;
  titel?: string;
  to: string;
}
interface LinkItemGenresProps {
  name: string;
  Img: ImageData;
  to: string;
}
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Last 30 days", icon: MdLastPage, to: "/lastdays" },
  { name: "This week", icon: FiTrendingUp, to: "/thisweek" },
  { name: "Next week", icon: MdSkipNext, to: "/nextweek" },
  { name: "Release calendar", icon: MdNewReleases, to: "/releasecalendar" },
];

const LinkItemsGenres: Array<LinkItemGenresProps> = [
  { name: "Action", Img: download, to: "/action" },
  { name: "Strategy", Img: download1, to: "/strategy" },
  { name: "RPG", Img: download2, to: "/rpg" },
  { name: "Shooter", Img: download3, to: "/shooter" },
  { name: "Adventure", Img: download4, to: "/adventure" },
  { name: "Puzzle", Img: download5, to: "/puzzle" },
  { name: "Racing", Img: download6, to: "/racing" },
  { name: "Sports", Img: download7, to: "/sports" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<Number>();
  const handleItemClick = (index: Number) => {
    setActiveItem(index);
  };

  return (
    <>
      <Box
        className={styles.zIndex}
        transition="3s ease"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex alignItems="center" mx="8" justifyContent="space-between">
          <Text
            color={"white"}
            fontSize="3xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            RAWG
          </Text>

          <CloseButton
            bg={"white"}
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <Link className="text-decoration-none" to={"/home"}>
          <Box
            ml={6}
            fontSize={"3xl"}
            color={"white"}
            _hover={{
              opacity: 0.5,
              direction: "none",
            }}
          >
            Home
          </Box>
        </Link>

        {LinkItems.map((link, index1) => (
          <Link
            key={link.name}
            className="text-decoration-none"
            to={`${link.to}`}
          >
            <Box key={link.name}>
              <Flex
                align="center"
                mx="6"
                role="group"
                color="white"
                cursor="pointer"
                onClick={() => handleItemClick(index1)}
              >
                <Box
                  className={`${styles.PaddingIcon} ${`${
                    index1 === activeItem ? `${styles.active}` : ""
                  }`} `}
                >
                  <Icon
                    color="#fff"
                    fontSize={"2xl"}
                    aria-label="Call Sage"
                    className={styles.icon}
                    as={link.icon}
                  />
                </Box>
                {link.name}
              </Flex>
            </Box>
          </Link>
        ))}
        <Link
          className={`text-decoration-none ${styles.LinkText}`}
          to={"/games"}
        >
          <Text
            ml={6}
            fontSize={"3xl"}
            color={"white"}
            _hover={{
              opacity: 0.5,
              direction: "none",
            }}
          >
            GAMES
          </Text>
        </Link>

        {LinkItemsGenres.map((item) => (
          <Link
            style={{ textDecoration: "none" }}
            key={item.name}
            to={`${item.to}`}
          >
            <Box>
              <Flex
                align="center"
                mx="6"
                role="group"
                color="white"
                cursor="pointer"
              >
                <Image width={7} pt={2} mr={3} src={`${item.Img}`} />
                {item.name}
              </Flex>
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  let [searchItem, setSearchItem] = useState("");
  let Navigate = useNavigate();
  function getSearch(e) {
    let mySearchItem = searchItem;
    mySearchItem = e.value;
    setSearchItem(mySearchItem);
  }

  const handleNavigate: any = (searchItemUp) => {
    if (searchItemUp === ``) {
    } else {
      Navigate(`/search/${searchItemUp}`);
    }
  };

  const handleSearch = () => {
    handleNavigate(searchItem);
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      className={styles.zIndex}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#151515", "#151515")}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        className={styles.zIndex}
        color={"white"}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <InputGroup className={`${styles.zIndex1}`}>
        <Input
          name="search"
          background={`hsla(0,0%,100%,.16)`}
          border={"0px"}
          borderRadius={"40px"}
          _hover={{
            background: "white",
            borderColor: "black",
          }}
          placeholder="Search"
          onChange={(e) => getSearch(e.target)}
          onKeyDown={handleEnterPress}
          type="text"
          className={`${styles.zIndex1} ${styles.InputSearch}`}
        />
      </InputGroup>
      <Text
        color={"white"}
        fontSize="xl"
        fontFamily="monospace"
        fontWeight="bold"
        className={`m-1 ${styles.zIndex1}`}
      >
        LOGIN
      </Text>
    </Flex>
  );
};
const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      className={styles.zIndex}
      minH="100vh"
      bg={useColorModeValue("#151515", "#151515")}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Box width={"100px"}>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          returnFocusOnClose={true}
          onOverlayClick={onClose}
          colorScheme="white"
        >
          <DrawerContent bg={useColorModeValue("#151515", "#151515")}>
            <SidebarContent className={styles.zIndex} onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Box>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="2">
        {/* Content */}
        <Routes>
          {/*      <Route path="/action" exact component={Strategy} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/lastdays" element={<Lastdays />} />
          <Route path="/thisweek" element={<Thisweek />} />
          <Route path="/nextweek" element={<Nextweek />} />
          <Route path="/releasecalendar" element={<Releasecalendar />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/action" element={<Action />} />
          <Route path="/search" element={<Search />}>
            <Route path=":query" element={<DetailsGames />}></Route>
          </Route>
          <Route path="/detailsGames" element={<DetailsGames />}>
            <Route path=":id" element={<DetailsGames />}></Route>
          </Route>
          <Route path="/rpg" element={<RPG />} />
          <Route path="/shooter" element={<Shooter />} />
          <Route path="/adventure" element={<Adventure />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/racing" element={<Racing />} />
          <Route path="/sports" element={<Sports />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default SidebarWithHeader;
