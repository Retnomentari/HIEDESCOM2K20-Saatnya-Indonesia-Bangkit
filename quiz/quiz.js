const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Virus Corona (COVID-19) yang menjadi pandemi saat ini pertama kali muncul di negara...',
        choice1: 'Cina',
        choice2: 'Italia',
        choice3: 'Amerika',
        choice4: 'Indonesia',
        answer: 1,
    },
    {
        question: 'Hewan yang diduga menjadi vektor penyebaran Covid-19 adalah...',
        choice1: 'Cacing',
        choice2: 'Katak',
        choice3: 'Kelelawar',
        choice4: 'Ayam',
        answer: 3,
    },
    {
        question: 'COVID-19 bisa masuk melalui anggota-anggota tubuh di bawah ini, kecuali...',
        choice1: 'Mata',
        choice2: 'Mulut',
        choice3: 'Hidung',
        choice4: 'Telinga',
        answer: 4,
    },
    {
        question: 'COVID-19 tidak bisa hidup di beberapa jenis cairan di bawah ini, kecuali...',
        choice1: 'Air panas',
        choice2: 'Air dingin/tawar',
        choice3: 'Cuka/asam',
        choice4: 'Air asin',
        answer: 2,
    },
    {
        question: 'Orang yang paling berpotensi terkena COVID-19 adalah...',
        choice1: 'Setiap orang yang daya tahan tubuhnya rendah dan punya riwayat penyakit bawaan seperti paru, TB, hipertensi, asma, kanker, dan tumor.',
        choice2: 'Manusia lanjut usia yang berusia di atas 60 tahun.',
        choice3: 'Anak-anak yang sedang sakit demam, batuk, dan flu.',
        choice4: 'Orang yang keluar rumah tanpa menggunakan masker dan menghadiri kerumunan massa.',
        answer: 1,
    },
    {
        question: 'Suhu tubuh yang bisa diindikasikan sedang terjangkit COVID-19 yaitu...(dalam Celcius)',
        choice1: '35 derajat',
        choice2: '37 derajat',
        choice3: '36 derajat',
        choice4: '38 derajat',
        answer: 4,
    },
    {
        question: 'Jenis vitamin yang disarankan dikonsumsi untuk meningkatkan daya tahan tubuh agar terhindar dari COVID-19 adalah...',
        choice1: 'Vitamin A dan B',
        choice2: 'Vitamin C dan D',
        choice3: 'Vitamin B dan C',
        choice4: 'Vitamin C dan E',
        answer: 2,
    },
    {
        question: 'Gejala umum orang yang terkena COVID-19 yaitu...',
        choice1: 'Bersin-bersin, pilek, batuk, sakit tenggorokan, sakit kepala ringan.',
        choice2: 'Demam, perut kembung, muntah, mual, batuk, pilek, diare, lemas',
        choice3: 'Demam tinggi, batuk, sesak napas, gangguan pengecapan dan penciuman, kelelahan.',
        choice4: 'Nyeri dada, sesak napas, pusing, rasa lelah berkepanjangan, sakit perut, mual, muntah, batuk-batuk.',
        answer: 3,
    },
    {
        question: 'Berikut ini yang merupakan bentuk social distancing adalah...',
        choice1: 'Sering mencuci tangan dengan air.',
        choice2: 'Mengunjungi pertemuan massal.',
        choice3: 'Memakai masker saat bepergian.',
        choice4: 'Menjaga jarak berkomunikasi.',
        answer: 4,
    },
    {
        question: 'Berikut kelompok orang yang wajib melakukan isolasi mandiri, kecuali...',
        choice1: 'Orang yang memiliki riwayat bepergian ke zona merah atau wilayah endemis COVID-19 dalam waktu 2 minggu terakhir',
        choice2: 'Orang yang telah menjalani pemeriksaan rapid test COVID-19',
        choice3: 'Orang yang dicurigai atau sudah terkonfirmasi positif COVID-19',
        choice4: 'Orang yang pernah terjangkit COVID 19 dan telah dinyatakan sembuh',
        answer: 4,
    },
    {
        question: 'Protokol isolasi mandiri dilakukan dengan beberapa cara berikut ini, kecuali...',
        choice1: 'Pantau suhu tubuh harian dan perhatikan apakah mengalami gejala COVID-19.',
        choice2: 'Jalani perilaku hidup bersih dan sehat.',
        choice3: 'Pakai masker dan tetap beraktivitas seperti biasa',
        choice4: 'Gunakan peralatan makan dan mandi yang terpisah dengan orang lain di dalam rumah.',
        answer: 3,
    },
    {
        question: 'Badan Kesehatan Dunia, WHO, telah menyatakan bahwa kasus Covid-19 merupakan pandemi global. Pengertian pandemi adalah...',
        choice1: 'Penyebaran penyakit atau infeksi virus ke seluruh dunia.',
        choice2: 'Berjangkitnya penyakit menular dalam masyarakat yang jumlah penderitanya meningkat nyata.',
        choice3: 'Penularan virus yang terjadi dari manusia ke manusia.',
        choice4: 'Wabah penyakit dalam daerah tertentu dalam jumlah yang melebihi batas jumlah normal.',
        answer: 1,
    },
    {
        question: 'Tahapan tertinggi dalam penentuan kondisi pasien Covid-19 adalah...',
        choice1: 'ODP',
        choice2: 'PDP',
        choice3: 'confirm',
        choice4: 'suspect',
        answer: 3,
    },
    {
        question: 'Tindakan pemisahan yang dilakukan pada pasien infeksi penyakit dari orang-orang sehat yang ada di sekitarnya untuk menghindari terjadinya penularan disebut...',
        choice1: 'Lockdown',
        choice2: 'Isolasi',
        choice3: 'Karantina',
        choice4: 'Social Distancing',
        answer: 2,
    },
    {
        question: 'Lamanya waktu isolasi diri yang dianjurkan adalah...',
        choice1: '7 hari',
        choice2: '28 hari',
        choice3: '14 hari',
        choice4: '32 hari',
        answer: 3,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("end.html")
    }

    questionCounter++
    progressText.innerText =`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]    
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000) 
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
