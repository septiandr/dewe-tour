import './footer.css'
function Footer(){
    return(
        <div id="footer">
            <p>Copyright @ 2020 Dewe Tour - Your Name - NIS. All Rights reserved</p>
            <img src ={ require("./assets/leaf.png").default } alt="leaf" />
        </div>
    )
}
export default Footer