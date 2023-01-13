import { makeStyles } from "@material-ui/core/styles";

export const useCartStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `0px 0px 0px 0px rgb(0 0 0 / 0%), 
                  0px 1px 1px 0px rgb(0 0 0 / 0%), 
                  0px 1px 0px 1px rgb(0 0 0 / 4%)`,
    "&:hover $mediaFront": {
      opacity: 0,
    },
    "&:hover $groupAction": {
      transform: "translate(0, -50%)",
    },
  },
  mediaWrapper: {
    position: "relative",
    paddingTop: "133.33333%", // 3:4 aspect ratio (4/3=133.33)
  },
  media: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: "cover",
    height: "100%",
  },
  mediaFront: {
    transition: "opacity .4s",
  },
  groupAction: {
    position: "absolute",
    top: 65,
    right: 10,
    transform: "translate(120%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    transition: "all .3s ease-in-out",
    zIndex: 1,
    "& a + a": {
      paddingTop: "10px",
    },
    "& svg": {
      color: "#999",
    },
    "& button:hover svg": {
      color: "#fb5d5d",
    },
    "& .MuiIconButton-root": {
      backgroundColor: "rgba(255,255,255,0.5)",
      margin: "4px 0",
    },
  },
  sale: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: "0px 6px",
    color: "#fff",
    fontSize: 12,
    fontWeight: 400,
    textTransform: "uppercase",
    lineHeight: 1.5,
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
  },
  mediaMobile: {
    ...theme.mixins.customize.flexMixin(
      "space-between",
      "center",
      "row",
      "wrap"
    ),
    "@media (max-width: 740px)": {
      flexWrap: "wrap",
      "& > button": {
        backgroundColor: "rgba(245, 0, 87, 0.05) !important",
        flexBasis: "100%",
        marginTop: 10,
      },
    },
  },
  price: {
    fontSize: "1rem",
    fontWeight: 600,
    color: (props) => props.sale > 0 && "#f50057",
  },
  rootPrice: {
    textDecoration: "line-through",
  },
}));

export const useFilterStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      margin: "4px 0",
    },
  },
  title: {
    color: theme.palette.text.primary,

    fontSize: 18,
    [theme.breakpoints.down("lg")]: {
      fontSize: 16,
    },
  },
  category: {
    background: theme.palette.background.default,
    ...theme.mixins.customize.flexMixin("flex-start", "flex-start", "column"),
    "& > .MuiBox-root + .MuiBox-root": {
      marginTop: theme.spacing(2),
    },
    "& > .MuiBox-root": {
      cursor: "pointer",
    },
  },
  brands: {
    "& > button": {
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 0,
      textTransform: "capitalize",
      color: theme.palette.text.secondary,
    },
    "& > button:hover": {
      backgroundColor: "transparent",
    },
  },
  size: {
    flexDirection: "row",
    flexWrap: "nowrap",
    "& span": {
      fontSize: 14,
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  accordion: {
    background: theme.palette.background.default,
    "&::before": {
      display: "none",
    },
    boxShadow: "none",
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .MuiAccordionDetails-root": {
      display: "block",
      padding: 0,
    },
  },
  isSelected: {
    color: "#111 !important",
  },
}));

export const useFormSelectStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
}));

export const useModelStyles = makeStyles((theme) => ({
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "75%",
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      overflowY: "scroll",
      "& $imageWrapper, $content": {
        flexBasis: "100%",
        maxWidth: "100%",
      },
      "& $imageWrapper $image": {
        height: "100%",
        objectFit: "cover",
      },
      "& $content": {
        overflowY: "unset",
      },
    },
  },
  imageWrapper: {
    flexBasis: "50%",
    maxWidth: "50%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  content: {
    flexBasis: "50%",
    maxWidth: "50%",
    margin: "30px 0 30px 30px",
    paddingRight: 30,
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },
}));

export const useReviewStyles = makeStyles((theme) => ({
  form: {
    ...theme.mixins.customize.flexMixin("center", "flex-start", "column"),
    "& > *": {
      marginBottom: 16,
    },
  },
}));

export const useTabsStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: "none",
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
  },
  tab: {
    textTransform: "capitalize",
    fontSize: "1rem",
    "@media (max-width: 400px)": {
      fontSize: "12px",
    },
  },
  buttonMore: {
    marginTop: 30,
    ...theme.mixins.customize.centerFlex(),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
    marginBottom: 40,
  },
}));
