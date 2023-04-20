# Movie Quiz App
This is a simple Quiz Application built using HTML, CSS, JavaScript, JSON, and Ajax. It allows users to answer a series of questions and provides immediate feedback on whether their answers are correct or not.

## Getting Started
To get started with the Quiz App, you will need to clone or download the repository to your local machine. Once you have downloaded the repository, youCancel changes can open the index.html file in your web browser to start the quiz.

## Usage
When you open the Quiz App, it will display a series of questions, one at a time. To answer a question, simply click on the radio button next to the answer that you think is correct. Once you have answered a question, click the "Submit" button to see if your answer is correct.

The app will immediately provide feedback on whether your answer is correct or not. If your answer is correct, the app will display a green checkmark next to the answer. If your answer is incorrect, the app will display a red "X" next to the answer, and it will show you the correct answer.

Once you have answered all of the questions, the app will display your score, as well as a list of all the questions and your answers.

## Code Overview
The main code for the Quiz App is contained in the script.js file. Here is a brief overview of what each part of the code does:

getRepos(): This function makes an AJAX request to the questions.json file to retrieve the quiz data. Once the data is retrieved, it populates the HTML with the questions and answers.

addQuestionData(obj, count): This function adds the current question to the HTML.

checkAnswer(obj, rAnswer, count): This function checks the user's answer against the correct answer and updates the score accordingly.

showResults(count): This function shows the user's score once all of the questions have been answered.


