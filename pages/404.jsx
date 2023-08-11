import { Button, createStyles, keyframes, Text } from "@mantine/core";

export const spin = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});

const useStlyes = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    zIndex: 1,
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
  label: {
    fontSize: 550,
    fontWeight: 700,
    lineHeight: 1,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    opacity: 0.05,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontFamily: "Rubik",
    userSelect: "none",
  },
  title: {
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 1,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
    marginTop: 320,
  },
  description: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
    marginTop: 30,
    textAlign: "center",
    maxWidth: 600,
  },
  return: {
    marginTop: 50,
    height: 50,
    fontSize: 20,

    "&:hover": {
        animation: `${spin} 5s ease infinite`,
        backgroundSize: "100% 100%",
    },
  },
}));

export default function Custom404() {
  const { classes } = useStlyes();
  return (
    <div className={classes.root}>
      <Text className={classes.label}>404</Text>
      <Text className={classes.title}>Nothing to see here</Text>
      <Text className={classes.description}>
        We can&apos;t seem to find the page you&apos;re looking for. You may
        have mistyped the address, or the page has been moved to another URL.
      </Text>
      <Button
        className={classes.return}
        radius="md"
        variant="gradient"
        gradient={{ from: "indigo.8", to: "blue.5" }}
        component="a"
        href="/"
      >
        Take me back home
      </Button>
    </div>
  );
}
