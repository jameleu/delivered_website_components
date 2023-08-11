import Head from "next/head";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  createStyles,
  Image,
  Title,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20;

const useStyles = createStyles((theme) => ({
  main: {
    position: "relative",
    height: "100vh",
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
    boxShadow: "0px 15px 50px 0px rgb(0 0 0 / 50%)",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
    zIndex: 1,
  },
  splash: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: 100000,
  },
  hero: {
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  grabbable: {
    cursor: "grab",
    color: theme.white,

    "&:active": {
      cursor: "grabbing",
    },
  },
  siteTitle: {
    color: theme.white,
    fontSize: `clamp(1.85rem, 5vw, 4rem)`,
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    margin: 0,
    fontSize: `clamp(.85rem, 3vw, 1.85rem)`,
    fontFamily: "Tiro Devanagari Hindi", 
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: theme.white,
  },
  cta: {
    marginTop: 80,
    padding: "7px 15px",

    fontSize: `clamp(.75rem, 3vw, 1.65rem)`,
    color: theme.white,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 600,

    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[9], 0.4)
        : theme.fn.rgba(theme.colors.gray[0], 0.53),
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.xl,
    backdropFilter: "blur(30px)",

    borderColor: theme.white,
    borderWidth: 2,
    borderStyle: 'solid',
    transition: "all 0.2s ease-in-out",

    "&:hover": {
      transform: "translateY(2px) scale(0.98)",
      boxShadow: theme.shadows.sm,
    },

    "&:active": {
      transform: "translateY(0px) scale(1.02)",
      boxShadow: theme.shadows.xl,
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;

  function retypeHover(e) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      e.target.innerText = e.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return e.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= e.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 40);
  }

  function convertToSpans(text) {
    const word = text.split("");
    const spans = word.map((letter, idx) => {
      return (
        <span class="letter" key={idx}>
          {letter}
        </span>
      );
    });
    return spans;
  }

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  const target = useRef(null);
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 1, tension: 250, friction: 16 },
    })
  );

  useGesture(
    {
      onDrag: ({ active, movement: [x, y], dragging }) =>
        api({
          x: dragging ? x : 0,
          y: dragging ? y : 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: dragging ? 0 : getRandomIntInclusive(-10, 10),
          scale: active ? 1.2 : 1,
        }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { target, eventOptions: { passive: false } }
  );

  return (
    <main className={classes.main}>
      <Container size="lg" className={`${classes.hero} outer-boi `}>
        <animated.div
          ref={target}
          className={classes.grabbable}
          style={{
            width: 130,
            height: 130,
            transform: "perspective(1200px)",
            x,
            y,
            scale: to([scale, zoom], (s, z) => s + z),
            rotateZ,
          }}
        >
                  <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          width="124"
          height="124"
          viewBox="0 0 24 24"
          className="icon icon-tabler grabby bounce"
          stroke-width="1"
          stroke="none"
          fill="#fff"
        >
          <path
            d="m19,2.6l-7,4.9L5,2.6H0v18.8h5.8v-10.7l6.2,4.1,6.2-4.1v10.7h5.8V2.6h-5Zm-7,10l-7.5-5.4c.5.2,2.9,1.7,2.9,1.7,0,0,1.5.8,3.2,1.6,1.3.6,1.5.9,1.5,1,0,0,.2-.3,1.5-1,1.7-.8,3.2-1.6,3.2-1.6,0,0,2.3-1.5,2.9-1.7l-7.5,5.4Z"
          />
        </svg>
        </animated.div>
            <div className={`${classes.siteTitle} text`} >
              <h1
                className="word retype"
                data-value="MICHIGAN"
                onMouseEnter={(e) => retypeHover(e)}
                onMouseLeave={(e) => retypeHover(e)}
              >
                MICHIGAN
              </h1>
              <h1 className="word">{convertToSpans("Robosub")}</h1>
              <p className={classes.tagline + ' tagline-animation'}>University of Michigan</p>
            </div>
          <UnstyledButton className={classes.cta + ' cta-animation'} component={Link} href="/about">
            Dive In
          </UnstyledButton>
      </Container>
      <video
        autoPlay="autoplay"
        loop="loop"
        muted
        defaultmuted="true"
        playsInline
        onContextMenu="return false;"
        preload="auto"
        className={classes.video}
      >
        <source
          src="https://video.wixstatic.com/video/d0cbf8_43c35d32b1be44dcadba66725b707c77/1080p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>
      <div className={classes.overlay}></div>
    </main>
  );
}
