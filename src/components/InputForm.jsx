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
import { useNavigate } from 'react-router-dom';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const InputForm = () => {
    const navigate = useNavigate();
    const [params, setParams] = useState({
        TableName: 'agents', // 替换为您的表名
        Item: {
            'company-id': '',
            'company-name': '',
            'legal-representative': '',
            'contact': '',
            'registered-address': '',
            'operation-address': '',
            'isAbnormal': false,
            'sendEmail': false,
            'website': '',
            'email': '',
            'mobile': '',
            'wechat': '',
            'know-PHE': '',
            'remark': ''
        }
    });

    const [IDs, setIDs] = useState([]);
    const [isAbnormal, setIsAbnormal] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);

    async function writeToAws() {
        // 检查 'company-id' 是否为空
        if (params.Item['company-id'] === '') {
            alert('公司ID不能为空');
            return;
        }
        try {
            await dynamodb.put(params).promise();
            navigate('/inputsuccess');
        } catch (error) {
            console.error('写入数据时出错:', error);
        }
    };

    const loadData = async () => {
        let IdsCopy = [...IDs];
        try {
            const result = await fetchAllData('agents');
            result.map(item => (IdsCopy.push(item['company-id'])));
            setIDs(IdsCopy);
        } catch (error) {
            console.error('加载数据时出错:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 阻止表单的默认提交行为
        // 更新 isAbnormal 和 sendEmail 字段
        setParams(prevState => ({
            ...prevState,
            Item: {
                ...prevState.Item,
                'isAbnormal': isAbnormal,
                'sendEmail': sendEmail
            }
        }));
        writeToAws();
    };

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
        // 更新params中的'company-id'字段
        setParams(prevState => ({
            ...prevState,
            Item: {
                ...prevState.Item,
                'company-id': id
            }
        }));
    };

    const handleCheckboxChange = (event) => {
        setIsAbnormal(event.target.checked);
    };

    const handleSendEmail = (event) => {
        setSendEmail(event.target.checked);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Container maxWidth="xl">
                <Paper
                    elevation={3}
                    sx={{ m: 4, padding: 1 }}
                >
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <TextField
                                id='company-id'
                                label='统一社会信用代码'
                                required
                                sx={{ m: 1, width: '30%' }}
                                onChange={handleIdChange}
                            ></TextField>
                            <TextField
                                id='company-name'
                                label='公司名称'
                                required
                                sx={{ m: 1, width: '30%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'company-name': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <TextField
                                id='legal-representative'
                                label='法定代表人'
                                required
                                sx={{ m: 1, width: '20%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'legal-representative': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <TextField
                                id='contact'
                                label='联系人'
                                sx={{ m: 1, width: '20%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'contact': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <TextField
                                id='registered-address'
                                label='注册地址'
                                required
                                sx={{ m: 1, width: '30%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'registered-address': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <TextField
                                id='operation-address'
                                label='实际地址'
                                required
                                sx={{ m: 1, width: '30%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'operation-address': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <div>
                                <FormControlLabel
                                    control={<Checkbox checked={isAbnormal} onChange={handleCheckboxChange} sx={{ m: 1 }} />}
                                    label="经营异常"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={sendEmail} onChange={handleSendEmail} sx={{ m: 1 }} />}
                                    label="已发邮件"
                                />
                            </div>
                            <TextField
                                id='website'
                                label='网站'
                                required
                                sx={{ m: 1, width: '40%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'website': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <TextField
                                id='email'
                                label='email'
                                required
                                sx={{ m: 1, width: '40%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'email': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <Autocomplete
                                id='provice-city'
                                multiple
                                options={proviceCity}
                                sx={{ m: 1, width: '80%' }}
                                renderInput={(params) => <TextField {...params} label="省/市" />}
                                onChange={(e, value) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'provice-city': value
                                    }
                                }))}
                            />
                            <TextField
                                id='mobile'
                                label='手机'
                                sx={{ m: 1, width: '80%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'mobile': e.target.value
                                    }
                                }))}
                            ></TextField>
                            <Autocomplete
                                id='wechat'
                                options={wechat}
                                sx={{ m: 1, width: '80%' }}
                                required
                                renderInput={(params) => <TextField {...params} label="微信联系情况" />}
                                onChange={(e, value) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'wechat': value
                                    }
                                }))}
                            />
                            <Autocomplete
                                id='know-PHE'
                                options={knowPHE}
                                sx={{ m: 1, width: '80%' }}
                                required
                                renderInput={(params) => <TextField {...params} label="了解PHE程度" />}
                                onChange={(e, value) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'know-PHE': value
                                    }
                                }))}
                            />
                            <TextField
                                id='remark'
                                label='备注'
                                multiline
                                sx={{ m: 1, width: '80%' }}
                                onChange={(e) => setParams(prevState => ({
                                    ...prevState,
                                    Item: {
                                        ...prevState.Item,
                                        'remark': e.target.value
                                    }
                                }))}
                            ></TextField>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ m: 1, width: '20%' }}>
                                提交
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </>
    );
}

export default InputForm;