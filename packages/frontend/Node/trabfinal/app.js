var express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var mysql = require("mysql");
var jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'escola_do_futuro'
});

connection.connect();

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: '.'})
});

app.get('/buscar-usuario', function (req, res) {
    id = req.query.id;
    connection.query("SELECT * FROM cursos WHERE RA = ?", [id], function (error, rows) {
        res.json(rows[0]);
    });
});

app.get('/buscar-professor', function (req, res) {
    id = req.query.id;
    connection.query("SELECT * FROM professores WHERE id = ?", [id], function (error, rows) {
        res.json(rows[0]);
    });
});

app.get('/buscar-disciplina', function (req, res) {
    id = req.query.id;
    connection.query("SELECT * FROM disciplina WHERE DiscID = ?", [id], function (error, rows) {
        res.json(rows[0]);
    });
});

app.get('/buscar-questao', function (req, res) {
    id = req.query.id;
    console.log(id);
    connection.query("SELECT * FROM questoes WHERE idQues = ?", [id], function (error, rows) {
        console.log(rows);
        res.json(rows[0]);
    });
});

app.get('/buscar-turma', function (req, res) {
    id = req.query.id;
    connection.query("SELECT * FROM turmas WHERE TurmaID = ?", [id], function (error, rows) {
        let turma = rows[0];
        if (turma == undefined)
            turma = {};
        connection.query("SELECT * FROM professores ORDER BY Nome", function (error, rows) {
            turma['listProfessores'] = rows;
            connection.query("SELECT * FROM disciplina ORDER BY Nome", function (error, rows) {
                turma['listDisciplinas'] = rows;
                res.json(turma);
            });
        });
    });
});

app.get('/cadastrar-usuario', function (req, res) {
    res.sendFile('cadastrarAluno.html', {root: '.'})
});

app.get('/editar-usuario', function (req, res) {
    res.sendFile('editarAluno.html', {root: '.'})
});

app.get('/excluir-usuario', function (req, res) {
    res.sendFile('excluirCurso.html', {root: '.'})
});

app.get('/cadastrar-professor', function (req, res) {
    res.sendFile('cadastrarProfessor.html', {root: '.'})
});

app.get('/cadastrar-disciplina', function (req, res) {
    res.sendFile('cadastrarDisciplina.html', {root: '.'})
});

app.get('/cadastrar-disciplina', function (req, res) {
    res.sendFile('editarDisciplina.html', {root: '.'})
});

