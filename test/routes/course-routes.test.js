const { app, expect } = require('../common');
const helper = require('./../helpers/database.helper.js')

/* Get a reference to the Problem model */
const Course = app.models.Course;
// const ProblemSet = app.models.ProblemSet;
// const Submission = app.model.Submission;
// const Human = app.model.Human;

const request = require('supertest');


describe('Course Routes', () => {
    //before(helper.givenEmptyDatabase);

    Course.create({ name: "Nombre Seccion", section: 1, year: 2018, period: 1}).then(
        res => {
            ApiCourses(res);
        }
    );

    Course.create({ name: "Nombre Seccion 1", section: 2, year: 2017, period: 1}).then(
        res => {
            ApiCoursesId(res);  
        }
    );

    Course.create({ name: "Nombre Seccion 2", section: 3, year: 2018, period: 1}).then(
        res => {
            //ApiProblems(res);
        }
    );
    
    const ApiCourses = (c) => {

        describe ('Route /api/courses', () => {

            describe('GET /api/courses', () => {
                it('should respond with json', (done) => {
                    request(app)
                    .get('/api/courses')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
            
            describe('POST /api/courses', () => {
                it('should respond with json', (done) => {
        
                    let body  = {
                        name: "Nombre Seccion POST api/courses", 
                        section: 2, 
                        year: 2017, 
                        period: 2
                    };
        
                    request(app)
                        .post('/api/courses')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PUT /api/courses', () => {
                it('should respond with json', (done) => {

                    let body  = {
                        name: c.name + "PUT api/courses _new",
                        id: c.id
                    };
                    
                    request(app)
                        .get('/api/courses')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PATCH /api/courses', () => {
                let body  = {
                    name: c.name + "_new_patch",
                    id: c.id
                };
        
                it('respond with json', (done) => {
                    request(app)
                    .get('/api/courses')
                    .set('Accept', 'application/json')
                    .send(body)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
        });
    };

    const ApiCoursesId = (c) => {
        describe ('Route /api/courses/{id}', () => {

            describe('GET /api/courses/{id}', () => {
                it('should respond with json', (done) => {
                    request(app)
                        .get('/api/courses/'+c.id)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PUT /api/courses/{id}', () => {
                it('should respond with json', (done) => {
                    let body  = {
                        name: c.name + "_new",
                        year: c.year + 1
                    };

                    request(app)
                        .put('/api/courses/'+c.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PATCH /api/courses/{id}', () => {
                it('should respond with json', (done) => {
                    let body  = {
                        name: c.name + "_new",
                        year: c.year - 1
                    };

                    request(app)
                        .patch('/api/courses/'+c.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        });
    }

    // const ApiProblemIdProblemSet = (p) => {

    //     describe ('Route /api/Problems/{id}/problemSets', () => {
    //         describe('GET /api/Problems/{id}/problemSets', () => {
    //             it('should respond with json', (done) => {
    //                 request(app)
    //                 .get('/api/Problems/'+p.id+'/problemSets')
    //                 .set('Accept', 'application/json')
    //                 .expect('Content-Type', /json/)
    //                 .expect(200, done);
    //             });
    //         });
            
    //         describe('POST /api/Problems/{id}/problemSets', () => {
    //             it('should respond with json', (done) => {
        
    //                 let body  = {
    //                     name: "string",
    //                     description: "string",
    //                     startTime: "2018-05-11T19:29:24.666Z",
    //                     endTime: "2018-05-11T23:29:24.666Z",
    //                     restrictedAccess: false
    //                   };
        
    //                 request(app)
    //                     .post('/api/Problems/'+p.id+'/problemSets')
    //                     .set('Accept', 'application/json')
    //                     .send(body)
    //                     .expect('Content-Type', /json/)
    //                     .expect(200, done);
    //             });
    //         });

    //         describe('PUT /api/Problems/{id}/problemSets/{fk}/rel/', () => {
    //             it('should respond with json', (done) => {
    //                 ProblemSet.create({
    //                     name: "string",
    //                     description: "string",
    //                     startTime: "2018-05-11T19:29:24.666Z",
    //                     endTime: "2018-05-11T23:29:24.666Z",
    //                     restrictedAccess: false
    //                 }).then(
    //                     ps => {
    //                         let body  = {
    //                             "problemSetId": p.id,
    //                             "problemId": ps.id
    //                           };
                              
    //                         request(app)
    //                             .put('/api/Problems/'+p.id+'/problemSets/rel/'+ps.id)
    //                             .set('Accept', 'application/json')
    //                             .send(body)
    //                             .expect('Content-Type', /json/)
    //                             .expect(200, done);
    //                     }
    //                 );
    //             });
    //         });
    //     });
    // };


    // describe('DELETE /api/problems/{id}', () => {
    //     it('should respond with json', (done) => {
    //         Problem.create({name: "Name", description: "Description"}).then(
    //             res => {
    //                 request(app)
    //                 .delete('/api/Problems/'+res.id)
    //                 .set('Accept', 'application/json')
    //                 .expect('Content-Type', /json/)
    //                 .expect(200, done);
    //             }
    //         );
    //     });
    // });

    // describe('DELETE /api/Problems/{id}/problemSets', () => {
    //     it('should respond with json', (done) => {
    //         Problem.create({name: "Name", description: "Description"}).then(
    //             res => {
    //                 request(app)
    //                 .delete('/api/Problems/'+res.id+'/problemSets')
    //                 .set('Accept', 'application/json')
    //                 .expect('Content-Type', /json/)
    //                 .expect(204, done);
    //             }
    //         );
    //     });
    // });


});

