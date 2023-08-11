import {
  Code,
  createStyles,
  Group,
  Navbar,
  NavLink,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  Menu,
  Button,
  Tooltip,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import {
  IconSearch,
  IconInfoSquareRounded,
  IconRobot,
  IconCameraCode,
  IconBuildingSkyscraper,
  IconMail,
} from "@tabler/icons-react";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useSessionStorage } from "@mantine/hooks";
import Link from "next/link";
import { LinksGroup } from "./dependencies/Links";

const useStyles = createStyles((theme) => ({
  root: {
    top: 30,
    left: "10%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[9], 0.55)
        : theme.fn.rgba(theme.colors.gray[0], 0.53),
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.md,
    backdropFilter: "blur(30px)",
    border: `2px solid white`,

    transition: "all 0.35s ease",
  },
  expanded: {
    justifyContent: "space-between",
    left: "50%",
  },

  linkText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
    color: theme.white,
    fontWeight: 600,
    "&:hover": {
      transform: "translateY(2px) scale(0.98)",
      boxShadow: theme.shadows.sm,
      backgroundColor: theme.colors.gray,
    },
  },

  expand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
  },
  search: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[9], 0.42)
        : theme.fn.rgba(theme.colors.gray[0], 0.53),
    borderRadius: theme.radius.md,
  },
  searchInput: {
    border: "none",
    color: "#ebebeb",
    fontFamily: "Poppins, sans-serif",

    "&::placeholder": {
      fontFamily: "Poppins, sans-serif",
      color: "#ebebeb",
      opacity: 0.95,
    },
  },
  searchIcon: {
    color: "#ebebeb",
    opacity: 0.95,
  },
}));

function Nav({ borderColor = "white" }) {
  const { classes } = useStyles();

  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();

  const [locked, setLocked] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const [loaded, setLoaded] = useSessionStorage("nav-loaded", false);

  const desktop = useMediaQuery("(min-width: 900px)");

  // set loaded to true after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
      console.log("loaded");
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // set expanded to false if the user scrolls down, and true if they scroll up
  useEffect(() => {
    const listener = () => {
      const st = window.scrollY;
      if (window.scrollY > 30) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [locked]);

  const data = [
    {
      label: "About",
      href: "/about",
      icon: IconInfoSquareRounded,
      links: [
        { label: "Who We Are", link: "/about" },
        { label: "Our Team", link: "/about" },
        { label: "Progress", link: "/progress" },
      ],
    },
    {
      label: "Technical",
      href: "/vehicles",
      icon: IconRobot,
      links: [
        { label: "Erie 2022", link: "/erie" },
        { label: "Huron 2021", link: "/huron" },
        { label: "Blue ROV 2020", link: "/bluerov" },
      ],
    },
    {
      label: "Library",
      href: "/library",
      icon: IconCameraCode,
      links: [
        { label: "Media", link: "/media" },
        { label: "Documentation", link: "/documentation" },
      ],
    },
    { label: "Sponsors", href: "/sponsors", icon: IconBuildingSkyscraper },
    { label: "Contact", href: "/contact", icon: IconMail },
  ];

  const links = data.map((item, index) => (
    <LinksGroup
      {...item}
      key={item.label}
      active={router.pathname === item.href}
    />
  ));

  return (
    <Navbar
      height={expanded ? 70 : 60}
      fixed={true}
      p={expanded ? "sm" : 0}
      width={expanded ? { base: "80vw" } : { base: "60px" }}
      className={
        classes.root +
        " " +
        (expanded ? classes.expanded : "") +
        " navbar-animation "
      }
    >
      <UnstyledButton
        className={classes.expand}
        onClick={() => {
          if (expanded) {
            console.log(router.pathname);
            router.pathname === "/" ? scrollTo({ y: 0 }) : router.push("/");
          } else setExpanded(!expanded);
        }}
      >
        <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          className="icon icon-tabler"
          strokeWidth="1"
          stroke="none"
          fill="#fff"
        >
          <path d="m19,2.6l-7,4.9L5,2.6H0v18.8h5.8v-10.7l6.2,4.1,6.2-4.1v10.7h5.8V2.6h-5Zm-7,10l-7.5-5.4c.5.2,2.9,1.7,2.9,1.7,0,0,1.5.8,3.2,1.6,1.3.6,1.5.9,1.5,1,0,0,.2-.3,1.5-1,1.7-.8,3.2-1.6,3.2-1.6,0,0,2.3-1.5,2.9-1.7l-7.5,5.4Z" />
        </svg>
      </UnstyledButton>
      {expanded && (
        <>
          <Navbar.Section grow>
            <Group px="sm" noWrap>
              {links}
            </Group>
          </Navbar.Section>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Search"
              size="sm"
              radius="md"
              variant="unstyled"
              classNames={{
                root: classes.search,
                input: classes.searchInput,
                icon: classes.searchIcon,
              }}
              icon={<IconSearch size={12} stroke={1.5} />}
              rightSectionWidth={70}
              rightSection={
                <Code className={classes.searchCode}>Ctrl + K</Code>
              }
              styles={{ rightSection: { pointerEvents: "none" } }}
            />
          </div>
        </>
      )}
    </Navbar>
  );
}

export default Nav;
