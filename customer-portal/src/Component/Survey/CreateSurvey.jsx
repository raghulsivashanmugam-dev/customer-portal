import React, { useEffect, useState } from "react";
import "./createsurvey.css";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Grid, Tooltip, MenuItem } from "@mui/material"
import { Form } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import { changeSurvey, createQuestion, createSurvey } from "../../Store/actions";
import { DeleteRounded } from "@mui/icons-material";

function CreateSurvey() {
    const dispatch = useDispatch()

    const [surveyBool, setSurveyBool] = useState(false);
    const [surveyName, setSurveyName] = useState("");
    const [showQuestion, setQuestion] = useState(false)
    const [questionTitle, setQuestionTitle] = useState("")
    const [questionArr, setQuestionArr] = useState([])
    const [typeValue, setTypeValue] = useState("")
    const [getSurveyName, setSurveySaveName] = useState("");
    

    const surveyList = useSelector((state) => state.Survey.surveyList);
    const isSurveyCreate = useSelector((state) => state.Survey.isSurveyCreate);
    const isDeleteSurvey = useSelector((state) => state.Survey.isDeleteSurvey);
    const isQuestionCreate = useSelector((state) => state.Survey.isQuestionCreate);
    const questionList = useSelector((state) => state.Survey.questionList)

    function addSurveDialog() {
        setSurveyBool(true)
    }

    function closeSurveyDialog() {
        setSurveyBool(false)
    }

    function submitSurvey(event) {
        event.preventDefault()

        var data = [...surveyList]
        data.push({ name: surveyName })

        dispatch(createSurvey(data))

    }

    useEffect(() => {
        if (isSurveyCreate) {
            setSurveyBool(false)
            setSurveyName("")
            dispatch(changeSurvey())
        }
    }, [isSurveyCreate])

    useEffect(() => {
        if (isQuestionCreate) {
            setTypeValue("")
            setQuestionTitle("")
            setQuestionArr([])
            dispatch(changeSurvey())
        }
    }, [isQuestionCreate])

    function cancelQuestion() {
        setQuestion(false)
        setTypeValue("")
        setQuestionTitle("")
        setQuestionArr([])
    }

    useEffect(() => {
        if (isDeleteSurvey) {
            dispatch(changeSurvey())
        }
    }, [isDeleteSurvey])

    function deleteSurveyData(index) {
        var data = [...surveyList]
        data.splice(index, 1);
        dispatch(createSurvey(data))
    }

    function clickSurveyName(data){
        setSurveySaveName(data)
    }

    const RightSurveyList = React.memo(({ surveyList, deleteSurveyData, clickSurveyName }) => (
        <React.Fragment>
            {surveyList && surveyList.length > 0 && surveyList.map((value, index) => (
                <Box className={index != 0 ? "survey-list-cont mt-20" : "survey-list-cont"} key={index}>
                    <Grid container>
                        <Grid lg={9} onClick={() => clickSurveyName(value.name)}>
                            <Tooltip title={value.name}>
                                <div className="survey-text cursor-pointer">{value.name}</div>
                            </Tooltip>
                        </Grid>
                        <Grid lg={3}>
                            <DeleteRounded className="fs-20 delete-icon cursor-pointer" onClick={() => deleteSurveyData(index)} />
                        </Grid>
                    </Grid>

                </Box>
            ))}
            {surveyList.length == 0 && <div className="d-flex align-items-center justify-content-center" style={{ "height": "100%" }}>
                <span className="fw-700 fs-18">Survey is not yet created</span>
            </div>}

        </React.Fragment>
    ))

    const inputTypes = [
        {
            value: 'radio',
            label: 'Radio',
        },
        {
            value: 'text',
            label: 'Text',
        },
        {
            value: 'checkbox',
            label: 'Checkbox',
        }
    ];

    function getSelectValue(event) {
        setTypeValue(event.target.value)
        var data = []
        data.push({ answer: "", type: event.target.value })
        setQuestionArr(data)
    }

    function addExtraField() {
        var formValue = [...questionArr]
        formValue.push({ answer: "", type: typeValue })
        setQuestionArr(formValue)
    }

    function handleChange(event, i) {
        var formValue = [...questionArr];
        formValue[i][event.target.name] = event.target.value
        setQuestionArr(formValue)
    }

    function removeField(index) {
        var formValue = [...questionArr];
        formValue.splice(index, 1)
        setQuestionArr(formValue)
    }

    function saveQuestion() {
        var data = {}
        data.questionTitle = questionTitle;
        data.questionType = typeValue;
        data.question = questionArr

        var quesData = [...questionList]
        quesData.push(data)
        dispatch(createQuestion(quesData))
    }

    function removeQuestion(index) {
        var data = [...questionList]
        data.splice(index, 1)
        dispatch(createQuestion(data))
    }

    return (
        <Box className="survey-container">
            <Grid container>
                <Grid lg={9} className="p-20 w-80 div-line">
                    <Button className="crt-survet-btn cursor-pointer" onClick={addSurveDialog}>Add Survey</Button>
                    <Box className="mt-10">
                        {surveyList && surveyList.length > 0 && <Box className="d-flex justify-content-between align-items-center">
                            <span>{getSurveyName}</span>
                            <Button className="add-ques-btn" onClick={() => setQuestion(true)}>Add Question</Button>
                        </Box>}
                        {showQuestion && <Box className="question-container p-20 mt-20">
                            <Grid container columnGap={2}>
                                <Grid lg={8}>
                                    <TextField label="Enter a Question" className="w-100" id="questiontitle" value={questionTitle} onChange={(event) => setQuestionTitle(event.target.value)} />
                                </Grid>
                                <Grid lg={3}>
                                    <TextField select label="Select Type" className="w-100" value={typeValue} onChange={(event) => getSelectValue(event)}>
                                        {inputTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Box>
                                {questionArr && questionArr.length > 0 && questionArr.map((value, index) => (
                                    <Grid container columnGap={2} className="mt-20 d-flex align-items-center" key={index}>
                                        {(value.type == "radio" || value.type == "checkbox") && <Grid lg={0.5}>
                                            <input type={value.type} name={`name`}></input>
                                        </Grid>}
                                        <Grid lg={10} className="d-flex align-items-center">
                                            <input type="text" name="answer" value={value.answer || ""} className="w-50 p-10 mr-10" onChange={(event) => handleChange(event, index)}></input>
                                            {index != 0 && <div className="delete-row-icon cursor-pointer d-flex align-items-center justify-content-center" onClick={() => removeField(index)}>
                                                <DeleteRounded className="clr-fff" />
                                            </div>}
                                        </Grid>
                                    </Grid>
                                ))}
                                {questionArr && questionArr.length > 0 &&
                                    <Box>
                                        {typeValue != "text" && <Button className="mt-10 add-ques-btn mr-10" onClick={() => addExtraField()}>Add Field</Button>}
                                        <Button className="mt-10 add-ques-btn mr-10" onClick={() => cancelQuestion()}>Cancel</Button>
                                        <Button className="mt-10 add-ques-btn" onClick={() => saveQuestion()}>Save</Button>
                                    </Box>

                                }
                            </Box>
                        </Box>}
                    </Box>
                    {questionList && questionList.length > 0 && questionList.map((value, index) => (
                        <Box className="question-container p-20 mt-20" key={index}>
                            <Grid container columnGap={2}>
                                <Grid lg={6}>
                                    <TextField label="Enter a Question" disabled className="w-100" id="questiontitle" value={value.questionTitle} onChange={(event) => setQuestionTitle(event.target.value)} />
                                </Grid>
                                <Grid lg={3}>
                                    <TextField select disabled label="Select Type" className="w-100" value={value.questionType} onChange={(event) => getSelectValue(event)}>
                                        {inputTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid lg={2}>
                                    <div className="delete-row-icon cursor-pointer d-flex align-items-center justify-content-center" onClick={() => removeQuestion(index)}>
                                        <DeleteRounded className="clr-fff" />
                                    </div>
                                </Grid>
                            </Grid>
                            <Box>
                                {value.question && value.question.length > 0 && value.question.map((res, ind) => (
                                    <Grid container columnGap={2} className="mt-20 d-flex align-items-center" key={ind}>
                                        {(res.type == "radio" || res.type == "checkbox") && <Grid lg={0.5}>
                                            <input type={res.type} disabled></input>
                                        </Grid>}
                                        <Grid lg={10} className="d-flex align-items-center">
                                            <input type="text" name="answer" disabled value={res.answer || ""} className="w-50 p-10 mr-10" onChange={(event) => handleChange(event, index)}></input>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        </Box>
                    ))}

                </Grid>
                <Grid lg={3} className="p-20">
                    <RightSurveyList surveyList={surveyList} deleteSurveyData={deleteSurveyData} clickSurveyName={clickSurveyName} />
                </Grid>
            </Grid>


            <Dialog
                open={surveyBool}
                maxWidth={"sm"}
                fullWidth
                onClose={closeSurveyDialog}
            >
                <DialogTitle>
                    Create Survey
                </DialogTitle>
                <Form onSubmit={(event) => submitSurvey(event)}>
                    <DialogContent >
                        <TextField label="Survey Name" fullWidth className="mt-10" onChange={(event) => setSurveyName(event.target.value)} value={surveyName} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeSurveyDialog} className="p-10 cancel-btn">Cancel</Button>
                        <Button type="submit" className="p-10 submit-btn">Submit</Button>
                    </DialogActions>
                </Form>

            </Dialog>
        </Box>
    )

}

export default CreateSurvey;