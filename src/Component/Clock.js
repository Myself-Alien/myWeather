import moment from "moment";
const Clock = () => {
    const today = moment();
    const formatDay = today.format('dddd');
    const formatDate = today.format(', Do MMMM, YY')
    return(
        <>
        <b>{formatDay}</b>{formatDate}
        </>
    );
}

export default Clock;