app.post('/add-usuario', function (req, res) {
    connection.query("INSERT INTO cursos(RA, Nome, Login, Senha) values(?, ?, ?, ?)", [req.body.RA, req.body.name, req.body.login, req.body.senha], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/edit-usuario', function (req, res) {
    connection.query("UPDATE cursos SET Nome=?, Login=?, Senha=? WHERE RA=?", [req.body.name, req.body.login, req.body.senha, req.body.RA], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/list-usuario', function (req, res) {
    connection.query("SELECT * FROM cursos", function (err, results, fields) {
        if (!err) {
            res.json(results);
        } else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/del-usuario', function (req, res) {
    connection.query("DELETE FROM cursos WHERE RA=?", [req.body.RA], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/add-professor', function (req, res) {
    connection.query("INSERT INTO professores(Nome, Login, Senha) values(?, ?, ?)", [req.body.name, req.body.login, req.body.senha], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/edit-professor', function (req, res) {
    connection.query("UPDATE professores SET Nome=?, Login=?, Senha=? WHERE id=?", [req.body.name, req.body.login, req.body.senha, req.body.id], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/list-professor', function (req, res) {
    connection.query("SELECT * FROM professores", function (err, results, fields) {
        if (!err) {
            res.json(results);
        } else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/del-professor', function (req, res) {
    connection.query("DELETE FROM professores WHERE id=?", [req.body.id], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/add-disciplina', function (req, res) {
    connection.query("INSERT INTO disciplina(Nome) values(?)", [req.body.name], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/edit-disciplina', function (req, res) {
    connection.query("UPDATE disciplina SET Nome=? WHERE DiscID=?", [req.body.name, req.body.id], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/list-disciplina', function (req, res) {
    if (req.query.id)
        connection.query("SELECT * FROM turmas t JOIN professores p ON t.profID= p.id JOIN disciplina d ON t.DiscID=d.DiscID WHERE t.profID = ?", [req.query.id], function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else
                res.status(200).send({
                    result: "" + err
                });
        });
    else
        connection.query("SELECT * FROM disciplina", function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else
                res.status(200).send({
                    result: "" + err
                });
        });

});

app.post('/del-disciplina', function (req, res) {
    connection.query("DELETE FROM disciplina WHERE DiscID=?", [req.body.id], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});


app.post('/add-turma', function (req, res) {
    connection.query("INSERT INTO turmas(profID, DiscID) values(?, ?)", [req.body.profId, req.body.discId], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/edit-turma', function (req, res) {
    connection.query("UPDATE turmas SET profID=?, DiscID=? WHERE TurmaID=?", [req.body.profId, req.body.discId, req.body.id], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/list-turma', function (req, res) {
    let professorID = "";
    if (req.query.profID) {
        connection.query("SELECT t.TurmaID, t.profID AS IdProfessor, p.Nome AS NomeProfessor, t.DiscID as IdDisciplina, d.Nome AS NomeDisciplina FROM turmas t JOIN professores p ON t.profID= p.id JOIN disciplina d ON t.DiscID=d.DiscID WHERE t.profID = ?", [req.query.profID], function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else
                res.status(200).send({
                    result: "" + err
                });
        });
    } else {
        connection.query("SELECT t.TurmaID, t.profID AS IdProfessor, p.Nome AS NomeProfessor, t.DiscID as IdDisciplina, d.Nome AS NomeDisciplina FROM turmas t JOIN professores p ON t.profID= p.id JOIN disciplina d ON t.DiscID=d.DiscID", function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else
                res.status(200).send({
                    result: "" + err
                });
        });
    }
});

app.post('/del-turma', function (req, res) {
    connection.query("DELETE FROM turmas WHERE TurmaID=?", [req.body.id], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/add-matricula', function (req, res) {
    connection.query("SELECT COUNT(*) AS cadastro FROM matricula WHERE alunoRA = ? AND turmaID = ?", [req.body.alunoRA, req.body.turmaID], function (err, results) {
        if (results[0].cadastro == 0)
            connection.query("INSERT INTO matricula(alunoRA, turmaID, dataMatricula) values(?, ?, NOW())", [req.body.alunoRA, req.body.turmaID], function (err) {
                if (!err)
                    res.status(200).send({
                        result: "Ok!"
                    });
                else
                    res.status(200).send({
                        result: "" + err
                    });
            });
        else
            res.status(200).send({
                result: "Aluno já cadastrado"
            });
    });

});

app.post('/del-matricula', function (req, res) {
    connection.query("DELETE FROM matricula WHERE alunoRA=? AND turmaID=?", [req.body.alunoRA, req.body.turmaID], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/list-matriculas-turma', function (req, res) {
    connection.query("SELECT m.matriculaID AS matriculaID, d.Nome AS disciplina, a.RA AS alunoRA, a.Nome AS alunoNome, DATE_FORMAT(STR_TO_DATE(m.dataMatricula, '%Y-%m-%d'), '%d/%m/%Y')  AS dataMatricula FROM matricula m JOIN turmas t ON t.TurmaID = m.turmaID JOIN disciplina d ON d.DiscID = t.DiscID JOIN cursos a ON m.alunoRA = a.RA WHERE m.turmaID = ?", [req.query.id], function (err, results) {
        if (!err) {
            let countResults = 0;
            let resultsFinal = [];
            for (let result of results) {
                connection.query("SELECT a.idAval, a.idTurma, CONCAT(d.Nome, ' - Professor(a): ', p.Nome) AS descricao, (SELECT COUNT(*) FROM questoesavaliacao qa WHERE qa.idAvaliacao = a.idAval) AS qtdPerguntas, (SELECT COUNT(*) FROM questoesRespostas qr WHERE qr.idAval = a.idAval AND qr.idAluno = ?) AS countRespondida, (SELECT SUM(IF(qr.resposta = q.altCorreta, 1, 0)) AS acerto FROM questoesRespostas qr JOIN questoes q ON q.idQues = qr.idQuestao WHERE idAluno = ? AND idAval = a.idAval) AS qtdAcertos FROM avaliacao a JOIN turmas t ON t.TurmaID = a.idTurma JOIN disciplina d ON d.DiscID = t.DiscID JOIN professores p ON p.id = t.profID WHERE a.idTurma = ?", [result.alunoRA, result.alunoRA, req.query.id], function (err, resultsProva, fields) {
                    let nota = 0;
                    for (const resProva of resultsProva) {
                        nota += (resProva.qtdAcertos / resProva.qtdPerguntas) * 10;
                    }

                    result['mediaAluno'] = nota / resultsProva.length;
                    resultsFinal.push(result);

                    countResults++;
                    if (countResults === results.length)
                        res.status(200).json(resultsFinal);
                });
            }
        } else
            res.status(200).send({
                result: "" + err
            });
    })
});

app.get('/list-matriculas-usuario', function (req, res) {
    connection.query("SELECT m.matriculaID AS matriculaID, m.turmaID AS turmaID, d.Nome AS disciplina, p.Nome AS professorResponsavel, DATE_FORMAT(STR_TO_DATE(m.dataMatricula, '%Y-%m-%d'), '%d/%m/%Y')  AS dataMatricula FROM matricula m JOIN turmas t ON t.TurmaID = m.turmaID JOIN disciplina d ON d.DiscID = t.DiscID JOIN professores p ON t.profID = p.id WHERE m.alunoRA = ?", [req.query.id], function (err, results) {
        if (!err)
            res.status(200).json(results);
        else
            res.status(200).send({
                result: "" + err
            });
    })
});

app.get('/list-turmas-professor', function (req, res) {
    connection.query("SELECT * FROM turmas t JOIN disciplina d ON d.DiscID = t.DiscID WHERE t.profID = ?", [req.query.id], function (err, results) {
        if (!err)
            res.status(200).json(results);
        else
            res.status(200).send({
                result: "" + err
            });
    })
});

app.post('/login-funcAdm', function (req, res) {
    connection.query("SELECT Id, Login FROM funcionariosadm WHERE Login = ? AND Senha = ?", [req.body.login, req.body.senha], function (err, results) {
        if (!err)
            if (results[0] != null) {
                const usuario = results[0];
                const usuarioID = usuario.Id + "";
                const usuarioLogin = usuario.Login + "";

                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                const jwtToken = jwt.sign({
                    id: usuario.Id,
                    login: usuario.Login,
                    nome: usuario.Login,
                    exp: expiry.getTime(),
                    perfil: 0
                }, "COM-222");

                res.status(200).send({authReq: jwtToken})
            } else
                res.status(200).send({
                    result: "" + err
                });
    })
});

app.post('/login-Aluno', function (req, res) {
    connection.query("SELECT * FROM cursos WHERE Login = ? AND Senha = ?", [req.body.login, req.body.senha], function (err, results) {
        if (!err)
            if (results[0] != null) {
                const usuario = results[0];
                const usuarioID = usuario.Id + "";
                const usuarioLogin = usuario.Login + "";

                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                const jwtToken = jwt.sign({
                    id: usuario.RA,
                    login: usuario.Login,
                    nome: usuario.Nome,
                    exp: expiry.getTime(),
                    perfil: 2
                }, "COM-222");

                res.status(200).send({authReq: jwtToken})
            } else
                res.status(200).send({
                    result: "" + err
                });
    })
});

app.post('/login-professor', function (req, res) {
    connection.query("SELECT * FROM professores WHERE Login = ? AND Senha = ?", [req.body.login, req.body.senha], function (err, results) {
        if (!err)
            if (!err)
                if (results[0] != null) {
                    const usuario = results[0];
                    const usuarioID = usuario.Id + "";
                    const usuarioLogin = usuario.Login + "";

                    const expiry = new Date();
                    expiry.setDate(expiry.getDate() + 7);
                    const jwtToken = jwt.sign({
                        id: usuario.id,
                        login: usuario.Login,
                        nome: usuario.Nome,
                        exp: expiry.getTime(),
                        perfil: 1
                    }, "COM-222");

                    res.status(200).send({authReq: jwtToken})
                } else
                    res.status(200).send({
                        result: "" + err
                    });
    })
});

app.post('/add-questao', function (req, res) {
    connection.query("INSERT INTO questoes(idDisc, enunciado, altCorreta, alt2, alt3, alt4) values(?, ?, ?, ?, ?, ?)", [req.body.DiscId, req.body.enumQuest, req.body.altCerta, req.body.alt2, req.body.alt3, req.body.alt4], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/edit-questao', function (req, res) {
    connection.query("UPDATE questoes SET idDisc=?, enunciado=?, altCorreta=?, alt2=?, alt3=?, alt4=? WHERE idQues=?", [req.body.DiscId, req.body.enumQuest, req.body.altCerta, req.body.alt2, req.body.alt3, req.body.alt4, req.body.QuestId], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.post('/del-questao', function (req, res) {
    connection.query("DELETE FROM questoes WHERE idQues=?", [req.body.QuestId], function (err) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/listar-questao', function (req, res) {
    if (req.query.idAval) {
        connection.query("SELECT t.DiscID FROM avaliacao a JOIN turmas t ON t.TurmaID = a.idTurma WHERE a.idAval = ?", [req.query.idAval], function (err, results, fields) {
            const DiscID = results[0].DiscID;
            connection.query("SELECT * FROM questoesavaliacao qa JOIN questoes q ON qa.idQuestao = q.idQues JOIN disciplina d ON d.DiscID = q.idDisc WHERE qa.idAvaliacao = ? AND q.idDisc = ?", [req.query.idAval, DiscID], function (err, results, fields) {
                if (!err) {
                    let newResp = [];
                    for (const result of results) {
                        let resp = {
                            DiscID: result.DiscID,
                            enunciado: result.enunciado,
                            idDisc: result.idDisc,
                            idQues: result.idQues,
                            respostas: []
                        };
                        let respostas = [
                            result.altCorreta, result.alt2, result.alt3, result.alt4
                        ];
                        resp.respostas = shuffle(respostas);

                        newResp.push(resp);
                    }
                    res.json(newResp);
                } else
                    res.status(200).send({
                        result: "" + err
                    });
            });
        })
    } else
        connection.query("SELECT * FROM questoes q JOIN disciplina d ON d.DiscID = q.idDisc WHERE q.idDisc = ?", [req.query.id], function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else
                res.status(200).send({
                    result: "" + err
                });
        });

});

app.get('/list-avaliacao', function (req, res) {
    if (req.query.id)
        connection.query("SELECT a.idAval, a.jaRespondida, p.Nome as profResponsavel, d.Nome as disciplina, d.DiscID FROM `avaliacao` a JOIN turmas t on t.TurmaID = a.`idTurma` JOIN professores p ON p.id = t.profID JOIN disciplina d ON d.DiscID = t.DiscID WHERE t.profID = ?", [req.query.id], function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else {
                res.status(200).send({
                    result: "" + err
                });
            }
        });
    else
        connection.query("SELECT a.idAval, a.jaRespondida, p.Nome as profResponsavel, d.Nome as disciplina, d.DiscID FROM `avaliacao` a JOIN turmas t on t.TurmaID = a.`idTurma` JOIN professores p ON p.id = t.profID JOIN disciplina d ON d.DiscID = t.DiscID", function (err, results, fields) {
            if (!err) {
                res.json(results);
            } else {
                res.status(200).send({
                    result: "" + err
                });
            }
        });
});

app.post('/add-avaliacao', function (req, res) {
    connection.query("INSERT INTO avaliacao (idTurma, jaRespondida) VALUES (?, ?)", [req.body.turma, 0], function (err, results, fields) {
        if (!err)
            res.status(200).send({
                result: "Ok!"
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });
});

app.post('/del-avaliacao', function (req, res) {
    connection.query("DELETE FROM questoesavaliacao WHERE idAvaliacao = ?", [req.body.id], function (err) {
        if (!err)
            connection.query("DELETE FROM avaliacao WHERE idAval=?", [req.body.id], function (err) {
                if (!err)
                    res.status(200).send({
                        result: "Ok!"
                    });
                else
                    res.status(200).send({
                        result: "" + err
                    });
            });
        else
            res.status(200).send({
                result: "" + err
            });
    });

});

app.get('/listar-questao-avaliacao', function (req, res) {
    connection.query("SELECT * FROM questoes q JOIN disciplina d ON d.DiscID = q.idDisc WHERE q.idDisc = ?", [req.query.id], async function (err, results, fields) {
        if (!err) {
            let newResults = [];
            let counter = 0;
            for (let result of results) {
                await connection.query("SELECT COUNT(*) as qty FROM questoesavaliacao WHERE idAvaliacao = ? AND idQuestao = ?", [req.query.aval, result.idQues], function (err, resultsQA, fields) {
                    if (resultsQA[0].qty > 0)
                        result['selected'] = true;
                    else
                        result['selected'] = false;

                    newResults.push(result);
                    counter++;
                    if (results.length === counter) {
                        res.json(newResults);
                    }
                });
            }
        } else
            res.status(200).send({
                result: "" + err
            });
    });
});

app.post('/add-questao-avaliacao', function (req, res) {
    const request = req.body;

    if (request.selected) {
        connection.query("INSERT INTO questoesavaliacao (idAvaliacao, idQuestao) VALUES (?, ?)", [request.idAvaliacao, request.idQuestao], function (err, results, fields) {
            if (!err)
                res.status(200).send({
                    result: "Ok!"
                });
            else
                res.status(200).send({
                    result: "" + err
                });
        });
    } else {
        connection.query("DELETE FROM questoesavaliacao WHERE idAvaliacao = ? AND idQuestao = ?", [request.idAvaliacao, request.idQuestao], function (err, results, fields) {
            if (!err)
                res.status(200).send({
                    result: "Ok!"
                });
            else
                res.status(200).send({
                    result: "" + err
                });
        });
    }
});

app.get('/list-provas-turma', function (req, res) {
    connection.query("SELECT a.idAval, a.idTurma, CONCAT(d.Nome, ' - Professor(a): ', p.Nome) AS descricao, (SELECT COUNT(*) FROM questoesavaliacao qa WHERE qa.idAvaliacao = a.idAval) AS qtdPerguntas, (SELECT COUNT(*) FROM questoesRespostas qr WHERE qr.idAval = a.idAval AND qr.idAluno = ?) AS countRespondida, (SELECT SUM(IF(qr.resposta = q.altCorreta, 1, 0)) AS acerto FROM questoesRespostas qr JOIN questoes q ON q.idQues = qr.idQuestao WHERE idAluno = ? AND idAval = a.idAval) AS qtdAcertos FROM avaliacao a JOIN turmas t ON t.TurmaID = a.idTurma JOIN disciplina d ON d.DiscID = t.DiscID JOIN professores p ON p.id = t.profID WHERE a.idTurma = ?", [req.query.idAluno, req.query.idAluno, req.query.id], function (err, results, fields) {
        if (!err) {
            res.json(results);
        } else {
            res.status(200).send({
                result: "" + err
            });
        }
    });
});

app.post('/responder-avaliacao', function (req, res) {
    const body = req.body;
    let arrToInsert = [];
    for (let resposta of body.listRespostas) {
        arrToInsert.push([
            resposta.resposta,
            resposta.idQuestao,
            body.idAval,
            body.idAluno
        ]);
    }

    connection.query("INSERT INTO questoesRespostas (resposta, idQuestao, idAval, idAluno) VALUES ?", [arrToInsert], function (err) {
        if (!err) {
            connection.query("UPDATE avaliacao SET jaRespondida = 1 WHERE idAval = ?", [body.idAval], function (err) {
                if (!err)
                    res.status(200).send({
                        result: "Ok!"
                    });
                else
                    res.status(200).send({
                        result: "" + err
                    });
            });
        } else
            res.status(200).send({
                result: "" + err
            });
    });
});

var server = app.listen(5000, function () {
    console.log('Servidor de Node rodando certinho..');
});


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
