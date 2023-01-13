import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "flex-start",
    },
  },
  form: {
    "& > *": {
      marginBottom: 16,
    },
    "& .MuiInput-underline:before": {
      borderColor: "rgba(224, 224, 224, 1)",
    },
  },
  container: {
    marginBottom: 64,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  size: {
    marginTop: 8,
    "& > div": {
      display: "flex",
      flexBasis: "25%",
      "& > div + div": {
        marginLeft: 16,
      },
      marginTop: 16,
    },
    "& > label": {
      flexBasis: "100%",
    },
  },
  imagePreview: {
    position: "relative",
    marginTop: 8,
    marginRight: 16,
    "& > img": {
      width: 120,
      height: 160,
      objectFit: "cover",
      borderRadius: 6,
    },
    "& .MuiIconButton-root": {
      position: "absolute",
      top: 5,
      right: 5,
    },
  },
  preview: {
    backgroundColor: theme.palette.background.default,
    "& img.MuiCardMedia-media": {
      height: "100%",
    },
  },
}));
