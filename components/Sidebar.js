import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

export default function Sidebar() {
    const { categories, selectedCategory, setSelectedCategory } = useContext(GlobalContext);

    return ( <
        aside className = "border p-5 w-64" >
        <
        CreateEventButton / >
        <
        SmallCalendar / >
        <
        div className = "mt-5" >
        <
        p className = "text-gray-500 font-bold mt-2" > Filter by Category < /p> <
        select value = { selectedCategory }
        onChange = {
            (e) => setSelectedCategory(e.target.value) }
        className = "mt-2 border rounded p-2 w-full" >
        <
        option value = "" > All Categories < /option> {
            categories.map((category, index) => ( <
                option key = { index }
                value = { category } > { category } <
                /option>
            ))
        } <
        /select> <
        /div> <
        /aside>
    );
}