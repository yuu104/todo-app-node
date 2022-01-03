'use strict';
(() => {


  const express = require('express');
  const app = express();
  const mysql = require('mysql');
  const ejs = require('ejs');
  const port = process.env.PORT || 3000;
  require("dotenv").config();

  const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
  });

  // const db = mysql.createPool({
  //   host: process.env.LOCAL_DB_HOST,
  //   user: process.env.LOCAL_DB_USER,
  //   password: process.env.LOCAL_DB_PASSWORD,
  //   database: process.env.LOCAL_DB
  // });

  app.engine('ejs', ejs.renderFile);  


  // con.connect((err) => {
  //   if(err) {
  //     console.log('error connecting:' + err.stack);
  //     return;
  //   }
  //   console.log('Connected');
  // });

  app.use(express.static('public'));
  app.use(express.urlencoded({extended: false}));
  app.use(function(err, req, res, next) {
    res.send(err.message);
  });

  app.get('/', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'SELECT * FROM doTasks WHERE isDone="no" ORDER BY priority',
        (error_d, results_d) => {
          connection.query(
            'SELECT * FROM doTasks WHERE isDone="yes"',
            (error_c, results_c) => {
              connection.query(
                'SELECT * FROM contPlan',
                (error_p, results_p) => {
                  connection.query(
                    'SELECT COUNT(*), COUNT(isDone="no" OR NULL), COUNT(isDone="yes" OR NULL) FROM doTasks',
                    (error_count, results_count) => {
                      res.render('make.ejs', 
                      {
                        doItems: results_d,
                        compedItems: results_c,
                        contPlans: results_p,
                        countTotal: results_count[0]['COUNT(*)'],
                        countTask: results_count[0]['COUNT(isDone="no" OR NULL)'],
                        countComped: results_count[0]['COUNT(isDone="yes" OR NULL)']
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });

  app.post('/create', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'INSERT INTO doTasks(task, priority, isDone) VALUES (?, ?, "no")',
        [req.body.taskName, req.body.priority],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });

  app.post('/delete/:id', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'DELETE FROM doTasks WHERE id = ?',
        [req.params.id],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });

  app.post('/comped/:id', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'UPDATE doTasks SET isDone="yes" WHERE id=?',
        [req.params.id],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });

  app.post('/reCreate/:id', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'UPDATE doTasks SET isDone="no" WHERE id=?',
        [req.params.id],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });

  app.post('/renew/:id', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'UPDATE doTasks SET task=?, priority=? WHERE id=?',
        [req.body.editTaskName, req.body.editPriority, req.params.id],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });

  app.post('/planing', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'INSERT INTO contPlan(estimate, measure) VALUES(?, ?)',
        [req.body.estimate, req.body.measure],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });


  app.post('/contPlanDelete/:id', (req, res) => {
    db.getConnection((err, connection) => {
      connection.query(
        'DELETE FROM contPlan WHERE id = ?',
        [req.params.id],
        (error, results) => {
          res.redirect('/');
        }
      );
    });
  });





  app.listen(port, () => {
    console.log('Start server port:3000');
  });











})();