


let student = [
    {
        id: 1,
        studentName: 'Tom',
        age: 12,
        gender: 'male',
        studentClass: 'Fifth Standard'
    },
    {
        id: 2,
        studentName: 'Jerry',
        age: 12,
        gender: 'male',
        studentClass: 'Six Standard'
    },
    {
        id: 3,
        studentName: 'Perry',
        age: 14,
        gender: 'male',
        studentClass: 'Seventh Standard'
    },
]




app.get('/students', (req, res) => {
    res.json(student)
})


app.get('/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const foundId = student.find((studentId) => studentId.id = id);
    res.json(foundId)

})


app.post("/student", (req, res) => {
    const newStudent = {
        id: student.length + 1,
        studentName: req.body.studentName,
        age: req.body.age,
        gender: req.body.gender,
        studentClass: req.body.studentClass

    }
    student.push(newStudent)
    console.log(student.slice(-1));
    res.json(newStudent)
})


app.put("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const replaceStudentId = {
        id: id,
        studentName: req.body.studentName,
        age: req.body.age,
        gender: req.body.gender,
        studentClass: req.body.studentClass

    }

    const searchIndex = student.findIndex((item) => item.id === id);
    student[searchIndex] = replaceStudentId;
    res.json(replaceStudentId)
})


app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = student.findIndex((item) => item.id === id);
    if (searchIndex > - 1) {
        student.splice(searchIndex, 1);
        res.sendStatus(200);
    }
    else {
        res.status(404).json({ error: `Student with id  ${id} not found. No student were deleted ` });
    }
})
