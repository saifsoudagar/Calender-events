import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
        categories,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        selectedEvent ? selectedEvent.category : ""
    );

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            category: selectedCategory,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }

        setShowEventModal(false);
    }

    return ( <
        div className = "h-screen w-full fixed left-0 top-0 flex justify-center items-center" >
        <
        form className = "bg-white rounded-lg shadow-2xl w-1/4" >
        <
        header className = "bg-gray-100 px-4 py-2 flex justify-between items-center" >
        <
        span className = "material-icons-outlined text-gray-400" > { " " }
        drag_handle { " " } <
        /span>{" "} <
        div > { " " } {
            selectedEvent && ( <
                span onClick = {
                    () => {
                        dispatchCalEvent({ type: "delete", payload: selectedEvent });
                        setShowEventModal(false);
                    }
                }
                className = "material-icons-outlined text-gray-400 cursor-pointer" >
                delete { " " } <
                /span>
            )
        } { " " } <
        button onClick = {
            () => setShowEventModal(false) } >
        <
        span className = "material-icons-outlined text-gray-400" > { " " }
        close { " " } <
        /span>{" "} <
        /button>{" "} <
        /div>{" "} <
        /header>{" "} <
        div className = "p-3" >
        <
        div className = "grid grid-cols-1/5 items-end gap-y-7" >
        <
        div > < /div>{" "} <
        input type = "text"
        name = "title"
        placeholder = "Add title"
        value = { title }
        required className = "pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
        onChange = {
            (e) => setTitle(e.target.value) }
        />{" "} <
        span className = "material-icons-outlined text-gray-400" > { " " }
        schedule { " " } <
        /span>{" "} <
        p > { daySelected.format("dddd, MMMM DD") } < /p>{" "} <
        span className = "material-icons-outlined text-gray-400" > { " " }
        description { " " } <
        /span>{" "} <
        input type = "text"
        name = "description"
        placeholder = "Add a description"
        value = { description }
        required className = "pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
        onChange = {
            (e) => setDescription(e.target.value) }
        />{" "} <
        span className = "material-icons-outlined text-gray-400" > { " " }
        category { " " } <
        /span>{" "} <
        select value = { selectedCategory }
        onChange = {
            (e) => setSelectedCategory(e.target.value) }
        className = "mt-2 border rounded p-2 w-full" >
        <
        option value = "" > Select Category < /option>{" "} {
            categories.map((category, index) => ( <
                option key = { index }
                value = { category } > { " " } { category } { " " } <
                /option>
            ))
        } { " " } <
        /select>{" "} <
        /div>{" "} <
        /div>{" "} <
        footer className = "p-3" >
        <
        button onClick = { handleSubmit }
        className = "px-4 py-2 bg-blue-600 text-white rounded w-full" >
        { selectedEvent ? "Update Event" : "Add Event" } { " " } <
        /button>{" "} <
        /footer>{" "} <
        /form>{" "} <
        /div>
    );
}