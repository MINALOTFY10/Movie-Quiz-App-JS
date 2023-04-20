// Select Elements
let questionCount = document.querySelector(".Question-count");
let submitButton = document.querySelector(".submit-button");

let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let titleCount = document.querySelector(".title-count");
let picture = document.querySelector(".picture");
let quizContainer = document.querySelector(".quiz-container");
let container = document.querySelector(".container");
let main = document.querySelector(".main");

let answer0 = document.querySelector(".answer0");
let answer1 = document.querySelector(".answer1");
let answer2 = document.querySelector(".answer2");
let answer3 = document.querySelector(".answer3");

let currentIndex = 0;
let totalRightAnswers = 0;
let totalCount;

let chosenAnswerArr = [];
let rightAnswerArr = [];


// Fucntion to Do Request
function getRepos() {
    var myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var myJsObject = JSON.parse(this.responseText);
            totalCount = myJsObject.questions.length;


            // Create Bullets + Set Questions Count
            createBullets(totalCount);

            countCreator(currentIndex, totalCount);

            // Add Question Data
            addQuestionData(myJsObject.questions[currentIndex], totalCount);


            submitButton.onclick = () => {
                // Get Right Answer
                let theCorrectAnswer = myJsObject.questions[currentIndex]['correct_answer'];

                // Check The Answer
                checkAnswer(myJsObject.questions[currentIndex], theCorrectAnswer, totalCount);

                // Increase Index
                currentIndex++;

                countCreator(currentIndex, totalCount);

                // Check if there are more questions to display
                if (currentIndex < totalCount) {
                    // Remove Previous Question
                    // Remove Previous Question
                    quizArea.innerHTML = "";
                    answersArea.innerHTML = "";

                    // Handle Bullets Class
                    handleBullets();


                    // Add Question Data
                    addQuestionData(myJsObject.questions[currentIndex], totalCount);

                } else {
                    // All questions have been answered, show a message or redirect to another page
                    console.log("Quiz completed!");
                }
                showResults(totalCount);
            }
        }
    }

    myRequest.open('GET', 'questions.json', true);
    //myRequest.open('GET', 'questions.json', true);

    myRequest.send();
}

getRepos();

function countCreator(index, count) {
    // document.querySelector(".Question-count").innerHTML = count;
    // document.querySelector(".question-index").innerHTML = index + 1;
    document.querySelector(".question-index2").innerHTML = index + 1;
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        // change the photo
        picture.innerHTML = "";
        picture.innerHTML = `<img src="${obj['img']}" alt="">`;




        // Create H2 Question Title
        let questionTitle = document.createElement("h2");

        // Create Question Text
        let questionText = document.createTextNode(obj['question']);

        // Append Text To H2
        questionTitle.appendChild(questionText);

        // Append The H2 To The Quiz Area
        quizArea.appendChild(questionTitle);

        // Create The Answers
        for (let i = 0; i < 4; i++) {
            // Create Main Answer Div
            let mainDiv = document.createElement("div");

            // Add Class To Main Div
            mainDiv.className = `answer${i}`;

            // Create Radio Input
            let radioInput = document.createElement("input");

            // Add Type + Name + Id + Data-Attribute
            radioInput.name = "question";
            radioInput.type = "radio";
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // Make First Option Selected
            if (i === 0) {
                radioInput.checked = true;
            }

            // Create Label
            let theLabel = document.createElement("label");

            // Add For Attribute
            theLabel.htmlFor = `answer_${i}`;

            // Create Label Text
            let theLabelText = document.createTextNode(obj['answers'][i]);

            // Add The Text To Label
            theLabel.appendChild(theLabelText);

            // Add Input + Label To Main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // Append All Divs To Answers Area
            answersArea.appendChild(mainDiv);
        }
    }
}

function checkAnswer(obj, rAnswer, count) {
    let answers = document.getElementsByName("question");

    let theChoosenAnswer;


    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = obj['answers'][i];
            console.log(obj['answers'][i]);
        }
    }

    if (rAnswer === theChoosenAnswer) {
        totalRightAnswers++;
    }


    chosenAnswerArr.push(theChoosenAnswer);
    rightAnswerArr.push(rAnswer);
}

// let resultsContainer = document.querySelector(".results");

let resultDiv = document.createElement("div");
resultDiv.className = "results";

let questionNumber = document.querySelector(".question-number");

function showResults(count) {
    let theResults;
    if (currentIndex === count) {

        container.remove();
        picture.remove();
        main.appendChild(resultDiv); // add this line to append resultDiv to main



        resultDiv.style.backgroundImage = "url('https://images.typeform.com/images/spgAayma3fmN/background/large')";
        resultDiv.style.backgroundSize = "cover";
        resultDiv.style.backgroundColor = "rgba(255, 255, 255, 10)"; // 0.8 is the alpha channel value for 80% opacity



        let theResults = `
        <div>
          <p>Cut the camera</p>
        </div>
        <div>
          <p style="font-weight: 700;">You scored ${totalRightAnswers}/${count}</p>
        </div>
        <div>
          <p style="letter-spacing: 0px; font-size: 10px;">— — — — —</p>
        </div>
      `;

        for (let i = 0; i < chosenAnswerArr.length; i++) {
            theResults += `
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <p style="padding: 0;">${i + 1}. You picked ${chosenAnswerArr[i]}</p>
            <p style="margin-top: 7; padding: 0;">The right one was <span style="font-weight: 700; word-spacing: 2px;">${rightAnswerArr[i]}</span></p>
          <p style="margin:10px"></p>
            </div>
        `;
        }

        resultDiv.innerHTML = theResults;
        resultDiv.style.padding = "10px";
        resultDiv.style.backgroundColor = "white";
        resultDiv.style.marginTop = "10px";

        // main.innerHTML = resultDiv.innerHTML;
        // resultDiv.style.width = "100%";

    }
}

let bulletsSpanContainer = document.querySelector(".bullets .spans");
let countSpan = document.querySelector(".count span");

function createBullets(num) {
    // Create Spans
    for (let i = 0; i < num; i++) {
        // Create Bullet
        let theBullet = document.createElement("span");

        // Check If Its First Span
        if (i === 0) {
            theBullet.className = "on";
        }

        // Append Bullets To Main Bullet Container
        bulletsSpanContainer.appendChild(theBullet);
    }
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}
