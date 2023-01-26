import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import MenuList from "@material-ui/core/MenuList";
import HeaderUser from "../HeaderUser";
import SearchBox from "../SearchBox";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Drawer, Hidden } from "@material-ui/core";
import { cartOpenDrawer } from "../../state/slices/cart/index";
import { logout } from "../../state/slices/auth/index";
import { changeTheme } from "../../state/slices/theme/index";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import Logo from "../logo";

const Header = () => {
  const dispatch = useDispatch();
  const {
    palette: { type },
  } = useTheme();
  
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [mobile, setMobile] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const onMobile = useMediaQuery("(max-width:740px)");
  const classes = useStyles({ mobile });
  const handleCloseDrawer = () => {
    setMobile(false);
  };

  return (
    <AppBar
      position="fixed"
      className={classes.header}
    >
      <Toolbar>
        <Toolbar className={classes.navMenu}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => setMobile(!mobile)}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          {!onMobile ? (
            <MenuList className={classes.navList} role="presentation">
              <MenuItem
                disableRipple
                component={Link}
                to="/"
                className="navItem"
                style={{ marginLeft: -16 }}
              >
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/shop"
                className="navItem"
                disableRipple
              >
                Shop
              </MenuItem>
              <MenuItem
                component={Link}
                to="/"
                className="navItem"
                disableRipple
              >
                About Us
              </MenuItem>
            </MenuList>
          ) : (
            <Drawer
              variant="temporary"
              anchor="left"
              className={classes.drawer}
              open={mobile}
              onClose={handleCloseDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
                disablePortal: true,
              }}
            >
              <MenuList className={classes.navListMobile} role="presentation">
                <MenuItem
                  component={Link}
                  to="/"
                  className="navItem"
                  style={{ marginLeft: onMobile ? 0 : -16 }}
                  onClick={handleCloseDrawer}
                >
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/shop"
                  onClick={handleCloseDrawer}
                >
                  Shop
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/"
                  divider
                  onClick={handleCloseDrawer}
                >
                  About Us
                </MenuItem>
                {userInfo ? (
                  <div style={{ width: "100%" }}>
                    <MenuItem
                      component={Link}
                      to="/profile"
                      divider
                      onClick={handleCloseDrawer}
                    >
                      {userInfo.name ? userInfo.name : "Profile"}
                    </MenuItem>
                    <div style={{ width: "100%" }}>
                      {userInfo.isAdmin && (
                        <div style={{ width: "100%" }}>
                          <MenuItem
                            component={Link}
                            to="/admin/userlist"
                            onClick={handleCloseDrawer}
                          >
                            Manage Users
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/admin/productlist"
                            onClick={handleCloseDrawer}
                          >
                            Manage Products
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/admin/orderlist"
                            divider
                            onClick={handleCloseDrawer}
                          >
                            Manage Orders
                          </MenuItem>
                        </div>
                      )}
                    </div>
                    <MenuItem onClick={() => dispatch(logout())}>
                      Logout
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem component={Link} to="/login">
                    Login
                  </MenuItem>
                )}
              </MenuList>
              <IconButton
                edge="start"
                className={classes.closeButton}
                onClick={() => setMobile(false)}
                color="inherit"
                aria-label="close drawer"
              >
                <CloseIcon />
              </IconButton>
            </Drawer>
          )}
        </Toolbar>
        <Logo position="center" />
        <div className={classes.sectionDesktop}>
          <IconButton onClick={() => setOpenSearchDrawer(true)}>
            <SearchIcon height={22} width={22} className={classes.iconSVG} />
          </IconButton>

          <Drawer
            anchor="top"
            open={openSearchDrawer}
            onClose={() => setOpenSearchDrawer(false)}
          >
            <SearchBox
              role="searchDrawer"
              setOpenSearchDrawer={setOpenSearchDrawer}
            />
          </Drawer>

          <IconButton onClick={() => dispatch(cartOpenDrawer(true))}>
            <Badge
              badgeContent={cartItems.length}
              color="secondary"
              overlap="rectangular"
            >
              <CartIcon />
            </Badge>
          </IconButton>
          {type === "light" ? (
            <IconButton onClick={() => dispatch(changeTheme("dark"))}>
              <Brightness4Icon />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(changeTheme("light"))}>
              <Brightness7Icon />
            </IconButton>
          )}
          <Hidden smDown>
            <HeaderUser />
          </Hidden>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
