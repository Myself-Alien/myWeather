import moment from "moment";
import '../App.css';

const Clock = () => {
    const today = moment();
    const formatDay = today.format('dddd');
    const formatDate = today.format(', Do MMMM, YY')
    return(
        <>
        <div className="clock">
            <b>{formatDay}</b>{formatDate}
        </div>
        </>
    );
}

export default Clock;