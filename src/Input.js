import { Module } from './Module';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileAlt, faFileAudio, faFileVideo, faFileImage, faTimesCircle } from "@fortawesome/free-solid-svg-icons"

function sizeString(bytes) {
    if (bytes < 2 ** 10) {
        return Math.round(bytes * 10) / 10 + " B";
    } else if (bytes < 2 ** 20) {
        return Math.round(bytes / 2 ** 10 * 10) / 10 + " KiB";
    } else if (bytes < 2 ** 30) {
        return Math.round(bytes / 2 ** 20 * 10) / 10 + " MiB";
    } else if (bytes < 2 ** 40) {
        return Math.round(bytes / 2 ** 30 * 10) / 10 + " GiB";
    } else if (bytes < 2 ** 50) {
        return Math.round(bytes / 2 ** 40 * 10) / 10 + " TiB";
    } else if (bytes < 2 ** 60) {
        return Math.round(bytes / 2 ** 50 * 10) / 10 + " PiB";
    } else if (bytes < 2 ** 70) {
        return Math.round(bytes / 2 ** 60 * 10) / 10 + " EiB";
    } else if (bytes < 2 ** 80) {
        return Math.round(bytes / 2 ** 70 * 10) / 10 + " ZiB";
    } else if (bytes < 2 ** 90) {
        return Math.round(bytes / 2 ** 80 * 10) / 10 + " YiB";
    }
}

export function Input(props) {
    var icon = faFile;
    if (props.file.type.includes("text/")) {
        icon = faFileAlt;
    } else if (props.file.type.includes("audio/")) {
        icon = faFileAudio;
    } else if (props.file.type.includes("video/")) {
        icon = faFileVideo;
    } else if (props.file.type.includes("image/")) {
        icon = faFileImage;
    }

    return <Module name={"Input"} id={1} dragHandler={props.dragHandler}>
        <div className="file">
            <FontAwesomeIcon icon={icon} style={{ fontSize: 50, marginRight: 10 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{props.file.name}</span>
                    <span style={{ fontSize: 15 }}>{sizeString(props.file.size)}</span>
                </div>
                {props.removeAction &&
                    <FontAwesomeIcon className="remove-button" icon={faTimesCircle} onClick={() => props.removeAction(props.file.name)} />
                }
            </div>
        </div>
    </Module>
}