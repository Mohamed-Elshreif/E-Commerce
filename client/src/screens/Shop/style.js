import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
    marginBottom: 20,
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "flex-start",
    },
  },
  container: {
    marginBottom: 64,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    "& label": {
      paddingRight: 12,
      color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-input": {
      paddingTop: 6,
      paddingBottom: 6,
      fontSize: 15,
      color: theme.palette.text.primary,
    },
    "& .MuiInputBase-formControl": {
      borderRadius: 4,
      marginRight: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  },
  layoutIcon: {
    ...theme.mixins.customize.centerFlex("column"),
    padding: 4,
    cursor: "pointer",
    "& + $layoutIcon": {
      marginLeft: 8,
    },
  },
  activeLayout: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
  topFilter: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    ...theme.mixins.customize.flexMixin(
      "space-between",
      "center",
      "row",
      "wrap"
    ),
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    padding: 22,
    marginBottom: theme.spacing(5),
    "& .MuiChip-root": {
      margin: 4,
    },
  },
  pagination: {
    flexBasis: "100%",
    marginTop: 16,
    marginBottom: 16,
    "& .MuiPagination-ul": {
      justifyContent: "flex-end",
      flexWrap:'nowrap',
    },
  },
}));
