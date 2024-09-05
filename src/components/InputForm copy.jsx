import AWS from '../components/AWS'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import fetchAllData from './fetchAllData';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import proviceCity from './proviceCity';
import wechat from './wechat';
import knowPHE from './knowPHE';





const dynamodb = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'agents', // 替换为您的表名
    Item: {
    'company-id': 'dsd111w2s1aaa23sdsdsdsdsd',
    'phone': [{'phone-number': '1323433434', 'wechat': true}],
    'add':'上海'
    }
};

function InputForm() {
    const [IDs, setIDs] = useState([]);
    const [checked, setChecked] = useState(false);
    const [isAbnormal, setIsAbnormal] = useState(false); 
    const [sendEmail, setSendEmail] = useState(false); 

    async function writeToAws() {
        try {
            await dynamodb.put(params).promise();
            alert('数据已成功写入 DynamoDB');
          } catch (error) {
            console.error('写入数据时出错:', error);
          }
        };
    
    const loadData = async () => {
        let IdsCopy = [...IDs]
        try {
            const result = await fetchAllData('agents');
            result.map(item => (IdsCopy.push(item['company-id'])))
            setIDs(IdsCopy);
        } catch (error) {
            console.error('加载数据时出错:', error);
        }
    };

    function handleSubmit() {
        console.log('handleSubmit')
    }

    const handleIdChange = (e) => {
        const id = e.target.value;
        const inputField = e.target;
        if (IDs.includes(id)) {
            inputField.style.border = '2px solid red';
            const warningText = document.createElement('div');
            warningText.textContent = '该ID已存在，请输入不同的ID。';
            warningText.style.color = 'red';
            inputField.parentNode.insertBefore(warningText, inputField.nextSibling);
        } else {
            inputField.style.border = '1px solid #ccc';
            const warningText = inputField.nextSibling;
            if (warningText && warningText.textContent === '该ID已存在，请输入不同的ID。') {
                warningText.remove();
            }
        }
    };

    const handleCheckboxChange = (event) => { // 新增处理函数
        setIsAbnormal(event.target.checked);
    };

    const handleSendEmail = (event) => {
        setSendEmail(event.target.checked);
    };

    useEffect(() => {
        loadData();
    },[])

    return (
        <>
            <Container maxWidth="xl">
                <Paper
                    elevation={3}
                    sx={{m:4, padding:1}}
                >
                    <form>
                        <Box>
                            <TextField
                                id='company-id'
                                label='统一社会信用代码'
                                required
                                sx={{m:1, width: '30%'}}                       
                            ></TextField>  
                            <TextField
                                id='company-name'
                                label='公司名称'
                                required
                                sx={{m:1, width: '35%'}}                        
                            ></TextField>  
                            <TextField
                                id='legal-representative'
                                label='法定代表人'
                                required
                                sx={{m:1, width: '20%'}}                        
                            ></TextField>
                            <TextField
                                id='contact'
                                label='联系人'
                                sx={{m:1, width: '80%'}}                        
                            ></TextField>         
                            <TextField
                                id='registered-address'
                                label='注册地址'
                                required
                                sx={{m:1, width: '80%'}}                        
                            ></TextField>
                            <TextField
                                id='operation-address'
                                label='实际地址'
                                required
                                sx={{m:1, width: '80%'}}                        
                            ></TextField>
                            <div>
                                <FormControlLabel 
                                    control={<Checkbox checked={isAbnormal} onChange={handleCheckboxChange} sx={{m:1}}/>} 
                                    label="经营异常" 
                                />
                                <FormControlLabel 
                                    control={<Checkbox checked={sendEmail} onChange={handleSendEmail} sx={{m:1}}/>} 
                                    label="已发邮件" 
                                />
                            </div>
                            <TextField
                                id='website'
                                label='网站'
                                required
                                sx={{m:1, width: '80%'}}                        
                            ></TextField>
                            <TextField
                                id='email'
                                label='email'
                                required
                                sx={{m:1, width: '80%'}}                        
                            ></TextField> 
                            <Autocomplete
                                id='provice-city'
                                multiple
                                // disablePortal
                                options={proviceCity}
                                sx={{m:1, width:'80%'}}
                                renderInput={(params) => <TextField {...params} label="省/市" />}
                            />  
                            <TextField
                                id='mobile'
                                label='手机'
                                sx={{m:1, width: '80%'}}                        
                            ></TextField>  
                            <Autocomplete
                                id='wechat'
                                options={wechat}
                                sx={{m:1, width:'80%'}}
                                required
                                renderInput={(params) => <TextField {...params} label="微信联系情况" />}
                            /> 
                            <Autocomplete
                                id='know-PHE'
                                options={knowPHE}
                                sx={{m:1, width:'80%'}}
                                required
                                renderInput={(params) => <TextField {...params} label="了解PHE程度" />}
                            />
                            <TextField
                                id='remark'
                                label='备注'
                                multiline
                                sx={{m:1, width: '80%'}}                        
                            ></TextField>                      
                        </Box>
                    </form>
                </Paper>
            </Container>
            {/* <form onSubmit={handleSubmit}>
                <TextField
                    id="company-id"
                    label="Company ID"
                    variant="outlined"
                    onChange={handleIdChange}
                    required
                />
                <TextField
                    id="phone-number"
                    label="Phone Number"
                    variant="outlined"
                    required
                />
                <TextField
                    id="add"
                    label="Address"
                    variant="outlined"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form> */}
        </>
    );
    }

export default InputForm;