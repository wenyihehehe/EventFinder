import style from './index.module.css';

export default function MapMarker({text}){
    return (
        <div>
            <div className={`${style.marker}`}>
            </div>
        </div>
    );
}