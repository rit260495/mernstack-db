const express = require('express');

const app = express();
const port = 3000

const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


require('dotenv').config()

const student_details = require('./models/student_details')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post("/post_student_details", async (req, res, next) => {
    const id = req.body.id
    const studentName = req.body.studentName
    const age = req.body.age
    const gender = req.body.gender
    const studentClass = req.body.studentClass;

    const studentDetails = new student_details({
        id: id,
        studentName: studentName,
        age: age,
        gender: gender,
        studentClass: studentClass
    });

    const studentVal = await studentDetails.save();

    res.json(studentVal)


});

app.put("/student_update/:id", async (req, res, next) => {
    let updateId = req.params.id;
    let updataStudentName = req.body.studentName;
    let updateage = req.body.age;
    let updategender = req.body.gender;
    let updataStudentClass = req.body.studentClass

    student_details.findOneAndUpdate({ id: updateId }, {
        $set: {
            studentName: updataStudentName,
            age: updateage,
            gender: updategender,
            studentClass: updataStudentClass
        }
    },).then(result => {
        res.status(200).json({
            updatedStudent: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


app.get("/get_student_detail", (req, res, next) => {
    student_details.find().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

app.get("/get_student_detail/:id", (req, res, next) => {
    student_details.findById(req.params.id).then(result => {
        res.status(200).json({
            student: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

})


app.delete('/student_details_delete/:id', (req, res, next) => {
    student_details.findByIdAndDelete(req.params.id).then(result => {
        res.status(200).json({
            message: 'product deleted',
            result: result
        })
    })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

app.use(express.json())

mongoose.connect(process.env.MONGODB_CONNECT_URI).then(result => {
    console.log('db connected')
}).catch(err => {
    console.log(err);
})

app.listen(3000, () => {
    console.log('server is running in 8080')
});
