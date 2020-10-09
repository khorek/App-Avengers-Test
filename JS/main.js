window.onload = function () {
    let result = {};
    let step = 0;

    function showQuestion(questionNumber) {
        // Вывод вопроса:
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        // Вывод вариантов ответа:
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer += `<li data-v=${key} class='answer-variant'>${quiz[step]['a'][key]}</li>`;
        }
        document.querySelector(".answer").innerHTML = answer;
    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-variant') && step < quiz.length) {
            if (result[event.target.dataset.v] != undefined) {
                result[event.target.dataset.v]++;
            }
            else {
                result[event.target.dataset.v] = 0;
            }
            step++;
            if (step == quiz.length) { // Если последний вопрос:
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                showResult();
            } else { // Если не последний вопрос:
                showQuestion(step);
            }
        }
        if (event.target.classList.contains('reload-button')) {
            location.reload();
        }
    }

    function showResult() {
        let key = Object.keys(result).reduce(function (a, b) {
            return result[a] > result[b] ? a : b;
        });
        // Добавляем ответ 
        let div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        // Добавляем изображения ответа
        let img = document.createElement('img');
        img.src = 'images/' + answers[key]['image'];
        img.classList.add('result-img')
        document.querySelector('main').appendChild(img);

        // Перезагружаем
        let reloadButton = document.createElement('button');
        reloadButton.innerHTML = 'Заново!';
        reloadButton.classList.add('reload-button');
        document.querySelector('main').appendChild(reloadButton);

    }
    showQuestion(step);
};