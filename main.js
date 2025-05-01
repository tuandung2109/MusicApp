const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const nameSong = $(".name-song");
const nameSinger = $(".name-singer");
const progress = $(".progress");
const timeLeft = $(".time-left");
const timeRight = $(".time-right");
const cd = $(".cd");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const btnRepeat = $(".btn-repeat");
const btnPrev = $(".btn-prev");
const btnTogglePlay = $(".btn-toggle-play");
const btnNext = $(".btn-next");
const btnRandom = $(".btn-random");
const playList = $(".playlist");
// document.addEventListener('DOMContentLoaded', function() {
//     // Mã JavaScript của bạn sẽ được đặt ở đây
//     const btnOptions = document.querySelectorAll('.option');

//     btnOptions.forEach(btnOption => {
//         btnOption.addEventListener('click', function() {
//            document.querySelector('option.active').classList.remove('active')
//            btnOption.classList.toggle('active')
//         });
//     });
// });


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    songs: [
        {
            name: "Nha ",
            singer: "ft.Innie",
            path: "assets/music/Song1-Nha.mp3",
            image: "assets/img/Song11-Nha.jpg",
        },
        {
            name: "Nắng có mang em về",
            singer: "Shartnuss ft Tr.D & Phankeo",
            path: "assets/music/Song2-NangCoMangEmVe.mp3",
            image: "assets/img/Song2-NangCoMangEmVe.jpg",
        },
        {
            name: "Dẫu có lỗi lầm",
            singer: "Vũ (live)",
            path: "assets/music/Song3-DauCoLoiLam.mp3",
            image: "assets/img/Song3-DauCoLoiLam.jpg",
        },
        {
            name: "Em se không làm phiền anh nữa",
            singer: "DeeTee ft. Huyền Trang Lux",
            path: "assets/music/Song4-EmSeKhongLamPhienAnhNua.mp3",
            image: "assets/img/Song4-EmSeKhongLamPhienAnhNua.jpg",
        },
        {
            name: "Không thể say",
            singer: "HIEUTHUHAI",
            path: "assets/music/Song5-KhongTheSay(live).mp3",
            image: "assets/img/Song5-KhongTheSay(live).jpg",
        },
        {
            name: "Không biết phải làm sao",
            singer: "Dương Lan Nhi x ViAM",
            path: "assets/music/Song6-KhongBietPhaiLamSao.mp3",
            image: "assets/img/Song6-KhongBietPhaiLamSao.jpg",
        },
        {
            name: "Sinh",
            singer: "Mer",
            path: "assets/music/Song7-Mer.mp3",
            image: "assets/img/Song7-Mer.jpg",
        },
        {
            name: "Lưu luyến sau chia tay",
            singer: "Try92 ft. Kai06",
            path: "assets/music/Song8-LuuLuyenSauChiaTay.mp3",
            image: "assets/img/Song8-LuuLuyenSauChiaTay.jpg",
        },
        {
            name: "3107-2",
            singer: "3107-2",
            path: "assets/music/Song9-3107-2.mp3",
            image: "assets/img/Song9-3107-2.jpg",
        },
        {
            name: "Chìm sâu",
            singer: " Obito ver. + Lyrics",
            path: "assets/music/Song10-ChimSau.mp3",
            image: "assets/img/Song10-ChimSau.jpg",
        },
    ],

    // render ra danh sách bài hát
    render: function () {
        const hmtls = this.songs.map((song, index) => {
            return `
            <div class="song ${this.currentIndex === index ? "active" : ""
                }" data-index = ${index}>
            <div class="thumb">
                <img src="${song.image}" alt="" />
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option" data-index = ${index}>
                <i class="fa-light fa-ellipsis icon-option"></i>
                <div class="option-child" >
                    <a class= "download" href = "" download = "" data-index = ${index}>  
                        <i class="fa-light fa-arrow-down-to-line"></i>
                        Tải xuống
                    </a>
                    <a class= "delete" data-index = "${index}" >  
                        <i class="fa-light fa-trash"></i>
                        Xóa khỏi danh sách
                    </a>
                </div>
            </div>
            </div>
            `;
        });
        $(".playlist").innerHTML = hmtls.join("");
    },

    // định nghĩa ra phương thức currentSong trả về vị trí của bài hát trong mảng songs
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    // xử lý các sự kiện trong trình phát nhạc
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            // thời gian của hiệu ứng
            duration: 10000,
            // số lần lặp của hiệu ứng
            iterations: Infinity,
        });
        // mặc định hiệu ứng sẽ dừng
        cdThumbAnimate.pause();
        // xử lý phóng to thu nhỏ cd-thumb
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // xử lý bật / tắt nhạc
        btnTogglePlay.addEventListener("click", function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        });

        // kiểm tra nhạc có đang play không
        audio.addEventListener("play", function () {
            player.classList.add("playing");
            _this.isPlaying = true;
            cdThumbAnimate.play();
        });

        // kiểm tra nhạc có pause không
        audio.addEventListener("pause", function () {
            player.classList.remove("playing");
            _this.isPlaying = false;
            cdThumbAnimate.pause();
        });

        // load ra độ dài của bài hát
        audio.addEventListener("loadedmetadata", function () {
            timeRight.textContent = _this.formatTime(audio.duration);
        });

        // load ra timeLeft khi thay đổi input
        progress.addEventListener('input', function (e) {
            const timeChange = (audio.duration / 100) * e.target.value
            timeLeft.textContent = _this.formatTime(timeChange)
        })

        // xử lý khi tiến độ bài hát thay đổi
        audio.addEventListener("timeupdate", function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
                timeLeft.textContent = _this.formatTime(audio.currentTime);
            }
        });

        // xử khi khi tua bài hát
        progress.addEventListener("change", function (e) {
            // audio.duration / 100 có tác dụng thời gian hiện tại thành đơn vị %
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        });

        // xử lý khi next bài hát
        btnNext.addEventListener("click", function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollActiveSong();
        });

        // xử lý khi prev bài hát
        btnPrev.addEventListener("click", function () {
            _this.prevSong();
            audio.play();
            _this.render();
            _this.scrollActiveSong();
        });

        // xử lý khi hết bài hát
        audio.addEventListener("ended", function () {
            if (_this.isRepeat && _this.isRandom) {
                audio.pause();
                alert(
                    "Cả 2 phím repeat và random đang được bật cùng lúc ! Tắt 1 trong 2 để tiếp tục phát nhạc."
                );
            } else if (_this.isRandom) {
                _this.randomSong();
                audio.play();
            } else if (_this.isRepeat) {
                audio.play();
            } else {
                _this.nextSong();
                audio.play();
            }
            _this.render();
        });

        // xử lý khi btnRepeat active
        btnRepeat.addEventListener("click", function () {
            _this.isRepeat = !_this.isRepeat;
            btnRepeat.classList.toggle("active", _this.isRepeat);
        });

        // xử lý khi btnRadnom acitve
        btnRandom.addEventListener("click", function () {
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle("active", _this.isRandom);
        });
        // xử lý khi click vào song trong playlist
        playList.addEventListener("click", function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            const optionNode = e.target.closest(".option");
            const optionChildNode = e.target.closest('.option-child')
            const downloadNode = e.target.closest('.download')
            const deleteNode = e.target.closest('.delete')

            // tối ưu việc lặp lại và tăng trải nghiệm người dùng
            const handleClick = (index) => {
                _this.currentIndex = index
                _this.loadCurrentSong()
                _this.render()
                _this.scrollActiveSong()
                audio.play()
            }

            if (songNode && !optionNode) {
                handleClick(Number(songNode.dataset.index))
            }
            if (optionNode && !optionChildNode) {
                _this.currentIndex = Number(optionNode.dataset.index)
                optionNode.classList.toggle('active')
                console.log(_this.currentIndex)
            }
            if (downloadNode && !deleteNode) {
                handleClick(Number(downloadNode.dataset.index))
                downloadNode.href = _this.currentSong.path
                downloadNode.download = `${_this.currentSong.name} - ${_this.currentSong.singer}.mp3`
                setTimeout(function() {
                    _this.toastMessege({
                        title: 'Đã tải xong !',
                        message: 'Hãy kiểm tra trong thư mục download của bạn',
                        type: 'success',
                        duration: 3000
                    }) 
                }, 3000)
            }
            if (deleteNode && !downloadNode) {
                const indexDelete = Number(deleteNode.dataset.index)
                if (_this.isPlaying) {
                    alert('Trình phát nhạc đang hát, hãy tắt nó để có thể xóa bài hát !')
                    return
                }
                if (_this.songs.length <= 1) {
                    _this.toastMessege({
                        title: 'Thất bại !',
                        message: 'Không thể xóa bài hát cuối cùng',
                        type: 'error',
                        duration: 3000
                    })
                    return
                }
                const checkDelete = confirm('Bạn chắn chắn muốn xóa bài này !')

                if (checkDelete) {
                    _this.removeSong(indexDelete)
                    _this.toastMessege({
                        title: 'Thành công !',
                        message: 'Đã xóa bài hát khỏi danh sách',
                        type: 'success',
                        duration: 3000
                    })
                } else {
                    return
                }
            }

        });
    },

    // hàm toast message
    toastMessege: function ({
        title = '',
        message = '',
        type = '',
        duration = 2000
    }) {
        const toastParent = document.querySelector('#toast')
        if (toastParent) {
            const toastChild = document.createElement('div')
            const autoRemoveToast = setTimeout(function () {
                toastParent.removeChild(toastChild)
            }, duration + 1000)
            const icons = {
                success: `fa-regular fa-check`,
                error: `fa-regular fa-exclamation`
            }
            const icon = icons[type]
            const delay = (duration / 1000).toFixed(2)

            toastChild.classList.add('toast', `toast--${type}`)
            toastChild.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`

            toastChild.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__message toast--${type}">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fa-regular fa-xmark"></i>
                </div>
            `
            toastChild.addEventListener('click', function (e) {
                const closeNode = e.target.closest('.toast__close')
                if (closeNode) {
                    toastParent.removeChild(toastChild)
                }
                clearTimeout(autoRemoveToast)
            })
            toastParent.appendChild(toastChild)
        }
    },

    // hàm xóa bài hát
    removeSong: function (index) {
        this.songs.splice(index, 1)
        this.render()
        this.loadCurrentSong()
    },

    // hàm format time ra dạng 00:00
    formatTime: function (time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    },

    // hàm next bài hát
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    // hàm prev bài hát
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    // hàm random bài hát
    randomSong: function () {
        // kiểm tra độ dài của danh sách nhạc
        if (this.songs.length <= 1) {
            return;
        }

        do {
            var newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    // hiệu ứng cuộn khi song active
    scrollActiveSong: function () {
        setTimeout(() => {
            const songElement = $(".song.active");
            songElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 500);
    },

    // load ra thông tin của bài hát
    loadCurrentSong: function () {
        nameSong.textContent = this.currentSong.name;
        nameSinger.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function () {
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvents();
        this.render();
    },
};
app.start();
