import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((evt) =>
                evt.id === payload.id ? payload : evt
            );
        case "delete":
            return state.filter((evt) => evt.id !== payload.id);
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [categories, setCategories] = useState(["Work", "Personal", "Others"]); // Add default categories
    const [selectedCategory, setSelectedCategory] = useState("");

    const [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer, [],
        initEvents
    );

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
            selectedCategory ? evt.category === selectedCategory : true
        );
    }, [savedEvents, selectedCategory]);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    return ( <
        GlobalContext.Provider value = {
            {
                monthIndex,
                setMonthIndex,
                smallCalendarMonth,
                setSmallCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
                categories, // Provide categories
                selectedCategory, // Provide selectedCategory
                setSelectedCategory, // Provide setter for selectedCategory
                filteredEvents,
            }
        } >
        { props.children } <
        /GlobalContext.Provider>
    );
}