import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';



function AccordionPart({ content }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(content); // 设置数据
    }, []);

    return (
        <div>
            {data.map((item,index) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id={item.id}
                      >
                        <Typography variant='h5' component='h2'>{index + 1}.{item.AccordionSummary}</Typography>        
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.AccordionDetails}
                    </AccordionDetails>
                </Accordion>

            ))}
        </div>
    );
}

export default AccordionPart;


