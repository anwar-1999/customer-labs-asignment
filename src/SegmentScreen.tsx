import {
    DownOutlined,
    LeftOutlined,
    MinusOutlined
} from '@ant-design/icons';
import React, {
    useEffect,
    useState
} from 'react';
import "./SegmentScreen.scss"
import {
    Button,
    Drawer,
    Form,
    Input,
    Select,
    message
} from 'antd';

export default function SegmentScreen(props: any) {

    const [isVisibleChat, setVisibleChat] = useState<any>(false);
    const [dropdownArray, setdropdownArray] = useState<any>([]);
    const [segmentObject, setSegmentObject] = useState<any>({
        "segment_name": null,
        "schema": [{}]
    });
    const [insideSchema, setinsideSchema] = useState<any>({
    });
    const [dropdownValue, setdropdownValue] = useState<any>(null);
    const [outsideSchema, setoutsideSchema] = useState<any>({
    });
    const [form]: any = Form.useForm();
    const [objSchema, setobjSchema] = useState<any>([]);
    const [objSchemafin, setobjSchemafin] = useState<any>([]);

    useEffect(() => {
        if (isVisibleChat == true) {
            setSegmentObject({})
            setobjSchema([])
            setobjSchemafin([])
            setdropdownValue(null);
        }

    }, [isVisibleChat])
  

    const segmentContentView = () => {
        try {
            return (
                <div>
                    <div className='segment-content'>
                        <span className='left-icon'>
                            <LeftOutlined />
                        </span>
                        <span className='segment-title'>
                            View Audience
                        </span>
                    </div>
                    <div className='save-segment-button'
                        onClick={() => setVisibleChat(true)}
                    >
                        Save segment
                    </div>
                </div>
            )
        }
        catch (error) {
            console.log("Error in segmentContentView :: ", error)
        }
    }
    const saveFinal = () => {
        if (typeof segmentObject?.schema[0] != 'object' && segmentObject?.segment_name != null) {
            setSegmentObject({ ...segmentObject, "schema": objSchemafin })
            setVisibleChat(!isVisibleChat)
        } else {
            message.error("Please Fill All the Values")
        }
    }

    const saveCancelFuntions = () => {
        return (
            <div className='save-cancel mgTB15'>
                <div>
                    <Button
                        className='save'
                        onClick={() =>
                            saveFinal()}

                    >
                        Save the Segment
                    </Button>
                </div>
                <div >
                    <Button
                        className='cancel'
                        onClick={() => setVisibleChat(!isVisibleChat)}
                    >
                        Cancel
                    </Button>
                </div>
            </div >
        )
    }

    let dropDownData: any = [
        {
            id: 0,
            name: "First Name"
        },
        {
            id: 1,
            name: "Last Name"
        },
        {
            id: 2,
            name: "Gender"
        },
        {
            id: 3,
            name: "Age"
        },
        {
            id: 4,
            name: "Account Name"
        },
        {
            id: 5,
            name: "City"
        },
        {
            id: 6,
            name: "State"
        },

    ]
    const selectOnchange = (e: any) => {
        setdropdownValue(dropDownData[e]?.name)
        setinsideSchema(
            e == 0 ?

                { "first_name": dropDownData[e]?.name }
                :
                e == 1 ?
                    { "last_name": dropDownData[e]?.name }
                    :
                    e == 2 ?
                        { "gender": dropDownData[e]?.name }
                        :
                        e == 3 ?
                            { 'age': dropDownData[e]?.name }
                            :
                            e == 4 ?
                                { 'account_name': dropDownData[e]?.name }
                                :
                                e == 5
                                    ?
                                    { 'city': dropDownData[e]?.name }
                                    :
                                    { 'state': dropDownData[e]?.name }

        )
        setoutsideSchema(
            e == 0 ?

                { id: dropDownData[e]?.name }
                :
                e == 1 ?
                    { id: dropDownData[e]?.name }
                    :
                    e == 2 ?
                        { id: dropDownData[e]?.name }
                        :
                        e == 3 ?
                            { id: dropDownData[e]?.name }
                            :
                            e == 4 ?
                                { id: dropDownData[e]?.name }
                                :
                                e == 5
                                    ?
                                    { id: dropDownData[e]?.name }
                                    :
                                    { id: dropDownData[e]?.name }

        )
    }

    const dropDownFunctions = () => {
        try {
            return (
                <div className='d-flex'>
                    <div className='d-flex-ac'>
                        {circle("gray")}
                    </div>

                    <Select
                        suffixIcon={<DownOutlined />}
                        className='select'
                        optionFilterProp="children"
                        placeholder="Add schema to segment"
                        onChange={(e: any) => selectOnchange(e)}
                        value={dropdownValue}
                    >
                        {dropDownData?.map((x: any, index: any) =>
                            <Select.Option key={`${index}`} value={x?.id}>{x?.name}</Select.Option>
                        )}
                    </Select>
                    <div className='remove-dropdown'
                    >
                        <MinusOutlined className='minus' />
                    </div>
                </div>
            )
        }
        catch (error) {
            console.log('Error in dropDownFunctions :: ', error)
        }

    }

    const circle = (text: any) => {
        return (
            <div className='circle'
                style={{ color: text, background: text }}
            >
            </div>
        )
    }




    const addnewSchema = () => {
        if (dropdownValue) {
            {
                setdropdownArray([...dropdownArray, dropdownArray + 1])
            }
            setSegmentObject({ ...segmentObject, "schema": insideSchema })
            setobjSchema([...objSchema, outsideSchema])
            setobjSchemafin([...objSchemafin, insideSchema])
            setdropdownValue(null)
        }

    }
    const drawerContainer = () => {
        try {
            return (
                <div className='segment'>
                    <div className='title'>
                        Enter the Name of the Segment
                    </div>
                    <Input
                        placeholder='Name of the Segment'
                        value={segmentObject?.segment_name}
                        onChange={(e: any) => setSegmentObject({ ...segmentObject, "segment_name": e.target.value })}
                    />
                    <div className='instructons'>
                        To save your segment,you need to add the schemas to build the query
                    </div>
                    <div className='traits'>
                        <div className='trait-one'>
                            {circle("green")}

                            <div className='user-traits'>
                                - User Traits
                            </div>
                        </div>
                        <div className='trait-two'>
                            {circle("red")}
                            <div className='group-traits'>
                                - Group Traits
                            </div>
                        </div>
                    </div>
                    {objSchema?.length > 0 &&
                        <div className='blue-box'>
                            {(objSchema || []).map((x: any, index: any) => {
                                return (
                                    <div>
                                        <div className='d-flex mgTB15'>
                                            <div className='d-flex-ac'>
                                                {circle("gray")}
                                            </div>

                                            <Select
                                                suffixIcon={<DownOutlined />}
                                                className='select'
                                                placeholder={'select'}
                                                value={x?.id}
                                            >
                                                {dropDownData?.map((x: any, index: any) =>
                                                    <Select.Option key={`${index}`} value={x?.id}>{x?.name}</Select.Option>
                                                )}
                                            </Select>
                                            <div className='remove-dropdown'>
                                                <MinusOutlined className='minus'
                                                />
                                            </div>
                                        </div>                                </div>
                                )
                            }
                            )}

                        </div>
                    }
                    {dropDownFunctions()}
                    <div className={dropdownValue ? 'add-new-schema' : 'add-new-schema-not-allowed'}
                        onClick={() => addnewSchema()}
                    >
                        + Add new schema
                    </div>
                    {saveCancelFuntions()}
                </div>
            )
        } catch (error) {
            console.log("Error in drawerContainer :: ", error)
        }
    }
    const SegmentDrawerView = () => {
        try {
            return (
                <div>
                    <Drawer
                        className='drawer-container'
                        width={450}
                        title="Saving Segment"
                        placement="right"
                        onClose={() => setVisibleChat(!isVisibleChat)}
                        open={isVisibleChat}
                        closeIcon={<LeftOutlined />}
                    >
                        <Form
                            id="form"
                            form={form}
                            autoComplete="off"
                            noValidate
                        >
                            {drawerContainer()}
                        </Form>
                    </Drawer>
                </div>
            )
        } catch (error) {
            console.log("Error in SegmentDrawerView :: ", error)
        }
    }
    return (
        <div className='segment-container'>
            {segmentContentView()}
            {SegmentDrawerView()}
        </div>
    );
}

