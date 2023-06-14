import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HvacIcon from '@mui/icons-material/Hvac';
import BlindsIcon from '@mui/icons-material/Blinds';
import BlindsClosedIcon from '@mui/icons-material/BlindsClosed';

const ControlCard = (props) => {
    const { title, data } = props;
    const [status, setStatus] = useState(false);
    const [text, setText] = useState('');
    const [viewData, setViewData] = useState('');
    const [onIcon, setOnIcon] = useState(null);
    const [offIcon, setOffIcon] = useState(null);
    const AC = { on: "heating mode", off: "cooling mode" };
    const Lights = { on: 'on', off: 'off' };
    const Blinds = { on: 'shut', off: 'open' };

    const clickHandler = () => {
        setStatus(!status);

        if (title === 'AC') {
            setViewData(status ? AC.on : AC.off);
        } else if (title === 'Lights') {
            setViewData(status ? Lights.off : Lights.on);
        } else if (title === 'Blinds') {
            setViewData(status ? Blinds.on : Blinds.off);
        }
    }

    useEffect(() => {
        switch (title) {
            case 'AC':
                setText("AC is on:");
                setOnIcon(<AcUnitIcon />);
                setOffIcon(<HvacIcon />);
                setViewData(data < 20.0 ? AC.on : AC.off);
                data < 20.0 ? setStatus(false) : setStatus(true);
                break;

            case 'Lights':
                setText('Light status:');
                setOnIcon(<LightbulbIcon />);
                setOffIcon(<LightbulbCircleIcon />);
                let convertToDate = new Date(data);
                setViewData(convertToDate.getHours() < 18 && convertToDate.getHours() > 7 ? Lights.off : Lights.on);
                convertToDate.getHours() < 18 && convertToDate.getHours() > 7 ? setStatus(false) : setStatus(true);
                break;

            case 'Blinds':
                setText('Blinds status:');
                setOnIcon(<BlindsIcon />);
                setOffIcon(<BlindsClosedIcon />);
                let backToDate = new Date(data);
                setViewData(backToDate.getHours() < 18 && backToDate.getHours() > 7 ? Blinds.off : Blinds.on);
                backToDate.getHours() < 18 && backToDate.getHours() > 7 ? setStatus(true) : setStatus(false);
                break;

            default:
                break;
        }
    }, [title, data]);

    return (
        <button onClick={clickHandler} style={{ border: 'none', background: 'none', padding: 0 }}>
            <Card style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', border: '1px solid', borderRadius: '5px', width: "11vw", minHeight: '20vh' }}>
                {status ? onIcon : offIcon}
                <Card.Body style={{ padding: "20px" }}>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '4.5rem' }}>
                        {text} {viewData}
                    </Card.Text>
                </Card.Body>
            </Card>
        </button>
    );
}

export default ControlCard;
