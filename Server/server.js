const { hash } = require('bcrypt')
const express = require('express')
const app = express()
const port = 3000
const mysql2 = require('mysql2')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors)

const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restapi'
});

app.get('/users', (req, res) => {
    let sql = "SELECT * FROM users"

    conn.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message
            })
            return
        }
        res.status(200).json({
            message: "เรียกข้อมูลสำเร็จ",
            data: result
        })
    })
})


app.post('/users',async (req,res) =>{
    const {task_name,status} = req.body
    let role = 'member'
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        let sql = "INSER INTO users(task_name,status) VALUES(?,?,?)"
        conn.execute(sql,
            [task_name,status],
            (err,result) =>{
                if(err){
                    res.status(500).json({
                        message:err.message
                    })
                    return
                }
                res.status(201).json({
                    message : "เพิ่มข้อมูลสำเร็จ",
                    data:result
                })
            }
        )
    })

})

app.get('/users/:id', async (req,res) =>{
    const {id} = req.params
    let sql = "SELECT * FROM users WHERE id = ?"
    conn.execute(sql,
        [id],
        (err,result) =>{
            if(err){
                res.status(500),json({
                    message :err.message
                })
                return
            }
            res.status(200).json({
                message : "เรียกข้อความสำเร็จ",
                data : result
            })
        }
    )
})

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { task_name, status } = req.body;
  
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        res.status(500).json({
          message: err.message
        });
        return;
      }
      bcrypt.hash(status, salt, (err, hash) => {
        if (err) {
          res.status(500).json({
            message: err.message
          });
          return;
        }
        let sql = "UPDATE users SET task_name = ?, status = ? WHERE id = ?";
        conn.execute(sql, [task_name, hash, id], (err, result) => {
          if (err) {
            res.status(500).json({
              message: err.message
            });
            return;
          }
          res.status(201).json({
            message: "แก้ไขข้อมูลสำเร็จ",
            data: result
          });
        });
      });
    });
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    let sql = "DELETE FROM users WHERE id = ?"

    await conn.execute(sql,
    [id],
    (err, result)=>{
    if(err){
    res.status(500).json({
    message :err.message
    })
    return
}
    res.status(200).json({
    message : "ลบข้อมูลสำเร็จ",
    data : result
    })
})
  })
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
