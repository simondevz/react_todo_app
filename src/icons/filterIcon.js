

function FilterIcon({className}) {
    return (
        <svg 
            width="24px" 
            height="24px" 
            className={className}
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            ariaLabelledby="filterIconTitle"
            stroke="#000000" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            color="#000000"
        >
            <title id="filterIconTitle">
                Filter
            </title> 
            <path d="M10 12.261L4.028 3.972h16L14 12.329V17l-4 3z"/> 
        </svg>
    )
}

export default FilterIcon;