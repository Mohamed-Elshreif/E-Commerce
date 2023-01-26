import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, InputBase } from "@material-ui/core";
import { IoSearchOutline } from "react-icons/io5";
import { addSearchTerm } from "../../state/slices/filter";
import { useStyles } from "./style";

const SearchBox = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const { searchTerm } = useSelector((state) => state.filter);

  const handleInputChange = (e) => {
    setKeyword(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
        dispatch(addSearchTerm(keyword));
        navigate("/shop");
        props.setOpenSearchDrawer(false);
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 2000);
    return () => clearTimeout(timerId);
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword.trim()) {
      dispatch(addSearchTerm(debouncedKeyword));
    }
  }, [dispatch, debouncedKeyword]);

  useEffect(() => {
    if (!searchTerm) {
      setKeyword("");
    } else {
      setKeyword(searchTerm);
    }
  }, [searchTerm]);

  return (
    <form className={classes.search} onSubmit={handleSubmit}>
      <InputBase
        placeholder="Search…"
        autoFocus={props.role === "searchDrawer"}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={keyword}
        onChange={handleInputChange}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="submit" className={classes.searchIcon}>
        <IoSearchOutline fontSize={20} />
      </IconButton>
    </form>
  );
};

export default SearchBox;
