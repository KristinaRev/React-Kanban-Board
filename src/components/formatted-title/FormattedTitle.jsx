import React, { useMemo } from "react";

const FormattedTitle = ({ title, className }) => {
    const formattedTitle = useMemo(() => {
        return title.toUpperCase();
    }, [title]);

    return <span className={className}>{formattedTitle}</span>;
};

export default FormattedTitle;
