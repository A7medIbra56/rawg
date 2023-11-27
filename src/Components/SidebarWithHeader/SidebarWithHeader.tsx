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
import {Route, Routes} from "react-router-dom";


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
import Sports from '../Sports/Sports.tsx';
import Action from "../Action/Action.tsx";
import Adventure from "../Adventure/Adventure.tsx";
import Puzzle from "../Puzzle/Puzzle.tsx";
import Racing from "../Racing/Racing.tsx";
import RPG from "../RPG/RPG.tsx";
import Shooter from "../Shooter/Shooter.tsx";

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
  { name: "Last 30 days", icon: FiHome, },
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
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>

          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <h3>Reviews</h3>
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
        <h3
        >
          Genres
        </h3>
        {LinkItemsGenres.map((item) => (
          <Link key={item.name} to={`${item.to}`}>
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

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="#151515">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("#151515", "#151515")}
              borderColor={useColorModeValue("#151515", "#151515")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
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
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="2">
        {/* Content */}
        <Routes>
       {/*      <Route path="/action" exact component={Strategy} /> */}
            <Route path="/strategy" element={<Strategy/>} />
            <Route path="/action" element={<Action/>} />
            <Route path="/rpg" element={<RPG/>} />
            <Route path="/shooter" element={<Shooter/>} />
            <Route path="/adventure" element={<Adventure/>} />
            <Route path="/puzzle" element={<Puzzle/>} />
            <Route path="/racing" element={<Racing/>} />
            <Route path="/sports" element={<Sports/>} />
        
        </Routes>
      </Box>
    </Box>
  );
};
export default SidebarWithHeader;
