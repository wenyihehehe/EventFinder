import { Website } from "../../config/domain";
import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <footer className="pb-2 pt-4 detailMainText tonedTextDark backgroundWhite">
            <div className="row mx-auto" style={{width:'80%'}}>
                <div className="col">
                    <img className="logo" src={`${Website}/logo.png`} alt="logo"></img>
                    <p className="mt-2">Find the events happening aroung you with just a click!</p>
                </div>
                <div className="col">
                    <p className="headingText importantTextColor">About EventFinder</p>
                    <ul className="list-unstyled ">
                        <li className="mb-2"><Link to='doc/help/1' target="_blank" className="detailSubText">How to create event</Link></li>
                        <li className="mb-2"><Link to='doc/help/14' target="_blank" className="detailSubText">How to register to an event</Link></li>
                        <li className="mb-2"><Link to='doc/help' target="_blank" className="detailSubText">Help Centers</Link></li>
                        <li className="mb-2"><Link to='doc/faq' target="_blank" className="detailSubText">FAQ</Link></li>
                    </ul>
                </div>
                <div className="col">
                    <p className="headingText importantTextColor">Follow us on</p>
                    <ul className="list-unstyled ">
                        <li className="mb-2 detailSubText"><i className="fab fa-twitter"></i>&nbsp;&nbsp;Twitter</li>
                        <li className="mb-2 detailSubText"><i className="fab fa-youtube"></i>&nbsp;&nbsp;Youtube</li>
                        <li className="mb-2 detailSubText"><i className="fab fa-facebook"></i>&nbsp;&nbsp;Facebook</li>
                        <li className="mb-2 detailSubText"><i className="fab fa-instagram"></i>&nbsp;&nbsp;Instagram</li>
                    </ul>
                </div>
                <div className="col">
                    <p className="headingText importantTextColor">Other</p>
                    <ul className="list-unstyled ">
                        <li className="mb-2"><Link to='doc/privacypolicy' target="_blank" className="detailSubText">Privacy Policy</Link></li>
                        <li className="mb-2"><Link to='doc/termsofservice' target="_blank" className="detailSubText">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div className="mx-auto" style={{width: "fit-content"}}>
                <p className="subTextColor detailSubText">Copyrights © 2022 EventsFinder (Tang Wen Yi).    All rights reserved.</p>
            </div>
        </footer>
    );
}