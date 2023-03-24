import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Date from "./Components/Date";
import FileUpload from "./Components/FileUpload";
import MultiChoice from "./Components/MultiChoice";
import ShortAns from "./Components/ShortAns";
import SingleChoice from "./Components/SingleChoice";
import './Components/CreateForm.css'
import HandleSaveForm from "./Components/HandleSaveForm";
import formApi from "./Components/API/FormData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
// import DeleteIcon from '@mui/icons-material/Delete';
const counts = {
   
    Date: 0,
    SingleCorrect: 0,
    MultipleCorrect: 0,
    Text: 0,
    longAns: 0,
    FileUpload: 0
} 


const CreateForm = (props) => {
    const [dialog, setDialog] = useState("");
    const [formConfiguration, setFormConfiguration] = useState([]);

    //const navigate = useNavigate();
    //const location = useLocation();
   // const { email } = useParams();

    const [showPreview, setShowPreview] = useState(false);
    const [fields, setFields] = useState([])
    const [name, setName] = useState("")
    const [allowDuplicate, setAllowDuplicate] = useState(false);
    
    //state for expiry
     const [expiry, setExpiry] = useState("");

    // const accessToken = localStorage.getItem(email);

    var formID = ""

    // if (location.state) formID = location.state.formID


    const Components ={
        "Date":Date,
        "SingleCorrect":SingleChoice,
        "MultipleCorrect":MultiChoice,
        "Text":ShortAns,
        "FileUpload":FileUpload,
    }


    var elements = [
        { name: "SingleCorrect" },
        
        { name: "MultipleCorrect" },
        { name: "Text" },
        { name: "Date" },
        { name: "FileUpload" },
    ];

    const setComponentList = (type, id, label, options) => {

        const Comp =Components[type];

        setFields((oldFields) => ([
            ...oldFields,
            <Comp   id={id}
            label={label}
            options={options}
            addFormConfiguration={addFormConfiguration}/>
        ]));
    }

    const renderForm = (formData) => {
        setName(formData.formName)
        setAllowDuplicate(formData.allowDuplicate)
        setFields([])

        formData.fields.map((form) => {
            setComponentList(form.type, form.id, form.label, form.options)
        });
    }

    //  const getFormData = async () => {
    //     const apiRes = await formApi.get("/getFormByID", {
    //         params: { formID: formID, email: email },
    //         headers: { 'authorization': accessToken }
    //     });

    //    if (apiRes.data.status === false) return setDialog("Something went wrong!");

    //     else {
    //         renderForm(apiRes.data.data);
    //     }
    // };

    useEffect(() => {
        // if (formID) {
        //     getFormData();
        // }
    }, [])

    const addFormConfiguration = (field) => {
        // console.log("f :",field)
        var objIndex = formConfiguration.findIndex(
            (obj) => obj.id === field.id
        );
        if (objIndex === -1) {
            formConfiguration.push(field);
        } else {
            formConfiguration[objIndex] = field;
        }
    };

    const handlePublish = async () => {
        console.log("formConfiguration :",formConfiguration)
       const res = await HandleSaveForm( formConfiguration, name,expiry, formID, allowDuplicate,setDialog);

        // if (res) {
        //     navigate(`/${email}/publish`, { state: { formID: res.formID } });
        // }
    };

    //Drag and drop handlers
    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("fieldID", id);
    };

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    const onDrop = (ev) => {
        ev.preventDefault();
        var type = ev.dataTransfer.getData("fieldID");
        var label = ""
        // console.log(counts)
        // console.log(type)

        var id = `${type}_${counts[type]}`
        var options = ['option 1']

        setComponentList(type, id, label, options)
        counts[type]=counts[type]+1;
    };

    const handleDeleteField = (id) => {
        
        console.log(id)
        console.log(fields[0].props.id)
        setFields((prevFields) =>
          prevFields.filter((field) => field.props.id !== id)
        );
        // console.log(fields)
      };
    var allElements = [];

    elements.forEach((el) => {
        allElements.push(
            <button
                className="elements-btn"
                key={el.name}
                ex ={el.expiry}
                onDragStart={(e) => onDragStart(e, el.name)}
                draggable
            >
                {el.expiry }
                {el.name}
            </button>
        );
    });

    return (
        <div>
            {/* <Navbar email={email} /> */}

            {/* {showPreview ? <div> <Preview setShowPreview={setShowPreview} formConf={formConfiguration} /> </div> */}
                : <div className="container-root1">
                    <div className="container-drag">
                        <div className="task-header">
                            <h3>List of available question types</h3>
                        </div>

                        <div
                            className="elementList"
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => {
                                onDrop(e);
                            }}
                        >
                            {allElements}
                        </div>
                    </div>

                    {/* right container */}
                    <div className="container-right" id="container-right">
                        <div className="task-header">
                            <h2>Form</h2>
                        </div>
                        {/* <Heading name={name} key={name} addFormName={setName} /> */}
                          <form className="form--build">
                            <input 
                            type="text"
                            placeholder="survey title"
                            className="form--input"
                            />
                            
                            <input 
                              type="date"
                              placeholder="Expiry Date"
                              className="form--input"
                              />
                          </form>
                          
                        <div style={{ marginBottom: "50px" }} className="element-name">
                            {/* <label className="element-input element-gap element-border-style">Enter Your Email</label> */}
                            
                            {/* <input className="element-input element-gap element-border-style" placeholder="user email here" /> */}
                            {/* <style={{ width: "100%" }}> */}
                        </div>

                        {/* <ol>
                            {fields.map((el, index) => {
                                return (
                                  
                                    <li className="added-elements" key={index}>
                                        {el}  
                                    </li>
                                );
                            })}
                        </ol> */}

                        <div
                            className="droppable-area" 
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => onDrop(e)}
                            id="target-div">
                             
                                { <div className="drag-text">Build your survey</div> && fields.length <=0 && <img src='https://global-uploads.webflow.com/6213bb84f2aee7f53db76c33/637f65ee2c1ee3a17d7f3075_You%20can%20build%20a%20startup%20culture%20that%20actually%20has%20a%20legacy%2C%20even%20if%20you%27re%20remote-first.png' />
                                  }
                                  
                                      <ol>
                                        {fields.map((el, index) => {
                                            return (
                                                 
                                                <li className="added-elements" key={index}>
                                                    {el}  
                                                  <button className=".publish-btn-div"  onClick={() => handleDeleteField(el.props.id)}>  <FontAwesomeIcon icon={faTrash} /></button>
                                                </li>
                                            );
                                        })}
                                    </ol>
                            
                        </div>

                        <div>
                            {/* <label>Allow Duplicate</label>
                            <input type="checkbox" checked={allowDuplicate} onChange={(e) => { setAllowDuplicate(e.target.checked) }}></input> */}
                        </div>

                        <div style={{ marginTop: "30px", marginBottom:"30px" }}>
                            <h4 style={{ color: "red",textAlign:"center" }}>{dialog}</h4>
                        </div>

                        <div className="publish-preview-btn">
                            <div className="publish-btn-div">
                                <button className="publish-btn" onClick={handlePublish}>
                                    Publish{" "}
                                </button>
                            </div>

                            <div className="publish-btn-div">
                                <button className="publish-btn" onClick={(e) => {
                                    setShowPreview(true);
                                }}>
                                    Share  🔗{" "}
                                </button>

                            </div>
                            <div className="publish-btn-div">
                            <button className="publish-btn" onClick={(e) => {
                                    setShowPreview(true);
                                }}>
                                    Save as Draft{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}


export default CreateForm;