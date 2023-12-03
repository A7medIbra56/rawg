"use client";
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
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
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

interface LinkItemProps {
  name: string;
  icon: IconType;
  titel?: string;
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
  { name: "Last 30 days", icon: FiHome },
  { name: "This week", icon: FiTrendingUp },
  { name: "Next week", icon: FiCompass },
  { name: "Release calendar", icon: FiStar },
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
      
        transition="3s ease"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
       

          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
   
        {LinkItems.map((link, index1) => (
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
        ))}
       
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
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#151515", "#151515")}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

     

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}></Flex>
      </HStack>
    </Flex>
  );
};
const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("#151515", "#151515")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent bg={useColorModeValue("#151515", "#151515")}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="2">
        {/* Content */}
        <Routes>
          {/*      <Route path="/action" exact component={Strategy} /> */}
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/action" element={<Action />} />
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
