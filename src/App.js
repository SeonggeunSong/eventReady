import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Form, Input, Select, Checkbox, Divider, Table } from 'antd';
import {tableColumns, tableData} from './ui_table';

import mainUI from './eventReady_Title.jpg';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

// Test용

// Title Image 에 대한 Style 정의
const containerStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'gray',
};

const MainimageStyle = {
  width: 'auto',  // auto로 지정해야 화면 Size 변경에 적용됨
  height: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // position: 'absolute',
  objectPosition: 'center',
  display: 'block',
  margin: 0,
  padding: 0,
  border: 'none',
};

// Event type Obj
const ETYPE_OBJ = {
  initialModelEvent : 'Initial Model Event',
  mrModelEvent : 'MR Event',
  modifyModelEvent : 'Modify Model Event',
  productChange : 'Product Change',
};

const App = () => {
  const formRef = React.useRef();
  const titleInputRef = React.useRef(); // {currnent : null}


  function onFinish(values){
    console.log(values);
  };

  function onReset(){
    setInputTitleValue('');
    formRef.current?.resetFields();
  };

  function onFill(){
    /*formRef.current?.setFieldsValue({
      note: 'Hello world!',
      eventType: 'Event Tpye',
    });*/
  };

  function searchHistory(){
    //jiraHistory();
    console.log("Test용");
  }

  let formStyleLong = {
    width: '600px'
  };
  let formStyleShort = {
    width: '250px'
  };


// Check Box default 부분과 Define 부분
   const pmActivity = [
    { label: '정적 분석 요청',  value: 'checkOpation1',},
    { label: 'RIT 요청',  value: 'checkOpation2', },
    { label: 'PM 변경점 업데이트', value: 'checkOpation3',  },
    { label: 'SU 파일 업로드', value: 'checkOpation4',},
    { label: '생산성검증',  value: 'checkOpation5', },
    { label: 'eMMC Test 파일생성', value: 'checkOpation6',  },
    { label: '화질 변경 사항', value: 'checkOpation7', },
    { label: '음질 변경 사항',  value: 'checkOpation8', },
    { label: '서버 대응 적용 일정 확인', value: 'checkOpation9', },
    { label: 'SU 문구 요청',  value: 'checkOpation10', },
    { label: '법인 Pre Test 가이드', value: 'checkOpation11',  },
    { label: '조정규격서', value: 'checkOpation21', disabled: true },
    { label: 'Manual 요청',  value: 'checkOpation22', disabled: true },
    { label: 'eStreamer 요청', value: 'checkOpation23', disabled: true  },
    { label: 'Mini-BAT 결과', value: 'checkOpation24', disabled: true  },
  ];

  const pmActivityWithDisabled = [

  ];

  const initialModelPMActivityDefault=[
    'checkOpation1','checkOpation2','checkOpation3', 'checkOpation4','checkOpation5','checkOpation6',
  ]; 
  const modifyModelPMActivityDefault=[
    'checkOpation1','checkOpation2',
  ]; 
  const mrModelPMActivityDefault=[
    'checkOpation1','checkOpation2','checkOpation3', 'checkOpation4',
  ]; 
  const changeModelPMActivityDefault=[
    'checkOpation1',
  ]; 

// Input Select 변경 시 PM Activity 에 대해 Check Box 연동하는 부분
  const [selectEventType, setSelectEventType]= useState('initialModelEvent');
  const [selectPMActivity, setSelectPMActivity]= useState(changePMActivityDefault(selectEventType));
  const [inputTitleValue, setInputTitleValue]= useState('');

  function changePMActivityDefault(value){
    switch (value) {
      case 'initialModelEvent':
        return initialModelPMActivityDefault;
      case 'mrModelEvent':
        return modifyModelPMActivityDefault;
      case 'modifyModelEvent':
        return mrModelPMActivityDefault;
      case 'productChange':
        return changeModelPMActivityDefault;
      default:
        break;
    }
  };

  function onhandleSelectChange(event){ 
  
    setSelectEventType(event);
    setSelectPMActivity(changePMActivityDefault(event));

    let eTypeValue = '[' + ETYPE_OBJ[event] + ']';
    let titleValue = `${inputTitleValue}`;
    
    // 기존것 걸러내기
    Object.keys(ETYPE_OBJ).forEach((key) => {
      let temp_obj_value = '[' + ETYPE_OBJ[key] + ']';
      if(titleValue.includes(temp_obj_value)){
        titleValue = titleValue.replace(temp_obj_value, '').trimStart();
      }
    });

    titleValue = eTypeValue +' '+ titleValue;
    setInputTitleValue(titleValue); 
    // input tag에 쓰기
    formRef.current?.setFieldsValue({
      eventTitle: titleValue,
    });
    // 포커스
    titleInputRef.current.focus();
  };

  useEffect(() => {
    console.log('Event Type is = ', selectEventType); 
    console.log('input Title is = ', inputTitleValue); 
  },[selectEventType][inputTitleValue]);  


// Check Box 개발 변경 시 PM Activity 활성화 /비활성화 하는 함수  
  function onCheckboxChange(checkedValues){
    setSelectPMActivity(checkedValues);
  };

  const onInputEventTitle =(e) => {
    setInputTitleValue(e.target.value);
  }  

  return (
    // 전체 Form에 대한 Style 정의
    <Form       
      {...layout} 
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{
        maxWidth: 1200,
       // padding: '10px 0',
       // backgroundColor: 'red',
      }}
    >
      <div style={containerStyle}>      
        <img src={mainUI} style ={MainimageStyle} /> 
      </div>

      <Form.Item style={{padding: '20px 0 0 0' }}
        name="eventTitle"
        label="Event Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
          ref = {titleInputRef}
          style = {{formStyleLong}}
          placeholder = "Platform/SoC Name/시험명/Branch (Example - webOS22/O22n/인정시험1차/manas)"
          value = {inputTitleValue}
          onChange = {onInputEventTitle}
        />
      </Form.Item>

      <Form.Item 
        name="eventType"
        label="Event Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          style={{formStyleLong}}
          placeholder="Select Event Type"
          value = {selectEventType}
          onChange={onhandleSelectChange} 
          allowClear
          
        >
          <Option value="initialModelEvent">Initial Model Event</Option>
          <Option value="mrModelEvent">MR Event</Option>
          <Option value="modifyModelEvent">Modify Model Event</Option>
          <Option value="productChange">Product Change</Option>
        </Select>
      </Form.Item>
        
      <Form.Item 
        name="detailActivity"
        label="PM Activity"
        rules={[
          {
            required: true,
          },
        ]}
      >  
        <div>
          <Checkbox.Group 
            options={pmActivity} 
            defaultValue = {selectPMActivity}  
            value = {selectPMActivity}
            onChange={onCheckboxChange} />
          <br />
        </div>
      </Form.Item>
      <Divider/>

      <Form.Item {...tailLayout}  >
        <div>
          <Button type="primary" htmlType="submit" onClick={onReset} >
            Make Activity
          </Button>
          <Button htmlType="button" style ={{margin : '20px'}} onClick={onReset}>
            Reset
          </Button>
          <Button htmlType="button" style ={{margin : '20px'}}onClick={searchHistory}>
            Search History
          </Button>
        </div>
      </Form.Item>

      <Divider/>
        {selectPMActivity.map((activity, idx) => {
          for(let i=0; i<pmActivity.length;i++){
            if(pmActivity[i].value.includes(activity)){
              return <>
                <Form.Item name={pmActivity[i].label} label={pmActivity[i].label}>
                  <Input style = {{formStyleShort}}  placeholder = "세부 내용 입력하세요" />
                </Form.Item>
                </>;
            }
          }          
        })}
      
      <Divider/>
      <Table columns={tableColumns} dataSource={tableData} />

     </Form>
  );
};
export default App;