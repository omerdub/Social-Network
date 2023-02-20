import { Spinner } from "../spinner";
import "./button.scss";

export const Button = ({ children, disabled, variant, isLoading }) => {

    return (
        <div className={`button button-${variant}`}>
            <button className={isLoading ? 'loading' : ''} disabled={disabled || isLoading}>
                {isLoading ? <Spinner /> : children}
            </button>
        </div>
    );
};