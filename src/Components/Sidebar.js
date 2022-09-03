import React from 'react'
import { Stack } from "@mui/material"

import { categories } from "../Utils/Constants"
const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
    const handleCategory = (categoryName) => {
        // Scroll to to Not working RN.
        window.scrollTo(0,0);
        setSelectedCategory(categoryName)
    }
    return (
        <Stack direction="row"
            sx={{
                overflowY: "auto",
                height: { sx: "auto", md: "95%" },
                flexDirection: { md: "column" },

            }}
        >
            {categories.map(category => (
                <button key={category.name} className="category-btn"
                    style={{
                        background: category.name === selectedCategory && "#FC1503",
                        color: "#fff"
                    }}
                    onClick={() => handleCategory(category.name)}
                >
                    <span
                        style={{
                            marginRight: "1rem",
                            color: category.name === selectedCategory ? "#fff" : "#FC1503"
                        }}
                    >{category.icon}</span>
                    <span style={{
                        opacity: category.name === selectedCategory ? 1 : 0.8
                    }}>{category.name}</span>
                </button>
            ))}
        </Stack>
    )
}

export default Sidebar