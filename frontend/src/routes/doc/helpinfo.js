import { useParams, Navigate } from "react-router-dom";
import { getHelpData } from "../../data/helpdata"

export default function HelpInfoPage() {
    let params = useParams();
    let data = getHelpData(parseInt(params.helpId, 10));

    return data ? (
        <main className="row justify-content-center mx-auto" style={{height:'90vh'}}>
        <div className="mt-5 pb-5" style={{width:'70vw'}}>
            <p className="smallText subTextColor">DOCUMENT</p>
            <p className="bigText tonedTextOrange mb-3">{data.title}</p>
            <div>
                {data.data}
            </div>
        </div>
        </main>) 
        : 
        (<Navigate to="/notfound" replace />)
    ;
}