import { useMemo, FC } from "react";
import {WithClassName} from "interfaces";

interface FormattedTitleProps extends WithClassName {
    title: string;
}

const FormattedTitle: FC<FormattedTitleProps> = ({ title, className }) => {
    const formattedTitle = useMemo(() => {
        return title.toUpperCase();
    }, [title]);

    return <span className={className}>{formattedTitle}</span>;
};

export default FormattedTitle;
