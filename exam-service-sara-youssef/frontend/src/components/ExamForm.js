import React, { useState } from 'react';
import axios from 'axios';
import './ExamForm.css';


const ExamForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('upload');
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    options: ['', '', '', ''],
    correct_option: 0,
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      question_text: '',
      options: ['', '', '', ''],
      correct_option: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (format === 'upload' && !file) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('format', format);
    formData.append('teacher_id', '00000000-0000-0000-0000-000000000001'); // À adapter dynamiquement

    if (format === 'upload') {
      formData.append('file', file);
    } else {
      formData.append('questions', JSON.stringify(questions));
    }

    try {
      const res = await axios.post('http://localhost:8000/exams/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Examen créé avec succès');
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'examen");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un Examen</h2>

      <label>Titre :</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description :</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Format :</label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="upload">Téléverser un fichier</option>
        <option value="questions">Créer des questions</option>
      </select>

      {format === 'upload' && (
        <div>
          <label>Fichier :</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
        </div>
      )}

      {format === 'questions' && (
        <div>
          <h3>Ajouter des questions</h3>
          <input
            placeholder="Question"
            value={newQuestion.question_text}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question_text: e.target.value })
            }
          />
          {newQuestion.options.map((opt, index) => (
            <input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => {
                const opts = [...newQuestion.options];
                opts[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: opts });
              }}
            />
          ))}
          <label>Index de la bonne réponse (0-3) :</label>
          <input
            type="number"
            min="0"
            max="3"
            value={newQuestion.correct_option}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, correct_option: parseInt(e.target.value) })
            }
          />
          <button type="button" onClick={handleAddQuestion}>Ajouter la question</button>

          <ul>
            {questions.map((q, i) => (
              <li key={i}>{q.question_text}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit">Créer l'examen</button>
    </form>
  );
};

export default ExamForm;
