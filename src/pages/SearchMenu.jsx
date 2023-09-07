import React from "react";
import Menu from "../pages/Menu";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
const SearchMenu = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    console.log(keyword);
    React.useEffect(() => {
        dispatch(getAllProducts(keyword));
    }, [dispatch, keyword]);
    return <Menu />;
};

export default SearchMenu;
