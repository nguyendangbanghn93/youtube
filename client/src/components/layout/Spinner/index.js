import React from "react";
import ReactDOM from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./index.css"
//Thêm thẻ <div id="root-spinner"></div> trong file index.html
export default function Spinner(...rest) {
    let options = {};
    let count = 0;
    let timeOff = 0;
    let element = <></>;
    let text = "";
    let show = true;
    let clickSpinner = () => {
        count++;
        if (count >= 5) {
            offSpinner()
        }
    }
    rest.map((r) => {
        if (typeof r === "number") {
            timeOff = r;
        } else if (typeof r === "object" && r.$$typeof) {
            r.$$typeof ? (element = r) : (options = r);
        } else if (typeof r === "function") {
            clickSpinner = r;
        } else if (typeof r === "string") {
            text = r;
        } else if (typeof r === "boolean") {
            show = r;
        }
        return true;
    })
    const spinner = show ? (
        <div className="pf tlrb0 bgcf95 z9999" onClick={clickSpinner}>
            <div className="tl50 pf tt">
                <CircularProgress {...options} />
                {text}
                {element}
            </div>
        </div>
    ) : null;
    const offSpinner = () => {
        ReactDOM.render(
            null,
            document.getElementById("root-spinner")
        );
        clearTimeout(timeRemove)
    };
    const timeRemove = timeOff ? setTimeout(offSpinner, timeOff) : timeOff;
    !show && clearTimeout(timeRemove)
    ReactDOM.render(
        spinner,
        document.getElementById("root-spinner")
    );
    return spinner;
}